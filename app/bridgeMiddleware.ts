import { createBridge } from "@open-agent-kit/bridge";
import { type MiddlewareFunction } from "react-router";
import { jwtDecode } from "jwt-decode";
import { bridgeContext, userIdContext, userNameContext } from "./context";

export const bridgeMiddleware: MiddlewareFunction = async (
  { request, params, context },
  next
) => {
  const token = request.headers.get("saalt_session_token");
  const serverUrl = request.headers.get("saalt_server_url") as string;

  if (!token) {
    throw new Error(
      "No token provided. Plugins need to be proxied through the SAALT server to receive a token."
    );
  }

  let userId: string | null = null;
  try {
    const decodedToken: { userId?: string } = jwtDecode(token);
    userId = decodedToken?.userId ?? null;
  } catch (error) {
    console.warn("Failed to decode token", error);
  }

  // Bind-once bridge (@open-agent-kit/bridge >= 1.2.0): the agent scope is fixed
  // at construction, so createBridge receives the agentId here and downstream
  // data.config.* / data.pluginData.* / knowledge.* calls no longer take one.
  // This starter is agent-scoped, so agentId comes from the :agentId route param.
  // Omit agentId to build a standalone (agent-less) bridge instead.
  // Note: llm.generateText / generateObject / generateImage still take agentId
  // per call (Core requires it on an agent-scoped token) — see routes/user/index.tsx.
  const agentId = params.agentId ?? undefined;

  const bridge = createBridge({
    token,
    serverUrl,
    agentId,
  });

  let userName: string | null = null;
  try {
    const me = await bridge.user.me();
    userName = (me && "name" in me && me?.name) || userId;
  } catch (error) {
    console.warn("Failed to fetch current user profile", error);
  }

  context.set(bridgeContext, bridge);
  context.set(userIdContext, userId);
  context.set(userNameContext, userName);
  return next();
};
