import { NavLink } from 'react-router-dom';

type SidebarLink = { label: string; to: string };

type SidebarGroup = { title: string; links: SidebarLink[] };

const GROUPS: SidebarGroup[] = [
  {
    title: 'Getting started',
    links: [
      { label: 'Install the CLI', to: '/docs/getting-started/install' },
      { label: 'Authentication', to: '/docs/getting-started/authentication' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { label: 'API overview', to: '/docs/api' },
      { label: 'Changelog', to: '/docs/changelog' },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="site-sidebar" aria-label="Documentation">
      <nav>
        {GROUPS.map((group) => (
          <section key={group.title} className="site-sidebar__group">
            <h2 className="site-sidebar__title">{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? 'is-active' : undefined
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
}
