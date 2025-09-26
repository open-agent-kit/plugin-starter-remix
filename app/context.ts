import { createContext } from "react-router";
import type { createBridge } from "@open-agent-kit/bridge";

export const bridgeContext = createContext<ReturnType<
  typeof createBridge
> | null>(null);
