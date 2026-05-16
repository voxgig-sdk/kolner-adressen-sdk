# KolnerAdressen SDK utility: make_context
require_relative '../core/context'
module KolnerAdressenUtilities
  MakeContext = ->(ctxmap, basectx) {
    KolnerAdressenContext.new(ctxmap, basectx)
  }
end
