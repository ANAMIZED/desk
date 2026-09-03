/**
 * Desk WebMCP tools — same names as the Streamable HTTP MCP server.
 * Reads go to /api/v1/* when same-origin; otherwise use the offline catalog.
 * checkout_link never charges; it returns a Stripe donate/sponsor URL after confirm().
 */
(function () {
  "use strict";
  var W = window.ANAMIZEDWebMCP;
  var logEl = document.getElementById("webmcp-log");
  var statusEl = document.getElementById("webmcp-status");
  var OFFLINE_CATALOG = {
    offers: [
      { id: "monthly-sponsor", name: "Monthly Sponsor", price: "$25/mo", kind: "sponsorship" },
      { id: "public-goods", name: "Public Goods", price: "$25", kind: "donation" },
      { id: "kernel-support", name: "Agentic OS Kernel Support", price: "$99", kind: "donation" },
      { id: "rui-kernel", name: "RUI Kernel Support", price: "$99", kind: "donation" }
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
      "monthly-sponsor": "https://donate.stripe.com/dRm28s4AS5r75xb1AY43S0c",
      "public-goods": "https://donate.stripe.com/00w5kE3wOg5L8Jn2F243S00",
      "kernel-support": "https://donate.stripe.com/bJecN63wObPv6Bf7Zm43S02",
      "rui-kernel": "https://donate.stripe.com/4gMaEY1oG6vbf7LfrO43S07"
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
      title: "List desk gifts",
      description: "List ANAMIZED donate/sponsor gifts. Read-only. Optional kind filter: sponsorship | donation. No commercial SKUs.",
      inputSchema: { type: "object", properties: { kind: { type: "string", description: "sponsorship | donation" } } },
      annotations: { readOnlyHint: true },
      execute: async function (params) {
        var result = await listOffers(params && params.kind);
        W.log(logEl, "list_offers " + result.source + " n=" + result.offers.length);
        return result;
      }
    },
    {
      name: "get_offer",
      title: "Get one gift",
      description: "Get a single donate/sponsor gift by id.",
      inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      annotations: { readOnlyHint: true },
      execute: async function (params) {
        var id = params && params.id;
        try { return { source: "live", offer: await live("/api/v1/offers/" + encodeURIComponent(id)) }; }
        catch (_err) {
          var offer = OFFLINE_CATALOG.offers.find(function (o) { return o.id === id; });
          if (!offer) return { error: "gift not found: " + id };
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
      title: "Search desk gifts",
      description: "Search gifts by free-text query. Read-only.",
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
            mcp: "/mcp", catalog: "/api/v1/catalog", webmcp: "document.modelContext on this page", registry: "io.github.ANAMIZED/desk", money: "donations_and_sponsorships_only"
          }};
        }
      }
    },
    {
      name: "checkout_link",
      title: "Get a Stripe donate/sponsor link",
      description: "Return a human Stripe donate or sponsor URL. Does not charge. Requires confirmation. Not a product checkout.",
      inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      annotations: { readOnlyHint: false },
      execute: async function (params) {
        var id = params && params.id;
        if (!W.confirmWrite("Open a Stripe donate/sponsor link for " + id + "? This does not charge by itself.")) {
          return { cancelled: true, reason: "human declined confirmation" };
        }
        try {
          var liveLink = await live("/api/v1/checkout/" + encodeURIComponent(id));
          W.log(logEl, "checkout_link live " + id);
          return { source: "live", id: id, checkout: liveLink, note: "Gift rail only. Sync on desk after payment. No commercial seat." };
        } catch (_err) {
          var url = OFFLINE_CATALOG.checkout[id];
          if (!url) return { error: "no donate/sponsor link for " + id };
          W.log(logEl, "checkout_link offline " + id);
          return { source: "offline-catalog", id: id, url: url, note: "Human Stripe gift rail. Not a product." };
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
