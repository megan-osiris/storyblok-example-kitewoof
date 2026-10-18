import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { InlineSource } from '../../content/types';

type Span =
  | { kind: 'text'; text: string }
  | { kind: 'link'; text: string; href: string }
  | { kind: 'code'; text: string }
  | { kind: 'strong'; text: string };

const INLINE_RE = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;

function parseSpans(source: InlineSource): Span[] {
  const out: Span[] = [];
  const re = new RegExp(INLINE_RE);
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source))) {
    if (match.index > last) {
      out.push({ kind: 'text', text: source.slice(last, match.index) });
    }
    if (match[1] !== undefined) {
      out.push({ kind: 'link', text: match[1], href: match[2] });
    } else if (match[3] !== undefined) {
      out.push({ kind: 'code', text: match[3] });
    } else if (match[4] !== undefined) {
      out.push({ kind: 'strong', text: match[4] });
    }
    last = re.lastIndex;
  }
  if (last < source.length) {
    out.push({ kind: 'text', text: source.slice(last) });
  }
  return out;
}

function isInternalHref(href: string): boolean {
  return href.startsWith('/');
}

export function Inline({ source }: { source: InlineSource }): ReactNode {
  const spans = parseSpans(source);
  return (
    <>
      {spans.map((span, index) => {
        const key = index;
        switch (span.kind) {
          case 'text':
            return <span key={key}>{span.text}</span>;
          case 'code':
            return (
              <code key={key} className="inline-code">
                {span.text}
              </code>
            );
          case 'strong':
            return <strong key={key}>{span.text}</strong>;
          case 'link':
            return isInternalHref(span.href) ? (
              <Link key={key} to={span.href}>
                {span.text}
              </Link>
            ) : (
              <a key={key} href={span.href} target="_blank" rel="noreferrer">
                {span.text}
              </a>
            );
        }
      })}
    </>
  );
}
