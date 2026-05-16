<?php
declare(strict_types=1);

// KolnerAdressen SDK utility: feature_add

class KolnerAdressenFeatureAdd
{
    public static function call(KolnerAdressenContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
