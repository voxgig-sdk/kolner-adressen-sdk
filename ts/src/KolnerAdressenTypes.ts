// Typed models for the KolnerAdressen SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Address {
  description?: string
  format?: string
  id?: string
  name?: string
  url?: string
}

export interface AddressListMatch {
  description?: string
  format?: string
  id?: string
  name?: string
  url?: string
}

export interface DatastoreSearch {
  result?: Record<string, any>
  success?: boolean
}

export interface DatastoreSearchLoadMatch {
  result?: Record<string, any>
  success?: boolean
}

