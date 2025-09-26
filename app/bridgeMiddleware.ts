import { createBridge } from "@open-agent-kit/bridge";
import { type MiddlewareFunction } from "react-router";
import { bridgeContext } from "./context";

export const bridgeMiddleware: MiddlewareFunction = async (
  { request, context },
  next
) => {
  const token = request.headers.get("oaktoken");
  if (!token) {
    throw new Error(
      "No token provided. Plugins need to be proxied through the OAK server to receive a token."
    );
  }
  const bridge = createBridge({
    token: token,
    serverUrl: process.env.OAK_SERVER_URL || "https://oak.localhost",
  });
  context.set(bridgeContext, bridge);
  return next();
};
