/**
 * QA de la web final con Playwright.
 *
 *   npm run preview -- --port 4173
 *   node scripts/qa.mjs
 *
 * Genera capturas en docs/qa/ y comprueba:
 * - título y un solo h1 por ruta
 * - desbordamiento horizontal en móvil
 * - imágenes rotas
 * - errores de consola y de página
 * - peticiones a terceros antes de interactuar
 * - enlaces internos con rutas conocidas
 * - buscador, acordeón de FAQ y carga diferida del mapa
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const BASE = process.env.QA_BASE || 'http://localhost:4173'
const OUT = path.join(process.cwd(), 'docs', 'qa')
const ROUTES = [
  { path: '/', name: 'inicio' },
  { path: '/carta', name: 'carta' },
  { path: '/el-local', name: 'el-local' },
  { path: '/resenas', name: 'resenas' },
  { path: '/aviso-legal', name: 'aviso-legal' },
  { path: '/politica-de-cookies', name: 'politica-de-cookies' },
  { path: '/esta-pagina-no-existe', name: '404' },
]
const WIDTHS = [375, 768, 1440]
const KNOWN = new Set([
  '/',
  '/carta',
  '/el-local',
  '/resenas',
  '/aviso-legal',
  '/politica-de-cookies',
  '/informacion',
  '/contacto',
  '/cookies',
])

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const problems = []
const summary = []

for (const width of WIDTHS) {
  for (const route of ROUTES) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 812 : 900 },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()
    const consoleErrors = []
    const pageErrors = []
    const thirdParty = []

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('pageerror', (error) => pageErrors.push(error.message))
    page.on('request', (request) => {
      const url = new URL(request.url())
      if (url.origin !== BASE && !url.protocol.startsWith('data')) thirdParty.push(request.url())
    })

    try {
      const response = await page.goto(`${BASE}${route.path}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      })

      if (!response || response.status() >= 400) {
        problems.push(`${route.path} @${width}: HTTP ${response ? response.status() : 'sin respuesta'}`)
      }

      /* Recorre la página para que se carguen las imágenes con loading="lazy". */
      await page.evaluate(async () => {
        const step = Math.max(400, window.innerHeight * 0.8)
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y)
          await new Promise((resolve) => setTimeout(resolve, 40))
        }
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(600)

      const info = await page.evaluate(() => ({
        title: document.title,
        h1: [...document.querySelectorAll('h1')].map((el) => el.textContent.trim()),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        brokenImages: [...document.images]
          .filter((img) => img.getClientRects().length > 0)
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
        links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
        iframes: document.querySelectorAll('iframe').length,
      }))

      if (!info.title) problems.push(`${route.path} @${width}: sin título`)
      if (info.h1.length !== 1) {
        problems.push(`${route.path} @${width}: ${info.h1.length} h1 (${info.h1.join(' | ')})`)
      }
      if (info.overflow > 1) {
        problems.push(`${route.path} @${width}: desbordamiento horizontal de ${info.overflow}px`)
      }
      if (info.brokenImages.length) {
        problems.push(`${route.path} @${width}: imágenes rotas → ${info.brokenImages.join(', ')}`)
      }

      const internal = info.links.filter((href) => href && href.startsWith('/') && !href.startsWith('//'))
      for (const href of internal) {
        const clean = href.split('#')[0].split('?')[0]
        if (clean && !KNOWN.has(clean)) {
          problems.push(`${route.path} @${width}: enlace interno desconocido ${href}`)
        }
      }

      if (route.name === '404' && !info.h1.some((text) => text.includes('no está en la carta'))) {
        problems.push(`404 @${width}: el h1 no es el esperado`)
      }

      await page.screenshot({
        path: path.join(OUT, `${route.name}-${width}.jpg`),
        fullPage: true,
        type: 'jpeg',
        quality: 78,
      })

      summary.push({
        width,
        route: route.path,
        title: info.title,
        h1: info.h1,
        overflow: info.overflow,
        iframes: info.iframes,
        thirdParty,
        consoleErrors,
        pageErrors,
      })

      if (consoleErrors.length) problems.push(`${route.path} @${width}: consola → ${consoleErrors.join(' / ')}`)
      if (pageErrors.length) problems.push(`${route.path} @${width}: página → ${pageErrors.join(' / ')}`)
      if (thirdParty.length) problems.push(`${route.path} @${width}: terceros al cargar → ${thirdParty.join(', ')}`)
    } catch (error) {
      problems.push(`${route.path} @${width}: ${error.message}`)
    } finally {
      await context.close()
    }
  }
}

/* Interacciones en escritorio. */
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  try {
    /* Buscador de la carta. */
    await page.goto(`${BASE}/carta`, { waitUntil: 'networkidle' })
    await page.getByLabel('Buscar un plato en la carta').fill('tajín')
    await page.waitForTimeout(300)
    const searchStatus = await page.locator('[role="status"]').last().textContent()
    const visibleDishes = await page.locator('article, li').count()
    await page.screenshot({ path: path.join(OUT, 'carta-busqueda.jpg'), fullPage: false, type: 'jpeg', quality: 80 })

    if (!searchStatus || !/\d/.test(searchStatus)) {
      problems.push(`Buscador: estado inesperado → ${searchStatus}`)
    }

    /* Limpiar y probar la navegación de categorías. */
    await page.getByRole('button', { name: 'Limpiar' }).click()
    await page.getByRole('button', { name: 'Pescado', exact: true }).click()
    await page.waitForTimeout(500)

    /* Acordeón de FAQ. */
    await page.goto(`${BASE}/el-local`, { waitUntil: 'networkidle' })
    const secondQuestion = page.getByRole('button', { name: /Hace falta reservar/i })
    const before = await secondQuestion.getAttribute('aria-expanded')
    await secondQuestion.click()
    const after = await secondQuestion.getAttribute('aria-expanded')
    if (before !== 'false' || after !== 'true') {
      problems.push(`FAQ: aria-expanded no cambia (${before} → ${after})`)
    }

    /* Mapa diferido. */
    const framesBefore = await page.locator('iframe').count()
    await page.getByRole('button', { name: 'Cargar mapa' }).click()
    await page.waitForTimeout(800)
    const framesAfter = await page.locator('iframe').count()
    if (framesBefore !== 0 || framesAfter !== 1) {
      problems.push(`Mapa: iframes antes=${framesBefore}, después=${framesAfter}`)
    }

    /* Enlace de teléfono. */
    const tel = await page.locator('a[href^="tel:"]').first().getAttribute('href')
    if (tel !== 'tel:+34666055526') problems.push(`Teléfono inesperado: ${tel}`)

    /* JSON-LD. */
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
    const types = jsonLd
      .map((text) => {
        try {
          return JSON.parse(text)['@type']
        } catch {
          return 'JSON inválido'
        }
      })
      .join(', ')
    if (!types.includes('FAQPage')) problems.push(`JSON-LD sin FAQPage en /el-local (${types})`)

    if (errors.length) problems.push(`Interacciones: consola → ${errors.join(' / ')}`)
    summary.push({ interactions: { searchStatus, visibleDishes, framesBefore, framesAfter, tel, types } })
  } catch (error) {
    problems.push(`Interacciones: ${error.message}`)
  } finally {
    await context.close()
  }
}

await browser.close()
await writeFile(path.join(OUT, 'resumen.json'), JSON.stringify({ problems, summary }, null, 2))

console.log(`\nCapturas en docs/qa/ (${ROUTES.length * WIDTHS.length} páginas).`)
if (problems.length) {
  console.log(`\n${problems.length} problema(s):`)
  problems.forEach((problem) => console.log(`  - ${problem}`))
  process.exitCode = 1
} else {
  console.log('Sin problemas en las comprobaciones automáticas.')
}
