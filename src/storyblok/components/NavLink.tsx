import { storyblokEditable } from '@storyblok/react';
import type { JSX } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import type { NavLinkBlok } from '../types';

type Props = {
  blok: NavLinkBlok;
  variant?: 'header' | 'sidebar';
};

const LINK_CLASS = {
  header: 'site-header__nav-link',
  sidebar: 'site-sidebar__link',
} as const;

function resolveHref(link: NavLinkBlok['link']): { to: string; internal: boolean } {
  if (link.linktype === 'story') {
    const slug = (link.cached_url || '').replace(/^\//, '');
    return { to: slug === 'home' ? '/' : `/${slug}`, internal: true };
  }
  if (link.linktype === 'email') {
    return { to: `mailto:${link.email ?? link.url}`, internal: false };
  }
  const url = link.url || link.cached_url || '';
  return { to: url, internal: url.startsWith('/') };
}

export function NavLink({ blok, variant = 'sidebar' }: Props): JSX.Element {
  const { to, internal } = resolveHref(blok.link);
  const className = LINK_CLASS[variant];

  if (internal) {
    return (
      <RouterNavLink
        {...storyblokEditable(blok)}
        to={to}
        className={({ isActive }) => (isActive ? `${className} is-active` : className)}
      >
        {blok.label}
      </RouterNavLink>
    );
  }

  return (
    <a
      {...storyblokEditable(blok)}
      className={className}
      href={to}
      target={blok.link.target ?? '_self'}
      rel="noreferrer"
    >
      {blok.label}
    </a>
  );
}
