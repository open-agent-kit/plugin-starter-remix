import { useState, useRef, useEffect } from "react";
import {
  useLoaderData,
  Form,
  data,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import {
  CopyIcon,
  ArrowsClockwiseIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import { bridgeContext } from "~/context";
import { type MiddlewareFunction } from "react-router";
import { bridgeMiddleware } from "~/bridgeMiddleware";

export const middleware: MiddlewareFunction[] = [bridgeMiddleware];

// Language options with flag emojis and proper language codes
const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
];

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  const agentId = params.agentId as string;
  const bridge = context.get(bridgeContext)!;
  const formData = await request.formData();
  const text = formData.get("text");
  const language = formData.get("language");

  // Type guards to ensure proper types
  if (!text || typeof text !== "string") {
    return { error: "Text is required" };
  }

  if (!language || typeof language !== "string") {
    return { error: "Language is required" };
  }
  try {
    const translation = await bridge.llm.generateText({
      prompt: `Translate the following text to ${language}: ${text}`,
      systemPrompt:
        "You are a professional translator. Translate the given text accurately while preserving the original meaning, tone, and context. Return only the translated text without any additional explanations or formatting.",
      options: {
        disableTools: true,
      },
      agentId,
    });
    return data(
      {
        translation: translation.text,
        sourceText: text,
        targetLanguage: language,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return { error: "Translation failed. Please try again." };
  }
};

export const loader = async ({ params }) => {
  const agentId = params.agentId as string;
  return {
    agentId,
  };
};

const TranslatorRoute = () => {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const agentId = loaderData?.agentId || "";

  const [sourceText, setSourceText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isTranslating = navigation.state === "submitting";

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit"; // Reset height to recalculate
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [sourceText]);

  const clearAll = () => {
    setSourceText("");
    setSelectedLanguage("");
  };

  const copyToClipboard = async () => {
    if (actionData && "translation" in actionData && actionData.translation) {
      try {
        await navigator.clipboard.writeText(actionData.translation);
        // You could add a toast notification here
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = actionData.translation;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    }
  };

  const selectedLanguageData = LANGUAGES.find(
    (lang) => lang.name === selectedLanguage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl ">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GlobeIcon className="w-6 h-6 text-gray-700" />
            <h1 className="text-2xl font-semibold text-gray-900">Translator</h1>
          </div>
          <p className="text-gray-600">
            Translate text with AI-powered accuracy
          </p>
        </div>

        {/* Main Translator Interface */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-900">
              Translation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form method="post" className="space-y-6">
              <input type="hidden" name="agentId" value={agentId} />

              {/* Source Text Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="sourceText"
                  className="text-sm font-medium text-gray-700"
                >
                  Source text
                </Label>
                <Textarea
                  id="sourceText"
                  name="text"
                  ref={textareaRef}
                  placeholder="Enter text to translate..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="min-h-[120px] border-gray-300 focus:border-gray-400 focus:ring-gray-400 resize-none overflow-hidden"
                  disabled={isTranslating}
                  rows={3}
                />
                <div className="text-xs text-gray-500 text-right">
                  {sourceText.length} characters
                </div>
              </div>

              {/* Language Selector */}
              <div className="space-y-2">
                <Label
                  htmlFor="language"
                  className="text-sm font-medium text-gray-700"
                >
                  Target language
                </Label>
                <Select
                  name="language"
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                  disabled={isTranslating}
                >
                  <SelectTrigger className="w-full border-gray-300 focus:border-gray-400 focus:ring-gray-400">
                    <SelectValue placeholder="Select language...">
                      {selectedLanguageData && (
                        <span className="flex items-center gap-2">
                          <span className="text-sm">
                            {selectedLanguageData.flag}
                          </span>
                          {selectedLanguageData.name}
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language.code} value={language.name}>
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{language.flag}</span>
                          {language.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={
                    !sourceText.trim() || !selectedLanguage || isTranslating
                  }
                  className="flex-1 bg-gray-900 hover:bg-black text-white"
                >
                  {isTranslating ? (
                    <>
                      <ArrowsClockwiseIcon className="w-4 h-4 mr-2 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    "Translate"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={clearAll}
                  disabled={isTranslating}
                  className="border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  Clear
                </Button>
              </div>
            </Form>

            {/* Translation Result */}
            {actionData && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                {"error" in actionData ? (
                  <Card className="border-gray-300 bg-gray-50">
                    <CardContent className="p-4">
                      <p className="text-gray-700 font-medium">
                        {actionData.error}
                      </p>
                    </CardContent>
                  </Card>
                ) : "translation" in actionData && actionData.translation ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-700">
                        Translation
                        {selectedLanguageData && (
                          <span className="ml-2 text-sm">
                            {selectedLanguageData.flag}
                          </span>
                        )}
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 border-gray-300"
                      >
                        <CopyIcon className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>

                    <Card className="border-gray-300 bg-white">
                      <CardContent className="p-4">
                        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                          {actionData.translation}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Supports {LANGUAGES.length} languages</p>
        </div>
      </div>
    </div>
  );
};

export default TranslatorRoute;
