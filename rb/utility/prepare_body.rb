# KolnerAdressen SDK utility: prepare_body
require_relative 'media'
module KolnerAdressenUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return KolnerAdressenUtilities.raw_body(ctx.reqdata) if KolnerAdressenUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
