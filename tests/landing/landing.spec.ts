import { test, expect } from '@playwright/test'
import { EXPECTED_PRODUCTS } from './config'

const PAGE_LOAD_TIMEOUT = 30000
const WAIT_TIMEOUT = 3000

test.describe('Landing Page Actions', async () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL || '', { timeout: PAGE_LOAD_TIMEOUT })
  })

  test('should navigate to Getting Started page when clicking Get Started button', async ({ page, baseURL }) => {
    await page.locator('[data-test-id="btnGetStarted"]').click()
    const expectedPath = `${baseURL}/documentation/introduction/getting-started/`

    await expect(page).toHaveURL(expectedPath)
    await page.waitForTimeout(WAIT_TIMEOUT)
    await expect(page.locator('[data-test-id="conBanner"] [data-test-id="lblTitle"]')).toMatchAriaSnapshot(`
        - heading "Getting Started" [level=1]
      `)
  })

  test('should navigate to Direct Debit Registration documentation when clicking first product button', async ({ page, baseURL }) => {
    await page.locator('.btn.custom-btn.btn-large.AppItemImage_viewButton__ufUZx').first().click()
    const expectedPath = `${baseURL}/documentation/direct-debit/direct-debit-registration/product-introduction/`

    await expect(page).toHaveURL(expectedPath)
    await page.waitForTimeout(WAIT_TIMEOUT)
    await expect(page.locator('[data-test-id="conBanner"] [data-test-id="lblTitle"]')).toMatchAriaSnapshot(`
          - heading "Direct Debit Registration" [level=1]
      `)
  })

  test('should navigate to Direct Debit documentation when clicking first product button', async ({ page, baseURL }) => {
    await page.locator('.col-xl-6 > .btn').first().click()
    const expectedPath = `${baseURL}/documentation/direct-debit/direct-debit/product-introduction/`

    await expect(page).toHaveURL(expectedPath)
    await page.waitForTimeout(WAIT_TIMEOUT)
    await expect(page.locator('[data-test-id="conBanner"] [data-test-id="lblTitle"]')).toMatchAriaSnapshot(`
          - heading "Direct Debit" [level=1]
      `)
  })

  test('should navigate to Authentication (App-to-App) documentation when clicking first product button', async ({ page, baseURL }) => {
    await page.locator('div:nth-child(4) > .container > .row > #detail > .col-ml-5 > .btn').first().click()
    const expectedPath = `${baseURL}/documentation/authentication/authentication-app-to-app/product-introduction/`

    await expect(page).toHaveURL(expectedPath)
    await page.waitForTimeout(WAIT_TIMEOUT)
    await expect(page.locator('[data-test-id="conBanner"] [data-test-id="lblTitle"]')).toMatchAriaSnapshot(`
          - heading "Authentication (App-to-App)" [level=1]
      `)
  })

  test('should navigate to Authentication (QR Scan) documentation when clicking first product button', async ({ page, baseURL }) => {
    await page.locator('div:nth-child(5) > .row > .col-xl-6.mt-5 > .btn').first().click()
    const expectedPath = `${baseURL}/documentation/authentication/authentication-qr-scan/product-introduction/`

    await expect(page).toHaveURL(expectedPath)
    await page.waitForTimeout(WAIT_TIMEOUT)
    await expect(page.locator('[data-test-id="conBanner"] [data-test-id="lblTitle"]')).toMatchAriaSnapshot(`
          - heading "Authentication (QR Scan)" [level=1]
      `)
  })
})

test.describe('2-LEGGED Product card', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL || '', { timeout: PAGE_LOAD_TIMEOUT })
  })

  test('should display 2-LEGGED Product card', async ({ page }) => {
    const productCard = page.locator('[data-test-id="conProductList"]')
    await expect(productCard).toBeVisible()
    const productCardItem = productCard.locator('[data-test-id="conProductItem"]')
    await expect(productCardItem).toHaveCount(3)
    for (let i = 0; i < 3; i++) {
      const productItem = productCardItem.nth(i)
      await expect(productItem).toBeVisible()

      // Verify title matches expected
      await expect(productItem).toContainText(EXPECTED_PRODUCTS[i].title)

      // Verify description matches expected
      await expect(productItem).toContainText(EXPECTED_PRODUCTS[i].description)

      // Verify View button is present and visible
      const viewButton = productItem.locator('button:has-text("View")')
      await expect(viewButton).toBeVisible()

      // Verify Fund Transfer tag is present
      const badge = productItem.locator('[data-test-id="bdgLabel"]')
      await expect(badge).toBeVisible()
      await expect(badge).toContainText('Fund Transfer')

      // Verify link URL is correct
      const link = productItem.locator('a')
      const href = await link.getAttribute('href')
      const expectedLinks = [
        '/documentation/fund-transfer/fund-transfer-to-krungthai-account/product-introduction/',
        '/documentation/fund-transfer/fund-transfer-to-other-bank-account/product-introduction/',
        '/documentation/fund-transfer/fund-transfer-to-prompt-pay/product-introduction/',
      ]
      expect(href).toBe(expectedLinks[i])
    }
  })
})

test.describe('Landing Page Visual Tests', () => {
  test('should match full page screenshot baseline', async ({ page, baseURL }) => {
    await page.goto(baseURL || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
