import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { contacts, cvInfo, profile, projects, skillGroups } from '../src/data/portfolioContent.ts'
import { cvContent } from '../src/data/cvContent.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const chromium = process.env.CHROMIUM_PATH || 'chromium'
const workDir = mkdtempSync(join(tmpdir(), 'portfolio-cv-'))
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char])
const link = (href, label) => `<a href="${escape(href)}">${escape(label)}</a>`

const labels = {
  en: { summary: 'Summary', experience: 'Experience', projects: 'Selected projects', skills: 'Technical skills', education: 'Education', languages: 'Languages' },
  pt: { summary: 'Resumo', experience: 'Experiência', projects: 'Projetos selecionados', skills: 'Habilidades técnicas', education: 'Formação', languages: 'Idiomas' },
}

function renderCv(locale) {
  const t = (value) => escape(value[locale])
  const section = (heading, body) => `<section><h2>${escape(heading)}</h2>${body}</section>`
  const contactLinks = contacts.map(({ href, value, id }) => link(href, id === 'email' ? value : id === 'github' ? 'GitHub' : 'LinkedIn'))
  contactLinks.push(link(profile.website, 'vitorcesarinomarchese.site'))

  return `<!doctype html>
<html lang="${locale === 'pt' ? 'pt-BR' : 'en'}">
<head>
<meta charset="UTF-8">
<title>${escape(profile.name)} | CV</title>
<style>
  @page { size: A4; margin: 13mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 10pt/1.3 Arial, sans-serif; color: #17202a; }
  h1 { font-size: 22pt; line-height: 1.1; margin: 0 0 4pt; }
  .role { font-size: 12pt; margin: 0 0 5pt; }
  .contact { font-size: 9pt; margin: 2pt 0; }
  a { color: inherit; text-decoration: none; }
  h2 { font-size: 10.5pt; margin: 9pt 0 4pt; padding-bottom: 3pt; border-bottom: 1px solid #9ca3af; }
  h3 { font-size: 10pt; margin: 0; }
  p { margin: 3pt 0; }
  ul { margin: 4pt 0 0; padding-left: 14pt; }
  li { margin-bottom: 3pt; }
  article { margin-bottom: 6pt; break-inside: avoid; }
  h2, h3 { break-after: avoid; }
  .entry-header { display: flex; justify-content: space-between; gap: 8pt; align-items: baseline; }
  .period { white-space: nowrap; font-size: 9pt; }
  .project-url { font-size: 8.5pt; margin: 1pt 0 2pt; }
  .skills p { margin: 3pt 0; }
  .education p { margin: 2pt 0; }
</style>
</head>
<body>
<header>
  <h1>${escape(profile.name)}</h1>
  <p class="role">${t(profile.role)}</p>
  <p class="contact">${t(profile.location)} · ${escape(cvContent.phone)} · ${contactLinks[0]}</p>
  <p class="contact">${contactLinks.slice(1).join(' · ')}</p>
</header>
<main>
${section(labels[locale].summary, `<p>${t(cvContent.summary)}</p>`)}
${section(labels[locale].experience, cvContent.experience.map((entry) => `
  <article>
    <div class="entry-header"><h3>${t(entry.role)} | ${escape(entry.company)}</h3><span class="period">${t(entry.period)}</span></div>
    <ul>${entry.bullets.map((bullet) => `<li>${t(bullet)}</li>`).join('')}</ul>
  </article>`).join(''))}
${section(labels[locale].projects, cvContent.projects.map((entry) => {
    const project = projects.find(({ id }) => id === entry.id)
    if (!project) throw new Error(`Missing portfolio project: ${entry.id}`)
    return `<article>
      <h3>${t(project.title)}</h3>
      <p class="project-url">${link(project.repoUrl, project.repoUrl.replace('https://', ''))}${project.liveUrl ? ` · ${link(project.liveUrl, new URL(project.liveUrl).hostname)}` : ''}</p>
      <p>${t(entry.description)}</p>
    </article>`
  }).join(''))}
${section(labels[locale].skills, `<div class="skills">${skillGroups.map((group) => `<p><strong>${t(group.title)}:</strong> ${escape(group.items.map((item) => item[locale]).join(', '))}</p>`).join('')}<p><strong>${escape(labels[locale].languages)}:</strong> ${t(cvContent.languages)}</p></div>`)}
${section(labels[locale].education, `<div class="education">${cvContent.education.map((entry) => `<article><h3>${escape(entry.institution)} | ${t(entry.degree)}</h3><p>${t(entry.period)}</p></article>`).join('')}</div>`)}
</main>
</body>
</html>`
}

try {
  for (const locale of ['en', 'pt']) {
    const htmlPath = join(workDir, `cv-${locale}.html`)
    const pdfPath = join(root, 'public', basename(cvInfo.files[locale]))
    writeFileSync(htmlPath, renderCv(locale))
    execFileSync(chromium, [
      '--headless', '--disable-gpu', '--no-pdf-header-footer',
      `--user-data-dir=${join(workDir, `chromium-${locale}`)}`,
      `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href,
    ], { stdio: 'pipe', timeout: 60000 })
    if (readFileSync(pdfPath).subarray(0, 5).toString() !== '%PDF-') {
      throw new Error(`Chromium did not generate a PDF: ${pdfPath}`)
    }
    console.log(`Generated ${pdfPath}`)
  }
} finally {
  rmSync(workDir, { recursive: true, force: true })
}
