# MCP Weather Application - Development Instructions

This file documents the conventions and requirements for the MCP Weather Application project.

## Project Scope

These instructions apply to:
- **All code files** (TypeScript/JavaScript in src/ directories)
- **All documentation** (README.md, comments, guides)
- **The entire MCP project** (frontend, backend, MCP servers)

---

## 1. TypeScript & Code Quality

### Strictness
- Enable `strict: true` in all `tsconfig.json` files
- No `any` types - use specific types or `unknown` with guards
- All function parameters and return types must be explicitly typed
- Use Zod or similar for runtime validation on API boundaries

### Code Style
- Use ES6+ features (arrow functions, const/let, template literals)
- Prefer functional programming patterns
- Keep functions small and focused (max 50 lines)
- Always include proper error handling with meaningful messages

### Example
```typescript
// ✅ Good
async function getWeather(latitude: number, longitude: number): Promise<WeatherData> {
  if (latitude < -90 || latitude > 90) {
    throw new Error("Invalid latitude: must be between -90 and 90");
  }
  // implementation
}

// ❌ Avoid
async function getWeather(lat: any, lon: any) {
  // implementation
}
```

---

## 2. Component Development (React)

### No External UI Libraries
- **Do NOT use**: Material-UI, Chakra UI, Bootstrap, Tailwind CSS, etc.
- **Do USE**: CSS Modules for all styling
- All components must be custom-built with module.css files

### Component Structure
```
src/
├── components/
│   ├── ChatBox/
│   │   ├── ChatBox.tsx
│   │   └── ChatBox.module.css
│   ├── WeatherDisplay/
│   │   ├── WeatherDisplay.tsx
│   │   └── WeatherDisplay.module.css
```

### Component Guidelines
- One component per file
- Component name matches filename (PascalCase)
- Extract CSS to separate `.module.css` files
- Use React hooks (useState, useEffect, useContext)
- Prop types should be defined with TypeScript interfaces

### Example
```typescript
// WeatherDisplay.tsx
interface WeatherDisplayProps {
  temperature: number;
  condition: string;
  windSpeed: string;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  temperature,
  condition,
  windSpeed,
}) => {
  return (
    <div className={styles.container}>
      <h2>{temperature}°F</h2>
      <p>{condition}</p>
    </div>
  );
};
```

```css
/* WeatherDisplay.module.css */
.container {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
}
```

---

## 3. Documentation Requirements

### README Structure
Every project must have a comprehensive README including:
1. **Title & Description** - Brief project overview
2. **Architecture Diagram** - ASCII or Mermaid diagram showing data flow
3. **Project Structure** - Directory layout with descriptions
4. **How It Works** - Section-by-section explanation
5. **Setup & Installation** - Step-by-step instructions
6. **Technology Stack** - Tools and libraries used
7. **API Endpoints** (if applicable)
8. **Usage Examples** - Real-world usage scenarios
9. **Troubleshooting** - Common issues and solutions
10. **References** - Links to relevant documentation

### Architecture Diagrams
- Use Mermaid or ASCII art diagrams
- Show data flow with clear arrows (↓, →, ↔)
- Include all major components and their relationships
- Label connections with protocol/communication method

### Example
```
┌─────────────────────────────────────────┐
│        React Frontend (Web UI)          │
└────────────────────┬────────────────────┘
                     │ HTTP/WebSocket
                     ↓
┌─────────────────────────────────────────┐
│      Backend Server (Express.js)        │
└────────────────────┬────────────────────┘
                     │ Stdio/IPC
                     ↓
┌─────────────────────────────────────────┐
│         MCP Client & Servers            │
└─────────────────────────────────────────┘
```

### Code Comments
- Comment WHY, not WHAT (code should be self-documenting for the WHAT)
- Use JSDoc for functions and interfaces
- Explain complex algorithms or business logic

```typescript
// ✅ Good - Explains WHY
// Cache forecast data for 30min to reduce API calls to NWS
const cachedForecast = getForecastFromCache(latitude, longitude);

// ❌ Avoid - Just restates code
// Get the forecast from cache
const cachedForecast = getForecastFromCache(latitude, longitude);
```

---

## 4. MCP Server Development

### Tool Registration
- Use descriptive tool names (snake_case)
- Include detailed descriptions for each tool
- Always validate input with Zod schemas
- Document required parameters and return types

### Example
```typescript
server.registerTool(
  "get_forecast",
  {
    description: "Get weather forecast for a location using coordinates",
    inputSchema: {
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    },
  },
  async ({ latitude, longitude }) => {
    // implementation
  }
);
```

### Error Handling
- Always catch errors and return meaningful messages
- Don't expose internal error details to clients
- Log errors server-side for debugging

---

## 5. Git Workflow & Commits

### Commit Messages
Use the format: **`<action>: <description>`**

- **action**: add, update, fix, refactor, docs, test
- **description**: Clear, concise explanation of what and why

### Examples
```bash
# ✅ Good - Describes what AND why
git commit -m "Add weather caching to reduce API calls

- Cache forecast data for 30 minutes
- Improves response time for repeated queries
- Reduces load on NWS API"

# ✅ Good - One-liners for small changes
git commit -m "Update README with Assistant UI usage section"

# ❌ Avoid
git commit -m "fix bug"
git commit -m "update code"
```

### .gitignore
Must exclude:
- `node_modules/` directories (all projects)
- `build/` and `dist/` directories
- `.env*` files (except `.env.example`)
- IDE files: `.idea/`, `.vscode/*` (except `.vscode/mcp.json`)
- OS files: `.DS_Store`, `Thumbs.db`
- Logs: `*.log`, `logs/`

---

## 6. Project Setup Checklist

When starting a new component/feature:
- [ ] Create TypeScript interfaces for data structures
- [ ] Set up proper error handling
- [ ] Write comprehensive comments explaining complex logic
- [ ] Add CSS modules (not inline styles)
- [ ] Add to README if it's a major feature
- [ ] Test error cases and edge conditions
- [ ] Commit with descriptive message

---

## 7. Testing & Validation

### Before Committing
- [ ] Code compiles without errors: `npm run build`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] All types are explicit (no `any`)
- [ ] README is up-to-date if code changed significantly

### Example Validation Commands
```bash
cd backend && npm run build && echo "✅ Backend OK"
cd ../client && npm run build && echo "✅ Client OK"
cd ../weather-mcp-server && npm run build && echo "✅ MCP Server OK"
```

---

## 8. File Naming Conventions

- **React Components**: PascalCase (e.g., `WeatherDisplay.tsx`)
- **CSS Modules**: kebab-case (e.g., `weather-display.module.css`)
- **Utilities/Services**: camelCase (e.g., `weatherService.ts`)
- **Types**: PascalCase (e.g., `WeatherData.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL.ts`)

---

## 9. Documentation Updates

Update README when:
- Adding new tools to MCP servers
- Changing architecture or data flow
- Adding new features or endpoints
- Updating setup instructions
- Fixing known issues

---

## Example Prompts to Test These Instructions

Test this instruction by running these prompts:

1. **"Create a new React component for displaying weather alerts"**
   - Should create PascalCase component with module.css
   - Should include TypeScript interfaces
   - Should avoid external UI libraries

2. **"Add a new MCP tool for getting weather warnings"**
   - Should use snake_case naming
   - Should include Zod validation
   - Should have error handling

3. **"Update the README with troubleshooting guide"**
   - Should follow the documented README structure
   - Should include examples and clear formatting

4. **"Fix TypeScript errors in the backend"**
   - Should enforce strict typing
   - Should avoid `any` types
   - Should use meaningful error messages

---

## Related Customizations

Consider creating:
- `.eslintrc.json` - Code linting rules for consistency
- `.prettierrc` - Code formatting configuration
- `CONTRIBUTING.md` - Guidelines for contributors
- `TESTING.md` - Test strategy and examples

---

**Last Updated**: 25 May 2026
