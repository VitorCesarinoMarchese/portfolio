import { useSyncExternalStore } from 'react'
import type { ProjectArea } from '../data/portfolioContent.ts'

const focusChanged = 'portfolio-project-focus'

function readFocus(): ProjectArea {
  return new URLSearchParams(window.location.search).get('focus') === 'systems' ? 'systems' : 'web'
}

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(focusChanged, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(focusChanged, onChange)
  }
}

export function useProjectFocus(): ProjectArea {
  return useSyncExternalStore(subscribe, readFocus)
}

export function setProjectFocus(focus: ProjectArea) {
  if (focus === readFocus()) return
  const url = new URL(window.location.href)
  url.searchParams.set('focus', focus)
  url.hash = 'projects'
  window.history.pushState(window.history.state, '', url)
  window.dispatchEvent(new Event(focusChanged))
}
