<?php
declare(strict_types=1);

// KolnerAdressen SDK configuration

class KolnerAdressenConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "KolnerAdressen",
                "slug" => "kolner-adressen",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://offenedaten-koeln.de",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "address" => [],
                    "datastore_search" => [],
                ],
            ],
            "entity" => [
        'address' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Resource description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'format',
              'short' => 'Data format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Resource identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Resource name',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'short' => 'Resource download or access URL',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'address',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'html',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/dataset/adressen-k%C3%B6ln',
                  'segments' => [
                    [
                      'lit' => 'dataset',
                    ],
                    [
                      'lit' => 'adressen-k%C3%B6ln',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.resources`',
                  ],
                  'parts' => [
                    'dataset',
                    'adressen-k%C3%B6ln',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'datastore_search' => [
          'fields' => [
            [
              'name' => 'limit',
              'short' => 'Number of records returned per page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'offset',
              'short' => 'Current offset for pagination',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'records',
              'short' => 'Array of address records',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'short' => 'Total number of records matching the query',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'datastore_search',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'filter',
                        'orig' => 'filter',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'c2f2e522-00c5-4c0c-9168-d60e716020a3',
                        'kind' => 'query',
                        'name' => 'resource_id',
                        'orig' => 'resource_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/3/action/datastore_search',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => '3',
                    ],
                    [
                      'lit' => 'action',
                    ],
                    [
                      'lit' => 'datastore_search',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                      'filter',
                      'limit',
                      'offset',
                      'q',
                      'resource_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.result`',
                  ],
                  'parts' => [
                    'api',
                    '3',
                    'action',
                    'datastore_search',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return KolnerAdressenFeatures::make_feature($name);
    }
}
