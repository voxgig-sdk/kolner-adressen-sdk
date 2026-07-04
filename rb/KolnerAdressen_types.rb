# frozen_string_literal: true

# Typed models for the KolnerAdressen SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Address entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Address = Struct.new(
  :description,
  :format,
  :id,
  :name,
  :url,
  keyword_init: true
)

# Match filter for Address#list (any subset of Address fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
AddressListMatch = Struct.new(
  :description,
  :format,
  :id,
  :name,
  :url,
  keyword_init: true
)

# DatastoreSearch entity data model.
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
DatastoreSearch = Struct.new(
  :result,
  :success,
  keyword_init: true
)

# Match filter for DatastoreSearch#load (any subset of DatastoreSearch fields).
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
DatastoreSearchLoadMatch = Struct.new(
  :result,
  :success,
  keyword_init: true
)

