# KolnerAdressen SDK feature factory

from feature.base_feature import KolnerAdressenBaseFeature
from feature.test_feature import KolnerAdressenTestFeature


def _make_feature(name):
    features = {
        "base": lambda: KolnerAdressenBaseFeature(),
        "test": lambda: KolnerAdressenTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
