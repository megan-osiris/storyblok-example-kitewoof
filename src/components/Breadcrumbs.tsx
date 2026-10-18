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
  const crumbs: Crumb[] = [{ label: 'Home', to: '/' }];
  let current = '';
  for (const segment of segments) {
    current += `/${segment}`;
    crumbs.push({ label: toLabel(segment), to: current });
  }
  return crumbs;
}

export function Breadcrumbs({ path }: Props) {
  const crumbs = buildCrumbs(path);
  if (crumbs.length <= 1) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.to}>
              {isLast ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link to={crumb.to}>{crumb.label}</Link>
              )}
              {!isLast && <span className="breadcrumbs__sep" aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
