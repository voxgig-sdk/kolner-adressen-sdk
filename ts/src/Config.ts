
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'KolnerAdressen',
        slug: "kolner-adressen",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://offenedaten-koeln.de",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        address: {
        },
  
        datastore_search: {
        },
  
    }
  }


  entity = {
    "address": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Resource description"
        },
        {
          "name": "format",
          "title": "Format",
          "type": "`$STRING`",
          "short": "Data format"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Resource identifier"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Resource name"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "Resource download or access URL",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "address",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/dataset/adressen-k%C3%B6ln",
              "segments": [
                {
                  "lit": "dataset"
                },
                {
                  "lit": "adressen-k%C3%B6ln"
                }
              ],
              "parts": [
                "dataset",
                "adressen-k%C3%B6ln"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.resources`"
              },
              "args": {
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "html"
                  }
                ]
              },
              "select": {
                "exist": [
                  "format"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "datastore_search": {
      "fields": [
        {
          "name": "limit",
          "title": "Limit",
          "type": "`$INTEGER`",
          "short": "Number of records returned per page"
        },
        {
          "name": "offset",
          "title": "Offset",
          "type": "`$INTEGER`",
          "short": "Current offset for pagination"
        },
        {
          "name": "records",
          "title": "Records",
          "type": "`$ARRAY`",
          "short": "Array of address records"
        },
        {
          "name": "total",
          "title": "Total",
          "type": "`$INTEGER`",
          "short": "Total number of records matching the query"
        }
      ],
      "name": "datastore_search",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/3/action/datastore_search",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "3"
                },
                {
                  "lit": "action"
                },
                {
                  "lit": "datastore_search"
                }
              ],
              "parts": [
                "api",
                "3",
                "action",
                "datastore_search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "query": [
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "filter",
                    "orig": "filters",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 100
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  },
                  {
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "resource_id",
                    "orig": "resource_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "c2f2e522-00c5-4c0c-9168-d60e716020a3"
                  }
                ]
              },
              "select": {
                "exist": [
                  "field",
                  "filter",
                  "limit",
                  "offset",
                  "q",
                  "resource_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

