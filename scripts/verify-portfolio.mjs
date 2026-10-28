import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../', import.meta.url))
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4187'
const screenshots = process.env.SCREENSHOT_DIR
const server = process.env.PORTFOLIO_URL ? null : spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4187', '--strictPort'], { cwd: root, detached: true, stdio: ['ignore', 'pipe', 'pipe'] })
let browser

try {
  if (server) await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Preview server did not start')), 15000)
    server.stdout.on('data', (data) => {
      if (data.toString().includes('127.0.0.1:4187')) { clearTimeout(timeout); resolve() }
    })
    server.once('exit', (code) => { clearTimeout(timeout); reject(new Error(`Preview server exited: ${code}`)) })
  })
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH, args: ['--enable-unsafe-swiftshader'] })
  if (screenshots) mkdirSync(screenshots, { recursive: true })
  for (const locale of ['en', 'pt']) {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ locale, viewport: { width, height: width > 900 ? 1000 : 844 }, reducedMotion: 'reduce' })
      const page = await context.newPage()
      const errors = []
      const requests = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('request', (request) => requests.push(request.url()))
      const go = async (path) => {
        await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' })
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Horizontal overflow at ${width}px: ${path}`)
      }
      await go('/')
      await page.locator('.site-intro').waitFor()
      assert.equal(await page.locator('html').getAttribute('lang'), locale)
      const intro = page.locator('.site-intro')
      const viewProjects = intro.getByRole('link', { name: locale === 'en' ? 'View projects' : 'Ver projetos', exact: true })
      const download = intro.getByRole('link', { name: locale === 'en' ? 'Download CV' : 'Baixar CV', exact: true })
      for (const link of [viewProjects, download, intro.locator('a[href="#contact"]'), intro.locator('a[href^="mailto:"]'), intro.getByRole('link', { name: 'GitHub', exact: true })]) {
        const box = await link.boundingBox()
        assert.ok(box && box.y >= 0 && box.y + box.height <= page.viewportSize().height, `Intro link is below the first screen at ${width}px`)
      }
      assert.equal(await download.getAttribute('href'), `/cv-${locale}.pdf`)
      assert.equal(await page.locator('.project-title').first().innerText(), 'Chat Terminal')
      assert.equal(await page.locator('.project-title').count(), 5)
      assert.match(await page.locator('#experience').innerText(), /Genova/)
      assert.match(await page.locator('#experience').innerText(), /Westpoint/)
      if (screenshots) await page.screenshot({ path: `${screenshots}/${locale}-${width}-scroll.png` })
      await viewProjects.click()
      assert.equal(new URL(page.url()).hash, '#projects')
      await page.locator('.project-focus-nav').getByRole('link', { name: locale === 'en' ? 'Systems & desktop' : 'Sistemas e desktop', exact: true }).click()
      await page.waitForURL('**/?focus=systems#projects')
      await page.locator('.project-title').first().waitFor()
      await page.waitForFunction(() => {
        const top = document.getElementById('projects')?.getBoundingClientRect().top
        return top !== undefined && top >= 0 && top < 60
      }, null, { timeout: 3000 })
      assert.deepEqual((await page.locator('.project-title').allTextContents()).slice(0, 2), ['L.A.R.P.', 'PlumCrate'])
      if (screenshots) await page.screenshot({ path: `${screenshots}/${locale}-${width}-systems.png` })
      await page.locator('#project-larp .case-study summary').click()
      assert.match(await page.locator('#project-larp .case-study').innerText(), /900 \/ 900/)
      assert.match(await page.locator('#project-larp .case-study').innerText(), locale === 'en' ? /7\.585 ms/ : /7,585 ms/)
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Expanded evidence overflows the viewport')
      await page.locator('#project-plumcrate .app-screenshot img').first().scrollIntoViewIfNeeded()
      await page.waitForFunction(() => document.querySelector('#project-plumcrate img')?.naturalWidth === 1440)
      assert.equal(requests.some((url) => /PlasmaWallpaper|DesktopPortfolio/.test(url)), false, 'The scrolling view loaded the desktop or wallpaper')
      const response = await context.request.get(new URL(`/cv-${locale}.pdf`, base).href)
      assert.equal(response.status(), 200)
      assert.deepEqual(await response.body(), readFileSync(`${root}/public/cv-${locale}.pdf`))
      await page.getByRole('button', { name: locale === 'en' ? 'Switch to Portuguese' : 'Mudar para inglês', exact: true }).click()
      assert.equal(await intro.getByRole('link', { name: locale === 'en' ? 'Baixar CV' : 'Download CV', exact: true }).getAttribute('href'), `/cv-${locale === 'en' ? 'pt' : 'en'}.pdf`)
      await page.waitForFunction((expected) => document.documentElement.lang === expected, locale === 'en' ? 'pt' : 'en')
      assert.deepEqual(errors, [], errors.join('\n'))
      console.log(`PASS ${locale} ${width}px scrolling: immediate actions, grouping, evidence, no 3D download, employment, language, PDF`)
      await context.close()
    }
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ locale, viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
      const page = await context.newPage()
      await page.goto(new URL('/?view=desktop', base).href, { waitUntil: 'networkidle' })
      await page.getByRole('button', { name: locale === 'en' ? 'View projects' : 'Ver projetos', exact: true }).click()
      const projects = width > 900 ? page.getByRole('dialog', { name: locale === 'en' ? 'Projects' : 'Projetos', exact: true }) : page.locator('#mobile-content')
      const source = projects.getByRole('link', { name: locale === 'en' ? 'Source code' : 'Código-fonte', exact: true }).first()
      const box = await source.boundingBox()
      const container = await projects.boundingBox()
      assert.ok(box && container && box.y + box.height <= container.y + container.height, 'First source link needs scrolling')
      assert.equal(await projects.locator('.project-title').first().innerText(), 'Chat Terminal')
      if (width > 900) {
        assert.equal(await page.locator('.desktop-help p').isVisible(), false)
        await page.locator('.desktop-help summary').click()
        assert.equal(await page.locator('.desktop-help p').isVisible(), true)
      } else assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      if (screenshots) await page.screenshot({ path: `${screenshots}/${locale}-${width}-desktop.png` })
      await page.getByRole('link', { name: locale === 'en' ? 'Scroll view' : 'Visão contínua', exact: true }).click()
      await page.locator('.scroll-portfolio').waitFor()
      console.log(`PASS ${locale} ${width}px desktop experience: direct project action, visible source link, help, view switch`)
      await context.close()
    }
  }
} finally {
  await browser?.close()
  if (server) process.kill(-server.pid, 'SIGTERM')
}
