import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import 'highlight.js/styles/github-dark.css'

interface MarkdownProps {
  children: string
  className?: string
  inline?: boolean
}

export function Markdown({ children, className = '', inline = false }: MarkdownProps) {
  if (inline) {
    return (
      <span className={className}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            // basic inline stuff
            p: ({ children }) => <>{children}</>,
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {children}
              </a>
            ),
            // discord vibes
            del: ({ children }) => <del className="line-through">{children}</del>,
            // spoiler tags like discord
            span: ({ className, children, ...props }) => {
              if (className?.includes('spoiler')) {
                return (
                  <span
                    className="bg-muted text-muted-foreground cursor-pointer hover:bg-transparent hover:text-foreground transition-colors"
                    onClick={(e) => {
                      const target = e.currentTarget
                      target.className = target.className.replace('text-muted-foreground', 'text-foreground').replace('bg-muted', 'bg-transparent')
                    }}
                    {...props}
                  >
                    {children}
                  </span>
                )
              }
              return <span className={className} {...props}>{children}</span>
            }
          }}
        >
          {children}
        </ReactMarkdown>
      </span>
    )
  }

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
        components={{
          // main content blocks
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h4>,
          h5: ({ children }) => <h5 className="text-sm font-bold mb-1 mt-2 first:mt-0">{children}</h5>,
          h6: ({ children }) => <h6 className="text-sm font-bold mb-1 mt-2 first:mt-0">{children}</h6>,

          p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent pl-4 py-2 my-4 bg-muted/50 rounded-r">
              {children}
            </blockquote>
          ),

          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,

          // code with syntax highlighting
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          },

          // github style tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
          th: ({ children }) => <th className="border border-border px-4 py-2 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-border px-4 py-2">{children}</td>,

          // clickable links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline break-all"
            >
              {children}
            </a>
          ),

          // images with lazy loading
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-lg my-4"
              loading="lazy"
            />
          ),

          // divider line
          hr: () => <hr className="border-border my-6" />,

          // checkboxes for task lists
          input: ({ type, checked }) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mr-2 accent-accent"
                />
              )
            }
            return <input type={type} checked={checked} readOnly />
          },

          // crossed out text
          del: ({ children }) => <del className="line-through opacity-75">{children}</del>,

          // more discord formatting
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,

          // spoiler tags like in discord
          span: ({ className, children, ...props }) => {
            if (className?.includes('spoiler')) {
              return (
                <span
                  className="bg-muted text-muted-foreground cursor-pointer hover:bg-transparent hover:text-foreground transition-colors px-1 rounded"
                  onClick={(e) => {
                    const target = e.currentTarget
                    target.className = 'text-foreground'
                  }}
                  {...props}
                >
                  {children}
                </span>
              )
            }
            return <span className={className} {...props}>{children}</span>
          }
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown