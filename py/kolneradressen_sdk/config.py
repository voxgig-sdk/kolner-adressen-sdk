# KolnerAdressen SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Resource description",
            "type": "`$STRING`",
          },
          {
            "name": "format",
            "short": "Data format",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Resource identifier",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Resource name",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "short": "Resource download or access URL",
            "type": "`$STRING`",
          },
        ],
        "name": "address",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "html",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/dataset/adressen-k%C3%B6ln",
                "parts": [
                  "dataset",
                  "adressen-k%C3%B6ln",
                ],
                "select": {
                  "exist": [
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.resources`",
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
            "short": "Number of records returned per page",
            "type": "`$INTEGER`",
          },
          {
            "name": "offset",
            "short": "Current offset for pagination",
            "type": "`$INTEGER`",
          },
          {
            "name": "records",
            "short": "Array of address records",
            "type": "`$ARRAY`",
          },
          {
            "name": "total",
            "short": "Total number of records matching the query",
            "type": "`$INTEGER`",
          },
        ],
        "name": "datastore_search",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "field",
                      "orig": "field",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "filter",
                      "orig": "filter",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 100,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "c2f2e522-00c5-4c0c-9168-d60e716020a3",
                      "kind": "query",
                      "name": "resource_id",
                      "orig": "resource_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/3/action/datastore_search",
                "parts": [
                  "api",
                  "3",
                  "action",
                  "datastore_search",
                ],
                "select": {
                  "exist": [
                    "field",
                    "filter",
                    "limit",
                    "offset",
                    "q",
                    "resource_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
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
