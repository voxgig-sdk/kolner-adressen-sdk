package = "voxgig-sdk-kolner-adressen"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/kolner-adressen-sdk.git",
  tag = "lua/v0.0.1",
  dir = "kolner-adressen-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Kölner Adressen public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/kolner-adressen-sdk",
  issues_url = "https://github.com/voxgig-sdk/kolner-adressen-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "kolner-adressen" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["kolner-adressen_sdk"] = "kolner-adressen_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
