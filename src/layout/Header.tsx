import { StoryblokComponent } from '@storyblok/react';
import { Link } from 'react-router-dom';
import type { SiteConfigBlok } from '../storyblok/types';

type Props = { config: SiteConfigBlok | null };

// Shown when the `config` story has no logo asset uploaded.
function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 2 L23.5 10.5 L14 22 Z" fill="#0B6E5F" />
      <path d="M14 2 L4.5 10.5 L14 22 Z" fill="#3FB89C" />
      <path d="M4.5 10.5 H23.5" stroke="#FFFFFF" strokeWidth="1.2" />
      <path
        d="M14 22 C11.5 23.5 16.5 24.5 14 26.5"
        stroke="#0B6E5F"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function Header({ config }: Props) {
  const siteName = config?.site_name ?? '';

  return (
    <header className="site-header">
      <div className="site-header__start">
        <Link
          to="/"
          className="site-header__brand"
          aria-label={`${siteName || 'Docs'} home`}
        >
          {config?.logo?.filename ? (
            <img
              src={config.logo.filename}
              alt=""
              width={28}
              height={28}
            />
          ) : (
            <BrandMark />
          )}
          <span className="site-header__name">{siteName}</span>
          <span className="site-header__divider" aria-hidden="true" />
          <span className="site-header__suffix">Docs</span>
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {config?.header_links?.map((link) => (
              <li key={link._uid}>
                <StoryblokComponent blok={link} variant="header" />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-header__end">
        <form
          className="site-header__search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <span className="site-header__search-icon" aria-hidden="true">
            <SearchIcon />
          </span>
          <label className="visually-hidden" htmlFor="docs-search">
            Search docs
          </label>
          <input id="docs-search" type="search" placeholder="Search docs" />
          <kbd className="site-header__kbd">⌘K</kbd>
        </form>
        <div className="site-header__account">
          <a href="#sign-in" className="site-header__signin">
            Sign in
          </a>
          <a href="#get-api-key" className="site-header__cta">
            Get API key
          </a>
        </div>
      </div>
    </header>
  );
}
