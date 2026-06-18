import { createContext } from "react-router";
import type { OAKBridge } from "@open-agent-kit/bridge";

export const bridgeContext = createContext<OAKBridge | null>(null);
export const userIdContext = createContext<string | null>(null);
export const userNameContext = createContext<string | null>(null);
