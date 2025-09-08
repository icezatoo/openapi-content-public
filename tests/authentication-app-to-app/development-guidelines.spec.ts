import { test, expect } from '@playwright/test'

const PAGE_LOAD_TIMEOUT = 30000
const WAIT_TIMEOUT = 3000

test.describe('Authentication (App-to-App) Development Guide Line Visual Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/documentation/authentication/authentication-app-to-app/development-guidelines/` || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
  })
  test('should match full page screenshot baseline', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
