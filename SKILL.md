---
name: anamized-desk
description: Browse and check out ANAMIZED agentic OS products (YodMCP, OpenGOS, RUI, kernels, consulting) via catalog API or MCP. Use when a user wants ANAMIZED licenses, MCP servers, grants tooling, or a consulting hour.
metadata:
  registry: io.github.ANAMIZED/desk
  homepage: https://github.com/ANAMIZED/desk
---

# ANAMIZED Desk

Commercial storefront for fail-closed agentic operating systems and MCP servers.

Do not invent prices or SKUs. Read the live catalog on the desk origin.

## Discovery (on the live desk origin)

- MCP (Streamable HTTP): `/mcp`
- Catalog JSON: `/api/v1/catalog`
- OpenAPI: `/api/v1/openapi.json`
- This skill (live): `/SKILL.md`
- Agent instructions: `/AGENTS.md`
- llms.txt: `/llms.txt`
- Human page: `/agents`
- CLI: `node scripts/desk.mjs catalog --url <desk-origin>`
- Agent x402 catalog: [x402-cloudflare-starter](https://github.com/ANAMIZED/x402-cloudflare-starter) `GET /v1/catalog`

## MCP tools

POST JSON-RPC `tools/call` to `/mcp`.

| Tool | Purpose |
| --- | --- |
| `list_offers` | Every live product. Optional `kind`: subscription, metered, consulting, support. |
| `get_offer` | One product by id or slug, including Stripe URL. |
| `list_systems` | YodMCP, OpenGOS, RUI, Edge-OS, kernels. |
| `list_mcp_servers` | Official registry names under `io.github.ANAMIZED/*`. |
| `checkout_link` | Live Stripe payment link. Hand to a human. |
| `search_catalog` | Free-text search. |
| `discovery` | Every machine-readable surface. |

## Checkout rules

Payment links are live Stripe. Agents may instead pay USDC via x402 on `/v1/cycle`, `/v1/search`, `/v1/draft`. An x402 200 is a receipt only. After payment the human signs in on the desk and syncs purchases so seats, Studio credits, or a consulting hour unlock. Do not claim a purchase is fulfilled until the desk account shows it.

Consulting is digital-only: no calendar. A paid hour is answered in writing on `/consulting`.

## Client snippet

```json
{
  "mcpServers": {
    "anamized-desk": { "url": "https://<desk-origin>/mcp" }
  }
}
```
