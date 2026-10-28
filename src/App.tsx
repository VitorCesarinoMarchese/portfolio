import { lazy, Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getLocalizedText, profile } from './data/portfolioContent.ts'
import { ScrollPortfolio } from './components/ScrollPortfolio.tsx'

const DesktopPortfolio = lazy(() => import('./components/DesktopPortfolio.tsx').then((module) => ({ default: module.DesktopPortfolio })))

function App() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = `${profile.name} | ${getLocalizedText(profile.role, locale)}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', getLocalizedText(profile.intro, locale))
  }, [locale])

  return new URLSearchParams(window.location.search).get('view') === 'desktop'
    ? <Suspense fallback={<p className="view-loading">{t('loading.message')}</p>}><DesktopPortfolio /></Suspense>
    : <ScrollPortfolio />
}

export default App
