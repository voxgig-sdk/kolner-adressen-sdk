package voxgigkolneradressensdk

import (
	"github.com/voxgig-sdk/kolner-adressen-sdk/core"
	"github.com/voxgig-sdk/kolner-adressen-sdk/entity"
	"github.com/voxgig-sdk/kolner-adressen-sdk/feature"
	_ "github.com/voxgig-sdk/kolner-adressen-sdk/utility"
)

// Type aliases preserve external API.
type KolnerAdressenSDK = core.KolnerAdressenSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type KolnerAdressenEntity = core.KolnerAdressenEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type KolnerAdressenError = core.KolnerAdressenError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAddressEntityFunc = func(client *core.KolnerAdressenSDK, entopts map[string]any) core.KolnerAdressenEntity {
		return entity.NewAddressEntity(client, entopts)
	}
	core.NewDatastoreSearchEntityFunc = func(client *core.KolnerAdressenSDK, entopts map[string]any) core.KolnerAdressenEntity {
		return entity.NewDatastoreSearchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewKolnerAdressenSDK = core.NewKolnerAdressenSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
