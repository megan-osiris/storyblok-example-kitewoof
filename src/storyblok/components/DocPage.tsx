import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import type { JSX } from 'react';
import type { DocPageBlok } from '../types';
import { PageHeader } from '../../components/PageHeader';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  blok: DocPageBlok;
  path?: string;
};

export function DocPage({ blok, path = '' }: Props): JSX.Element {
  return (
    <article className="doc-page" {...storyblokEditable(blok)}>
      <div className="doc-page__intro">
        <Breadcrumbs path={path} />
        <PageHeader title={blok.title} description={blok.description} />
      </div>
      <div className="doc-page__body">
        {blok.body?.map((child) => (
          <StoryblokComponent key={child._uid} blok={child} />
        ))}
      </div>
    </article>
  );
}
