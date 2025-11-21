import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const documentId = params.documentId as string;
  const agentId = params.agentId as string;
  if (!documentId) {
    return new Response("Document ID is required", { status: 400 });
  }
  // TODO: Implement
  return {
    document: {
      id: documentId,
      name: "Document 1",
      content: "Content of document 1",
      lastUpdated: "2021-01-01",
    },
  };
};
