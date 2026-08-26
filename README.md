# ANAMIZED Desk

**Autonomous systems. Commercial access.**

The commercial front door for ANAMIZED: fail-closed agentic operating systems, MCP servers, grants tooling, a digital consulting hour, and public-goods support.

Checkout is **live Stripe** for humans and **x402 USDC** for agents. Repos are on [github.com/ANAMIZED](https://github.com/ANAMIZED).

The store itself is agent-discoverable: MCP, REST, SKILL.md, AGENTS.md, llms.txt, and a CLI — same catalog humans see.

---

## Agent discovery

Registry name: `io.github.ANAMIZED/desk`

On the live desk origin:

| Surface | Path |
|---------|------|
| MCP (Streamable HTTP) | `/mcp` |
| Catalog JSON | `/api/v1/catalog` |
| OpenAPI | `/api/v1/openapi.json` |
| SKILL.md | `/SKILL.md` |
| AGENTS.md | `/AGENTS.md` |
| llms.txt | `/llms.txt` |
| server.json | `/server.json` |
| Well-known MCP | `/.well-known/mcp.json` |
| Human index | `/agents` |

MCP tools: `list_offers`, `get_offer`, `list_systems`, `list_mcp_servers`, `checkout_link`, `search_catalog`, `discovery`.

Cursor / Claude snippet (replace the origin with the live desk):

```json
{
  "mcpServers": {
    "anamized-desk": { "url": "https://<desk-origin>/mcp" }
  }
}
```

CLI:

```bash
node scripts/desk.mjs catalog --url https://<desk-origin>
node scripts/desk.mjs offer consulting
node scripts/desk.mjs checkout yodmcp-pro
node scripts/desk.mjs call list_offers '{"kind":"subscription"}'
```

No API key to browse. After payment the buyer signs in on the desk and syncs so seats, Studio credits, or a consulting hour unlock.

---

## Agent checkout (hybrid)

Do not invent prices. Two rails, same SKUs.

| Buyer | Rail |
|-------|------|
| Human | Stripe Payment Link in the tables below |
| Agent | x402 `GET /v1/cycle` · `/v1/search` · `/v1/draft` on [x402-cloudflare-starter](https://github.com/ANAMIZED/x402-cloudflare-starter) |

`GET /v1/catalog` on the Worker lists both rails. An x402 200 is a **receipt**. It does not write `fulfillment-claims.json`. Sync on the desk origin after payment. SuperAgenticMCP commerce points at that Worker — no new SKU.

---

## Catalog

### First dollar (meters)

| Product | Price | Checkout |
|---------|-------|----------|
| **OpenGOS Advanced Search** | $0.40 | [Buy](https://buy.stripe.com/7sY8wQ5EW3iZ5xb5Re43S06) |
| **Agentic OS Cycle** | $0.75 | [Buy](https://buy.stripe.com/3cI14o8R8dXD3p3frO43S04) |
| **OpenGOS Proposal Draft** | $2.50 | [Buy](https://buy.stripe.com/9B69AUd7o7zf2kZ2F243S03) |
| **Public Goods Support** | $25 | [Donate](https://donate.stripe.com/00w5kE3wOg5L8Jn2F243S00) |

### Subscriptions

| Product | Price | Checkout |
|---------|-------|----------|
| **YodMCP Pro** | $49/mo | [Subscribe](https://buy.stripe.com/bJe3cw0kCaLrbVz1AY43S09) |
| **YodMCP Enterprise** | $499/mo | [Subscribe](https://buy.stripe.com/9B68wQ1oGcTz9NrfrO43S0a) |
| **OpenGOS Pro** | $49/mo | [Subscribe](https://buy.stripe.com/7sY8wQ5EWf1H3p3bby43S01) |
| **RUI Pro** | $49/mo | [Subscribe](https://buy.stripe.com/aFacN65EW5r7e3HgvS43S08) |

### Consulting

Digital hour — no calendar. The desk answers every inquiry in writing for 60 minutes.

| Product | Price | Checkout |
|---------|-------|----------|
| **Consulting Hour** | $199 | [Buy the hour](https://buy.stripe.com/dRmaEYgjA9Hnf7LdjG43S0b) |

### Other pay-per-use / support

| Product | Price | Checkout |
|---------|-------|----------|
| **Trading Decision Cycle** | $4.00 | [Buy](https://buy.stripe.com/bJedRaebsaLr2kZ2F243S05) |
| **Agentic OS Kernel Support** | $99 | [Support](https://buy.stripe.com/bJecN63wObPv6Bf7Zm43S02) |
| **RUI Kernel Support** | $99 | [Support](https://buy.stripe.com/4gMaEY1oG6vbf7LfrO43S07) |

---

## Systems

| System | Repo |
|--------|------|
| YodMCP | [ANAMIZED/YodMCP](https://github.com/ANAMIZED/YodMCP) |
| OpenGOS | [ANAMIZED/OpenGOS](https://github.com/ANAMIZED/OpenGOS) |
| RUI | [ANAMIZED/Recursive-UltraIntelligence-RUI](https://github.com/ANAMIZED/Recursive-UltraIntelligence-RUI) |
| Edge-OS | [ANAMIZED/Edge-OS](https://github.com/ANAMIZED/Edge-OS) |
| AgenticArb | [ANAMIZED/AgenticArb](https://github.com/ANAMIZED/AgenticArb) |
| LRSI | [ANAMIZED/LRSI](https://github.com/ANAMIZED/LRSI) |
| Server-OS | [ANAMIZED/Server-OS](https://github.com/ANAMIZED/Server-OS) |
| OpenMesha | [ANAMIZED/OpenMesha](https://github.com/ANAMIZED/OpenMesha) |
| x402 checkout | [ANAMIZED/x402-cloudflare-starter](https://github.com/ANAMIZED/x402-cloudflare-starter) |

---

## Principles

1. Fail closed
2. Every mutation through a governed boundary
3. Event-sourced / auditable
4. Evidence-gated promotion
5. Host owns the evaluator; agents propose

---

## Non-custodial USDC

| Network | Address |
|---------|---------|
| Base / Ethereum | `0xD3d0E9eDAe3Ac7bb199a8EAA761BdA423b878438` |
| Solana | `ETQwWf19axArsY493UfC6bxe2BmEzmzvCb58PPnC38A` |
