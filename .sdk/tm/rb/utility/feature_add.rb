# KolnerAdressen SDK utility: feature_add
module KolnerAdressenUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
