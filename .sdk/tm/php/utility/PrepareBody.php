<?php
declare(strict_types=1);

// KolnerAdressen SDK utility: prepare_body

class KolnerAdressenPrepareBody
{
    public static function call(KolnerAdressenContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
