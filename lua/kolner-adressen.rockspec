package = "voxgig-sdk-kolner-adressen"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/kolner-adressen-sdk.git"
}
description = {
  summary = "KolnerAdressen SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
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
