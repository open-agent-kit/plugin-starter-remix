import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/user/:agentId", "routes/user/index.tsx"),
  route("/admin/:agentId", "routes/admin/index.tsx"),
  // keep these since they are required by OAK
  route("/tools", "routes/tools.ts"),
  route("/meta", "routes/meta.ts"),

  // optional routes for knowledge providers
  route(
    "/knowledge/listDocuments/:agentId",
    "routes/knowledge/listDocuments.ts"
  ),
  route(
    "/knowledge/getDocument/:documentId",
    "routes/knowledge/getDocument.ts"
  ),
] satisfies RouteConfig;
