import { Link } from 'react-router-dom';

type Props = { path: string };

type Crumb = {
  label: string;
  to: string;
};

function toLabel(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildCrumbs(path: string): Crumb[] {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return [];
  const crumbs: Crumb[] = [];
  let current = '';
  for (const segment of segments) {
    current += `/${segment}`;
    crumbs.push({ label: toLabel(segment), to: current });
  }
  return crumbs;
}

function ChevronIcon() {
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
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function Breadcrumbs({ path }: Props) {
  const crumbs = buildCrumbs(path);
  if (crumbs.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.to} className="breadcrumbs__item">
              {index > 0 && (
                <span className="breadcrumbs__sep">
                  <ChevronIcon />
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="breadcrumbs__current">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.to} className="breadcrumbs__link">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
