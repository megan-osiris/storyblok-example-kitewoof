import type { CalloutSection } from '../../content/types';
import { Inline } from './inline';

type Props = { section: CalloutSection };

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

export function Callout({ section }: Props) {
  const Icon = section.variant === 'warning' ? WarningIcon : NoteIcon;
  const ariaLabel = section.variant === 'warning' ? 'Warning' : 'Note';

  return (
    <aside
      aria-label={ariaLabel}
      className={`callout callout--${section.variant}`}
    >
      <span className="callout__icon">
        <Icon />
      </span>
      <div className="callout__body">
        <p className="callout__title">{section.title}</p>
        <p className="callout__content">
          <Inline source={section.body} />
        </p>
      </div>
    </aside>
  );
}
