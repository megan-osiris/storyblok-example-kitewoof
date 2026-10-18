import { NavLink } from 'react-router-dom';

type SidebarLink = { label: string; to: string };

type SidebarGroup = { title: string; links: SidebarLink[] };

const GROUPS: SidebarGroup[] = [
  {
    title: 'Get started',
    links: [
      { label: 'Introduction', to: '/docs/get-started/introduction' },
      { label: 'Quickstart', to: '/docs/get-started/quickstart' },
      { label: 'Authentication', to: '/docs/get-started/authentication' },
      { label: 'Environments', to: '/docs/get-started/environments' },
    ],
  },
  {
    title: 'Core concepts',
    links: [
      { label: 'Events', to: '/docs/core/events' },
      { label: 'Channels', to: '/docs/core/channels' },
      { label: 'Subscriptions', to: '/docs/core/subscriptions' },
      { label: 'Delivery and retries', to: '/docs/core/retries' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'Verify webhook signatures', to: '/docs/guides/signatures' },
      { label: 'Batch events', to: '/docs/guides/batching' },
      { label: 'Migrate from API v1', to: '/docs/guides/migrate-v1' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { label: 'REST API', to: '/docs/reference/rest-api' },
      { label: 'Node.js SDK', to: '/docs/reference/node-sdk' },
      { label: 'Python SDK', to: '/docs/reference/python-sdk' },
      { label: 'Error codes', to: '/docs/reference/error-codes' },
    ],
  },
];

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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="site-sidebar">
      <nav aria-label="Documentation">
        {GROUPS.map((group) => (
          <section key={group.title} className="site-sidebar__group">
            <div className="site-sidebar__group-header">
              <h2 className="site-sidebar__group-title">{group.title}</h2>
              <span className="site-sidebar__group-chevron">
                <ChevronIcon />
              </span>
            </div>
            <ul>
              {group.links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? 'site-sidebar__link is-active'
                        : 'site-sidebar__link'
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
