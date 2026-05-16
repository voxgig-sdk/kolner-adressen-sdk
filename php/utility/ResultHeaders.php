<?php
declare(strict_types=1);

// KolnerAdressen SDK utility: result_headers

class KolnerAdressenResultHeaders
{
    public static function call(KolnerAdressenContext $ctx): ?KolnerAdressenResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
