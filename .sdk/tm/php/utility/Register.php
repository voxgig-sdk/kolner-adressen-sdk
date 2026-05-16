<?php
declare(strict_types=1);

// KolnerAdressen SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

KolnerAdressenUtility::setRegistrar(function (KolnerAdressenUtility $u): void {
    $u->clean = [KolnerAdressenClean::class, 'call'];
    $u->done = [KolnerAdressenDone::class, 'call'];
    $u->make_error = [KolnerAdressenMakeError::class, 'call'];
    $u->feature_add = [KolnerAdressenFeatureAdd::class, 'call'];
    $u->feature_hook = [KolnerAdressenFeatureHook::class, 'call'];
    $u->feature_init = [KolnerAdressenFeatureInit::class, 'call'];
    $u->fetcher = [KolnerAdressenFetcher::class, 'call'];
    $u->make_fetch_def = [KolnerAdressenMakeFetchDef::class, 'call'];
    $u->make_context = [KolnerAdressenMakeContext::class, 'call'];
    $u->make_options = [KolnerAdressenMakeOptions::class, 'call'];
    $u->make_request = [KolnerAdressenMakeRequest::class, 'call'];
    $u->make_response = [KolnerAdressenMakeResponse::class, 'call'];
    $u->make_result = [KolnerAdressenMakeResult::class, 'call'];
    $u->make_point = [KolnerAdressenMakePoint::class, 'call'];
    $u->make_spec = [KolnerAdressenMakeSpec::class, 'call'];
    $u->make_url = [KolnerAdressenMakeUrl::class, 'call'];
    $u->param = [KolnerAdressenParam::class, 'call'];
    $u->prepare_auth = [KolnerAdressenPrepareAuth::class, 'call'];
    $u->prepare_body = [KolnerAdressenPrepareBody::class, 'call'];
    $u->prepare_headers = [KolnerAdressenPrepareHeaders::class, 'call'];
    $u->prepare_method = [KolnerAdressenPrepareMethod::class, 'call'];
    $u->prepare_params = [KolnerAdressenPrepareParams::class, 'call'];
    $u->prepare_path = [KolnerAdressenPreparePath::class, 'call'];
    $u->prepare_query = [KolnerAdressenPrepareQuery::class, 'call'];
    $u->result_basic = [KolnerAdressenResultBasic::class, 'call'];
    $u->result_body = [KolnerAdressenResultBody::class, 'call'];
    $u->result_headers = [KolnerAdressenResultHeaders::class, 'call'];
    $u->transform_request = [KolnerAdressenTransformRequest::class, 'call'];
    $u->transform_response = [KolnerAdressenTransformResponse::class, 'call'];
});
