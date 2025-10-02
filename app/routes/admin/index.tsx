import type { MiddlewareFunction } from "react-router";
import { bridgeMiddleware } from "~/bridgeMiddleware";

export const middleware: MiddlewareFunction[] = [bridgeMiddleware];

export default function Admin() {
  return <div>Admin Page for Translator Tool</div>;
}
