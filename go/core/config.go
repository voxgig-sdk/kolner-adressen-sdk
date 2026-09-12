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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
