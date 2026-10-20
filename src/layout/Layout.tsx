import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useStory } from '../storyblok/useStory';
import { siteConfigSlug } from '../storyblok/env';
import type { SiteConfigBlok } from '../storyblok/types';

export function Layout() {
  const state = useStory<SiteConfigBlok>(siteConfigSlug);
  const config = state.status === 'ok' ? state.story.content : null;

  return (
    <div className="site">
      <Header config={config} />
      <div className="site__body">
        <Sidebar config={config} />
        <main className="site__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
