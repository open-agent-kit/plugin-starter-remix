import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/admin/:agentId", "routes/admin/index.tsx"),
] satisfies RouteConfig;
