import { getLocalizedText, projects, type ProjectArea } from '../data/portfolioContent.ts'
import type { AppViewProps } from './PortfolioViews.tsx'
import { ProjectEvidence } from './ProjectEvidence.tsx'

const projectOrder = ['chat-terminal', 'Exchange_of_Currencies', 'portfolio', 'larp', 'plumcrate']
const projectAreas: ProjectArea[] = ['web', 'systems']

export function ProjectGallery({ locale, translate }: AppViewProps) {
  const focus = new URLSearchParams(window.location.search).get('focus') === 'systems' ? 'systems' : 'web'
  const areas: ProjectArea[] = focus === 'systems' ? ['systems', 'web'] : ['web', 'systems']
  const view = new URLSearchParams(window.location.search).get('view') === 'scroll' ? '&view=scroll' : ''

  return (
    <div className="project-gallery">
      <header className="project-intro">
        <h2>{translate('projects.heading')}</h2>
        <p>{translate('projects.description')}</p>
        <nav className="project-focus-nav" aria-label={translate('site.projectFocus')}>
          {projectAreas.map((area) => <a key={area} href={`?focus=${area}${view}#projects`} aria-current={focus === area ? 'true' : undefined}>{translate(`site.${area}Work`)}</a>)}
        </nav>
      </header>
      {areas.map((area) => (
        <section className="project-group" key={area} aria-labelledby={`${area}-heading`}>
          <h3 id={`${area}-heading`}>{translate(`site.${area}Work`)}</h3>
          {projects.filter((project) => project.area === area).sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id)).map((project) => (
            <article key={project.id} className="project-entry" id={`project-${project.id}`}>
              <div className="project-copy">
                <h4 className="project-title">{getLocalizedText(project.title, locale)}</h4>
                <p className="project-summary">{getLocalizedText(project.description, locale)}</p>
                <div className="project-actions">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="project-primary-link">{translate('projects.source')}</a>
                  {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-secondary-link">{project.liveLinkLabel ? getLocalizedText(project.liveLinkLabel, locale) : translate('projects.demo')}</a> : null}
                </div>
                <ul className="project-stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                <details className="project-description"><summary>{translate('site.projectDetails')}</summary><p className="project-detail">{getLocalizedText(project.details, locale)}</p></details>
              </div>
              <ProjectEvidence projectId={project.id} locale={locale} />
            </article>
          ))}
        </section>
      ))}
    </div>
  )
}
