<?php
declare(strict_types=1);

// KolnerAdressen SDK utility: prepare_headers

class KolnerAdressenPrepareHeaders
{
    public static function call(KolnerAdressenContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
