import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let client: Client | null = null;

export async function getMcpClient() {
  if (client) {
    return client;
  }

  const transport = new StdioClientTransport({
    command: "node",
    args: ["../weather-mcp-server/build/index.js"],
  });

  client = new Client(
    {
      name: "weather-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    },
  );

  await client.connect(transport);

  return client;
}