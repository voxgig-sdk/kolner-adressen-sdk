<?php
declare(strict_types=1);

// Typed models for the KolnerAdressen SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Address entity data model. */
class Address
{
    public ?string $description = null;
    public ?string $format = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Match filter for Address#list (any subset of Address fields). */
class AddressListMatch
{
    public ?string $description = null;
    public ?string $format = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** DatastoreSearch entity data model. */
class DatastoreSearch
{
    public ?array $result = null;
    public ?bool $success = null;
}

/** Match filter for DatastoreSearch#load (any subset of DatastoreSearch fields). */
class DatastoreSearchLoadMatch
{
    public ?array $result = null;
    public ?bool $success = null;
}

