const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema
} = require("@modelcontextprotocol/sdk/types.js");

const incidents = {
  "INC-101": {
    summary: "Login failures observed for multiple users",
    impact: "Users unable to access the application for ~30 minutes",
    timeline: [
      "10:05 AM - Spike in authentication errors detected",
      "10:12 AM - Incident declared",
      "10:25 AM - Root cause identified (auth token expiry)",
      "10:35 AM - Fix deployed",
      "10:45 AM - Incident resolved"
    ]
  },
  INC101: {
    summary: "Delayed notifications in messaging service",
    impact: "Messages delivered with 5–10 minute delay",
    timeline: [
      "2:10 PM - Customer reports delay",
      "2:18 PM - Queue backlog identified",
      "2:30 PM - Queue workers scaled",
      "2:40 PM - Backlog cleared"
    ]
  },
  "INC-103": {
    summary: "High latency in dashboard loading",
    impact: "Dashboard load time increased to 8–10 seconds",
    timeline: [
      "9:00 AM - Performance alerts triggered",
      "9:05 AM - DB query regression detected",
      "9:20 AM - Query optimized",
      "9:30 AM - Latency normalized"
    ]
  },
  "INC-104": {
    summary: "Email delivery failures",
    impact: "Transactional emails not sent to ~15% users",
    timeline: [
      "6:45 PM - Email bounce rate increased",
      "6:50 PM - Third-party provider outage confirmed",
      "7:20 PM - Provider service restored",
      "7:30 PM - Email retries successful"
    ]
  }
};

const TOOLS = [
  {
    name: "get_incident_details",
    description: "Fetch incident details by incident ID",
    inputSchema: {
      type: "object",
      properties: {
        incidentId: { type: "string" }
      },
      required: ["incidentId"]
    }
  }
];

function createIncidentsMcpServer() {
  const server = new Server(
    {
      name: "incidents-mcp",
      version: "1.0.0"
    },
    {
      capabilities: {
        tools: {}
      }
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name !== "get_incident_details") {
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true
      };
    }

    const incidentId = String(args?.incidentId || "").trim();
    if (!incidentId) {
      return {
        content: [{ type: "text", text: "incidentId is required" }],
        isError: true
      };
    }

    const data = incidents[incidentId];
    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: `No details found for incident ID: ${incidentId}`
          }
        ],
        isError: true
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Incident Summary: ${data.summary}`
        },
        {
          type: "text",
          text: `Impact: ${data.impact}`
        },
        {
          type: "text",
          text: `Timeline:\n- ${data.timeline.join("\n- ")}`
        }
      ]
    };
  });

  return server;
}

module.exports = { createIncidentsMcpServer };
