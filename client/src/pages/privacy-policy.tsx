import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import privacyPolicyText from "@assets/Pasted--TRANSFORMATION-BUILDER-PRIVACY-POLICY-Effective-Date-A_1788217580539.txt?raw";

type PrivacyBlock =
  | { type: "title"; title: string; subtitle: string }
  | { type: "meta"; effectiveDate: string; lastUpdated: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "list"; ordered: boolean; items: string[] };

function cleanMarkdown(value: string) {
  return value
    .replace(/^#{1,6}\s+/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .trim();
}

function parsePrivacyPolicy(text: string): PrivacyBlock[] {
  const rawBlocks = text
    .replace(/\r/g, "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const blocks: PrivacyBlock[] = [];
  const headerLines = rawBlocks.shift()?.split("\n").map((line) => line.trim()).filter(Boolean) || [];
  const effectiveDate = headerLines.find((line) => line.includes("Effective Date:"));
  const lastUpdated = headerLines.find((line) => line.includes("Last Updated:"));

  if (headerLines.length >= 2) {
    blocks.push({
      type: "title",
      title: cleanMarkdown(headerLines[0]),
      subtitle: cleanMarkdown(headerLines[1]),
    });
  }

  if (effectiveDate || lastUpdated) {
    blocks.push({
      type: "meta",
      effectiveDate: cleanMarkdown(effectiveDate || ""),
      lastUpdated: cleanMarkdown(lastUpdated || ""),
    });
  }

  rawBlocks.forEach((rawBlock) => {
    const lines = rawBlock.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0 || lines.every((line) => line === "---")) {
      return;
    }

    const firstLine = lines[0];
    if (/^#{1,6}\s+/.test(firstLine)) {
      blocks.push({ type: "heading", text: cleanMarkdown(firstLine) });
      return;
    }

    const isUnorderedList = lines.every((line) => /^\*\s+/.test(line));
    const isOrderedList = lines.every((line) => /^\d+\.\s+/.test(line));
    if (isUnorderedList || isOrderedList) {
      blocks.push({
        type: "list",
        ordered: isOrderedList,
        items: lines.map((line) => cleanMarkdown(line.replace(/^(?:\*|\d+\.)\s+/, ""))),
      });
      return;
    }

    blocks.push({ type: "paragraph", lines });
  });

  return blocks;
}

function renderInlineMarkdown(text: string, keyPrefix: string) {
  const pieces = text.split(/(\*\*.*?\*\*)/g);
  return pieces.map((piece, index) => {
    if (piece.startsWith("**") && piece.endsWith("**")) {
      return <strong key={`${keyPrefix}-${index}`}>{piece.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-${index}`}>{piece}</span>;
  });
}

const privacyBlocks = parsePrivacyPolicy(privacyPolicyText);

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background step-page-background">
      <Navbar />

      <main className="container mx-auto max-w-5xl px-4 pt-28 pb-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Transformation Builder
            </p>
            <h1 className="mt-2 text-4xl font-heading font-bold text-foreground md:text-5xl">
              Privacy Policy
            </h1>
          </div>
          <Link href="/login">
            <Button variant="outline" className="shrink-0 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Button>
          </Link>
        </div>

        <article className="rounded-2xl border border-border/60 bg-white/90 p-6 shadow-xl backdrop-blur-sm md:p-10">
          <div className="space-y-6 text-base leading-7 text-foreground/85">
            {privacyBlocks.map((block, index) => {
              if (block.type === "title") {
                return (
                  <div key={index} className="border-b border-border pb-6">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      {block.title}
                    </h2>
                    <p className="mt-1 text-lg font-semibold text-primary">{block.subtitle}</p>
                  </div>
                );
              }

              if (block.type === "meta") {
                return (
                  <div
                    key={index}
                    className="grid gap-2 rounded-lg bg-primary/5 p-4 text-sm font-medium text-foreground sm:grid-cols-2"
                  >
                    <p>{block.effectiveDate}</p>
                    <p>{block.lastUpdated}</p>
                  </div>
                );
              }

              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="border-b border-primary/20 pb-2 pt-4 text-xl font-heading font-bold text-primary md:text-2xl"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "list") {
                const ListTag = block.ordered ? "ol" : "ul";
                return (
                  <ListTag
                    key={index}
                    className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-1.5 pl-6 marker:text-primary`}
                  >
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="pl-1">
                        {renderInlineMarkdown(item, `${index}-${itemIndex}`)}
                      </li>
                    ))}
                  </ListTag>
                );
              }

              return (
                <p key={index}>
                  {block.lines.map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {renderInlineMarkdown(line, `${index}-${lineIndex}`)}
                      {lineIndex < block.lines.length - 1 && " "}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>
        </article>
      </main>
    </div>
  );
}