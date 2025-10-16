import { Tools, type ToolExecuteParams } from "@open-agent-kit/bridge";
import z from "zod";

const toolDefinition = new Tools();

const translateSchema = z.object({
  text: z.string(),
  targetLanguage: z.string(),
});

export type TranslateParams = z.infer<typeof translateSchema>;
export type TranslateResult = {
  result: string;
};

toolDefinition.registerTool({
  identifier: "translate",
  name: "Translate",
  description: "Translate the given text to the target language",
  params: translateSchema,
  // the name must match the name from vite.federated.ts
  federatedToolComponentName: "translatorTool",
  execute: async (params: ToolExecuteParams<TranslateParams>) => {
    const { text, targetLanguage } = params.input;
    return {
      result: `Translated text: ${text} to ${targetLanguage}` as unknown,
    };
  },
});

export default toolDefinition;
