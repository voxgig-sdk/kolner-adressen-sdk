"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DatastoreSearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KOLNER_ADRESSEN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KOLNER_ADRESSEN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KolnerAdressenSDK.test();
        const ent = testsdk.DatastoreSearch();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KOLNER_ADRESSEN_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'datastore_search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "limit", "req": false, "short": "Number of records returned per page", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "offset", "req": false, "short": "Current offset for pagination", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "records", "req": false, "short": "Array of address records", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "total", "req": false, "short": "Total number of records matching the query", "type": "`$INTEGER`", "index$": 3 }], "name": "datastore_search", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "field", "orig": "field", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "filter", "orig": "filter", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 100, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "kind": "query", "name": "q", "orig": "q", "reqd": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "example": "c2f2e522-00c5-4c0c-9168-d60e716020a3", "kind": "query", "name": "resource_id", "orig": "resource_id", "reqd": true, "type": "`$STRING`", "index$": 5 }] }, "contract": { "id": "GET /api/3/action/datastore_search", "json": "{\"operationId\":\"searchAddresses\",\"parameters\":[{\"description\":\"Resource ID for the addresses dataset\",\"in\":\"query\",\"name\":\"resource_id\",\"required\":true,\"schema\":{\"example\":\"c2f2e522-00c5-4c0c-9168-d60e716020a3\",\"type\":\"string\"}},{\"description\":\"Maximum number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":100,\"maximum\":1000,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Search query string\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"JSON string of field filters\",\"in\":\"query\",\"name\":\"filters\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of fields to return\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response from the address search API\",\"properties\":{\"result\":{\"properties\":{\"limit\":{\"description\":\"Number of records returned per page\",\"type\":\"integer\"},\"offset\":{\"description\":\"Current offset for pagination\",\"type\":\"integer\"},\"records\":{\"description\":\"Array of address records\",\"items\":{\"description\":\"A single address record in Cologne\",\"properties\":{\"block\":{\"description\":\"Block identifier\",\"type\":\"string\"},\"blockseite\":{\"description\":\"Block side\",\"type\":\"string\"},\"gebaeude_id_alkis\":{\"description\":\"Building ID from ALKIS (Amtliches Liegenschaftskataster-Informationssystem)\",\"type\":\"string\"},\"hausnummer\":{\"description\":\"House number\",\"example\":\"123\",\"type\":\"string\"},\"hausnummer_zusatz\":{\"description\":\"House number suffix\",\"example\":\"a\",\"type\":\"string\"},\"hochwert\":{\"description\":\"Northing coordinate (ETRS 1989 UTM Zone 32N)\",\"format\":\"double\",\"type\":\"number\"},\"id\":{\"description\":\"Unique address identifier\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude (WGS84)\",\"format\":\"double\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude (WGS84)\",\"format\":\"double\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"},\"nutzung_gebaeude_funktion\":{\"description\":\"Building usage/function\",\"type\":\"string\"},\"plz\":{\"description\":\"Postal code\",\"example\":\"50667\",\"type\":\"string\"},\"rechtswert\":{\"description\":\"Easting coordinate (ETRS 1989 UTM Zone 32N)\",\"format\":\"double\",\"type\":\"number\"},\"stadtbezirk\":{\"description\":\"City district (Stadtbezirk)\",\"type\":\"string\"},\"stadtteil\":{\"description\":\"District (Stadtteil)\",\"type\":\"string\"},\"stadtviertel\":{\"description\":\"Quarter (Stadtviertel)\",\"type\":\"string\"},\"statistisches_quartier\":{\"description\":\"Statistical quarter\",\"type\":\"string\"},\"strasse\":{\"description\":\"Street name\",\"example\":\"Kölner Straße\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total number of records matching the query\",\"example\":163000,\"type\":\"integer\"}},\"type\":\"object\"},\"success\":{\"description\":\"Whether the request was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved address data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"404\":{\"description\":\"Resource not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/3/action/datastore_search", "segments": [{ "lit": "api" }, { "lit": "3" }, { "lit": "action" }, { "lit": "datastore_search" }], "select": { "exist": ["field", "filter", "limit", "offset", "q", "resource_id"] }, "transform": { "req": "`reqdata`", "res": "`body.result`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "datastore_search", "name__orig": "datastore_search", "Name": "DatastoreSearch", "name_": "datastore_search", "name-": "datastore-search", "NAME": "DATASTORE_SEARCH", "index$": 1 }, { "active": true, "entity": "datastore_search", "key$": "BasicDatastoreSearchFlow", "kind": "basic", "name": "BasicDatastoreSearchFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "datastore_search_ref01", "srcdatavar": "datastore_search_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-datastore_search_ref01" } }], "index$": 0 }] }, 'DatastoreSearch');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let datastore_search_ref01_data = Object.values(setup.data.existing.datastore_search)[0];
        // LOAD
        const datastore_search_ref01_ent = client.DatastoreSearch();
        const datastore_search_ref01_match_dt0 = {};
        const datastore_search_ref01_data_dt0 = (await datastore_search_ref01_ent.load(datastore_search_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != datastore_search_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/datastore_search/DatastoreSearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KolnerAdressenSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['datastore_search01', 'datastore_search02', 'datastore_search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KOLNER_ADRESSEN_TEST_DATASTORE_SEARCH_ENTID': idmap,
        'KOLNER_ADRESSEN_TEST_LIVE': 'FALSE',
        'KOLNER_ADRESSEN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['KOLNER_ADRESSEN_TEST_DATASTORE_SEARCH_ENTID'];
    const live = 'TRUE' === env.KOLNER_ADRESSEN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KOLNER_ADRESSEN_TEST_DATASTORE_SEARCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.KolnerAdressenSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.KOLNER_ADRESSEN_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=DatastoreSearchEntity.test.js.map