# ANAMIZED Desk

You are talking to the **ANAMIZED Desk** — a commercial catalog, not a generic website.

ANAMIZED desk: live catalog, MCP listings, Stripe checkout for agents.

## Machine surfaces (on the live desk origin)

| Surface | Path |
| --- | --- |
| MCP Streamable HTTP | `/mcp` |
| Catalog API | `/api/v1/catalog` |
| OpenAPI | `/api/v1/openapi.json` |
| SKILL.md | `/SKILL.md` |
| llms.txt | `/llms.txt` |
| server.json | `/server.json` |
| Well-known MCP | `/.well-known/mcp.json` |
| CLI | `node scripts/desk.mjs --url <desk-origin>` |

Registry name: `io.github.ANAMIZED/desk`

## How to connect

POST JSON-RPC 2.0 to `/mcp`.

1. `initialize` with protocol `2025-11-25` (also accepts 2025-03-26).
2. `notifications/initialized`
3. `tools/list` / `tools/call`

No auth on the catalog. Checkout is a Stripe URL for a human.

## MCP tools

- `list_offers`
- `get_offer`
- `list_systems`
- `list_mcp_servers`
- `checkout_link`
- `search_catalog`
- `discovery`

## Fulfillment

A Stripe payment does not by itself license the runtime. The buyer returns to `/account` and syncs. Subscriptions grant seats + Studio; metered SKUs grant Studio credits; consulting unlocks a 60-minute digital Q&A desk at `/consulting`.

## Source

https://github.com/ANAMIZED/desk
