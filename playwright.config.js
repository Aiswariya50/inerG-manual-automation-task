// @ts-check
import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const runId = process.env.PW_RUN_ID ?? `${Date.now()}-${process.pid}`;

export default defineConfig({
  testDir: './tests',
  outputDir: path.join('test-results', runId),

  /* Run tests sequentially - single worker for all 3 cases */
  fullyParallel: false,
  workers: 1,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Show each test pass/fail result in terminal */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: path.join('playwright-report', runId) }],
  ],

  /* Shared settings for all projects */
  use: {
    trace: 'off',
    video: 'off',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          args: ['--kiosk', '--start-maximized'],
        },
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
