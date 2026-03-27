#!/usr/bin/env node

/**
 * Incidents MCP Server (stdio)
 *
 * Cursor MCP config example:
 * {
 *   "incidents": {
 *     "command": "npx",
 *     "args": ["-y", "incidents-mcp"]
 *   }
 * }
 *
 * Remote URL: run incidents-http.js and point the client at https://host/mcp
 */

const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { createIncidentsMcpServer } = require("./createIncidentsMcpServer.js");

async function main() {
  const server = createIncidentsMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("incidents-mcp running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
