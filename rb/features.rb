# KolnerAdressen SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module KolnerAdressenFeatures
  def self.make_feature(name)
    case name
    when "base"
      KolnerAdressenBaseFeature.new
    when "test"
      KolnerAdressenTestFeature.new
    else
      KolnerAdressenBaseFeature.new
    end
  end
end
