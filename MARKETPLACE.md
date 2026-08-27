# Marketplace listings

Official MCP Registry is already live for servers under `io.github.ANAMIZED/*`.

## Status 2026-08-27 (Revenue Scout implement)

| Surface | State |
|---------|--------|
| Official MCP Registry | Live — do not re-claim without evidence |
| x402 Trading Cycle $4 | Shipped in-repo — `GET /v1/trading` parallels [Stripe](https://buy.stripe.com/bJedRaebsaLr2kZ2F243S05). Worker deploy is host-owned. |
| Glama OpenGOS | **Unclaimed** — host OAuth at https://glama.ai/mcp/servers/ANAMIZED/OpenGOS |
| Glama YodMCP / NeedRail / OpenMesha | Claim via GitHub OAuth on glama.ai |
| mcp.so | Host submits `[Submit]` issues on `chatmcp/mcpso` |
| awesome-mcp-servers PRs | **Blocked** — GitHub App `403 Resource not accessible by integration` |
| Stripe live | 0 charges / 0 subscriptions as of 2026-08-27 — first-dollar path is Search $0.40 |

Forks/branches are already pushed. Open these while signed in as ANAMIZED:

| Destination | Open PR |
|---|---|
| punkpeye/awesome-mcp-servers (title must end `🤖🤖🤖`) | https://github.com/punkpeye/awesome-mcp-servers/compare/main...ANAMIZED:add-anamized-mcp-servers?expand=1 |
| DhanushNehru/awesome-mcp-servers | https://github.com/DhanushNehru/awesome-mcp-servers/compare/main...ANAMIZED:awesome-mcp-servers-dhanushnehru:add-anamized-mcp-servers?expand=1 |
| Sagargupta16/awesome-mcp-servers | https://github.com/Sagargupta16/awesome-mcp-servers/compare/main...ANAMIZED:awesome-mcp-servers-sagargupta16:add-anamized-mcp-servers?expand=1 |

To finish from Grok: reconnect GitHub with `public_repo` (classic PAT) or an App with `pull_requests:write` + `issues:write` on public third-party repos.

Tracking issue: [#1](https://github.com/ANAMIZED/desk/issues/1).
