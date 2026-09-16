package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "KolnerAdressen",
			"slug": "kolner-adressen",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://offenedaten-koeln.de",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"address": map[string]any{},
				"datastore_search": map[string]any{},
			},
		},
		"entity": map[string]any{
			"address": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Resource description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "format",
						"short": "Data format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Resource identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Resource name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "Resource download or access URL",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "address",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "html",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/dataset/adressen-k%C3%B6ln",
								"segments": []any{
									map[string]any{
										"lit": "dataset",
									},
									map[string]any{
										"lit": "adressen-k%C3%B6ln",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.resources`",
								},
								"parts": []any{
									"dataset",
									"adressen-k%C3%B6ln",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"datastore_search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "limit",
						"short": "Number of records returned per page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "offset",
						"short": "Current offset for pagination",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"short": "Array of address records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"short": "Total number of records matching the query",
						"type": "`$INTEGER`",
					},
				},
				"name": "datastore_search",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "filter",
											"orig": "filter",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "c2f2e522-00c5-4c0c-9168-d60e716020a3",
											"kind": "query",
											"name": "resource_id",
											"orig": "resource_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/3/action/datastore_search",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "3",
									},
									map[string]any{
										"lit": "action",
									},
									map[string]any{
										"lit": "datastore_search",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"filter",
										"limit",
										"offset",
										"q",
										"resource_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
								"parts": []any{
									"api",
									"3",
									"action",
									"datastore_search",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
