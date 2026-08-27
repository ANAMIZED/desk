/**
 * Desk WebMCP tools — same names as the Streamable HTTP MCP server.
 * Reads go to /api/v1/* when same-origin; otherwise use the offline catalog.
 * checkout_link never charges; it returns a Stripe URL after confirm().
 */
(function () {
  "use strict";
  var W = window.ANAMIZEDWebMCP;
  var logEl = document.getElementById("webmcp-log");
  var statusEl = document.getElementById("webmcp-status");
  var OFFLINE_CATALOG = {
    offers: [
      { id: "opengos-search", name: "OpenGOS Advanced Search", price: "$0.40", kind: "meter" },
      { id: "agentic-os-cycle", name: "Agentic OS Cycle", price: "$0.75", kind: "meter" },
      { id: "opengos-draft", name: "OpenGOS Proposal Draft", price: "$2.50", kind: "meter" },
      { id: "public-goods", name: "Public Goods Support", price: "$25", kind: "support" },
      { id: "yodmcp-pro", name: "YodMCP Pro", price: "$49/mo", kind: "subscription" },
      { id: "yodmcp-enterprise", name: "YodMCP Enterprise", price: "$499/mo", kind: "subscription" },
      { id: "opengos-pro", name: "OpenGOS Pro", price: "$49/mo", kind: "subscription" },
      { id: "rui-pro", name: "RUI Pro", price: "$49/mo", kind: "subscription" },
      { id: "consulting", name: "Consulting Hour", price: "$199", kind: "consulting" },
      { id: "trading-cycle", name: "Trading Decision Cycle", price: "$4.00", kind: "meter" },
      { id: "kernel-support", name: "Agentic OS Kernel Support", price: "$99", kind: "support" },
      { id: "rui-kernel-support", name: "RUI Kernel Support", price: "$99", kind: "support" }
    ],
    systems: [
      { name: "YodMCP", repo: "ANAMIZED/YodMCP" },
      { name: "OpenGOS", repo: "ANAMIZED/OpenGOS" },
      { name: "Server-OS", repo: "ANAMIZED/Server-OS" },
      { name: "SuperAgenticMCP", repo: "ANAMIZED/SuperAgenticMCP" },
      { name: "NeedRail", repo: "ANAMIZED/NeedRail" },
      { name: "LRSI", repo: "ANAMIZED/LRSI" },
      { name: "OpenMesha", repo: "ANAMIZED/OpenMesha" },
      { name: "x402-cloudflare-starter", repo: "ANAMIZED/x402-cloudflare-starter" }
    ],
    mcp_servers: [
      "io.github.ANAMIZED/desk",
      "io.github.ANAMIZED/yodmcp",
      "io.github.ANAMIZED/opengos",
      "io.github.ANAMIZED/server-os",
      "io.github.ANAMIZED/superagenticmcp",
      "io.github.ANAMIZED/needrail"
    ],
    checkout: {
      "opengos-search": "https://buy.stripe.com/7sY8wQ5EW3iZ5xb5Re43S06",
      "agentic-os-cycle": "https://buy.stripe.com/3cI14o8R8dXD3p3frO43S04",
      "opengos-draft": "https://buy.stripe.com/9B69AUd7o7zf2kZ2F243S03",
      "public-goods": "https://donate.stripe.com/00w5kE3wOg5L8Jn2F243S00",
      "yodmcp-pro": "https://buy.stripe.com/bJe3cw0kCaLrbVz1AY43S09",
      "yodmcp-enterprise": "https://buy.stripe.com/9B68wQ1oGcTz9NrfrO43S0a",
      "opengos-pro": "https://buy.stripe.com/7sY8wQ5EWf1H3p3bby43S01",
      "rui-pro": "https://buy.stripe.com/aFacN65EW5r7e3HgvS43S08",
      consulting: "https://buy.stripe.com/dRmaEYgjA9Hnf7LdjG43S0b",
      "trading-cycle": "https://buy.stripe.com/bJedRaebsaLr2kZ2F243S05",
      "kernel-support": "https://buy.stripe.com/bJecN63wObPv6Bf7Zm43S02",
      "rui-kernel-support": "https://buy.stripe.com/4gMaEY1oG6vbf7LfrO43S07"
    }
  };

  function origin() {
    var input = document.getElementById("desk-origin");
    if (input && input.value) return input.value.replace(/\/$/, "");
    if (location.protocol === "http:" || location.protocol === "https:") return location.origin;
    return "";
  }
  async function live(path) {
    var base = origin();
    if (!base) throw new Error("no live origin");
    return W.rest(base + path);
  }
  async function listOffers(kind) {
    try {
      var data = await live("/api/v1/catalog");
      var offers = data.offers || data.items || data;
      if (kind && Array.isArray(offers)) {
        offers = offers.filter(function (o) { return o.kind === kind || o.type === kind; });
      }
      return { source: "live", offers: offers };
    } catch (_err) {
      var offers = OFFLINE_CATALOG.offers;
      if (kind) offers = offers.filter(function (o) { return o.kind === kind; });
      return { source: "offline-catalog", offers: offers };
    }
  }

  var tools = [
    {
      name: "list_offers",
      title: "List desk offers",
      description: "List ANAMIZED Desk catalog offers. Read-only. Optional kind filter.",
      inputSchema: { type: "object", properties: { kind: { type: "string", description: "meter | subscription | consulting | support" } } },
      annotations: { readOnlyHint: true },
      execute: async function (params) {
        var result = await listOffers(params && params.kind);
        W.log(logEl, "list_offers " + result.source + " n=" + result.offers.length);
        return result;
      }
    },
    {
      name: "get_offer",
      title: "Get one offer",
      description: "Get a single Desk SKU by id.",
      inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      annotations: { readOnlyHint: true },
      execute: async function (params) {
        var id = params && params.id;
        try { return { source: "live", offer: await live("/api/v1/offers/" + encodeURIComponent(id)) }; }
        catch (_err) {
          var offer = OFFLINE_CATALOG.offers.find(function (o) { return o.id === id; });
          if (!offer) return { error: "offer not found: " + id };
          return { source: "offline-catalog", offer: offer };
        }
      }
    },
    {
      name: "list_systems",
      title: "List ANAMIZED systems",
      description: "List agentic OS / MCP system repos.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async function () {
        try { return { source: "live", systems: await live("/api/v1/systems") }; }
        catch (_err) { return { source: "offline-catalog", systems: OFFLINE_CATALOG.systems }; }
      }
    },
    {
      name: "list_mcp_servers",
      title: "List MCP registry names",
      description: "List official MCP registry names (io.github.ANAMIZED/...)",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async function () {
        try { return { source: "live", listings: await live("/api/v1/listings") }; }
        catch (_err) { return { source: "offline-catalog", listings: OFFLINE_CATALOG.mcp_servers }; }
      }
    },
    {
      name: "search_catalog",
      title: "Search the desk catalog",
      description: "Search offers by free-text query. Read-only.",
      inputSchema: { type: "object", properties: { q: { type: "string" } }, required: ["q"] },
      annotations: { readOnlyHint: true },
      execute: async function (params) {
        var q = String((params && params.q) || "").toLowerCase();
        var listed = await listOffers();
        var hits = (listed.offers || []).filter(function (o) { return JSON.stringify(o).toLowerCase().indexOf(q) !== -1; });
        return { source: listed.source, q: q, hits: hits };
      }
    },
    {
      name: "discovery",
      title: "Desk discovery map",
      description: "Return machine surfaces. Read-only.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async function () {
        try { return { source: "live", discovery: await live("/api/v1/discovery") }; }
        catch (_err) {
          return { source: "offline-catalog", discovery: {
            mcp: "/mcp", catalog: "/api/v1/catalog", webmcp: "document.modelContext on this page", registry: "io.github.ANAMIZED/desk"
          }};
        }
      }
    },
    {
      name: "checkout_link",
      title: "Get a Stripe checkout link",
      description: "Return a human Stripe Payment Link. Does not charge. Requires confirmation.",
      inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      annotations: { readOnlyHint: false },
      execute: async function (params) {
        var id = params && params.id;
        if (!W.confirmWrite("Open a Stripe checkout link for " + id + "? This does not charge by itself.")) {
          return { cancelled: true, reason: "human declined confirmation" };
        }
        try {
          var liveLink = await live("/api/v1/checkout/" + encodeURIComponent(id));
          W.log(logEl, "checkout_link live " + id);
          return { source: "live", id: id, checkout: liveLink, note: "Human rail only. Sync on desk after payment." };
        } catch (_err) {
          var url = OFFLINE_CATALOG.checkout[id];
          if (!url) return { error: "no checkout link for " + id };
          W.log(logEl, "checkout_link offline " + id);
          return { source: "offline-catalog", id: id, url: url, note: "Human Stripe rail. x402 remains on x402-cloudflare-starter." };
        }
      }
    }
  ];

  async function renderOffers() {
    var box = document.getElementById("offer-list");
    if (!box) return;
    var listed = await listOffers();
    box.innerHTML = listed.offers.map(function (o) {
      return "<li><code>" + (o.id || "") + "</code> — " + (o.name || "") + " <span class='dim'>" + (o.price || "") + " · " + (o.kind || "") + "</span></li>";
    }).join("");
  }

  async function boot() {
    var ok = W.supported();
    if (statusEl) {
      statusEl.textContent = ok
        ? "WebMCP available — tools registered"
        : "WebMCP API not in this browser — page still works for humans";
    }
    W.log(logEl, "registered " + JSON.stringify(await W.registerAll(tools)));
    renderOffers();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
