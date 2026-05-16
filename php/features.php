<?php
declare(strict_types=1);

// KolnerAdressen SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class KolnerAdressenFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new KolnerAdressenBaseFeature();
            case "test":
                return new KolnerAdressenTestFeature();
            default:
                return new KolnerAdressenBaseFeature();
        }
    }
}
