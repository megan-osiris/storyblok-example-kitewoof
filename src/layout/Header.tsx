import { Link, NavLink } from 'react-router-dom';

const TOP_NAV = [
  { label: 'Docs', to: '/docs/getting-started/install' },
  { label: 'API', to: '/docs/api' },
  { label: 'Blog', to: '/blog' },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Kitewoof home">
          <span className="site-header__logo" aria-hidden="true">K</span>
          <span className="site-header__name">Kitewoof</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {TOP_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'is-active' : undefined
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <form
          className="site-header__search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="search"
            placeholder="Search docs"
            aria-label="Search documentation"
          />
        </form>
      </div>
    </header>
  );
}
