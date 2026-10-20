import { useEffect, useState } from 'react';
import {
  registerStoryblokBridge,
  useStoryblokApi,
  type ISbStoryData,
} from '@storyblok/react';
import { storyblokVersion } from './env';

type State<T> =
  | { status: 'loading' }
  | { status: 'ok'; story: ISbStoryData<T> }
  | { status: 'notfound' }
  | { status: 'error'; error: unknown };

export function useStory<T>(slug: string): State<T> {
  const storyblokApi = useStoryblokApi();
  const [state, setState] = useState<State<T>>({ status: 'loading' });
  const [prevSlug, setPrevSlug] = useState(slug);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setState({ status: 'loading' });
  }

  useEffect(() => {
    let active = true;

    storyblokApi
      .get(`cdn/stories/${slug}`, { version: storyblokVersion })
      .then(({ data }) => {
        if (!active) return;
        const story = data.story as ISbStoryData<T>;
        setState({ status: 'ok', story });
        registerStoryblokBridge(story.id, (next) => {
          if (!active) return;
          setState({ status: 'ok', story: next as ISbStoryData<T> });
        });
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (
          typeof error === 'object' &&
          error !== null &&
          'status' in error &&
          (error as { status: number }).status === 404
        ) {
          setState({ status: 'notfound' });
        } else {
          console.error(`Storyblok request for "${slug}" failed`, error);
          setState({ status: 'error', error });
        }
      });

    return () => {
      active = false;
    };
  }, [slug, storyblokApi]);

  return state;
}
