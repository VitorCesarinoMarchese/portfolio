import { useEffect, useState } from 'react'
import { contacts, cvInfo, getCvFileUrl, getLocalizedText, profile, professionalExperience, skillGroups, type LocaleCode } from '../data/portfolioContent.ts'
import { ProjectGallery } from './ProjectGallery.tsx'

export interface AppViewProps {
  locale: LocaleCode
  translate: (key: string) => string
  onNavigate?: (app: 'projects' | 'contact') => void
}

export function ProjectsView({ locale, translate }: AppViewProps) {
  return <ProjectGallery locale={locale} translate={translate} />
}

export function AboutView({ locale, translate, onNavigate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl text-slate-100">{translate('about.heading')}</h2>
      <p className="text-sm uppercase tracking-[0.2em] text-sky-200/90">
        {profile.name} - {getLocalizedText(profile.role, locale)}
      </p>
      <div className="intro-actions">
        {onNavigate ? <button className="project-primary-link" onClick={() => onNavigate('projects')}>{translate('site.viewProjects')}</button> : <a className="project-primary-link" href="#projects">{translate('site.viewProjects')}</a>}
        <a className="project-secondary-link" href={getCvFileUrl(locale)} download>{translate('cv.download')}</a>
        {onNavigate ? <button className="project-secondary-link" onClick={() => onNavigate('contact')}>{translate('apps.contact.title')}</button> : <a className="project-secondary-link" href="#contact">{translate('apps.contact.title')}</a>}
      </div>
      <p className="intro-contact">{contacts.filter(({ id }) => id !== 'linkedin').map(({ id, href, value }) => <a key={id} href={href} target={id === 'github' ? '_blank' : undefined} rel={id === 'github' ? 'noreferrer' : undefined}>{id === 'email' ? value : 'GitHub'}</a>)}</p>
      {profile.bio.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-slate-300">
          {getLocalizedText(paragraph, locale)}
        </p>
      ))}
    </section>
  )
}

export function ExperienceView({ locale, translate }: AppViewProps) {
  return (
      <section className="experience-view" aria-labelledby="experience-heading">
        <h2 id="experience-heading">{translate('experience.heading')}</h2>
        {professionalExperience.map((experience) => (
          <article className="experience-entry" key={experience.id}>
            <h3>{getLocalizedText(experience.role, locale)}</h3>
            <p className="experience-meta">
              <span>{experience.company}</span>
              <span>{getLocalizedText(experience.period, locale)}</span>
            </p>
            <ul className="experience-highlights">
              {experience.highlights.map((highlight) => (
                <li key={highlight.en}>{getLocalizedText(highlight, locale)}</li>
              ))}
            </ul>
            <ul className="project-stack">
              {experience.stack.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </article>
        ))}
      </section>
  )
}

export function ContactView({ translate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl text-slate-100">{translate('contact.heading')}</h2>
      <p className="text-sm text-slate-300">{translate('contact.description')}</p>

      <ul className="space-y-3">
        {contacts.map((contact, index) => {
          const isExternal = contact.href.startsWith('http')

          return (
            <li key={contact.id}>
              <a
                href={contact.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="flex flex-wrap items-center justify-between gap-2 break-all rounded-xl border border-slate-300/20 bg-slate-900/45 px-4 py-3 transition hover:border-sky-300/50 hover:bg-slate-900/75"
              >
                <span className="flex flex-wrap items-center gap-2 text-sm tracking-wide text-slate-300">
                  <span>{contact.label}</span>
                  {index === 0 ? <span className="contact-preferred">{translate('contact.preferred')}</span> : null}
                </span>
                <span className="text-sm text-slate-100">{contact.value}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function CvView({ locale, translate }: AppViewProps) {
  const [cvFileUrl, setCvFileUrl] = useState(() => getCvFileUrl(locale))
  const [previewFailed, setPreviewFailed] = useState(false)

  useEffect(() => {
    let isActive = true
    const preferredCvUrl = getCvFileUrl(locale)
    const fallbackCvUrl = getCvFileUrl('en')
    const controller = new AbortController()

    const verifyLocalizedCv = async () => {
      if (preferredCvUrl === fallbackCvUrl) {
        if (isActive) {
          setCvFileUrl(fallbackCvUrl)
        }
        return
      }

      try {
        const response = await fetch(preferredCvUrl, {
          method: 'HEAD',
          signal: controller.signal,
        })

        if (isActive) {
          setCvFileUrl(response.ok ? preferredCvUrl : fallbackCvUrl)
        }
      } catch {
        if (isActive) {
          setCvFileUrl(fallbackCvUrl)
        }
      }
    }

    void verifyLocalizedCv()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [locale])

  return (
    <section className="cv-content flex min-h-[24rem] flex-col gap-3">
      <p className="text-sm text-slate-300">{translate('cv.previewFallback')}</p>
      {previewFailed ? <p role="status" className="cv-preview-error">{translate('cv.previewError')}</p> : null}
      <p className="text-sm text-slate-300">{translate('cv.updatedLabel')}: {new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${cvInfo.lastUpdated}-01T00:00:00Z`))}</p>
      <a className="project-primary-link self-start" href={cvFileUrl} target="_blank" rel="noreferrer" download>{translate('cv.download')}</a>
      <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-300/25 bg-slate-950/85">
        <iframe
          title={translate('cv.previewTitle')}
          src={cvFileUrl}
          className="h-[28rem] w-full"
          loading="lazy"
          onError={() => setPreviewFailed(true)}
          onLoad={() => setPreviewFailed(false)}
        />
      </div>

    </section>
  )
}

export function SkillsView({ locale, translate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl text-slate-100">{translate('skills.heading')}</h2>
      <p className="text-sm text-slate-300">{translate('skills.description')}</p>

      <div className="space-y-4">
        {skillGroups.map((group) => (
          <article key={group.id} className="skill-group">
            <h3>
              {getLocalizedText(group.title, locale)}
            </h3>
            <p>{group.items.map((item) => getLocalizedText(item, locale)).join(' · ')}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

