import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import termsText from "@assets/Pasted-TRANSFORMATION-BUILDER-TERMS-OF-SERVICE-Effective-Date-_1788213379150.txt?raw";

type TermsBlock =
  | { type: "title"; title: string; subtitle: string }
  | { type: "meta"; effectiveDate: string; lastUpdated: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; intro: string; items: string[] };

function parseTerms(text: string): TermsBlock[] {
  const rawBlocks = text
    .replace(/\r/g, "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const blocks: TermsBlock[] = [];
  let activeList: Extract<TermsBlock, { type: "list" }> | null = null;
  const unnumberedHeadings = new Set([
    "AI Is an Assistance Tool",
    "No Guarantee of AI Accuracy",
  ]);

  rawBlocks.forEach((rawBlock, index) => {
    const lines = rawBlock.split("\n").map((line) => line.trim()).filter(Boolean);
    const normalizedText = lines.join(" ");

    if (index === 0 && lines.length >= 2) {
      blocks.push({
        type: "title",
        title: lines[0],
        subtitle: lines.slice(1).join(" "),
      });
      return;
    }

    if (lines[0]?.startsWith("Effective Date:")) {
      blocks.push({
        type: "meta",
        effectiveDate: lines.find((line) => line.startsWith("Effective Date:")) || "",
        lastUpdated: lines.find((line) => line.startsWith("Last Updated:")) || "",
      });
      return;
    }

    if (/^\d+\.\s+/.test(normalizedText) || unnumberedHeadings.has(normalizedText)) {
      blocks.push({ type: "heading", text: normalizedText });
      return;
    }

    if (activeList) {
      activeList.items.push(normalizedText);
      if (!normalizedText.endsWith(";")) {
        activeList = null;
      }
      return;
    }

    if (normalizedText.endsWith(":")) {
      blocks.push({ type: "paragraph", text: normalizedText });
      activeList = { type: "list", intro: normalizedText, items: [] };
      blocks.push(activeList);
      return;
    }

    blocks.push({ type: "paragraph", text: normalizedText });
  });

  return blocks.filter((block) => block.type !== "list" || block.items.length > 0);
}

const termsBlocks = parseTerms(termsText);

export default function TermsOfServicePage() {
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
              Terms of Service
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
            {termsBlocks.map((block, index) => {
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
                return (
                  <section key={index} className="space-y-2">
                    <ul className="list-disc space-y-1.5 pl-6 marker:text-primary">
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              }

              return <p key={index}>{block.text}</p>;
            })}
          </div>
        </article>
      </main>
    </div>
  );
}