import type { Page, Section } from '../content/types';
import { PageHeader } from './PageHeader';
import { Breadcrumbs } from './Breadcrumbs';
import { componentMap } from './sections/componentMap';

type Props = {
  page: Page;
  path: string;
};

function renderSection(section: Section) {
  const Component = componentMap[section.component] as React.ComponentType<{
    section: Section;
  }>;
  return <Component key={section._uid} section={section} />;
}

export function DocPage({ page, path }: Props) {
  return (
    <article className="doc-page">
      <div className="doc-page__intro">
        <Breadcrumbs path={path} />
        <PageHeader
          title={page.title}
          description={page.description}
          meta={page.meta}
        />
      </div>
      <div className="doc-page__body">{page.body.map(renderSection)}</div>
    </article>
  );
}
