import type { CodeBlockSection } from '../../content/types';

type Props = { section: CodeBlockSection };

export function CodeBlock({ section }: Props) {
  return (
    <figure className="code-block">
      {(section.filename || section.language) && (
        <figcaption className="code-block__caption">
          {section.filename && (
            <span className="code-block__filename">{section.filename}</span>
          )}
          {section.language && (
            <span className="code-block__language">{section.language}</span>
          )}
        </figcaption>
      )}
      <pre>
        <code>{section.code}</code>
      </pre>
    </figure>
  );
}
