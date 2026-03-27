#!/usr/bin/env node

/**
 * Incidents MCP over Streamable HTTP (remote URL).
 *
 * Uses one MCP session per client (stateful transport). Point your MCP client at:
 *   https://<host>:<port>/mcp
 *
 * Env:
 *   PORT              — default 3333
 *   HOST              — default 0.0.0.0
 *   MCP_ALLOWED_HOSTS — optional, comma-separated Host values (recommended behind a reverse proxy)
 */

const http = require("node:http");
const { randomUUID } = require("node:crypto");
const { createMcpExpressApp } = require("@modelcontextprotocol/sdk/server/express.js");
const { StreamableHTTPServerTransport } = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const { createIncidentsMcpServer } = require("./createIncidentsMcpServer.js");

const PORT = parseInt(process.env.PORT || "3333", 10) || 3333;
const HOST = process.env.HOST || "0.0.0.0";
const MCP_PATH = "/mcp";

const allowedHostsEnv = process.env.MCP_ALLOWED_HOSTS;
const allowedHosts = allowedHostsEnv
  ? allowedHostsEnv.split(",").map((h) => h.trim()).filter(Boolean)
  : undefined;

const app = createMcpExpressApp({
  host: HOST,
  ...(allowedHosts ? { allowedHosts } : {})
});

const sessions = new Map();

function removeSession(sessionId) {
  sessions.delete(sessionId);
}

app.post(MCP_PATH, async (req, res) => {
  try {
    const sessionId = req.headers["mcp-session-id"];

    if (sessionId) {
      const entry = sessions.get(sessionId);
      if (!entry) {
        res.status(404).json({
          jsonrpc: "2.0",
          error: { code: -32001, message: "Session not found" },
          id: null
        });
        return;
      }
      await entry.transport.handleRequest(req, res, req.body);
      return;
    }

    const server = createIncidentsMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sid) => {
        sessions.set(sid, { transport, server });
      },
      onsessionclosed: (sid) => {
        removeSession(sid);
      }
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("POST /mcp error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: String(error.message || error) },
        id: null
      });
    }
  }
});

app.get(MCP_PATH, async (req, res) => {
  try {
    const sessionId = req.headers["mcp-session-id"];
    if (!sessionId || !sessions.has(sessionId)) {
      res.status(400).send("Bad Request: missing or unknown Mcp-Session-Id");
      return;
    }
    await sessions.get(sessionId).transport.handleRequest(req, res);
  } catch (error) {
    console.error("GET /mcp error:", error);
    if (!res.headersSent) {
      res.status(500).send(String(error.message || error));
    }
  }
});

app.delete(MCP_PATH, async (req, res) => {
  try {
    const sessionId = req.headers["mcp-session-id"];
    if (!sessionId || !sessions.has(sessionId)) {
      res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32001, message: "Session not found" },
        id: null
      });
      return;
    }
    const { transport } = sessions.get(sessionId);
    await transport.handleRequest(req, res);
  } catch (error) {
    console.error("DELETE /mcp error:", error);
    if (!res.headersSent) {
      res.status(500).send(String(error.message || error));
    }
  }
});

const httpServer = http.createServer(app);
httpServer.listen(PORT, HOST, () => {
  console.error(
    `incidents-mcp HTTP listening on http://${HOST}:${PORT}${MCP_PATH} (Streamable HTTP / MCP URL)`
  );
});
