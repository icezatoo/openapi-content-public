import { test, expect } from '@playwright/test'

const PAGE_LOAD_TIMEOUT = 30000
const WAIT_TIMEOUT = 3000

test.describe('Direct Debit Development Guide Line Visual Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/documentation/direct-debit/direct-debit/development-guidelines/` || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
  })
  test('should match full page screenshot baseline', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
