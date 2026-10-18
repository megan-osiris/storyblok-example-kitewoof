import { useState } from 'react';
import type { CodeBlockSection } from '../../content/types';
import { LANGUAGE_LABEL, tokenize } from './tokenize';

type Props = { section: CodeBlockSection };

function ShellIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 7l5 5-5 5" />
      <path d="M12 18h7" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </svg>
  );
}

export function CodeBlock({ section }: Props) {
  const [copied, setCopied] = useState(false);
  const isShell = section.language === 'bash' || section.language === 'shell';
  const lines = section.code.split('\n');

  const handleCopy = () => {
    void navigator.clipboard?.writeText(section.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const gutterWidth = `${String(lines.length).length}ch`;

  return (
    <figure className="code-block">
      <figcaption className="code-block__caption">
        <span className="code-block__file">
          <span className="code-block__file-icon" aria-hidden="true">
            {isShell ? <ShellIcon /> : <FileIcon />}
          </span>
          <span className="code-block__filename">{section.filename}</span>
        </span>
        <span className="code-block__controls">
          <span className="code-block__language">
            {LANGUAGE_LABEL[section.language]}
          </span>
          <button
            type="button"
            className="code-block__copy"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
          >
            <CopyIcon />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </span>
      </figcaption>
      <pre className="code-block__pre">
        <code className="code-block__code">
          {lines.map((line, index) => {
            const tokens = tokenize(line, section.language);
            return (
              <span key={index} className="code-block__line">
                <span
                  className="code-block__gutter"
                  style={{ width: gutterWidth }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="code-block__content">
                  {tokens.map((token, tokenIndex) => (
                    <span key={tokenIndex} style={{ color: token.color }}>
                      {token.text}
                    </span>
                  ))}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}
