import type { Page } from './types';

export const pages: Record<string, Page> = {
  '': {
    title: 'Welcome to Kitewoof',
    description:
      'Kitewoof is a fictional events-and-webhooks API, used here to teach documentation patterns. The guide starts with the Quickstart.',
    body: [
      {
        component: 'text_section',
        _uid: 'home-start',
        anchor: 'start-here',
        heading: 'Start here',
        blocks: [
          {
            kind: 'p',
            text: 'Pick a path from the sidebar, or jump straight into the [Quickstart](/docs/get-started/quickstart) to send your first event. The sample content is lifted from the Claude Design project so you can compare the rendered React output against the design side by side.',
          },
          {
            kind: 'ul',
            items: [
              '[Quickstart](/docs/get-started/quickstart) — create a key, install the SDK, send an event',
              '[Introduction](/docs/get-started/introduction) — what Kitewoof is',
              '[Authentication](/docs/get-started/authentication) — API keys and token scopes',
            ],
          },
        ],
      },
      {
        component: 'callout',
        _uid: 'home-note',
        variant: 'note',
        title: 'Static demo',
        body: 'This phase has no CMS. Pages live in `src/content/pages.ts`. Phase 2 swaps this for Storyblok without changing the component tree.',
      },
    ],
  },

  'docs/get-started/introduction': {
    title: 'Introduction',
    description:
      'What Kitewoof is, who it is for, and how the pieces fit together.',
    meta: { readTime: '2 min read', updated: 'Updated Oct 12, 2026' },
    body: [
      {
        component: 'text_section',
        _uid: 'intro-what',
        anchor: 'what-is-kitewoof',
        heading: 'What is Kitewoof?',
        blocks: [
          {
            kind: 'p',
            text: 'Kitewoof is an events-and-webhooks API. Your backend publishes events; Kitewoof delivers them to any number of subscribers with retries and signature verification. The [Quickstart](/docs/get-started/quickstart) is the fastest way to see it in action.',
          },
        ],
      },
    ],
  },

  'docs/get-started/authentication': {
    title: 'Authentication',
    description:
      'API keys, environment scoping, and when to use publishable tokens instead.',
    meta: { readTime: '3 min read', updated: 'Updated Oct 12, 2026' },
    body: [
      {
        component: 'text_section',
        _uid: 'auth-keys',
        anchor: 'keys',
        heading: 'Keys',
        blocks: [
          {
            kind: 'p',
            text: 'Keys that start with `kw_test_` reach test channels only. Live keys start with `kw_live_` and can publish to every channel in your workspace, so keep them on the server.',
          },
        ],
      },
      {
        component: 'callout',
        _uid: 'auth-warning',
        variant: 'warning',
        title: 'Never commit a live key',
        body: 'Rotate the key in the dashboard before you push a cleanup commit — a rewritten history does not un-publish a key.',
      },
    ],
  },

  'docs/get-started/quickstart': {
    title: 'Quickstart',
    description:
      'Create an API key, install the Node.js SDK, and send your first event to a Kitewoof channel.',
    meta: { readTime: '5 min read', updated: 'Updated Oct 12, 2026' },
    body: [
      {
        component: 'text_section',
        _uid: 'b1',
        anchor: 'before-you-begin',
        heading: 'Before you begin',
        blocks: [
          { kind: 'p', text: 'This guide takes you from a new account to a delivered event. You will need:' },
          {
            kind: 'ul',
            items: [
              'A Kitewoof account. The free **Developer** plan is enough.',
              'Node.js 18 or later, and npm.',
              'A channel to publish to. New workspaces include one named `default`.',
            ],
          },
        ],
      },
      {
        component: 'callout',
        _uid: 'b2',
        variant: 'note',
        title: 'Test keys and live keys',
        body: 'Keys that start with `kw_test_` only reach test channels and never trigger real deliveries. Use a test key while you follow this guide.',
      },
      {
        component: 'text_section',
        _uid: 'b3',
        anchor: 'create-an-api-key',
        heading: 'Create an API key',
        blocks: [
          {
            kind: 'ol',
            items: [
              'Open the [Dashboard](/docs/dashboard) and go to **Settings → API keys**.',
              'Select **Create key**, give it a name, and choose the **Test** environment.',
              'Copy the key and save it as an environment variable named `KITEWOOF_API_KEY`.',
            ],
          },
          {
            kind: 'p',
            text: 'A key is shown only once. If you lose it, revoke it and create a new one. See [Rotating API keys](/docs/guides/rotating-keys).',
          },
        ],
      },
      {
        component: 'text_section',
        _uid: 'b4',
        anchor: 'install-the-sdk',
        heading: 'Install the SDK',
        blocks: [
          {
            kind: 'p',
            text: 'Install the official Node.js SDK. The [Python](/docs/reference/python-sdk), [Go](/docs/reference/go-sdk), and [Ruby](/docs/reference/ruby-sdk) packages follow the same steps.',
          },
        ],
      },
      {
        component: 'code_block',
        _uid: 'b5',
        filename: 'Terminal',
        language: 'bash',
        code: 'npm install @kitewoof/node\nexport KITEWOOF_API_KEY="kw_test_4eC39HqLyjWDarjtT1zdp7dc"',
      },
      {
        component: 'text_section',
        _uid: 'b6',
        anchor: 'send-your-first-event',
        heading: 'Send your first event',
        blocks: [
          {
            kind: 'p',
            text: 'Create a file named `send-event.js`. The client reads your key from the environment, then publishes an `order.created` event to the `default` channel.',
          },
        ],
      },
      {
        component: 'code_block',
        _uid: 'b7',
        filename: 'send-event.js',
        language: 'javascript',
        code: `import { Kitewoof } from "@kitewoof/node";

const kw = new Kitewoof({ apiKey: process.env.KITEWOOF_API_KEY });

// Publish an event to the default channel
const event = await kw.events.create({
  channel: "default",
  type: "order.created",
  data: { orderId: "ord_1042", total: 4999 },
});

console.log(event.id); // evt_8Fq2LmZt`,
      },
      {
        component: 'text_section',
        _uid: 'b8',
        anchor: 'check-the-response',
        heading: 'Check the response',
        blocks: [
          {
            kind: 'p',
            text: "Run `node send-event.js`. A successful request returns `201 Created` and the new event object. These are the other status codes you're likely to see while testing:",
          },
        ],
      },
      {
        component: 'data_table',
        _uid: 'b9',
        caption: 'Common status codes',
        columns: ['Status', 'Meaning', 'What to do'],
        rows: [
          ['`201 Created`', 'The event was accepted and queued for delivery.', 'Nothing. Store `event.id` if you need to look it up later.'],
          ['`400 Bad Request`', 'The body failed validation, for example a missing `type`.', 'Check the `error.fields` array in the response.'],
          ['`401 Unauthorized`', 'The API key is missing, revoked, or malformed.', 'Confirm `KITEWOOF_API_KEY` is set in the shell that runs your script.'],
          ["`404 Not Found`", "The channel doesn't exist in this environment.", 'Create the channel, or pair a test key with a test channel.'],
          ['`429 Too Many Requests`', 'You sent more than 100 requests per second.', 'Wait for the number of seconds in the `Retry-After` header.'],
        ],
      },
      {
        component: 'callout',
        _uid: 'b10',
        variant: 'warning',
        title: 'Keep secret keys on the server',
        body: 'A secret key can publish to every channel in your workspace. Call the API from your backend, and use [publishable tokens](/docs/reference/publishable-tokens) in browsers and mobile apps.',
      },
      {
        component: 'text_section',
        _uid: 'b11',
        anchor: 'next-steps',
        heading: 'Next steps',
        blocks: [
          {
            kind: 'ul',
            items: [
              '[Subscribe an endpoint](/docs/core/subscriptions) to receive events as webhooks.',
              '[Verify webhook signatures](/docs/guides/signatures) before you trust a payload.',
              'Learn how [retries and backoff](/docs/core/retries) work when a delivery fails.',
            ],
          },
        ],
      },
    ],
  },
};
