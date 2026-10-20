import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Production bundles use the public token only (see src/storyblok/env.ts).
  // Without it the site would build fine and then fail every request, so stop here.
  // loadEnv also sees variables set by the host, such as Netlify's environment variables.
  if (command === 'build' && mode === 'production') {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    if (!env.VITE_STORYBLOK_PUBLIC_TOKEN) {
      throw new Error(
        'VITE_STORYBLOK_PUBLIC_TOKEN is not set. Production builds need the Storyblok ' +
          'public token: add it to .env.local, or to your host\'s environment variables.',
      );
    }
  }

  return {
    plugins: [react(), mkcert()],
  };
});
