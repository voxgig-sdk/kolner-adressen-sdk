package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAddressEntityFunc func(client *KolnerAdressenSDK, entopts map[string]any) KolnerAdressenEntity

var NewDatastoreSearchEntityFunc func(client *KolnerAdressenSDK, entopts map[string]any) KolnerAdressenEntity

