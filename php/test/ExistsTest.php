<?php
declare(strict_types=1);

// KolnerAdressen SDK exists test

require_once __DIR__ . '/../kolneradressen_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = KolnerAdressenSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
