import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { contacts, getCvFileUrl, getLocalizedText, profile, type LocaleCode } from '../data/portfolioContent.ts'
import { ContactView, ExperienceView, SkillsView } from './PortfolioViews.tsx'
import { ProjectGallery } from './ProjectGallery.tsx'

export function ScrollPortfolio() {
  const { t, i18n } = useTranslation()
  const locale: LocaleCode = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const translate = (key: string): string => t(key)
  const focus = new URLSearchParams(window.location.search).get('focus') === 'systems' ? 'systems' : 'web'
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="scroll-portfolio">
      <a className="skip-link" href="#projects">{t('site.skipToProjects')}</a>
      <header className="site-header">
        <a className="site-name" href="#top">Vitor Cesarino</a>
        <nav aria-label={t('site.navigation')}>
          <a href="#projects">{t('apps.projects.title')}</a>
          <a href="#experience">{t('apps.experience.title')}</a>
          <a href="#contact">{t('apps.contact.title')}</a>
        </nav>
        <div className="site-controls">
          <a className="view-switch" href={`?view=desktop&focus=${focus}`}>{t('site.desktopView')}</a>
          <button type="button" aria-label={t(locale === 'en' ? 'desktop.switchToPortuguese' : 'desktop.switchToEnglish')} onClick={() => void i18n.changeLanguage(locale === 'en' ? 'pt' : 'en')}>{locale === 'en' ? 'Português' : 'English'}</button>
        </div>
      </header>
      <main id="top" className="site-main">
        <section className="site-intro" aria-labelledby="intro-heading">
          <p className="eyebrow">{getLocalizedText(profile.location, locale)}</p>
          <h1 id="intro-heading">{profile.name}</h1>
          <p className="hero-role">{getLocalizedText(profile.role, locale)}</p>
          <p className="hero-description">{getLocalizedText(profile.intro, locale)}</p>
          <div className="intro-actions">
            <a className="project-primary-link" href="#projects">{t('site.viewProjects')}</a>
            <a className="project-secondary-link" href={getCvFileUrl(locale)} download>{t('cv.download')}</a>
            <a className="project-secondary-link" href="#contact">{t('apps.contact.title')}</a>
          </div>
          <div className="intro-contact">
            {contacts.map(({ id, href, value, label }) => <a key={id} href={href} target={id === 'email' ? undefined : '_blank'} rel={id === 'email' ? undefined : 'noreferrer'}>{id === 'email' ? value : label}</a>)}
          </div>
          <details className="bio-details"><summary>{t('site.moreAbout')}</summary>{profile.bio.map((paragraph) => <p key={paragraph.en}>{getLocalizedText(paragraph, locale)}</p>)}</details>
        </section>
        <section id="projects" className="site-section" aria-label={t('apps.projects.title')}>
          <ProjectGallery locale={locale} translate={translate} />
        </section>
        <section id="experience" className="site-section" aria-label={t('apps.experience.title')}><ExperienceView locale={locale} translate={translate} /></section>
        <section id="skills" className="site-section" aria-label={t('apps.skills.title')}><SkillsView locale={locale} translate={translate} /></section>
        <section id="contact" className="site-section" aria-label={t('apps.contact.title')}><ContactView locale={locale} translate={translate} /><a className="project-secondary-link" href={getCvFileUrl(locale)} download>{t('cv.download')}</a></section>
      </main>
      <footer className="site-footer"><span>{profile.name}</span><a href={`?view=desktop&focus=${focus}`}>{t('site.desktopView')}</a><a href="#top">{t('site.backToTop')}</a></footer>
    </div>
  )
}
