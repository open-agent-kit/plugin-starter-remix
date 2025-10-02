# OAK Plugin v2 Starter

A microservice plugin template for the Open Agent Kit (OAK) ecosystem. This plugin communicates with the OAK core system and provides a foundation for building custom tools and interfaces.

## Architecture Overview

This plugin is built using React Router v7 and serves as a federated microservice that integrates with the OAK core. It exposes both API endpoints and federated UI components that can be consumed by the main OAK application.

## Project Structure

```
app/
├── routes/                    # API endpoints and route handlers
│   ├── admin/                # Admin interface routes
│   ├── user/                 # User interface routes
│   ├── knowledge/            # Knowledge provider routes (optional)
│   ├── tools.ts              # Tool execution endpoint (required)
│   └── meta.ts               # Plugin metadata endpoint (required)
├── components/
│   ├── tools/                # Federated tool components
│   └── ui/                   # Reusable UI components
├── tools.definition.ts       # Tool definitions and schemas
├── context.ts               # Bridge context for OAK integration
└── bridgeMiddleware.ts      # Middleware for OAK communication
```

## Exposed Routes

### Required Routes

These routes are mandatory for OAK integration:

#### `GET /tools`

Returns the list of available tools defined in this plugin.

- **Handler**: `app/routes/tools.ts`
- **Response**: Tool definitions with schemas and metadata

#### `POST /tools`

Executes a specific tool with provided parameters.

- **Handler**: `app/routes/tools.ts`
- **Body**: Tool execution request with identifier and parameters

#### `GET /meta`

Returns plugin metadata and information.

- **Handler**: `app/routes/meta.ts`
- **Response**: Plugin name, version, description, author, website

### User Interface Routes

#### `GET /user/:agentId`

Main user interface for the plugin.

- **Handler**: `app/routes/user/index.tsx`
- **Purpose**: Primary user interaction interface

#### `GET /admin/:agentId`

Administrative interface for plugin configuration.

- **Handler**: `app/routes/admin/index.tsx`
- **Purpose**: Plugin administration and settings

### Optional Knowledge Provider Routes

If your plugin provides knowledge/document capabilities:

#### `GET /knowledge/listDocuments/:agentId`

Lists available documents for an agent.

- **Handler**: `app/routes/knowledge/listDocuments.ts`
- **Response**: Array of document metadata

#### `GET /knowledge/getDocument/:documentId`

Retrieves a specific document by ID.

- **Handler**: `app/routes/knowledge/getDocument.ts`
- **Response**: Document content and metadata

## Adding New Tools

### 1. Define Your Tool

Edit `app/tools.definition.ts` to register new tools:

```typescript
import { Tools } from "@open-agent-kit/bridge";
import z from "zod";

const toolDefinition = new Tools();

// Define parameter schema
const myToolSchema = z.object({
  input: z.string(),
  options: z
    .object({
      setting1: z.boolean().optional(),
      setting2: z.number().optional(),
    })
    .optional(),
});

// Register the tool
toolDefinition.registerTool({
  identifier: "myTool",
  name: "My Custom Tool",
  description: "Description of what this tool does",
  params: myToolSchema,
  federatedToolComponentName: "./myToolComponent", // Optional UI component
  execute: async (params) => {
    // Tool implementation
    return { result: "Tool output" };
  },
});

export default toolDefinition;
```

### 2. Create Tool UI Component (Optional)

If your tool needs a custom UI, create a federated component in `app/components/tools/`:

```typescript
// app/components/tools/myToolComponent.tsx
import type { MyToolParams, MyToolResult } from "~/tools.definition";

const MyToolComponent = ({
  input,
  output,
}: {
  input: MyToolParams;
  output?: MyToolResult;
}) => {
  return (
    <div>
      <div>Input: {JSON.stringify(input)}</div>
      <div>Output: {output ? JSON.stringify(output) : "Processing..."}</div>
    </div>
  );
};

export default MyToolComponent;
```

### 3. Configure Federated Export

Add your component to the federation configuration in `vite.federated.ts`:

```typescript
// vite.federated.ts
export default defineConfig({
  plugins: [
    federation({
      filename: "remoteEntry.js",
      name: "remoteOAKPlugin",
      exposes: {
        "./translatorTool": "./app/components/tools/translatorTool.tsx",
        "./myToolComponent": "./app/components/tools/myToolComponent.tsx", // Add your component
      },
      shared: ["react", "react-dom"],
    }),
  ],
  // ... rest of config
});
```

The `federatedToolComponentName` in your tool definition must match the key in the `exposes` object.

## Adding New Routes

### 1. Define the Route

Add your route to `app/routes.ts`:

```typescript
export default [
  // ... existing routes
  route("/my-endpoint/:param", "routes/myEndpoint.ts"),
] satisfies RouteConfig;
```

### 2. Create Route Handler

Create the handler file:

```typescript
// app/routes/myEndpoint.ts
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  // Handle GET requests
  return { data: "response" };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  // Handle POST/PUT/DELETE requests
  const body = await request.json();
  return { success: true };
};
```

## Bridge Integration

### Middleware Setup

Use the bridge middleware for OAK integration:

```typescript
import type { MiddlewareFunction } from "react-router";
import { bridgeMiddleware } from "~/bridgeMiddleware";

export const middleware: MiddlewareFunction[] = [bridgeMiddleware];
```

### Context Usage

Access OAK bridge context in components:

```typescript
import { bridgeContext } from "~/context";

// In your component
const bridge = bridgeContext.use();
// Use bridge methods for OAK communication
```

## Development

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Starts the development server on port 8001.

### Build

```bash
npm run build
```

Builds both the main application and federated components.

### Type Checking

```bash
npm run typecheck
```

## Deployment

The plugin can be deployed as a standalone microservice. The build output includes:

- `build/server/` - Server-side application
- `build/client/` - Client-side assets
- `public/assets/` - Federated component assets

## Key Dependencies

- `@open-agent-kit/bridge` - OAK integration bridge
- `react-router` - Routing and server-side rendering
- `zod` - Schema validation for tool parameters
- `@originjs/vite-plugin-federation` - Module federation for UI components

## Best Practices

1. **Tool Definitions**: Always use Zod schemas for parameter validation
2. **Error Handling**: Implement proper error handling in tool execution
3. **Type Safety**: Export TypeScript types for tool parameters and results
4. **UI Components**: Keep federated components lightweight and self-contained
5. **Bridge Integration**: Use the provided middleware for all routes that need OAK integration

## Troubleshooting

- Ensure all required routes (`/tools`, `/meta`) are implemented
- Check that tool identifiers are unique across your plugin
- Verify federated component exports match the `federatedToolComponentName`
- Use the bridge context for proper OAK communication
