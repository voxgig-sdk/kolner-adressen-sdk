# KolnerAdressen SDK feature factory

from kolneradressen_sdk.feature.base_feature import KolnerAdressenBaseFeature
from kolneradressen_sdk.feature.ratelimit_feature import KolnerAdressenRatelimitFeature
from kolneradressen_sdk.feature.retry_feature import KolnerAdressenRetryFeature
from kolneradressen_sdk.feature.test_feature import KolnerAdressenTestFeature
from kolneradressen_sdk.feature.timeout_feature import KolnerAdressenTimeoutFeature


_FEATURES = {
    "base": lambda: KolnerAdressenBaseFeature(),
    "ratelimit": lambda: KolnerAdressenRatelimitFeature(),
    "retry": lambda: KolnerAdressenRetryFeature(),
    "test": lambda: KolnerAdressenTestFeature(),
    "timeout": lambda: KolnerAdressenTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
