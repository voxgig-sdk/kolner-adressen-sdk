# KolnerAdressen SDK

Search around 163,000 official Cologne street addresses with geo-coordinates from the city's open data portal

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Kölner Adressen API

This SDK wraps the address dataset published on [Offene Daten Köln](https://offenedaten-koeln.de), the open data portal operated by the [City of Cologne (Stadt Köln)](https://www.stadt-koeln.de). The portal runs on DKAN (a Drupal-based open-data platform) and exposes its tabular datasets through a CKAN-compatible `datastore_search` HTTP API.

The dataset contains roughly 163,000 official street addresses within the city of Cologne, each enriched with geographic coordinates so records can be mapped or used as a lookup source for geocoding workflows.

What you get from the API:

- Free-text and field-filtered search across the Cologne address table via `datastore_search`
- Per-record address fields (street, number, postcode, district) together with geo-coordinates
- Standard pagination, limit and offset parameters inherited from the DKAN/CKAN datastore API

The API is read-only and unauthenticated. As the portal is publicly funded infrastructure, please use reasonable request rates; no specific rate limits are documented.

## Try it

**TypeScript**
```bash
npm install kolner-adressen
```

**Python**
```bash
pip install kolner-adressen-sdk
```

**PHP**
```bash
composer require voxgig/kolner-adressen-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/kolner-adressen-sdk/go
```

**Ruby**
```bash
gem install kolner-adressen-sdk
```

**Lua**
```bash
luarocks install kolner-adressen-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { KolnerAdressenSDK } from 'kolner-adressen'

const client = new KolnerAdressenSDK({})

// List all addresss
const addresss = await client.Address().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o kolner-adressen-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "kolner-adressen": {
      "command": "/abs/path/to/kolner-adressen-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Address** | An individual Cologne street address record including street name, house number, postcode, district and geographic coordinates | `/dataset/adressen-k%C3%B6ln` |
| **DatastoreSearch** | The underlying DKAN/CKAN `datastore_search` endpoint used to query the address resource with filters, full-text search and pagination | `/api/3/action/datastore_search` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from kolneradressen_sdk import KolnerAdressenSDK

client = KolnerAdressenSDK({})

# List all addresss
addresss, err = client.Address(None).list(None, None)
```

### PHP

```php
<?php
require_once 'kolneradressen_sdk.php';

$client = new KolnerAdressenSDK([]);

// List all addresss
[$addresss, $err] = $client->Address(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/kolner-adressen-sdk/go"

client := sdk.NewKolnerAdressenSDK(map[string]any{})

// List all addresss
addresss, err := client.Address(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "KolnerAdressen_sdk"

client = KolnerAdressenSDK.new({})

# List all addresss
addresss, err = client.Address(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("kolner-adressen_sdk")

local client = sdk.new({})

-- List all addresss
local addresss, err = client:Address(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = KolnerAdressenSDK.test()
const result = await client.Address().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = KolnerAdressenSDK.test(None, None)
result, err = client.Address(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = KolnerAdressenSDK::test(null, null);
[$result, $err] = $client->Address(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Address(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = KolnerAdressenSDK.test(nil, nil)
result, err = client.Address(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Address(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Kölner Adressen API

- Upstream: [https://offenedaten-koeln.de](https://offenedaten-koeln.de)
- API docs: [https://offenedaten-koeln.de/api](https://offenedaten-koeln.de/api)

- Released under [Datenlizenz Deutschland – Zero – Version 2.0](https://www.govdata.de/dl-de/zero-2-0), the German public-sector equivalent of CC0
- Free to use, redistribute, adapt and combine with other data, including for commercial purposes
- No attribution legally required, though crediting the Stadt Köln open data portal is good practice
- Data is provided as-is with no warranty as to accuracy or completeness

---

Generated from the Kölner Adressen API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
