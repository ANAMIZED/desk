#!/usr/bin/env node
/**
 * ANAMIZED Desk CLI — catalog, checkout, MCP tools.
 *
 *   node scripts/desk.mjs catalog --url https://origin
 *   node scripts/desk.mjs offer consulting
 *   node scripts/desk.mjs checkout yodmcp-pro
 *   node scripts/desk.mjs call list_offers
 */

const argv = process.argv.slice(2);

function flag(name, fallback) {
  const index = argv.indexOf(name);
  if (index >= 0 && argv[index + 1]) return argv[index + 1];
  return fallback;
}

const origin = String(flag("--url", process.env.DESK_URL ?? "http://127.0.0.1:8080")).replace(
  /\/$/,
  "",
);

const command = argv.find((token) => !token.startsWith("--") && token !== origin) ?? "help";
const rest = argv.filter((token, i) => {
  if (token.startsWith("--")) return false;
  if (argv[i - 1] === "--url") return false;
  return token !== command;
});

function help() {
  const text = `anamized-desk — live catalog CLI for ANAMIZED

Usage:
  desk catalog [--url ORIGIN]
  desk offer <id>
  desk systems
  desk listings
  desk checkout <id>
  desk search <query>
  desk discovery
  desk call <tool> [json-args]

Default origin: ${origin}

Examples:
  desk catalog
  desk offer consulting
  desk call list_offers '{"kind":"subscription"}'
  desk call checkout_link '{"id":"yodmcp-pro"}'
`;
  process.stdout.write(text);
}

async function getJson(path) {
  const response = await fetch(`${origin}${path}`, {
    headers: { accept: "application/json" },
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status} ${path}\n${body}`);
  }
  return JSON.parse(body);
}

async function callTool(name, args) {
  const response = await fetch(`${origin}/mcp`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "MCP-Protocol-Version": "2025-11-25",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status} /mcp\n${body}`);
  }
  return JSON.parse(body);
}

function print(data) {
  process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
}

async function main() {
  switch (command) {
    case "help":
    case "-h":
    case "--help":
      help();
      return;
    case "catalog":
      print(await getJson("/api/v1/catalog"));
      return;
    case "offer": {
      const id = rest[0];
      if (!id) throw new Error("usage: desk offer <id>");
      print(await getJson(`/api/v1/offers/${encodeURIComponent(id)}`));
      return;
    }
    case "systems":
      print(await getJson("/api/v1/systems"));
      return;
    case "listings":
    case "mcp":
      print(await getJson("/api/v1/listings"));
      return;
    case "checkout": {
      const id = rest[0];
      if (!id) throw new Error("usage: desk checkout <id>");
      print(await getJson(`/api/v1/checkout/${encodeURIComponent(id)}`));
      return;
    }
    case "search": {
      const q = rest.join(" ").trim();
      if (!q) throw new Error("usage: desk search <query>");
      print(await callTool("search_catalog", { q }));
      return;
    }
    case "discovery":
      print(await getJson("/api/v1/discovery"));
      return;
    case "call": {
      const name = rest[0];
      if (!name) throw new Error("usage: desk call <tool> [json-args]");
      const args = rest[1] ? JSON.parse(rest[1]) : {};
      print(await callTool(name, args));
      return;
    }
    default:
      throw new Error(`Unknown command: ${command}\nRun desk help.`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : error}\n`);
  process.exit(1);
});
