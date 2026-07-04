<?php
declare(strict_types=1);

// DatastoreSearch entity test

require_once __DIR__ . '/../kolneradressen_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DatastoreSearchEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = KolnerAdressenSDK::test(null, null);
        $ent = $testsdk->DatastoreSearch(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = datastore_search_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "datastore_search." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set KOLNERADRESSEN_TEST_DATASTORE_SEARCH_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $datastore_search_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.datastore_search")));
        $datastore_search_ref01_data = null;
        if (count($datastore_search_ref01_data_raw) > 0) {
            $datastore_search_ref01_data = Helpers::to_map($datastore_search_ref01_data_raw[0][1]);
        }

        // LOAD
        $datastore_search_ref01_ent = $client->DatastoreSearch(null);
        $datastore_search_ref01_match_dt0 = [];
        $datastore_search_ref01_data_dt0_loaded = $datastore_search_ref01_ent->load($datastore_search_ref01_match_dt0, null);
        $this->assertNotNull($datastore_search_ref01_data_dt0_loaded);

    }
}

function datastore_search_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/datastore_search/DatastoreSearchTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = KolnerAdressenSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["datastore_search01", "datastore_search02", "datastore_search03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("KOLNERADRESSEN_TEST_DATASTORE_SEARCH_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "KOLNERADRESSEN_TEST_DATASTORE_SEARCH_ENTID" => $idmap,
        "KOLNERADRESSEN_TEST_LIVE" => "FALSE",
        "KOLNERADRESSEN_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["KOLNERADRESSEN_TEST_DATASTORE_SEARCH_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["KOLNERADRESSEN_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new KolnerAdressenSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["KOLNERADRESSEN_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["KOLNERADRESSEN_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
