import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const agentId = params.agentId as string;
  return {
    documents: [
      {
        id: "1",
        name: "Document 1",
        lastUpdated: "2021-01-01",
      },
    ],
  };
};
