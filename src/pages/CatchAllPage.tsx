import { useLocation } from 'react-router-dom';
import { StoryblokComponent } from '@storyblok/react';
import { useStory } from '../storyblok/useStory';
import type { DocPageBlok } from '../storyblok/types';
import { NotFoundPage } from './NotFoundPage';

function slugFromPathname(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'home';
  return pathname.replace(/^\//, '').replace(/\/$/, '');
}

export function CatchAllPage() {
  const location = useLocation();
  const slug = slugFromPathname(location.pathname);
  const state = useStory<DocPageBlok>(slug);

  if (state.status === 'loading') {
    return (
      <div className="doc-page doc-page--loading" aria-busy="true">
        Loading…
      </div>
    );
  }

  if (state.status === 'notfound') {
    return <NotFoundPage path={slug === 'home' ? '' : slug} />;
  }

  if (state.status === 'error') {
    return <NotFoundPage path={slug === 'home' ? '' : slug} />;
  }

  return (
    <StoryblokComponent
      blok={state.story.content}
      path={slug === 'home' ? '' : slug}
    />
  );
}
