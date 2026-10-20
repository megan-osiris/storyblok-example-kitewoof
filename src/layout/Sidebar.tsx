import { StoryblokComponent } from '@storyblok/react';
import type { SiteConfigBlok } from '../storyblok/types';

type Props = { config: SiteConfigBlok | null };

export function Sidebar({ config }: Props) {
  return (
    <aside className="site-sidebar">
      <nav aria-label="Documentation">
        {config?.sidebar_groups?.map((group) => (
          <StoryblokComponent key={group._uid} blok={group} />
        ))}
      </nav>
    </aside>
  );
}
