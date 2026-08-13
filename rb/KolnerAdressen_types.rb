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

# Request payload for Address#list.
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
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] records
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
DatastoreSearch = Struct.new(
  :limit,
  :offset,
  :records,
  :total,
  keyword_init: true
)

# Request payload for DatastoreSearch#load.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] records
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
DatastoreSearchLoadMatch = Struct.new(
  :limit,
  :offset,
  :records,
  :total,
  keyword_init: true
)

