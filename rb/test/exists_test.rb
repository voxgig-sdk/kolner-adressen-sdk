# KolnerAdressen SDK exists test

require "minitest/autorun"
require_relative "../KolnerAdressen_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = KolnerAdressenSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
