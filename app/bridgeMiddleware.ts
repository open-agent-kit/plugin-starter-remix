import { createBridge } from "@open-agent-kit/bridge";
import { type MiddlewareFunction } from "react-router";
import { jwtDecode } from "jwt-decode";
import { bridgeContext, userIdContext, userNameContext } from "./context";

export const bridgeMiddleware: MiddlewareFunction = async (
  { request, context },
  next
) => {
  const token = request.headers.get("oak_session_token");
  const serverUrl = request.headers.get("oak_server_url");

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

  const bridge = createBridge({
    token: token,
    serverUrl:
      serverUrl || process.env.OAK_SERVER_URL || "https://oak.localhost",
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
