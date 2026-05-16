# ProjectName SDK exists test

import pytest
from kolneradressen_sdk import KolnerAdressenSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = KolnerAdressenSDK.test(None, None)
        assert testsdk is not None
