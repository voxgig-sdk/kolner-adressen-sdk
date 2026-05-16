package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAddressEntityFunc func(client *KolnerAdressenSDK, entopts map[string]any) KolnerAdressenEntity

var NewDatastoreSearchEntityFunc func(client *KolnerAdressenSDK, entopts map[string]any) KolnerAdressenEntity

