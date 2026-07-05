-- Typed models for the KolnerAdressen SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Address
---@field description? string
---@field format? string
---@field id? string
---@field name? string
---@field url? string

---@class AddressListMatch
---@field description? string
---@field format? string
---@field id? string
---@field name? string
---@field url? string

---@class DatastoreSearch
---@field result? table
---@field success? boolean

---@class DatastoreSearchLoadMatch
---@field result? table
---@field success? boolean

local M = {}

return M
