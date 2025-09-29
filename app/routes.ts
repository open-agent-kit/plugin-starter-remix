import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/admin/:agentId", "routes/admin/index.tsx"),
  route("/tools", "routes/tools.ts"),
] satisfies RouteConfig;
