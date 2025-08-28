import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

const timeout = 30000
const waitTimeout = 3000

const url = process.env.URL || 'https://developers.krungthai.com/'

test.describe('Landing page', () => {
  test.beforeAll(async () => {
    // Create screenshot directory
    const screenshotDir = path.join(process.cwd(), '_screenshot_')
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true })
      console.log(`📁 Created directory: ${screenshotDir}`)
    }
  })

  test.beforeEach(async ({ page }) => {
    // Navigate to the page
    await page.goto('https://developers.krungthai.com/', {
      waitUntil: 'load',
      timeout: timeout,
    })

    // Additional wait for any dynamic content
    await page.waitForTimeout(waitTimeout)
    console.log('⏱️  Page preparation completed')
  })

  test('developers landing page has title', async ({ page }) => {
    await page.goto(url)
    await expect(page).toHaveTitle(/Krungthai Developers/)
  })

  test('take baseline screenshot of developers landing page', async ({ page }) => {
    const screenshotPath = path.join(process.cwd(), '_screenshot_', 'krungthai-developers-baseline.png')

    // Check if baseline already exists
    if (fs.existsSync(screenshotPath)) {
      const stats = fs.statSync(screenshotPath)
      return
    }

    // Take baseline screenshot
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      animations: 'disabled',
    })

    // Verify file was created
    if (fs.existsSync(screenshotPath)) {
      const stats = fs.statSync(screenshotPath)
    } else {
      throw new Error('Failed to create baseline screenshot')
    }
  })

  test('Screenshots of developers landing page', async ({ page }) => {
    await page.goto(url, { waitUntil: 'load', timeout: timeout })

    // Additional wait for any dynamic content
    await page.waitForTimeout(waitTimeout)

    const screenshotPath = path.join(process.cwd(), 'screenshot', 'krungthai-developers-full.png')

    // Take and compare screenshot
    await expect(page).toHaveScreenshot(screenshotPath, {
      fullPage: true,
      animations: 'disabled',
    })
  })
})
