-- KolnerAdressen SDK error

local json = require("dkjson")

local KolnerAdressenError = {}
KolnerAdressenError.__index = KolnerAdressenError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function KolnerAdressenError.new(code, msg, ctx)
  local self = setmetatable({}, KolnerAdressenError)
  self.is_sdk_error = true
  self.sdk = "KolnerAdressen"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function KolnerAdressenError:context()
  return CONTEXT[self]
end


function KolnerAdressenError:error()
  return self.msg
end


function KolnerAdressenError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function KolnerAdressenError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function KolnerAdressenError:to_json()
  return json.encode(self:to_table())
end


function KolnerAdressenError:__tostring()
  return self.msg
end


function KolnerAdressenError.__tojson(self)
  return self:to_json()
end


return KolnerAdressenError
