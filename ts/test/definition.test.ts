import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "address",
    "accessor": "Address",
    "op": "list",
    "method": "GET",
    "path": "/dataset/adressen-k%C3%B6ln",
    "args": [],
    "select": {
      "format": "html"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "text/html",
      "application/rdf+xml"
    ],
    "query": [
      "format"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      }
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
          "id": "x",
          "name": "x",
          "format": "WFS",
          "url": "x",
          "description": "x"
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
      "resource_id": "c2f2e522-00c5-4c0c-9168-d60e716020a3",
      "field": "v1",
      "filter": "v1",
      "limit": 100,
      "offset": 0,
      "q": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "resource_id",
      "limit",
      "offset",
      "q",
      "filters",
      "fields"
    ],
    "queryArgs": [
      {
        "name": "field",
        "wire": "fields"
      },
      {
        "name": "filter",
        "wire": "filters"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "resource_id",
        "wire": "resource_id"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "success": true,
      "result": {
        "records": [
          {
            "id": "x",
            "strasse": "Kölner Straße",
            "hausnummer": "123",
            "hausnummer_zusatz": "a",
            "plz": "50667",
            "stadtbezirk": "x",
            "stadtteil": "x",
            "stadtviertel": "x",
            "statistisches_quartier": "x",
            "block": "x",
            "blockseite": "x",
            "gebaeude_id_alkis": "x",
            "nutzung_gebaeude_funktion": "x",
            "rechtswert": 1,
            "hochwert": 1,
            "longitude": 1,
            "latitude": 1
          }
        ],
        "total": 163000,
        "limit": 1,
        "offset": 1
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
