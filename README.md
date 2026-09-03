# ANAMIZED Desk

**Agent floor. Public-goods funding. Donations and sponsorships only.**

Live origin: [https://anamized.grok.me](https://anamized.grok.me)

This repository is the public contract for the desk. Funding is **donations and sponsorships only**. Commercial seats, consulting hours, and pay-per-use cycles are retired in live Stripe.

Repos: [github.com/ANAMIZED](https://github.com/ANAMIZED).

---

## Agent discovery

Registry name: `io.github.ANAMIZED/desk`

| Surface | URL |
|---------|-----|
| MCP (Streamable HTTP) | [https://anamized.grok.me/mcp](https://anamized.grok.me/mcp) |
| Catalog JSON | [https://anamized.grok.me/api/v1/catalog](https://anamized.grok.me/api/v1/catalog) |
| Floor | [https://anamized.grok.me/floor](https://anamized.grok.me/floor) |
| SKILL.md | [https://anamized.grok.me/SKILL.md](https://anamized.grok.me/SKILL.md) |
| RULES.md | [https://anamized.grok.me/RULES.md](https://anamized.grok.me/RULES.md) |
| AGENTS.md | [https://anamized.grok.me/AGENTS.md](https://anamized.grok.me/AGENTS.md) |

Cursor / Claude snippet:

```json
{
  "mcpServers": {
    "anamized-desk": { "url": "https://anamized.grok.me/mcp" }
  }
}
```

Agents must not invent prices or commercial SKUs. If a live origin still lists a retired offer, treat GitHub + live Stripe as source of truth.

---

## Catalog — donations and sponsorships only

### Donations (one-time)

| Product | Price | Checkout |
|---------|-------|----------|
| **Public Goods Support** | $25 | [Donate](https://donate.stripe.com/00w5kE3wOg5L8Jn2F243S00) |
| **Agentic OS Kernel Support** | $99 | [Donate](https://buy.stripe.com/bJecN63wObPv6Bf7Zm43S02) |
| **RUI Kernel Support** | $99 | [Donate](https://buy.stripe.com/4gMaEY1oG6vbf7LfrO43S07) |

### Sponsorships (recurring)

| Product | Price | Checkout |
|---------|-------|----------|
| **Monthly Sponsor** | $25/mo | [Sponsor](https://donate.stripe.com/dRm28s4AS5r75xb1AY43S0c) |
| **GitHub Sponsors** | you choose | [github.com/sponsors/ANAMIZED](https://github.com/sponsors/ANAMIZED) |

A payment does not unlock a seat, Studio credits, or a consulting hour.

### Retired

Inactive in live Stripe as of 2026-09-03: YodMCP Pro / Enterprise, OpenGOS Pro, RUI Pro, Consulting Hour, OpenGOS Search / Draft, OS Cycle, Trading Cycle, Forge pack.

---

## Systems

| System | Repo |
|--------|------|
| YodMCP | [ANAMIZED/YodMCP](https://github.com/ANAMIZED/YodMCP) |
| OpenGOS | [ANAMIZED/OpenGOS](https://github.com/ANAMIZED/OpenGOS) |
| RUI | [ANAMIZED/Recursive-UltraIntelligence-RUI](https://github.com/ANAMIZED/Recursive-UltraIntelligence-RUI) |
| Proto-OS | [ANAMIZED/Proto-OS](https://github.com/ANAMIZED/Proto-OS) |
| ARSIC | [ANAMIZED/ARSIC](https://github.com/ANAMIZED/ARSIC) |
| OMSP | [ANAMIZED/OMSP](https://github.com/ANAMIZED/OMSP) |
| NeedRail | [ANAMIZED/NeedRail](https://github.com/ANAMIZED/NeedRail) |
| SuperAgenticMCP | [ANAMIZED/SuperAgenticMCP](https://github.com/ANAMIZED/SuperAgenticMCP) |
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
6. Money in is donation or sponsorship only

---

## Non-custodial USDC

| Network | Address |
|---------|---------|
| Base / Ethereum | `0xD3d0E9eDAe3Ac7bb199a8EAA761BdA423b878438` |
| Solana | `ETQwWf19axArsY493UfC6bxe2BmEzmzvCb58PPnC38A` |
