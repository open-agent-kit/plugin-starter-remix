import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("health", "health.tsx"),
  // Agent-bound UI routes — the `:agentId` segment scopes the bridge to one Agent.
  // For a STANDALONE app, drop `:agentId` (e.g. route("/user", …)) and serve the
  // app under its path-based base /app/<id>/…. See https://docs.saalt.ai/apps/standalone.
  route("/user/:agentId", "routes/user/index.tsx"),
  route("/admin/:agentId", "routes/admin/index.tsx"),
  // keep these since they are required by SAALT
  route("/tools", "routes/tools.ts"),
  route("/meta", "routes/meta.ts"),

  // optional routes for knowledge providers
  route(
    "/knowledge/listDocuments/:agentId",
    "routes/knowledge/listDocuments.ts"
  ),
  route(
    "/knowledge/getDocument/:agentId/:documentId",
    "routes/knowledge/getDocument.ts"
  ),
] satisfies RouteConfig;
