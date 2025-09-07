import { test, expect } from '@playwright/test'

const PAGE_LOAD_TIMEOUT = 30000
const WAIT_TIMEOUT = 3000

test.describe('Fund Transfer Development Guidelines - Documentation Content Validation', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/documentation/fund-transfer/fund-transfer-to-krungthai-account/development-guidelines/` || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
    const layout = page.locator('[data-test-id="conMarkdown"]')
    await expect(layout).toBeVisible()
  })

  test.describe('Step 1: Client Credentials Registration Process', () => {
    test('should display Step 1 section heading with anchor link for client credential setup', async ({ page }) => {
      const stepOneHeading = page.locator('#step-1-get-client-id-and-client-secret')

      await expect(stepOneHeading).toBeVisible()
      await expect(stepOneHeading).toHaveText('Step 1 Get Client ID and Client Secret')

      // Verify heading has proper anchor link functionality
      const headingId = await stepOneHeading.getAttribute('id')
      expect(headingId).toBe('step-1-get-client-id-and-client-secret')
    })

    test('should validate complete Krungthai Developers Console registration workflow content structure', async ({ page }) => {
      const stepOneContent = page.getByRole('list').filter({ hasText: 'You need to provide the' })
      await expect(stepOneContent).toBeVisible()
      await expect(stepOneContent).toMatchAriaSnapshot(`
  - list:
    - paragraph:
      - text: You need to provide the following information on
      - link "Krungthai Developers Console":
        - /url: /console/sandbox
      - text: in order to get the client ID and client secret.
    - list:
      - listitem: Provide an application name.
      - listitem: Provide a logo.
    - list:
      - listitem: "Remarks:"
      - listitem: Image should be a circle shape. If not, it will be adjusted to a circle.
      - listitem: Resolution must be 192x192 px.
      - listitem: File size must NOT exceed 50 KB.
      - listitem: File format must be .png.
    - list:
      - listitem: Choose an API product.
    - list:
      - listitem: Choose 'Fund Transfer to Krungthai Account'.
    - list:
      - listitem:
        - text: Enter your IP addresses as verification is required for some API products.
        - link "Click here to check the list of API products on ‘Step 2 Create Your Application’.":
          - /url: /documentation/introduction/getting-started/
    - paragraph: Once registered, you will receive this following information for API integration.
    - list:
      - listitem: client ID
      - listitem: client secret
      `)
    })
  })
})

test.describe('Fund Transfer Development Guide Line Visual Tests', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/documentation/fund-transfer/fund-transfer-to-krungthai-account/development-guidelines/` || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
  })
  test('should match full page screenshot baseline', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
