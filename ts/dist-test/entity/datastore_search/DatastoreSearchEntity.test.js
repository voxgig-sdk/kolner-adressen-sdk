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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "limit": { "a": true, "h": "Limit", "n": "limit", "r": false, "sh": "Number of records returned per page", "t": "`$INTEGER`", "key$": "limit", "index$": 0 }, "offset": { "a": true, "h": "Offset", "n": "offset", "r": false, "sh": "Current offset for pagination", "t": "`$INTEGER`", "key$": "offset", "index$": 1 }, "records": { "a": true, "h": "Records", "n": "records", "r": false, "sh": "Array of address records", "t": "`$ARRAY`", "key$": "records", "index$": 2 }, "total": { "a": true, "h": "Total", "n": "total", "r": false, "sh": "Total number of records matching the query", "t": "`$INTEGER`", "key$": "total", "index$": 3 } }, "name": "datastore_search", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/3/action/datastore_search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "field", "or": "field", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "filter", "or": "filter", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "c2f2e522-00c5-4c0c-9168-d60e716020a3", "k": "query", "n": "resource_id", "or": "resource_id", "r": true, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/api/3/action/datastore_search", "q": { "exist": ["field", "filter", "limit", "offset", "q", "resource_id"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "3" }, { "lit": "action" }, { "lit": "datastore_search" }], "t": { "req": "`reqdata`", "res": "`body.result`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "datastore_search", "name__orig": "datastore_search", "Name": "DatastoreSearch", "name_": "datastore_search", "name-": "datastore-search", "NAME": "DATASTORE_SEARCH", "index$": 1 }, { "active": true, "entity": "datastore_search", "key$": "BasicDatastoreSearchFlow", "kind": "basic", "name": "BasicDatastoreSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "datastore_search_ref01", "srcdatavar": "datastore_search_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-datastore_search_ref01" } }], "index$": 0 }] }, 'DatastoreSearch', { "GET /api/3/action/datastore_search": { "protocol": "http", "operationId": "searchAddresses", "responses": { "200": { "description": "Successfully retrieved address data", "content": { "application/json": { "schema": { "type": "object", "description": "Response from the address search API", "properties": { "success": { "description": "Whether the request was successful", "key$": "success", "type": "boolean" }, "result": { "key$": "result", "properties": { "limit": { "description": "Number of records returned per page", "type": "integer", "key$": "limit" }, "offset": { "description": "Current offset for pagination", "type": "integer", "key$": "offset" }, "records": { "description": "Array of address records", "items": { "description": "A single address record in Cologne", "properties": { "block": { "description": "Block identifier", "type": "string" }, "blockseite": { "description": "Block side", "type": "string" }, "gebaeude_id_alkis": { "description": "Building ID from ALKIS (Amtliches Liegenschaftskataster-Informationssystem)", "type": "string" }, "hausnummer": { "description": "House number", "example": "123", "type": "string" }, "hausnummer_zusatz": { "description": "House number suffix", "example": "a", "type": "string" }, "hochwert": { "description": "Northing coordinate (ETRS 1989 UTM Zone 32N)", "format": "double", "type": "number" }, "id": { "description": "Unique address identifier", "type": "string" }, "latitude": { "description": "Latitude (WGS84)", "format": "double", "maximum": 90, "minimum": -90, "type": "number" }, "longitude": { "description": "Longitude (WGS84)", "format": "double", "maximum": 180, "minimum": -180, "type": "number" }, "nutzung_gebaeude_funktion": { "description": "Building usage/function", "type": "string" }, "plz": { "description": "Postal code", "example": "50667", "type": "string" }, "rechtswert": { "description": "Easting coordinate (ETRS 1989 UTM Zone 32N)", "format": "double", "type": "number" }, "stadtbezirk": { "description": "City district (Stadtbezirk)", "type": "string" }, "stadtteil": { "description": "District (Stadtteil)", "type": "string" }, "stadtviertel": { "description": "Quarter (Stadtviertel)", "type": "string" }, "statistisches_quartier": { "description": "Statistical quarter", "type": "string" }, "strasse": { "description": "Street name", "example": "Kölner Straße", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Address" }, "type": "array", "key$": "records" }, "total": { "description": "Total number of records matching the query", "example": 163000, "type": "integer", "key$": "total" } }, "type": "object", "index$": 0 } }, "x-ref": "#/components/schemas/AddressSearchResponse" } } } }, "400": { "description": "Bad request - invalid parameters" }, "404": { "description": "Resource not found" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "resource_id", "in": "query", "description": "Resource ID for the addresses dataset", "required": true, "schema": { "type": "string", "example": "c2f2e522-00c5-4c0c-9168-d60e716020a3" }, "index$": 0 }, { "name": "limit", "in": "query", "description": "Maximum number of results to return", "required": false, "schema": { "type": "integer", "default": 100, "minimum": 1, "maximum": 1000 }, "index$": 1 }, { "name": "offset", "in": "query", "description": "Offset for pagination", "required": false, "schema": { "type": "integer", "default": 0, "minimum": 0 }, "index$": 2 }, { "name": "q", "in": "query", "description": "Search query string", "required": false, "schema": { "type": "string" }, "index$": 3 }, { "name": "filters", "in": "query", "description": "JSON string of field filters", "required": false, "schema": { "type": "string" }, "index$": 4 }, { "name": "fields", "in": "query", "description": "Comma-separated list of fields to return", "required": false, "schema": { "type": "string" }, "index$": 5 }], "securitySource": "unspecified" } });
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