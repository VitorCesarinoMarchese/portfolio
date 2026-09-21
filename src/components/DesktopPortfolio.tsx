import {
  useCallback,
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  AddressBook,
  Clock,
  FilePdf,
  Folders,
  Lightbulb,
  Pause,
  Play,
  Stack,
  Translate,
  User,
  type IconWeight,
} from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import {
  contacts,
  cvInfo,
  getCvFileUrl,
  getLocalizedText,
  profile,
  projects,
  skillGroups,
  type LocaleCode,
} from '../data/portfolioContent.ts'
import { AppWindow, type WindowPosition } from './AppWindow.tsx'
import { WallpaperBoundary } from './WallpaperBoundary.tsx'

const PlasmaWallpaper = lazy(() => import('./PlasmaWallpaper.tsx').then((module) => ({ default: module.PlasmaWallpaper })))

type DesktopAppId = 'projects' | 'about' | 'contact' | 'cv' | 'skills'
type WindowMode = 'closed' | 'open' | 'minimized'
type CelestialPhase = 'day' | 'night'

interface DesktopAppDefinition {
  id: DesktopAppId
}

interface WindowState {
  mode: WindowMode
  position: WindowPosition
  zIndex: number
  isMaximized: boolean
  restorePosition: WindowPosition | null
}

type WindowStateMap = Record<DesktopAppId, WindowState>

const ICON_WEIGHT: IconWeight = 'regular'

const APP_DEFINITIONS: DesktopAppDefinition[] = [
  { id: 'projects' },
  { id: 'about' },
  { id: 'skills' },
  { id: 'contact' },
  { id: 'cv' },
]

const INITIAL_WINDOW_POSITIONS: Record<DesktopAppId, WindowPosition> = {
  projects: { x: 170, y: 96 },
  about: { x: 250, y: 130 },
  contact: { x: 340, y: 168 },
  cv: { x: 290, y: 92 },
  skills: { x: 420, y: 114 },
}

const DESKTOP_MEDIA_QUERY = '(max-width: 900px)'
const getInitialIsMobile = (): boolean => window.matchMedia(DESKTOP_MEDIA_QUERY).matches
const getSkyCycle = (date: Date): { phase: CelestialPhase; progress: number } => {
  const hour = date.getHours() + date.getMinutes() / 60
  if (hour >= 6 && hour < 18) return { phase: 'day', progress: (hour - 6) / 12 }
  const nightHour = hour < 6 ? hour + 24 : hour
  return { phase: 'night', progress: (nightHour - 18) / 12 }
}

const createInitialWindowState = (): WindowStateMap => ({
  projects: {
    mode: 'open',
    position: { ...INITIAL_WINDOW_POSITIONS.projects },
    zIndex: 31,
    isMaximized: false,
    restorePosition: null,
  },
  about: {
    mode: 'closed',
    position: { ...INITIAL_WINDOW_POSITIONS.about },
    zIndex: 32,
    isMaximized: false,
    restorePosition: null,
  },
  contact: {
    mode: 'closed',
    position: { ...INITIAL_WINDOW_POSITIONS.contact },
    zIndex: 33,
    isMaximized: false,
    restorePosition: null,
  },
  cv: {
    mode: 'closed',
    position: { ...INITIAL_WINDOW_POSITIONS.cv },
    zIndex: 34,
    isMaximized: false,
    restorePosition: null,
  },
  skills: {
    mode: 'closed',
    position: { ...INITIAL_WINDOW_POSITIONS.skills },
    zIndex: 35,
    isMaximized: false,
    restorePosition: null,
  },
})

const resolveLocale = (language: string): LocaleCode =>
  language.toLowerCase().startsWith('pt') ? 'pt' : 'en'

const formatClock = (date: Date): string =>
  new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(date)

function AppIcon({
  appId,
  size,
  className,
}: {
  appId: DesktopAppId
  size: number
  className?: string
}) {
  const sharedProps = { size, weight: ICON_WEIGHT, className, 'aria-hidden': true as const }

  switch (appId) {
    case 'projects':
      return <Folders {...sharedProps} />
    case 'about':
      return <User {...sharedProps} />
    case 'skills':
      return <Stack {...sharedProps} />
    case 'contact':
      return <AddressBook {...sharedProps} />
    case 'cv':
      return <FilePdf {...sharedProps} />
  }
}

interface AppViewProps {
  locale: LocaleCode
  translate: (key: string) => string
}

function ProjectsView({ locale, translate }: AppViewProps) {
  return (
    <div className="space-y-4">
      <header className="project-intro">
        <h3>{translate('projects.heading')}</h3>
        <p>{translate('projects.description')}</p>
        <p className="desktop-shortcut-hint"><Lightbulb size={18} aria-hidden />{translate('desktop.shortcuts')}</p>
      </header>
      {projects.map((project) => (
        <article
          key={project.id}
          className="project-entry"
        >
          <div className="project-copy">
            <h4 className="project-title">{getLocalizedText(project.title, locale)}</h4>
            <p className="project-summary">{getLocalizedText(project.description, locale)}</p>
            <p className="project-detail">{getLocalizedText(project.details, locale)}</p>
            <ul className="project-stack">
              {project.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <div className="project-actions">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="project-primary-link"
              >
                {translate('projects.demo')}
              </a>
            ) : null}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className={project.liveUrl ? "project-secondary-link" : "project-primary-link"}
            >
              {translate('projects.source')}
            </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function AboutView({ locale, translate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl text-slate-100">{translate('about.heading')}</h3>
      <p className="text-sm uppercase tracking-[0.2em] text-sky-200/90">
        {profile.name} - {getLocalizedText(profile.role, locale)}
      </p>
      {profile.bio.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-slate-300">
          {getLocalizedText(paragraph, locale)}
        </p>
      ))}
    </section>
  )
}

function ContactView({ translate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl text-slate-100">{translate('contact.heading')}</h3>
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
                <span className="text-sm tracking-wide text-slate-300">
                  {contact.label}{index === 0 ? <small>{translate('contact.preferred')}</small> : null}
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

function CvView({ locale, translate }: AppViewProps) {
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

function SkillsView({ locale, translate }: AppViewProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl text-slate-100">{translate('skills.heading')}</h3>
      <p className="text-sm text-slate-300">{translate('skills.description')}</p>

      <div className="space-y-4">
        {skillGroups.map((group) => (
          <article key={group.id} className="rounded-xl border border-slate-300/20 bg-slate-900/45 p-4">
            <h4 className="text-sm uppercase tracking-[0.2em] text-sky-200">
              {getLocalizedText(group.title, locale)}
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-violet-300/30 bg-violet-400/12 px-2 py-1 text-xs text-violet-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function AppContent({
  appId,
  locale,
  translate,
}: { appId: DesktopAppId } & AppViewProps) {
  switch (appId) {
    case 'projects':
      return <ProjectsView locale={locale} translate={translate} />
    case 'about':
      return <AboutView locale={locale} translate={translate} />
    case 'contact':
      return <ContactView locale={locale} translate={translate} />
    case 'cv':
      return <CvView locale={locale} translate={translate} />
    case 'skills':
      return <SkillsView locale={locale} translate={translate} />
  }
}

export function DesktopPortfolio() {
  const { t, i18n } = useTranslation()

  const [windowState, setWindowState] = useState<WindowStateMap>(createInitialWindowState)
  const [activeMobileTab, setActiveMobileTab] = useState<DesktopAppId>('projects')
  const [isMobile, setIsMobile] = useState(getInitialIsMobile)
  const [skyCycle, setSkyCycle] = useState(() => getSkyCycle(new Date()))
  const [clockLabel, setClockLabel] = useState(() => formatClock(new Date()))
  const [isWallpaperEnabled, setIsWallpaperEnabled] = useState(true)
  const [wallpaperFailed, setWallpaperFailed] = useState(false)
  const [isWallpaperAnimated, setIsWallpaperAnimated] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const zIndexRef = useRef(80)
  const locale = resolveLocale(i18n.language)

  const translate = useCallback((key: string): string => t(key) as string, [t])

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const now = new Date()
      setClockLabel(formatClock(now))
      setSkyCycle(getSkyCycle(now))
    }, 30_000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent) => setIsWallpaperAnimated(!event.matches)
    preference.addEventListener('change', handleChange)
    return () => preference.removeEventListener('change', handleChange)
  }, [])

  const handleWallpaperError = useCallback(() => {
    setIsWallpaperEnabled(false)
    setWallpaperFailed(true)
  }, [])

  const activeDesktopApp = useMemo<DesktopAppId | null>(() => {
    const openApps = APP_DEFINITIONS
      .map((app) => ({ id: app.id, state: windowState[app.id] }))
      .filter((app) => app.state.mode === 'open')

    if (openApps.length === 0) {
      return null
    }

    return openApps.reduce((top, current) => {
      return current.state.zIndex > top.state.zIndex ? current : top
    }).id
  }, [windowState])

  const focusDesktopApp = useCallback((appId: DesktopAppId) => {
    zIndexRef.current += 1
    const nextZIndex = zIndexRef.current

    setWindowState((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        mode: 'open',
        zIndex: nextZIndex,
      },
    }))
  }, [])

  const navigateToApp = useCallback((appId: DesktopAppId) => {
    if (isMobile) {
      setActiveMobileTab(appId)
      return
    }
    focusDesktopApp(appId)
  }, [focusDesktopApp, isMobile])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      const app = APP_DEFINITIONS[Number(event.key) - 1]
      if (!app) return
      event.preventDefault()
      navigateToApp(app.id)
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [navigateToApp])

  const closeDesktopApp = useCallback((appId: DesktopAppId) => {
    setWindowState((current) => {
      const previous = current[appId]
      const restoredPosition =
        previous.isMaximized && previous.restorePosition ? previous.restorePosition : previous.position

      return {
        ...current,
        [appId]: {
          ...previous,
          mode: 'closed',
          position: restoredPosition,
          isMaximized: false,
          restorePosition: null,
        },
      }
    })
  }, [])

  const minimizeDesktopApp = useCallback((appId: DesktopAppId) => {
    setWindowState((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        mode: 'minimized',
      },
    }))
  }, [])

  const toggleDesktopMaximize = useCallback((appId: DesktopAppId) => {
    zIndexRef.current += 1
    const nextZIndex = zIndexRef.current

    setWindowState((current) => {
      const previous = current[appId]

      if (previous.isMaximized) {
        return {
          ...current,
          [appId]: {
            ...previous,
            mode: 'open',
            zIndex: nextZIndex,
            position: previous.restorePosition ?? previous.position,
            isMaximized: false,
            restorePosition: null,
          },
        }
      }

      return {
        ...current,
        [appId]: {
          ...previous,
          mode: 'open',
          zIndex: nextZIndex,
          isMaximized: true,
          restorePosition: previous.position,
        },
      }
    })
  }, [])

  const moveDesktopApp = useCallback((appId: DesktopAppId, position: WindowPosition) => {
    setWindowState((current) => {
      if (current[appId].isMaximized) {
        return current
      }

      return {
        ...current,
        [appId]: {
          ...current[appId],
          position,
        },
      }
    })
  }, [])

  const handleTrayClick = useCallback(
    (appId: DesktopAppId) => {
      const mode = windowState[appId].mode

      if (mode === 'open' && activeDesktopApp === appId) {
        minimizeDesktopApp(appId)
        return
      }

      focusDesktopApp(appId)
    },
    [activeDesktopApp, focusDesktopApp, minimizeDesktopApp, windowState],
  )

  const toggleLanguage = useCallback(() => {
    const nextLanguage = locale === 'en' ? 'pt' : 'en'
    void i18n.changeLanguage(nextLanguage)
  }, [i18n, locale])

  const languageSwitchLabel = translate(
    locale === 'en' ? 'desktop.switchToPortuguese' : 'desktop.switchToEnglish',
  )
  const languageSwitchText = locale === 'en' ? 'Português' : 'English'
  return (
    <div className="portfolio-shell relative h-dvh overflow-hidden" data-sky-phase={skyCycle.phase}>
      {isWallpaperEnabled ? (
        <WallpaperBoundary onError={handleWallpaperError}>
          <Suspense fallback={null}>
            <PlasmaWallpaper
              animated={isWallpaperAnimated}
              phase={skyCycle.phase}
              cycleProgress={skyCycle.progress}
              onError={handleWallpaperError}
            />
          </Suspense>
        </WallpaperBoundary>
      ) : null}
      <div className="wallpaper-overlay absolute inset-0" />

      {wallpaperFailed ? (
        <div className="wallpaper-status" role="status">
          <span>{translate('desktop.wallpaperUnavailable')}</span>
          <button type="button" onClick={() => setWallpaperFailed(false)}>{translate('desktop.dismiss')}</button>
        </div>
      ) : null}

      <main className="relative z-10 h-full">
          {isMobile ? (
          <>
            <header className="mobile-header">
              <div><h1>{profile.name}</h1><span>{getLocalizedText(profile.role, locale)}</span></div>
              <div className="mobile-utilities">
                <button type="button" onClick={toggleLanguage} aria-label={languageSwitchLabel} title={languageSwitchLabel}>{languageSwitchText}</button>
              </div>
            </header>
            <section key={activeMobileTab} className="mobile-content" id="mobile-content" aria-label={translate(`apps.${activeMobileTab}.title`)}>
              <h2 className="mobile-section-title">{translate(`apps.${activeMobileTab}.title`)}</h2>
              <AppContent key={activeMobileTab} appId={activeMobileTab} locale={locale} translate={translate} />
            </section>
            <nav className="mobile-dock" aria-label={translate('panel.dock')}>
              {APP_DEFINITIONS.map((app, index) => (
                <button key={app.id} type="button" onClick={() => setActiveMobileTab(app.id)}
                  aria-current={activeMobileTab === app.id ? 'page' : undefined}
                  aria-controls="mobile-content"
                  title={`${translate(`apps.${app.id}.title`)} (Alt+${index + 1})`}>
                  <AppIcon appId={app.id} size={20} />
                  <span>{translate(`apps.${app.id}.title`)}</span>
                </button>
              ))}
            </nav>
          </>
          ) : (
          <>
            <header className="desktop-topbar absolute inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-md md:px-6">
              <div>
                <h1 className="text-sm uppercase tracking-[0.3em] text-sky-200/85">{profile.name}</h1>
                <p className="text-xs text-slate-300">{translate('desktop.environment')}</p>
              </div>

              <div className="desktop-utilities flex items-center gap-2 md:gap-3">
                <button type="button" className="utility-control" aria-pressed={isWallpaperAnimated}
                  onClick={() => setIsWallpaperAnimated((current) => !current)}>
                  {isWallpaperAnimated ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
                  {translate(isWallpaperAnimated ? 'desktop.motionOff' : 'desktop.motion')}
                </button>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="utility-control"
                >
                  <Translate size={16} aria-hidden />
                  {languageSwitchLabel}
                </button>

                <div className="clock-display" aria-label={`${translate('desktop.clock')}: ${clockLabel}`}>
                  <Clock size={16} aria-hidden />
                  <span>{translate('desktop.clock')}</span>
                  <time>{clockLabel}</time>
                </div>
              </div>
            </header>

            {APP_DEFINITIONS.map((app) => {
              const currentWindow = windowState[app.id]

              if (currentWindow.mode === 'closed') {
                return null
              }

              return (
                <AppWindow
                  key={app.id}
                  title={translate(`apps.${app.id}.title`)}
                  dragLabel={translate("desktop.dragHint")}
                  closeLabel={translate('desktop.close')}
                  minimizeLabel={translate('desktop.minimize')}
                  maximizeLabel={translate('desktop.maximize')}
                  restoreLabel={translate('desktop.restore')}
                  position={currentWindow.position}
                  zIndex={currentWindow.zIndex}
                  isVisible={currentWindow.mode === 'open'}
                  isMaximized={currentWindow.isMaximized}
                  onFocus={() => focusDesktopApp(app.id)}
                  onClose={() => closeDesktopApp(app.id)}
                  onMinimize={() => minimizeDesktopApp(app.id)}
                  onToggleMaximize={() => toggleDesktopMaximize(app.id)}
                  onMove={(position) => moveDesktopApp(app.id, position)}
                >
                  <AppContent appId={app.id} locale={locale} translate={translate} />
                </AppWindow>
              )
            })}

            <nav className="absolute inset-x-0 bottom-3 z-50 px-3 md:px-4" aria-label={translate('panel.dock')}>
              <div className="desktop-dock mx-auto flex w-full max-w-xl items-center justify-center gap-2 rounded-2xl p-2 backdrop-blur-xl">
                {APP_DEFINITIONS.map((app, index) => {
                  const mode = windowState[app.id].mode
                  const isActive = activeDesktopApp === app.id

                  const dotClass = isActive
                    ? 'bg-cyan-300'
                    : mode === 'minimized'
                      ? 'bg-amber-300'
                      : mode === 'open'
                        ? 'bg-slate-200'
                        : 'border border-slate-500/70 bg-transparent'

                  const buttonClass = isActive
                    ? 'border border-sky-300/70 bg-sky-400/20 text-sky-50'
                    : mode === 'minimized'
                      ? 'border border-amber-300/60 bg-amber-400/12 text-amber-100'
                      : mode === 'open'
                        ? 'border border-slate-100/45 bg-slate-900/75 text-slate-100'
                        : 'border border-slate-300/20 bg-slate-900/45 text-slate-200 hover:border-slate-100/45 hover:bg-slate-900/75'

                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => handleTrayClick(app.id)}
                      aria-label={`${translate(isActive ? 'desktop.minimize' : 'desktop.open')} ${translate(`apps.${app.id}.title`)}`}
                      title={`${translate(`apps.${app.id}.title`)} (Alt+${index + 1})`}
                      aria-pressed={isActive}
                      data-mode={mode}
                      className={`flex min-w-0 flex-col items-center gap-1 rounded-xl px-3 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 ${buttonClass}`}
                    >
                      <AppIcon appId={app.id} size={18} className="text-current" />
                      <span className="text-xs">{translate(`apps.${app.id}.title`)}</span>
                      <kbd aria-hidden="true">Alt+{index + 1}</kbd>
                      <span className={`mt-1 h-1.5 w-1.5 rounded-full ${dotClass}`} />
                    </button>
                  )
                })}
              </div>
            </nav>
          </>
          )}
      </main>
    </div>
  )
}
