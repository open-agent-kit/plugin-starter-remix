import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import toolDefinition from "~/tools.definition";

export const action = async ({ request }: ActionFunctionArgs) => {
  const requestBody = await request.json();
  const headers = Object.fromEntries(request.headers.entries());
  return toolDefinition.handleToolExecution(requestBody as any, headers);
};

export const loader = async () => {
  return toolDefinition.getTools();
};
