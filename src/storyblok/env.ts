type Region = 'eu' | 'us' | 'ap' | 'ca' | 'cn';

// `||` rather than `??`: a variable left blank in .env.local is "", not undefined.
const previewToken = import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN || undefined;
const publicToken = import.meta.env.VITE_STORYBLOK_PUBLIC_TOKEN || undefined;
const region = (import.meta.env.VITE_STORYBLOK_REGION || 'eu') as Region;

const isProduction = import.meta.env.PROD;

export const storyblokAccessToken = isProduction
  ? (publicToken ?? previewToken)
  : previewToken;

export const storyblokVersion: 'draft' | 'published' = isProduction
  ? 'published'
  : 'draft';

export const storyblokRegion: Region = region;

export const siteConfigSlug = 'config';
