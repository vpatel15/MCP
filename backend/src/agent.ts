// This is the agent orchestration layer. It defines the agent's capabilities and how it should respond to user inputs.
import OpenAI from "openai";
import { getMcpClient } from "./mcpClient.js";

const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama"
});

export async function processMessage(message: string) {
  const client = await getMcpClient();

  const toolsResponse = await client.listTools();

  console.log("Available tools:", toolsResponse.tools.map((tool) => tool.name));

  const tools = toolsResponse.tools.map((tool) => ({
    type: "function" as const,
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.inputSchema,
    },
  }));

  console.log("Tools formatted for OpenAI:", tools);

  const response = await openai.chat.completions.create({
    model: "llama3.1",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    tools,
  });

  console.log("OpenAI response:", response);

  const assistantMessage = response.choices[0].message;

  if (!assistantMessage.tool_calls?.length) {
    return assistantMessage.content;
  }

  const toolCall = assistantMessage.tool_calls[0];

  const toolResult = await client.callTool({
    name: toolCall.function.name,
    arguments: JSON.parse(toolCall.function.arguments),
  });

  const finalResponse = await openai.chat.completions.create({
    model: "llama3.1",
    messages: [
      {
        role: "user",
        content: message,
      },
      assistantMessage,
      {
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult.content),
      },
    ],
  });

  console.log("Final response:", finalResponse.choices[0].message.content);
  return finalResponse.choices[0].message.content;
}