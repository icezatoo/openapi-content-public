import { test, expect } from '@playwright/test'
import { EXPECTED_PRODUCTS } from './config'

const PAGE_LOAD_TIMEOUT = 30000
const WAIT_TIMEOUT = 3000

test.describe('Landing Page UI Elements', async () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL || '', { timeout: PAGE_LOAD_TIMEOUT })
  })

  test('should display api product hero', async ({ page }) => {
    const apiProductHero = page.getByText('API PRODUCTSElevate your')
    await expect(apiProductHero).toBeVisible()
    await expect(apiProductHero).toMatchAriaSnapshot(`
       - heading "API PRODUCTS" [level=1]
       - paragraph: Elevate your website and application service to the next level with API products from Krungthai Developers. Experience the innovative approaches in application development like never before.
       - button "Get Started"
       - button "My Apps"
      `)
  })

  test('should display direct debit registration hero', async ({ page }) => {
    const ddrHero = page.getByText('Direct Debit RegistrationDirect DebitDirect Debit Registration provides a')
    await expect(ddrHero).toBeVisible()
    await expect(ddrHero).toMatchAriaSnapshot(`
      - heading "Direct Debit Registration" [level=1]
      - text: Direct Debit
      - paragraph: Direct Debit Registration provides a convenient and secure way for your customers to set up auto-debit from anywhere and at any time. Your customers can easily register for Direct Debit in just a few simple steps, allowing them to seamlessly connect to your applications whenever and wherever they desire.
      - button "View"
    `)
  })

  test('should display direct debit  hero', async ({ page }) => {
    const ddrHero = page.getByText('Direct DebitDirect DebitDirect Debit enables daily, 24/7 availability,')
    await expect(ddrHero).toBeVisible()
    await expect(ddrHero).toMatchAriaSnapshot(`
    - heading "Direct Debit" [level=1]
    - text: Direct Debit
    - paragraph: Direct Debit enables daily, 24/7 availability, convenience, and secure debiting for your clients. You can conveniently and securely deduct money directly from your clients, with 24/7 availability, when the clients have previously consented to the deduction.
    - button "View"
    `)
  })

  test('should display Authentication (App-to-App) hero', async ({ page }) => {
    const appTwoAppHero = page.getByText('Authentication (App-to-App)AuthenticationAuthentication (App-to-App) enables')
    await expect(appTwoAppHero).toBeVisible()
    await expect(appTwoAppHero).toMatchAriaSnapshot(`
   - heading "Authentication (App-to-App)" [level=1]
   - text: Authentication
   - paragraph: Authentication (App-to-App) enables user to securely and seamlessly log in to your application with their Paotang accounts. Once user has completed the easy-to-follow steps on Paotang application, they can use Authentication (App-to-App) as a log-in method for your application.
   - button "View"
    `)
  })

  test('should display Authentication (QR Scan) hero', async ({ page }) => {
    const appQRHero = page.getByText('Authentication (QR Scan)AuthenticationAuthentication (QR scan) provides QR scan')
    await expect(appQRHero).toBeVisible()
    await expect(appQRHero).toMatchAriaSnapshot(`
    - heading "Authentication (QR Scan)" [level=1]
    - text: Authentication
    - paragraph: Authentication (QR scan) provides QR scan login via Paotang application, allowing user on a partner's website to log in with a few easy steps. User can use their mobile camera or Paotang's in-app camera to scan a QR code and provide consent to send their information to a partner's website before logging in.
    - button "View"
    `)
  })

  test('should display become a partner section', async ({ page }) => {
    const becomePartnerSection = page.locator('[data-test-id="conStepsBecome"]')
    await expect(becomePartnerSection).toBeVisible()
    await expect(becomePartnerSection).toMatchAriaSnapshot(`
- heading "3 Steps to Become Our Partner" [level=1]
- paragraph: Follow these 3 steps to become our partner and experience fast and convenient services from Krungthai Developers.
- list:
  - listitem:
    - heading "Request to Register" [level=3]
    - paragraph:
      - text: Request to sign up
      - link "here":
        - /url: /
      - text: . Our team will contact you back within the following days.
  - listitem:
    - heading "Prepare Documents" [level=3]
    - paragraph:
      - text: Prepare these registration documents. You can check the required document list here,
      - link "see registration documents":
        - /url: /documentation/introduction/getting-started/
  - listitem:
    - heading "Register via Invitation Link" [level=3]
    - paragraph: Complete the onboarding process using our invitation link sent to your email address. Then you are all set!
    `)
  })
})

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
