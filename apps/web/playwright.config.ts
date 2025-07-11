import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    process.env.CI ? ['github'] : ['list'],
  ],

  outputDir: 'test-results/',

  use: {
    testIdAttribute: 'data-testid',

    actionTimeout: 10_000,
    navigationTimeout: 30_000,

    locale: 'uk-UA',
    timezoneId: 'Europe/Kiev',

    extraHTTPHeaders: {
      'Accept-Language': 'uk,en',
    },
  },

  projects: [
    {
      name: 'e2e',
      testMatch: '**/e2e/**/*.test.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4173',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
      },
    },
    {
      name: 'mobile-e2e',
      testMatch: '**/e2e/**/*.test.ts',
      use: {
        ...devices['iPhone 13'],
        baseURL: 'http://localhost:4173',
      },
    },
  ],

  expect: {
    toHaveScreenshot: {
      threshold: 0.3,
    },
    timeout: 10_000,
  },

  webServer: {
    command: 'pnpm build && pnpm start',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    env: {
      VITE_API_URL: process.env.VITE_API_URL ?? 'http://localhost:8000',
    },
  },
});
