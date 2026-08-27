/**
 * ANAMIZED WebMCP helper — thin page layer over MCP / REST.
 * Does not replace MCP servers. Registers document.modelContext tools
 * so a visiting browser agent can use the live page.
 *
 * API placement: document.modelContext (canonical) with navigator fallback.
 */
(function (root) {
  "use strict";

  function getModelContext() {
    if (typeof document !== "undefined" && document.modelContext) {
      return document.modelContext;
    }
    if (typeof navigator !== "undefined" && navigator.modelContext) {
      return navigator.modelContext;
    }
    return null;
  }

  function supported() {
    return Boolean(getModelContext());
  }

  async function registerTool(tool) {
    const ctx = getModelContext();
    if (!ctx || typeof ctx.registerTool !== "function") {
      return { ok: false, reason: "webmcp-unavailable" };
    }
    const payload = {
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema || { type: "object", properties: {} },
      execute: tool.execute,
      annotations: tool.annotations || {},
    };
    if (tool.title) payload.title = tool.title;
    await ctx.registerTool(payload);
    return { ok: true, name: tool.name };
  }

  async function registerAll(tools) {
    const results = [];
    for (const tool of tools) {
      try {
        results.push(await registerTool(tool));
      } catch (err) {
        results.push({
          ok: false,
          name: tool && tool.name,
          reason: err instanceof Error ? err.message : String(err),
        });
      }
    }
    return results;
  }

  async function rest(path, options) {
    const opts = options || {};
    const response = await fetch(path, {
      method: opts.method || "GET",
      headers: Object.assign(
        { accept: "application/json" },
        opts.body ? { "content-type": "application/json" } : {},
        opts.headers || {},
      ),
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      credentials: "same-origin",
    });
    const text = await response.text();
    let data = text;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (_err) {}
    if (!response.ok) {
      const err = new Error("HTTP " + response.status + " " + path);
      err.status = response.status;
      err.body = data;
      throw err;
    }
    return data;
  }

  async function callMcp(origin, name, args) {
    const base = String(origin || "").replace(/\/$/, "");
    const response = await fetch(base + "/mcp", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "MCP-Protocol-Version": "2025-11-25",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "tools/call",
        params: { name: name, arguments: args || {} },
      }),
    });
    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error((data.error && data.error.message) || "MCP call failed: " + name);
    }
    return data.result !== undefined ? data.result : data;
  }

  function confirmWrite(message) {
    if (typeof window !== "undefined" && typeof window.confirm === "function") {
      return window.confirm(message);
    }
    return false;
  }

  function log(el, line) {
    if (!el) return;
    const stamp = new Date().toISOString().slice(11, 19);
    el.textContent = "[" + stamp + "] " + line + "\n" + el.textContent;
  }

  root.ANAMIZEDWebMCP = {
    getModelContext: getModelContext,
    supported: supported,
    registerTool: registerTool,
    registerAll: registerAll,
    rest: rest,
    callMcp: callMcp,
    confirmWrite: confirmWrite,
    log: log,
  };
})(typeof window !== "undefined" ? window : globalThis);
