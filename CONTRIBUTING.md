# Contributing to MCP Weather Application

Thank you for your interest in contributing! This guide will help you understand our development process and how to get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Testing](#testing)

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Report inappropriate behavior to the maintainers

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher
- Git
- A code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/MCP.git
   cd MCP
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/vpatel15/MCP.git
   ```

## Development Setup

### Install Dependencies

```bash
# Install root dependencies
npm install

# Install project-specific dependencies
cd client && npm install
cd ../backend && npm install
cd ../weather-mcp-server && npm install
```

### Build MCP Server

```bash
cd weather-mcp-server
npm run build
```

### Start Development Servers

In separate terminals:

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

**Terminal 3 - Ollama (Optional)**
```bash
ollama serve
```

Access the app at `http://localhost:5173`

## Making Changes

### Create a Feature Branch

1. Sync with upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Create a descriptive branch:
   ```bash
   git checkout -b feature/add-location-search
   # or
   git checkout -b fix/weather-alert-parsing
   ```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `chore/` - Build, dependencies, tooling

### Follow Development Instructions

Refer to [`.github/copilot-instructions.md`](.github/copilot-instructions.md) for:
- TypeScript strictness requirements
- Component development guidelines
- CSS Modules usage
- Code formatting standards
- Documentation requirements

## Commit Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code logic (formatting, semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc.

### Scope

Optional but recommended. Examples: `backend`, `client`, `mcp-server`, `docs`

### Subject

- Use imperative, present tense ("add feature" not "added feature")
- Don't capitalize first letter
- No period (.) at the end
- Max 50 characters

### Body

Optional. Explain what and why, not how:
- Use imperative, present tense
- Include motivation for the change
- Contrast with previous behavior
- Wrap at 72 characters

### Example

```bash
git commit -m "feat(client): add weather alert notifications

- Display toast notifications for active weather alerts
- Auto-dismiss alerts after 10 seconds
- Show alert details on click
- Reduces API calls by caching alert state for 5 minutes

Fixes #123"
```

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and validation**
   ```bash
   cd backend && npm run build && npm run lint
   cd ../client && npm run build && npm run lint
   cd ../weather-mcp-server && npm run build
   ```

3. **Check for secrets**
   - No API keys, tokens, or credentials in code

4. **Update documentation**
   - Update README.md if behavior changed
   - Add comments for complex logic
   - Document new tools or APIs

### Create PR

1. Push to your fork:
   ```bash
   git push origin feature/add-location-search
   ```

2. Create a Pull Request on GitHub with:
   - Clear title describing the change
   - Description of what changed and why
   - Reference related issues with "Fixes #123"
   - Screenshots if UI changes

### PR Description Template

```markdown
## Description
Brief description of the changes.

## Related Issues
Fixes #(issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how to test these changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass locally
```

## Code Standards

### TypeScript

- Enable strict mode: `"strict": true`
- No `any` types (use `unknown` with guards)
- Export types explicitly
- Use interfaces for object shapes

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // implementation
}

// ❌ Avoid
function getUser(id: any): any {
  // implementation
}
```

### React Components

- Custom components only (no Material-UI, Bootstrap, Tailwind)
- Use CSS Modules for styling
- Props should be typed with interfaces
- Use functional components and hooks

```typescript
// ✅ Good
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return <div className={styles.card}>{children}</div>;
};

// ❌ Avoid
export function Card(props: any) {
  return <div style={{ border: "1px solid #ccc" }}>{props.children}</div>;
}
```

### Naming Conventions

- **Components**: PascalCase (`WeatherDisplay.tsx`)
- **Functions/Variables**: camelCase (`getWeather`, `userData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`.weather-card`)
- **Files**: Match component/function name

### Documentation

- Comment WHY, not WHAT
- Use JSDoc for functions and interfaces
- Keep comments up-to-date with code changes

```typescript
// ✅ Good - Explains intent
// Cache results for 5 minutes to reduce API rate limit hits
const cacheKey = `forecast_${lat}_${lon}`;

// ❌ Avoid - Restates code
// Get the cache key
const cacheKey = `forecast_${lat}_${lon}`;
```

## Testing

### Unit Tests

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Manual Testing

1. Test in different browsers (Chrome, Firefox, Safari)
2. Test on mobile devices or use DevTools device emulation
3. Verify all error cases are handled
4. Check console for warnings

### Testing Checklist

- [ ] Feature works as intended
- [ ] Error cases are handled gracefully
- [ ] No TypeScript errors
- [ ] No console warnings/errors
- [ ] Responsive design (if applicable)
- [ ] Performance is acceptable

## Getting Help

- **Questions**: Open a Discussion on GitHub
- **Bugs**: Open an Issue with reproduction steps
- **Security Issues**: Email maintainers privately
- **Documentation**: Check the [README.md](README.md)

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- CONTRIBUTORS.md file (if created)
- Release notes for significant contributions

## Additional Resources

- [Development Instructions](.github/copilot-instructions.md)
- [README.md](README.md) - Project overview
- [MCP Documentation](https://modelcontextprotocol.io/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Thank you for contributing! 🎉
