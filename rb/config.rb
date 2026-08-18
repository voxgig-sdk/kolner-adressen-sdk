# KolnerAdressen SDK configuration

module KolnerAdressenConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "KolnerAdressen",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://offenedaten-koeln.de",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "address" => {},
          "datastore_search" => {},
        },
      },
      "entity" => {
        "address" => {
          "fields" => [
            {
              "name" => "description",
              "type" => "`$STRING`",
            },
            {
              "name" => "format",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
          ],
          "name" => "address",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "html",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dataset/adressen-k%C3%B6ln",
                  "parts" => [
                    "dataset",
                    "adressen-k%C3%B6ln",
                  ],
                  "select" => {
                    "exist" => [
                      "format",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.resources`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "datastore_search" => {
          "fields" => [
            {
              "name" => "limit",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "offset",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "records",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "total",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "datastore_search",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "filter",
                        "orig" => "filter",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "c2f2e522-00c5-4c0c-9168-d60e716020a3",
                        "kind" => "query",
                        "name" => "resource_id",
                        "orig" => "resource_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/3/action/datastore_search",
                  "parts" => [
                    "api",
                    "3",
                    "action",
                    "datastore_search",
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                      "filter",
                      "limit",
                      "offset",
                      "q",
                      "resource_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.result`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    KolnerAdressenFeatures.make_feature(name)
  end
end
