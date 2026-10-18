import { useParams } from 'react-router-dom';
import { pages } from '../content/pages';
import { DocPage } from '../components/DocPage';
import { NotFoundPage } from './NotFoundPage';

export function CatchAllPage() {
  const params = useParams();
  const path = params['*'] ?? '';
  const page = pages[path];

  if (!page) return <NotFoundPage path={path} />;

  return <DocPage page={page} path={path} />;
}
