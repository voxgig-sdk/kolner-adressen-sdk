# KolnerAdressen SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module KolnerAdressenFeatures
  def self.make_feature(name)
    case name
    when "base"
      KolnerAdressenBaseFeature.new
    when "ratelimit"
      KolnerAdressenRatelimitFeature.new
    when "retry"
      KolnerAdressenRetryFeature.new
    when "test"
      KolnerAdressenTestFeature.new
    when "timeout"
      KolnerAdressenTimeoutFeature.new
    else
      KolnerAdressenBaseFeature.new
    end
  end
end
