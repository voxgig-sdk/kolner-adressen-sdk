-- KolnerAdressen SDK error

local KolnerAdressenError = {}
KolnerAdressenError.__index = KolnerAdressenError


function KolnerAdressenError.new(code, msg, ctx)
  local self = setmetatable({}, KolnerAdressenError)
  self.is_sdk_error = true
  self.sdk = "KolnerAdressen"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function KolnerAdressenError:error()
  return self.msg
end


function KolnerAdressenError:__tostring()
  return self.msg
end


return KolnerAdressenError
