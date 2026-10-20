import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import type { JSX } from 'react';
import type { NavGroupBlok } from '../types';

type Props = { blok: NavGroupBlok };

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

export function NavGroup({ blok }: Props): JSX.Element {
  return (
    <section className="site-sidebar__group" {...storyblokEditable(blok)}>
      <div className="site-sidebar__group-header">
        <h2 className="site-sidebar__group-title">{blok.title}</h2>
        <span className="site-sidebar__group-chevron">
          <ChevronIcon />
        </span>
      </div>
      <ul>
        {blok.links?.map((link) => (
          <li key={link._uid}>
            <StoryblokComponent blok={link} variant="sidebar" />
          </li>
        ))}
      </ul>
    </section>
  );
}
