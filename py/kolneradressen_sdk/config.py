# KolnerAdressen SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "KolnerAdressen",
            "slug": "kolner-adressen",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://offenedaten-koeln.de",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "address": {},
                "datastore_search": {},
            },
        },
        "entity": {
      "address": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Resource description",
          },
          {
            "name": "format",
            "title": "Format",
            "type": "`$STRING`",
            "short": "Data format",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Resource identifier",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Resource name",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "Resource download or access URL",
            "format": "uri",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "dataset",
                  },
                  {
                    "lit": "adressen-k%C3%B6ln",
                  },
                ],
                "parts": [
                  "dataset",
                  "adressen-k%C3%B6ln",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.resources`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "html",
                      "field": True,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "alternatives": [
                    {
                      "kind": "raw",
                      "media": "application/rdf+xml",
                    },
                    {
                      "kind": "raw",
                      "media": "text/html",
                    },
                  ],
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "datastore_search": {
        "fields": [
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
            "short": "Number of records returned per page",
          },
          {
            "name": "offset",
            "title": "Offset",
            "type": "`$INTEGER`",
            "short": "Current offset for pagination",
          },
          {
            "name": "records",
            "title": "Records",
            "type": "`$ARRAY`",
            "short": "Array of address records",
          },
          {
            "name": "total",
            "title": "Total",
            "type": "`$INTEGER`",
            "short": "Total number of records matching the query",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "3",
                  },
                  {
                    "lit": "action",
                  },
                  {
                    "lit": "datastore_search",
                  },
                ],
                "parts": [
                  "api",
                  "3",
                  "action",
                  "datastore_search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "args": {
                  "query": [
                    {
                      "name": "field",
                      "orig": "fields",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "filter",
                      "orig": "filters",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 100,
                      "field": True,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "resource_id",
                      "orig": "resource_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "c2f2e522-00c5-4c0c-9168-d60e716020a3",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "resource_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
