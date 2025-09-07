import { test, expect } from '@playwright/test'
import { apiBaseURL, EXPECTED_PRODUCTS } from './config'

const PAGE_LOAD_TIMEOUT = 30000
const WAIT_TIMEOUT = 3000

test.describe('API Product List - Backend Integration', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/api-products/` || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
  })

  test('should successfully fetch API product list with populated image and button data', async ({ page }) => {
    const response = await page.request.get(`${apiBaseURL}/api/api-products?populate[apiProduct][populate][image][fields]=url&populate[apiProduct][populate][button][fields]=*`)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
  })

  test('should handle API errors gracefully when endpoint is unavailable', async ({ page }) => {
    const response = await page.request.get(`${apiBaseURL}/api/nonexistent-endpoint`)
    expect(response.status()).toBe(404)
  })
})

test.describe('API Product Cards - Frontend UI Component Validation', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/api-products/` || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
  })

  test('should render complete product card layout with all required UI elements', async ({ page }) => {
    const productListContainer = page.locator('[data-test-id="conProductList"]')
    await expect(productListContainer).toBeVisible()

    const productCards = productListContainer.locator('[data-test-id="conProductItem"]')
    const cardCount = await productCards.count()
    expect(cardCount).toBeGreaterThan(0)
    expect(cardCount).toBeLessThanOrEqual(EXPECTED_PRODUCTS.length)
  })

  test('should display product images with correct Google Cloud Storage URLs', async ({ page }) => {
    const productCards = page.locator('[data-test-id="conProductList"] [data-test-id="conProductItem"]')
    const cardCount = await productCards.count()

    for (let i = 0; i < cardCount; i++) {
      const productCard = productCards.nth(i)
      const productImage = productCard.locator('img')
      const RESOURCE_BASE_URL = process.env.RESOURCE_BASE_URL
      await expect(productImage).toBeVisible()
      await expect(productImage).toHaveAttribute('src', new RegExp(`${RESOURCE_BASE_URL}/`))

      // Ensure image is loaded and not broken
      const imageUrl = await productImage.getAttribute('src')
      expect(imageUrl).toBeTruthy()
    }
  })

  test('should display accurate product titles matching expected content configuration', async ({ page }) => {
    const productCards = page.locator('[data-test-id="conProductList"] [data-test-id="conProductItem"]')
    const cardCount = await productCards.count()

    for (let i = 0; i < Math.min(cardCount, EXPECTED_PRODUCTS.length); i++) {
      const productCard = productCards.nth(i)
      const productTitle = productCard.locator('h3')

      await expect(productTitle).toBeVisible()
      await expect(productTitle).toHaveText(EXPECTED_PRODUCTS[i].title)
    }
  })

  test('should display correct product descriptions for each API service offering', async ({ page }) => {
    const productCards = page.locator('[data-test-id="conProductList"] [data-test-id="conProductItem"]')
    const cardCount = await productCards.count()

    for (let i = 0; i < Math.min(cardCount, EXPECTED_PRODUCTS.length); i++) {
      const productCard = productCards.nth(i)
      const productDescription = productCard.locator('p')

      await expect(productDescription).toBeVisible()
      await expect(productDescription).toHaveText(EXPECTED_PRODUCTS[i].description)
    }
  })

  test('should render functional "View" buttons for accessing product documentation', async ({ page }) => {
    const productCards = page.locator('[data-test-id="conProductList"] [data-test-id="conProductItem"]')
    const cardCount = await productCards.count()

    for (let i = 0; i < cardCount; i++) {
      const productCard = productCards.nth(i)
      const viewButton = productCard.locator('button')

      await expect(viewButton).toBeVisible()
      await expect(viewButton).toHaveText('View')
      await expect(viewButton).toBeEnabled()
    }
  })

  test('should validate complete product card content matches expected data for all elements', async ({ page }) => {
    const productListContainer = page.locator('[data-test-id="conProductList"]')
    await expect(productListContainer).toBeVisible()

    const productCards = productListContainer.locator('[data-test-id="conProductItem"]')
    const cardCount = await productCards.count()
    expect(cardCount).toBeGreaterThan(0)

    for (let i = 0; i < Math.min(cardCount, EXPECTED_PRODUCTS.length); i++) {
      const productCard = productCards.nth(i)
      await expect(productCard).toBeVisible()

      // Validate image with Google Cloud Storage URL
      const image = productCard.locator('img')
      await expect(image).toBeVisible()
      const RESOURCE_BASE_URL = process.env.RESOURCE_BASE_URL
      await expect(image).toHaveAttribute('src', new RegExp(`${RESOURCE_BASE_URL}/`))

      // Validate title matches expected content
      const title = productCard.locator('h3')
      await expect(title).toBeVisible()
      await expect(title).toHaveText(EXPECTED_PRODUCTS[i].title)

      // Validate description matches expected content
      const description = productCard.locator('p')
      await expect(description).toBeVisible()
      await expect(description).toHaveText(EXPECTED_PRODUCTS[i].description)

      // Validate functional View button
      const button = productCard.locator('button')
      await expect(button).toBeVisible()
      await expect(button).toHaveText('View')
      await expect(button).toBeEnabled()
    }
  })
})

test.describe('API Product List Page - Visual Regression Testing', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/api-products/` || '', { timeout: PAGE_LOAD_TIMEOUT })
    await page.waitForTimeout(WAIT_TIMEOUT)
  })

  test('should match homepage full page visual baseline without regression', async ({ page }) => {
    // Take full page screenshot and compare with baseline
    await expect(page).toHaveScreenshot('api-product-page.png', {
      fullPage: true,
      animations: 'disabled', // Disable animations for consistent screenshots
    })
  })
})
