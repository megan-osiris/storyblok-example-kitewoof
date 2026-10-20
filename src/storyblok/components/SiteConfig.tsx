import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import type { JSX } from 'react';
import type { SiteConfigBlok } from '../types';

type Props = { blok: SiteConfigBlok };

// Rendered when the `config` story itself is opened (e.g. in the Visual Editor),
// so editors see the lists they are editing. The site's real Header and Sidebar
// read the same blok via Layout.
export function SiteConfig({ blok }: Props): JSX.Element {
  return (
    <article className="doc-page" {...storyblokEditable(blok)}>
      <header className="page-header">
        {blok.logo?.filename && (
          <img
            src={blok.logo.filename}
            alt={blok.logo.alt || blok.site_name}
            width={32}
            height={32}
          />
        )}
        <h1 className="page-header__title">{blok.site_name}</h1>
        <p className="page-header__description">
          Site configuration: the header and sidebar navigation shown on every page.
        </p>
      </header>
      <div className="doc-page__body">
        <section className="text-section">
          <h2 className="text-section__heading">Header links</h2>
          <nav className="site-sidebar" aria-label="Header links preview">
            <ul>
              {blok.header_links?.map((link) => (
                <li key={link._uid}>
                  <StoryblokComponent blok={link} variant="sidebar" />
                </li>
              ))}
            </ul>
          </nav>
        </section>
        <section className="text-section">
          <h2 className="text-section__heading">Sidebar groups</h2>
          <nav className="site-sidebar" aria-label="Sidebar groups preview">
            {blok.sidebar_groups?.map((group) => (
              <StoryblokComponent key={group._uid} blok={group} />
            ))}
          </nav>
        </section>
      </div>
    </article>
  );
}
