# Typed models for the KolnerAdressen SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Address:
    description: Optional[str] = None
    format: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class AddressListMatch:
    description: Optional[str] = None
    format: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class DatastoreSearch:
    result: Optional[dict] = None
    success: Optional[bool] = None


@dataclass
class DatastoreSearchLoadMatch:
    result: Optional[dict] = None
    success: Optional[bool] = None

