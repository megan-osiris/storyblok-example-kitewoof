import type { Page } from './types';

export const pages: Record<string, Page> = {
  '': {
    title: 'Welcome to Kitewoof',
    description:
      'Kitewoof is a fictional API used to teach documentation patterns. Start here to see how the site is organized.',
    body: [
      {
        component: 'rich_text',
        _uid: 'home-intro',
        html: `
          <p>This site is a learning sandbox. Every page you see is rendered from a single catch-all route that looks up its data by URL path. There is no CMS yet.</p>
          <h2>Where to go next</h2>
          <ul>
            <li><a href="/docs/getting-started/install">Install the Kitewoof CLI</a></li>
            <li><a href="/docs/getting-started/authentication">Authenticate your first request</a></li>
          </ul>
        `,
      },
      {
        component: 'callout',
        _uid: 'home-note',
        variant: 'note',
        title: 'This is a static demo',
        html: '<p>In a later phase this content lives in Storyblok. For now it is a plain data file in <code>src/content/pages.ts</code>.</p>',
      },
    ],
  },

  'docs/getting-started/install': {
    title: 'Install the Kitewoof CLI',
    description:
      'The command-line interface is the fastest way to try Kitewoof. Install it with npm and verify the version.',
    body: [
      {
        component: 'rich_text',
        _uid: 'install-intro',
        html: `
          <h2>Prerequisites</h2>
          <p>You need a recent version of Node.js and npm. Older versions may install the CLI but fail at run time.</p>
        `,
      },
      {
        component: 'data_table',
        _uid: 'install-table',
        caption: 'Supported runtimes',
        headers: ['Tool', 'Minimum version', 'Recommended'],
        rows: [
          ['Node.js', '20.19', '22 LTS'],
          ['npm', '10', '10 or newer'],
          ['Git', '2.30', 'Latest'],
        ],
      },
      {
        component: 'rich_text',
        _uid: 'install-steps',
        html: `
          <h2>Install the package</h2>
          <p>Install the CLI globally so the <code>kitewoof</code> binary is on your path.</p>
        `,
      },
      {
        component: 'code_block',
        _uid: 'install-cmd',
        language: 'bash',
        filename: 'Terminal',
        code: 'npm install --global @kitewoof/cli@1.0.0',
      },
      {
        component: 'callout',
        _uid: 'install-tip',
        variant: 'tip',
        title: 'Pin the version',
        html: '<p>Pinning to an exact version keeps your install reproducible when a teammate runs the same command next week.</p>',
      },
      {
        component: 'rich_text',
        _uid: 'install-verify',
        html: '<h2>Verify the install</h2><p>Print the version to confirm the binary is wired up.</p>',
      },
      {
        component: 'code_block',
        _uid: 'install-verify-cmd',
        language: 'bash',
        filename: 'Terminal',
        code: 'kitewoof --version\n# 1.0.0',
      },
      {
        component: 'callout',
        _uid: 'install-warning',
        variant: 'warning',
        title: 'Permission errors on macOS',
        html: '<p>If a global install fails with <code>EACCES</code>, use a version manager such as <a href="https://github.com/nvm-sh/nvm">nvm</a> instead of fighting the system Node install.</p>',
      },
    ],
  },

  'docs/getting-started/authentication': {
    title: 'Authenticate your first request',
    description:
      'Kitewoof uses short-lived bearer tokens. This page shows how to request a token and attach it to an API call.',
    body: [
      {
        component: 'rich_text',
        _uid: 'auth-intro',
        html: `
          <h2>How tokens work</h2>
          <p>Every Kitewoof call must include a bearer token in the <code>Authorization</code> header. Tokens expire after one hour. You exchange a long-lived API key for a token with the <code>auth</code> command.</p>
        `,
      },
      {
        component: 'callout',
        _uid: 'auth-note',
        variant: 'note',
        title: 'Keep your API key secret',
        html: '<p>Store your API key in an environment variable, not in source control. The examples below read <code>KITEWOOF_API_KEY</code> from the environment.</p>',
      },
      {
        component: 'rich_text',
        _uid: 'auth-step-1',
        html: '<h2>Request a token</h2><p>Call the auth endpoint with your API key. The CLI handles the request for you.</p>',
      },
      {
        component: 'code_block',
        _uid: 'auth-step-1-cmd',
        language: 'bash',
        filename: 'Terminal',
        code: 'export KITEWOOF_API_KEY="kw_live_••••••••"\nkitewoof auth get-token',
      },
      {
        component: 'rich_text',
        _uid: 'auth-step-2',
        html: '<h2>Use the token</h2><p>Attach the token to any call. Replace <code>$TOKEN</code> with the value from the previous step.</p>',
      },
      {
        component: 'code_block',
        _uid: 'auth-step-2-cmd',
        language: 'bash',
        filename: 'Terminal',
        code: 'curl https://api.kitewoof.dev/v1/kites \\\n  -H "Authorization: Bearer $TOKEN"',
      },
      {
        component: 'data_table',
        _uid: 'auth-errors',
        caption: 'Common authentication errors',
        headers: ['Status', 'Meaning', 'Fix'],
        rows: [
          ['401', 'Missing or expired token', 'Request a fresh token with the auth command'],
          ['403', 'Token lacks the needed scope', 'Add the scope to the API key in the dashboard'],
          ['429', 'Too many token requests', 'Cache the token for its full one-hour lifetime'],
        ],
      },
      {
        component: 'callout',
        _uid: 'auth-warning',
        variant: 'warning',
        title: 'Rotate leaked keys immediately',
        html: '<p>If you accidentally commit an API key, revoke it in the dashboard before you push a cleanup commit. A rewritten history does not un-publish a key.</p>',
      },
    ],
  },
};
