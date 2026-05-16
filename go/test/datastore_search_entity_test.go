package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/kolner-adressen-sdk"
	"github.com/voxgig-sdk/kolner-adressen-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestDatastoreSearchEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DatastoreSearch(nil)
		if ent == nil {
			t.Fatal("expected non-nil DatastoreSearchEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := datastore_searchBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "datastore_search." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set KOLNERADRESSEN_TEST_DATASTORE_SEARCH_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		datastoreSearchRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.datastore_search", setup.data)))
		var datastoreSearchRef01Data map[string]any
		if len(datastoreSearchRef01DataRaw) > 0 {
			datastoreSearchRef01Data = core.ToMapAny(datastoreSearchRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = datastoreSearchRef01Data

		// LOAD
		datastoreSearchRef01Ent := client.DatastoreSearch(nil)
		datastoreSearchRef01MatchDt0 := map[string]any{}
		datastoreSearchRef01DataDt0Loaded, err := datastoreSearchRef01Ent.Load(datastoreSearchRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if datastoreSearchRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func datastore_searchBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "datastore_search", "DatastoreSearchTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read datastore_search test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse datastore_search test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"datastore_search01", "datastore_search02", "datastore_search03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("KOLNERADRESSEN_TEST_DATASTORE_SEARCH_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"KOLNERADRESSEN_TEST_DATASTORE_SEARCH_ENTID": idmap,
		"KOLNERADRESSEN_TEST_LIVE":      "FALSE",
		"KOLNERADRESSEN_TEST_EXPLAIN":   "FALSE",
		"KOLNERADRESSEN_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["KOLNERADRESSEN_TEST_DATASTORE_SEARCH_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["KOLNERADRESSEN_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["KOLNERADRESSEN_APIKEY"],
			},
			extra,
		})
		client = sdk.NewKolnerAdressenSDK(core.ToMapAny(mergedOpts))
	}

	live := env["KOLNERADRESSEN_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["KOLNERADRESSEN_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
