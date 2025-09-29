import { Tools } from "@open-agent-kit/bridge";
import z from "zod";

const toolDefinition = new Tools();

const translateSchema = z.object({
  text: z.string(),
  targetLanguage: z.string(),
});

toolDefinition.registerTool({
  identifier: "translate",
  name: "Translate",
  description: "Translate the given text to the target language",
  params: translateSchema,
  execute: async (params: z.infer<typeof translateSchema>) => {
    const { text, targetLanguage } = params;
    return { result: `Translated text: ${text} to ${targetLanguage}` };
  },
});

export default toolDefinition;
