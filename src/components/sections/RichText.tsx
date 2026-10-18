import type { RichTextSection } from '../../content/types';

type Props = { section: RichTextSection };

export function RichText({ section }: Props) {
  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: section.html }}
    />
  );
}
