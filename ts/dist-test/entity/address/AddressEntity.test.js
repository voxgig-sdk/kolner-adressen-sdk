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
(0, node_test_1.describe)('AddressEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KOLNER_ADRESSEN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KOLNER_ADRESSEN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KolnerAdressenSDK.test();
        const ent = testsdk.Address();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KOLNER_ADRESSEN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'address.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "description", "req": false, "short": "Resource description", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "format", "req": false, "short": "Data format", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "Resource identifier", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "name", "req": false, "short": "Resource name", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "uri", "name": "url", "req": false, "short": "Resource download or access URL", "type": "`$STRING`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "address", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "html", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /dataset/adressen-k%C3%B6ln", "json": "{\"operationId\":\"getAddressesDataset\",\"parameters\":[{\"description\":\"Format of the response\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"html\",\"enum\":[\"html\",\"json\",\"rdf\",\"dcat-ap\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Metadata information about the Cologne addresses dataset\",\"properties\":{\"description\":{\"description\":\"Detailed description of the dataset\",\"type\":\"string\"},\"id\":{\"description\":\"Dataset identifier\",\"example\":\"c2f2e522-00c5-4c0c-9168-d60e716020a3\",\"type\":\"string\"},\"issued\":{\"description\":\"Publication date\",\"example\":\"2013-06-26\",\"format\":\"date\",\"type\":\"string\"},\"language\":{\"description\":\"Dataset language\",\"example\":\"de\",\"type\":\"string\"},\"license\":{\"description\":\"License information\",\"example\":\"Datenlizenz Deutschland – Zero – Version 2.0\",\"type\":\"string\"},\"modified\":{\"description\":\"Last modification date\",\"example\":\"2026-02-11\",\"format\":\"date\",\"type\":\"string\"},\"publisher\":{\"description\":\"Publishing organization\",\"example\":\"Stadt Köln\",\"type\":\"string\"},\"resources\":{\"description\":\"Available data resources\",\"items\":{\"description\":\"Information about a specific data resource\",\"properties\":{\"description\":{\"description\":\"Resource description\",\"type\":\"string\"},\"format\":{\"description\":\"Data format\",\"enum\":[\"WFS\",\"WMS\",\"KMZ\",\"JSON\",\"XLSX\",\"ZIP\",\"Shapefile\"],\"type\":\"string\"},\"id\":{\"description\":\"Resource identifier\",\"type\":\"string\"},\"name\":{\"description\":\"Resource name\",\"type\":\"string\"},\"url\":{\"description\":\"Resource download or access URL\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"spatial\":{\"description\":\"Geographic coverage\",\"example\":\"http://www.geonames.org/2886242/\",\"type\":\"string\"},\"title\":{\"description\":\"Dataset title\",\"example\":\"Adressen Köln\",\"type\":\"string\"}},\"type\":\"object\"}},\"application/rdf+xml\":{\"schema\":{\"type\":\"string\"}},\"text/html\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successfully retrieved dataset information\"},\"404\":{\"description\":\"Dataset not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/dataset/adressen-k%C3%B6ln", "segments": [{ "lit": "dataset" }, { "lit": "adressen-k%C3%B6ln" }], "select": { "exist": ["format"] }, "transform": { "req": "`reqdata`", "res": "`body.resources`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "address", "name__orig": "address", "Name": "Address", "name_": "address", "name-": "address", "NAME": "ADDRESS", "index$": 0 }, { "active": true, "entity": "address", "key$": "BasicAddressFlow", "kind": "basic", "name": "BasicAddressFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "address_ref01" } }], "index$": 0 }] }, 'Address');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let address_ref01_data = Object.values(setup.data.existing.address)[0];
        // LIST
        const address_ref01_ent = client.Address();
        const address_ref01_match = {};
        const address_ref01_list = (await address_ref01_ent.list(address_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/address/AddressTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KolnerAdressenSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['address01', 'address02', 'address03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KOLNER_ADRESSEN_TEST_ADDRESS_ENTID': idmap,
        'KOLNER_ADRESSEN_TEST_LIVE': 'FALSE',
        'KOLNER_ADRESSEN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['KOLNER_ADRESSEN_TEST_ADDRESS_ENTID'];
    const live = 'TRUE' === env.KOLNER_ADRESSEN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KOLNER_ADRESSEN_TEST_ADDRESS_ENTID'];
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
//# sourceMappingURL=AddressEntity.test.js.map