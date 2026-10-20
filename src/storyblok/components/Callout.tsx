import { StoryblokRichText, storyblokEditable } from '@storyblok/react';
import type { JSX } from 'react';
import type { CalloutBlok } from '../types';
import { calloutRichText } from '../richText';

type Props = { blok: CalloutBlok };

function NoteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

const ARIA_LABEL = { note: 'Note', tip: 'Tip', warning: 'Warning' } as const;

export function Callout({ blok }: Props): JSX.Element {
  const isWarning = blok.variant === 'warning';
  const Icon = isWarning ? WarningIcon : NoteIcon;
  // The stylesheet only defines note and warning; tip uses the note styling.
  const styleVariant = isWarning ? 'warning' : 'note';

  return (
    <aside
      aria-label={ARIA_LABEL[blok.variant] ?? 'Note'}
      className={`callout callout--${styleVariant}`}
      {...storyblokEditable(blok)}
    >
      <span className="callout__icon">
        <Icon />
      </span>
      <div className="callout__body">
        {blok.title && <p className="callout__title">{blok.title}</p>}
        <StoryblokRichText
          document={blok.content}
          components={calloutRichText}
          wrapper={false}
        />
      </div>
    </aside>
  );
}
