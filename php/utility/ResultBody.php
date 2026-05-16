<?php
declare(strict_types=1);

// KolnerAdressen SDK utility: result_body

class KolnerAdressenResultBody
{
    public static function call(KolnerAdressenContext $ctx): ?KolnerAdressenResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
