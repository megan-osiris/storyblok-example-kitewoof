import type { PageMeta } from '../content/types';

type Props = {
  title: string;
  description: string;
  meta?: PageMeta;
};

function ClockIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon() {
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
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </svg>
  );
}

export function PageHeader({ title, description, meta }: Props) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <p className="page-header__description">{description}</p>
      {meta && (meta.readTime || meta.updated) && (
        <div className="page-header__meta">
          {meta.readTime && (
            <span className="page-header__meta-item">
              <ClockIcon />
              <span>{meta.readTime}</span>
            </span>
          )}
          {meta.updated && (
            <span className="page-header__meta-item">
              <CalendarIcon />
              <span>{meta.updated}</span>
            </span>
          )}
        </div>
      )}
    </header>
  );
}
