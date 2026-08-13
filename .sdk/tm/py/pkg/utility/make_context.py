# KolnerAdressen SDK utility: make_context

from projectname_sdk.core.context import KolnerAdressenContext


def make_context_util(ctxmap, basectx):
    return KolnerAdressenContext(ctxmap, basectx)
