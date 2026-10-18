import { Link } from 'react-router-dom';

type Props = { path?: string };

export function NotFoundPage({ path }: Props) {
  return (
    <section className="not-found">
      <p className="not-found__status">404</p>
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__description">
        {path
          ? <>No page is registered at <code>/{path}</code>.</>
          : <>That URL does not match any page.</>}
      </p>
      <Link className="not-found__link" to="/">
        Back to home
      </Link>
    </section>
  );
}
