import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Налаштування виконання тестів
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  // Репортери
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    process.env.CI ? ['github'] : ['list'],
  ],

  // Директорії для артефактів
  outputDir: 'test-results/',

  // Глобальні налаштування тестів
  use: {
    // Селектори з data-testid
    testIdAttribute: 'data-testid',

    // Таймаути
    actionTimeout: 10_000,
    navigationTimeout: 30_000,

    // Локалізація
    locale: 'uk-UA',
    timezoneId: 'Europe/Kiev',

    // Заголовки
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
        baseURL: 'http://localhost:3000',
        // Скріншоти лише при помилках
        screenshot: 'only-on-failure',
        // Відео для debugging
        video: 'retain-on-failure',
        // Trace для детального debugging
        trace: 'on-first-retry',
      },
    },
    // Мобільні тести (опціонально)
    {
      name: 'mobile-e2e',
      testMatch: '**/e2e/**/*.test.ts',
      use: {
        ...devices['iPhone 13'],
        baseURL: 'http://localhost:3000',
      },
    },
  ],

  // Очікування на селектори
  expect: {
    // Візуальні порівняння
    toHaveScreenshot: {
      threshold: 0.3,
    },
    // Таймаут для очікувань
    timeout: 10_000,
  },
});
