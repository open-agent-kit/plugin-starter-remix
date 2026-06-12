import type { PluginMeta } from "@open-agent-kit/bridge";

export const loader = async () => {
  return {
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
