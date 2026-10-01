"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "address",
        "accessor": "Address",
        "op": "list",
        "method": "GET",
        "path": "/dataset/adressen-k%C3%B6ln",
        "args": [],
        "select": {
            "format": "v1"
        },
        "headers": [],
        "query": [
            "format"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "c2f2e522-00c5-4c0c-9168-d60e716020a3",
            "title": "Adressen Köln",
            "description": "x",
            "publisher": "Stadt Köln",
            "modified": "2026-02-11",
            "issued": "2013-06-26",
            "license": "Datenlizenz Deutschland – Zero – Version 2.0",
            "spatial": "http://www.geonames.org/2886242/",
            "language": "de",
            "resources": [
                {
                    "description": "x",
                    "format": "WFS",
                    "id": "x",
                    "name": "x",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "datastore_search",
        "accessor": "DatastoreSearch",
        "op": "load",
        "method": "GET",
        "path": "/api/3/action/datastore_search",
        "args": [],
        "select": {
            "field": "v1",
            "filter": "v1",
            "limit": "v1",
            "offset": "v1",
            "q": "v1",
            "resource_id": "c2f2e522-00c5-4c0c-9168-d60e716020a3"
        },
        "headers": [],
        "query": [
            "resource_id",
            "limit",
            "offset",
            "q",
            "filters",
            "fields"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "success": true,
            "result": {
                "limit": 1,
                "offset": 1,
                "records": [
                    {
                        "block": "x",
                        "blockseite": "x",
                        "gebaeude_id_alkis": "x",
                        "hausnummer": "123",
                        "hausnummer_zusatz": "a",
                        "hochwert": 1,
                        "id": "x",
                        "latitude": 1,
                        "longitude": 1,
                        "nutzung_gebaeude_funktion": "x",
                        "plz": "50667",
                        "rechtswert": 1,
                        "stadtbezirk": "x",
                        "stadtteil": "x",
                        "stadtviertel": "x",
                        "statistisches_quartier": "x",
                        "strasse": "Kölner Straße"
                    }
                ],
                "total": 163000
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map