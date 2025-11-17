import { useEffect, useState, ReactNode } from "react";

interface ParsedContent {
  type: string;
  content: ReactNode;
  key: string;
}

interface LegalContentParserProps {
  filePath: string;
}

const LegalContentParser = ({ filePath }: LegalContentParserProps) => {
  const [parsedContent, setParsedContent] = useState<ParsedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndParse = async () => {
      try {
        setLoading(true);
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}`);
        }
        const text = await response.text();
        const parsed = parseContent(text);
        setParsedContent(parsed);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchAndParse();
  }, [filePath]);

  const parseInlineFormatting = (text: string): ReactNode => {
    // Process inline formatting: bold, italic, underline, strikethrough, code, links
    const parts: ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Links [text](url)
      const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={`link-${key++}`}
            href={linkMatch[2]}
            className="text-primary hover:text-accent transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }

      // Code blocks ```code```
      const codeBlockMatch = remaining.match(/^```([^`]+)```/);
      if (codeBlockMatch) {
        parts.push(
          <code
            key={`code-block-${key++}`}
            className="bg-muted text-accent px-2 py-1 rounded font-mono text-sm"
          >
            {codeBlockMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeBlockMatch[0].length);
        continue;
      }

      // Inline code `code`
      const codeMatch = remaining.match(/^`([^`]+)`/);
      if (codeMatch) {
        parts.push(
          <code
            key={`code-${key++}`}
            className="bg-muted text-accent px-1.5 py-0.5 rounded font-mono text-sm"
          >
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }

      // Bold **text**
      const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
      if (boldMatch) {
        parts.push(
          <strong key={`bold-${key++}`} className="font-semibold text-text-secondary">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Underline __text__
      const underlineMatch = remaining.match(/^__([^_]+)__/);
      if (underlineMatch) {
        parts.push(
          <span key={`underline-${key++}`} className="underline">
            {underlineMatch[1]}
          </span>
        );
        remaining = remaining.slice(underlineMatch[0].length);
        continue;
      }

      // Strikethrough ~~text~~
      const strikeMatch = remaining.match(/^~~([^~]+)~~/);
      if (strikeMatch) {
        parts.push(
          <span key={`strike-${key++}`} className="line-through text-text-subtle">
            {strikeMatch[1]}
          </span>
        );
        remaining = remaining.slice(strikeMatch[0].length);
        continue;
      }

      // Italic *text* (must come after bold check)
      const italicMatch = remaining.match(/^\*([^*]+)\*/);
      if (italicMatch) {
        parts.push(
          <em key={`italic-${key++}`} className="italic">
            {italicMatch[1]}
          </em>
        );
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // Regular character
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    }

    return parts;
  };

  const parseContent = (text: string): ParsedContent[] => {
    const lines = text.split("\n");
    const content: ParsedContent[] = [];
    let listItems: ReactNode[] = [];
    let listType: "bullet" | "numbered" | null = null;
    let listKey = 0;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        if (listType === "bullet") {
          content.push({
            type: "bullet-list",
            content: (
              <ul className="list-none space-y-2 ml-4">
                {listItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ),
            key: `list-${listKey++}`,
          });
        } else {
          content.push({
            type: "numbered-list",
            content: (
              <ol className="list-decimal ml-6 space-y-2">
                {listItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            ),
            key: `list-${listKey++}`,
          });
        }
        listItems = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Empty line
      if (!trimmed) {
        flushList();
        return;
      }

      // Horizontal divider ---
      if (trimmed === "---") {
        flushList();
        content.push({
          type: "divider",
          content: <hr className="border-border my-8" />,
          key: `divider-${index}`,
        });
        return;
      }

      // Headers
      if (trimmed.startsWith("### ")) {
        flushList();
        content.push({
          type: "h2",
          content: (
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {parseInlineFormatting(trimmed.slice(4))}
            </h2>
          ),
          key: `h2-${index}`,
        });
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushList();
        content.push({
          type: "h3",
          content: (
            <h3 className="text-xl font-medium text-text-secondary mb-3">
              {parseInlineFormatting(trimmed.slice(3))}
            </h3>
          ),
          key: `h3-${index}`,
        });
        return;
      }

      if (trimmed.startsWith("# ")) {
        flushList();
        content.push({
          type: "h4",
          content: (
            <h4 className="text-lg font-medium text-text-secondary mb-2">
              {parseInlineFormatting(trimmed.slice(2))}
            </h4>
          ),
          key: `h4-${index}`,
        });
        return;
      }

      // Quote/Author > text
      if (trimmed.startsWith("> ")) {
        flushList();
        content.push({
          type: "quote",
          content: (
            <blockquote className="border-l-4 border-primary pl-4 italic text-text-muted my-4">
              {parseInlineFormatting(trimmed.slice(2))}
            </blockquote>
          ),
          key: `quote-${index}`,
        });
        return;
      }

      // Bullet list * item
      if (trimmed.startsWith("* ")) {
        if (listType !== "bullet") {
          flushList();
          listType = "bullet";
        }
        listItems.push(parseInlineFormatting(trimmed.slice(2)));
        return;
      }

      // Numbered list 1. item (or any number)
      const numberedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (numberedMatch) {
        if (listType !== "numbered") {
          flushList();
          listType = "numbered";
        }
        listItems.push(parseInlineFormatting(numberedMatch[1]));
        return;
      }

      // Regular paragraph
      flushList();
      content.push({
        type: "p",
        content: <p className="text-text-muted leading-relaxed">{parseInlineFormatting(trimmed)}</p>,
        key: `p-${index}`,
      });
    });

    // Flush any remaining list
    flushList();

    return content;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-muted">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {parsedContent.map((item) => (
        <div key={item.key}>{item.content}</div>
      ))}
    </div>
  );
};

export default LegalContentParser;
