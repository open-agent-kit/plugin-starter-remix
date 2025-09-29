import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import toolDefinition from "~/tools.definition";

export const action = async ({ request }: ActionFunctionArgs) => {
  const requestBody = await request.json();
  return toolDefinition.handleToolExecution(requestBody as any);
};

export const loader = async () => {
  return toolDefinition.getTools();
};
