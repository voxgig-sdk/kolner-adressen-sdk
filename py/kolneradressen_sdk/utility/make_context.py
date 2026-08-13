# KolnerAdressen SDK utility: make_context

from kolneradressen_sdk.core.context import KolnerAdressenContext


def make_context_util(ctxmap, basectx):
    return KolnerAdressenContext(ctxmap, basectx)
