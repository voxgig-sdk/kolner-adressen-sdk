# KolnerAdressen SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

KolnerAdressenUtility.registrar = ->(u) {
  u.clean = KolnerAdressenUtilities::Clean
  u.done = KolnerAdressenUtilities::Done
  u.make_error = KolnerAdressenUtilities::MakeError
  u.feature_add = KolnerAdressenUtilities::FeatureAdd
  u.feature_hook = KolnerAdressenUtilities::FeatureHook
  u.feature_init = KolnerAdressenUtilities::FeatureInit
  u.fetcher = KolnerAdressenUtilities::Fetcher
  u.make_fetch_def = KolnerAdressenUtilities::MakeFetchDef
  u.make_context = KolnerAdressenUtilities::MakeContext
  u.make_options = KolnerAdressenUtilities::MakeOptions
  u.make_request = KolnerAdressenUtilities::MakeRequest
  u.make_response = KolnerAdressenUtilities::MakeResponse
  u.make_result = KolnerAdressenUtilities::MakeResult
  u.make_point = KolnerAdressenUtilities::MakePoint
  u.make_spec = KolnerAdressenUtilities::MakeSpec
  u.make_url = KolnerAdressenUtilities::MakeUrl
  u.param = KolnerAdressenUtilities::Param
  u.prepare_auth = KolnerAdressenUtilities::PrepareAuth
  u.prepare_body = KolnerAdressenUtilities::PrepareBody
  u.prepare_headers = KolnerAdressenUtilities::PrepareHeaders
  u.prepare_method = KolnerAdressenUtilities::PrepareMethod
  u.prepare_params = KolnerAdressenUtilities::PrepareParams
  u.prepare_path = KolnerAdressenUtilities::PreparePath
  u.prepare_query = KolnerAdressenUtilities::PrepareQuery
  u.result_basic = KolnerAdressenUtilities::ResultBasic
  u.result_body = KolnerAdressenUtilities::ResultBody
  u.result_headers = KolnerAdressenUtilities::ResultHeaders
  u.transform_request = KolnerAdressenUtilities::TransformRequest
  u.transform_response = KolnerAdressenUtilities::TransformResponse
}
