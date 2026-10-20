type Region = 'eu' | 'us' | 'ap' | 'ca' | 'cn';

const isProduction = import.meta.env.PROD;

// Each mode reads only its own token, so a production bundle never contains the
// preview token, which can read drafts. vite.config.ts fails a production build
// when the public token is missing.
// `||` rather than `??`: a variable left blank in .env.local is "", not undefined.
export const storyblokAccessToken: string | undefined = isProduction
  ? import.meta.env.VITE_STORYBLOK_PUBLIC_TOKEN || undefined
  : import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN || undefined;

export const storyblokVersion: 'draft' | 'published' = isProduction
  ? 'published'
  : 'draft';

export const storyblokRegion: Region = (import.meta.env.VITE_STORYBLOK_REGION ||
  'eu') as Region;

export const siteConfigSlug = 'config';
