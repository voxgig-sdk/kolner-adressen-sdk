<?php
declare(strict_types=1);

// KolnerAdressen SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class KolnerAdressenMakeContext
{
    public static function call(array $ctxmap, ?KolnerAdressenContext $basectx): KolnerAdressenContext
    {
        return new KolnerAdressenContext($ctxmap, $basectx);
    }
}
