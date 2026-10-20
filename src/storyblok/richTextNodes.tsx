import { Children, createContext, useContext, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { StoryblokReactRichTextProps } from '@storyblok/react';

// Node/mark overrides for <StoryblokRichText> that reproduce the markup and
// class names of the original TextSection/Callout components, so the existing
// stylesheet applies unchanged. Wired up in richText.ts.

type ListItemPosition = { ordered: boolean; number: number };

const ListItemContext = createContext<ListItemPosition | null>(null);
const InsideListItemContext = createContext(false);

function withPositions(children: ReactNode, ordered: boolean, start: number) {
  return Children.map(children, (child, index) => (
    <ListItemContext.Provider value={{ ordered, number: start + index }}>
      {child}
    </ListItemContext.Provider>
  ));
}

export function BulletList({ children }: StoryblokReactRichTextProps<'bullet_list'>) {
  return <ul className="text-section__ul">{withPositions(children, false, 1)}</ul>;
}

export function OrderedList({ attrs, children }: StoryblokReactRichTextProps<'ordered_list'>) {
  return (
    <ol className="text-section__ol">
      {withPositions(children, true, attrs?.order ?? 1)}
    </ol>
  );
}

export function ListItem({ children }: StoryblokReactRichTextProps<'list_item'>) {
  const position = useContext(ListItemContext);
  return (
    <li className="text-section__li">
      {position?.ordered ? (
        <span className="text-section__number" aria-hidden="true">
          {position.number}
        </span>
      ) : (
        <span className="text-section__bullet" aria-hidden="true" />
      )}
      <span>
        <InsideListItemContext.Provider value={true}>
          {children}
        </InsideListItemContext.Provider>
      </span>
    </li>
  );
}

export function SectionHeading({ attrs, children }: StoryblokReactRichTextProps<'heading'>) {
  const level = attrs?.level ?? 2;
  const Tag = level <= 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
  return <Tag className="text-section__heading">{children}</Tag>;
}

export function SectionParagraph({ children }: StoryblokReactRichTextProps<'paragraph'>) {
  const insideListItem = useContext(InsideListItemContext);
  if (insideListItem) return <>{children}</>;
  return <p className="text-section__p">{children}</p>;
}

export function CalloutParagraph({ children }: StoryblokReactRichTextProps<'paragraph'>) {
  const insideListItem = useContext(InsideListItemContext);
  if (insideListItem) return <>{children}</>;
  return <p className="callout__content">{children}</p>;
}

export function InlineCode({ children }: StoryblokReactRichTextProps<'code'>) {
  return <code className="inline-code">{children}</code>;
}

export function RichTextLink({ attrs, children }: StoryblokReactRichTextProps<'link'>) {
  const href = attrs?.href ?? '';
  if (attrs?.linktype === 'story' || href.startsWith('/')) {
    const path = href.replace(/^\//, '');
    return <Link to={path === 'home' ? '/' : `/${path}`}>{children}</Link>;
  }
  return (
    <a href={href} target={attrs?.target ?? '_blank'} rel="noreferrer">
      {children}
    </a>
  );
}
