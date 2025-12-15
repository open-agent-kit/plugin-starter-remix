import type { PluginMeta } from "@open-agent-kit/bridge";

export const loader = async () => {
  return {
    name: "My OAK Plugin",
    version: "1.0.0",
    description: "Awesome Plugin for OAK",
    author: "Open Agent Kit",
    website: "https://open-agent-kit.com",
    hasAdminChatPage: true,
    hasKnowledgeProvider: true,
    hasUserChatPage: true,
  } satisfies PluginMeta;
};
