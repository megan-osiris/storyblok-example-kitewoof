import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import './styles/index.css';
import App from './App.tsx';
import { components } from './storyblok/components';
import {
  storyblokAccessToken,
  storyblokRegion,
} from './storyblok/env';

storyblokInit({
  accessToken: storyblokAccessToken,
  use: [apiPlugin],
  apiOptions: {
    region: storyblokRegion,
  },
  components,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
