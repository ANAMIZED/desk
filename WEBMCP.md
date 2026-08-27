# WebMCP on ANAMIZED pages

WebMCP is a **page-level** tool surface for visiting browser agents (Chrome origin trial, ChatGPT in-app browser). It is **not** a replacement for MCP servers.

## Contract

| Layer | Role |
|-------|------|
| MCP (stdio / Streamable HTTP `/mcp`) | System of record |
| WebMCP (`document.modelContext`) | Front door on a visited page |
| Stripe / x402 | Payment rails — WebMCP never charges |

Rules:

1. Same tool names as the MCP server when the tool exists there.
2. Reads first. Writes require `window.confirm`.
3. `checkout_link` returns a URL. It does not pay.
4. Feature-detect `document.modelContext || navigator.modelContext`.
5. If the API is missing, the human page still works.

## Test

1. Chrome: `chrome://flags/#enable-webmcp-testing` → Enabled → relaunch.
2. Serve the `web/` directory over http://localhost.
3. Open DevTools and inspect registered tools (Model Context Tool Inspector, or `document.modelContext.getTools()` where available).
4. ChatGPT desktop in-app browser: open the deployed page and ask it to `list_offers` / `status`.

Cloudflare note: if the origin is on Cloudflare, the dashboard WebMCP preview can proxy `/mcp` via the Site MCP Server pack. Keep this page layer anyway so GitHub previews and non-CF hosts work.
