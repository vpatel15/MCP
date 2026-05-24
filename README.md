# Weather Chatbot AI Application 

A full-stack application demonstrating the Model Context Protocol (MCP) architecture with a weather service powered by the National Weather Service API.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                           │
│                    (Web UI)                                 │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/WebSocket
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend Server                           │
│              (Express.js / Node.js)                         │
│         - Agent Integration                                │
│         - Request Processing                               │
│         - MCP Client Management                            │
└────────────────────────┬────────────────────────────────────┘
                         │ Stdio/IPC
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              MCP Client                                     │
│         (Model Context Protocol)                           │
│         - Tool Discovery                                   │
│         - Tool Invocation                                  │
└────────────────────────┬────────────────────────────────────┘
                         │ Stdio
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              MCP Servers                                    │
│    ┌────────────────────────────────────┐                  │
│    │   Weather MCP Server               │                  │
│    │  - get_alerts(state)               │                  │
│    │  - get_forecast(lat, lon)          │                  │
│    │  - NWS API Integration             │                  │
│    └────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
MCP/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── App.tsx             # Main React component
│   │   ├── assistant.ts        # Assistant logic
│   │   ├── main.tsx
│   │   └── App.module.css
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                     # Node.js Backend Server
│   ├── src/
│   │   ├── index.ts            # Server entry point
│   │   ├── agent.ts            # Agent orchestration
│   │   └── mcpClient.ts        # MCP Client integration
│   ├── package.json
│   └── tsconfig.json
│
├── weather-mcp-server/         # Weather MCP Server
│   ├── src/
│   │   ├── index.ts            # MCP server setup
│   │   ├── service.ts          # NWS API service
│   │   ├── types.ts            # TypeScript types
│   │   └── utils.ts            # Utility functions
│   ├── build/                  # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
│
├── .vscode/
│   └── mcp.json                # MCP server configuration
│
├── .gitignore
└── README.md
```

## How It Works

### 1. **React Frontend** (`client/`)
   - User-facing web interface built with React and Vite
   - Communicates with the backend via HTTP/WebSocket
   - Displays weather information and user interactions
   - **Tech Stack**: React, TypeScript, Vite, CSS Modules

### 2. **Backend Server** (`backend/`)
   - Node.js express server that orchestrates the MCP ecosystem
   - Handles HTTP requests from the frontend
   - Manages the MCP Client connection
   - Invokes tools through the MCP Client
   - **Key Components**:
     - `index.ts`: Server setup and route handlers
     - `agent.ts`: AI agent orchestration logic
     - `mcpClient.ts`: MCP Client initialization and management
   - **Tech Stack**: Node.js, TypeScript, Express

### 3. **MCP Client** (Backend → Server Communication)
   - Implements the Model Context Protocol client
   - Discovers available tools from MCP servers
   - Manages bidirectional communication via stdio
   - Routes tool invocation requests to appropriate MCP servers
   - Handles responses and error management

### 4. **MCP Servers**

#### Weather MCP Server (`weather-mcp-server/`)
A specialized MCP server providing weather capabilities through the National Weather Service API.

**Available Tools:**
- **`get_alerts`**
  - Input: `state` (2-letter state code, e.g., CA, NY)
  - Returns: Active weather alerts for the specified state
  - Example: Get severe weather warnings and advisories

- **`get_forecast`**
  - Input: `latitude` and `longitude` (US locations only)
  - Returns: Weather forecast including temperature, wind speed, and conditions
  - Example: Get 7-day forecast for Sacramento, CA (38.5816, -121.4944)

**Implementation Details:**
- Uses the National Weather Service API (`https://api.weather.gov`)
- Grid point lookup for coordinates → forecast URL mapping
- Structured response formatting for easy consumption
- **Tech Stack**: Node.js, TypeScript, Zod for schema validation

### 5. **Ollama** (Optional Local LLM)
   - Local language model for on-device AI processing
   - Can be used by the agent to reason about tool usage
   - Runs locally without external API dependencies
   - **Status**: Optional component for enhanced reasoning

## Data Flow Example: Get Weather Forecast

```
User Interface
      ↓
[User enters: "Get forecast for Sacramento"]
      ↓
React Component
      ↓
HTTP POST → /api/forecast
      ↓
Backend Server
      ↓
Agent Processing
      ↓
MCP Client
      ↓
Tool Discovery: get_forecast(lat, lon)
      ↓
Weather MCP Server (via stdio)
      ↓
NWS API Call: /points/38.5816,-121.4944
      ↓
NWS API Call: /gridpoints/...forecast
      ↓
Formatted Response → Backend
      ↓
HTTP Response → React
      ↓
Display Weather Information
```

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm
- Ollama (optional, for local LLM)

### Installation Steps

1. **Install Dependencies**
   ```bash
   # Root installation
   npm install
   
   # Or individually:
   cd client && npm install
   cd ../backend && npm install
   cd ../weather-mcp-server && npm install
   ```

2. **Build MCP Server**
   ```bash
   cd weather-mcp-server
   npm run build
   ```

3. **Configure MCP** (`.vscode/mcp.json`)
   ```json
   {
     "servers": {
       "weather": {
         "command": "node",
         "args": ["/path/to/weather-mcp-server/build/index.js"]
       }
     }
   }
   ```

### Running the Application

**Terminal 1: Backend Server**
```bash
cd backend
npm run dev
# Runs on localhost:3000 (or configured port)
```

**Terminal 2: React Frontend**
```bash
cd client
npm run dev
# Runs on localhost:5173 (Vite default)
```

**Terminal 3: Ollama (Optional)**
```bash
ollama serve
# Runs on localhost:11434
```

## Technology Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **CSS Modules** - Component styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework (typical setup)
- **TypeScript** - Type safety
- **MCP SDK** - Protocol implementation

### MCP Servers
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **Axios/Fetch** - HTTP requests

### Services
- **National Weather Service API** - Weather data
- **Ollama** - Local LLM (optional)

## MCP Protocol Overview

The Model Context Protocol (MCP) is a standardized protocol for:
1. **Tool Discovery** - Servers advertise available tools
2. **Tool Execution** - Clients request tool execution
3. **Bidirectional Communication** - Over stdio or HTTP

### Tool Registration Example (Weather Server)
```typescript
server.registerTool(
  "get_forecast",
  {
    description: "Get weather forecast for a location",
    inputSchema: {
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    },
  },
  async ({ latitude, longitude }) => {
    // Implementation
  }
);
```

## API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tools` | List available tools |
| POST | `/api/forecast` | Get weather forecast |
| POST | `/api/alerts` | Get weather alerts |
| POST | `/api/chat` | Agent chat endpoint |

## Environment Variables

### Backend (`.env`)
```
PORT=3000
OLLAMA_URL=http://localhost:11434
MCP_CONFIG_PATH=./.vscode/mcp.json
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:3000
```

## Development Guidelines

### Code Organization
- **src/** - TypeScript source code
- **build/** - Compiled JavaScript output
- **types/** - Shared TypeScript interfaces

### Building
```bash
npm run build      # Compile TypeScript
npm run dev        # Development with watch mode
npm run start      # Production server
```

### Debugging
1. **Backend**: Use Node.js debugger or VS Code debugger
2. **Frontend**: Browser DevTools
3. **MCP Servers**: Check stderr logs (they run on stdio)

## Common Issues & Solutions

### Issue: Backend can't find MCP Server
**Solution**: Verify path in `.vscode/mcp.json` matches actual build location

### Issue: Weather API returns 404
**Solution**: Only US coordinates are supported by NWS API. Verify lat/lon values.

### Issue: MCP Client timeout
**Solution**: Ensure MCP server process is running and responding to initialization

## Future Enhancements

- [ ] Add more MCP servers (news, stocks, etc.)
- [ ] Implement persistent chat history
- [ ] Add user authentication
- [ ] Deploy to cloud platform
- [ ] Add WebSocket support for real-time updates
- [ ] Implement tool caching for better performance

## References

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
- [Anthropic MCP SDK](https://github.com/anthropics/model-context-protocol)
- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
