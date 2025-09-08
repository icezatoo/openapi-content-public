import { test, expect } from '@playwright/test'

const PAGE_LOAD_TIMEOUT = 30000
const WAIT_TIMEOUT = 3000

test.describe('Fund Transfer to PromptPay Development Guidelines - Visual Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/documentation/fund-transfer/fund-transfer-to-prompt-pay/development-guidelines/` || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
  })
  test('should match full page screenshot baseline', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
