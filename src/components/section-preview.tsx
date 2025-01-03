"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getRegistryItem } from "@/registry";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { CopyButton } from "./copy-button";

interface SectionPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
}

async function formatCode(code: string, language = "tsx") {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(`\`\`\`${language}\n${code}\n\`\`\``);

  return String(file);
}

export function SectionPreview({
  name,
  align = "center",
  className,
  ...props
}: SectionPreviewProps) {
  const [key, setKey] = React.useState(0);
  const [formattedCode, setFormattedCode] = React.useState("");
  const section = getRegistryItem(name);

  React.useEffect(() => {
    if (section?.code) {
      formatCode(section.code).then(setFormattedCode);
    }
  }, [section?.code]);

  if (!section) {
    return null;
  }

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="preview"
          className="relative rounded-md border"
          key={key}
        >
          <div className="preview flex min-h-[400px] w-full justify-center p-0">
            <div className="absolute right-4 top-4 z-10">
              <Button
                onClick={() => setKey((prev) => prev + 1)}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background shadow-md"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <section.component />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="group relative">
            <div className="absolute right-4 top-4 z-20">
              <CopyButton value={section.code} />
            </div>
            <div
              className="overflow-x-auto rounded-lg [&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:overflow-auto"
              dangerouslySetInnerHTML={{ __html: formattedCode }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
