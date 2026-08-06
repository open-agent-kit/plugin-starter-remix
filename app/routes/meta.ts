import type { PluginMeta } from "@open-agent-kit/bridge";

// GET /meta — SAALT reads this to register the plugin.
//
// This starter is an AGENT-BOUND app: it renders inside an Agent's chat/admin
// (routes /user/:agentId and /admin/:agentId) and its bridge is scoped to that
// Agent (see bridgeMiddleware.ts).
//
// To turn it into a STANDALONE (agent-less) full-page app instead:
//   1. add `standalone: true` and a stable `id` below,
//   2. drop the `:agentId` route params in routes.ts and serve under /app/<id>/…,
//   3. build the bridge WITHOUT an agentId in bridgeMiddleware.ts.
// See https://docs.saalt.ai/apps/standalone.
export const loader = async () => {
  return {
    // id: "my-saalt-plugin",  // REQUIRED for a standalone app: stable, kebab-case
    // standalone: true,       // uncomment to make this an agent-less, full-page app
    name: "My SAALT Plugin",
    version: "1.0.0",
    description: "Awesome Plugin for SAALT",
    author: "SAALT",
    website: "https://saalt.ai",
    hasAdminChatPage: true,
    hasKnowledgeProvider: true,
    hasUserChatPage: true,
  } satisfies PluginMeta;
};
