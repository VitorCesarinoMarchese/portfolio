import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { CornersIn, CornersOut, Minus, X } from '@phosphor-icons/react'

export interface WindowPosition {
  x: number
  y: number
}

interface AppWindowProps {
  title: string
  closeLabel: string
  minimizeLabel: string
  maximizeLabel: string
  restoreLabel: string
  dragLabel?: string
  position: WindowPosition
  zIndex: number
  isVisible: boolean
  isMaximized: boolean
  children: ReactNode
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (position: WindowPosition) => void
}

const WINDOW_MARGIN = 16
const WINDOW_TOP_MARGIN = 56
const WINDOW_WORKSPACE_TOP = 72
const WINDOW_WORKSPACE_BOTTOM = 88

function clampPosition(position: WindowPosition, viewport: { width: number; height: number }) {
  const windowWidth = Math.min(viewport.width * 0.92, 760)
  const windowHeight = Math.min(viewport.height * 0.74, 540)
  const maxX = Math.max(WINDOW_MARGIN, viewport.width - windowWidth - WINDOW_MARGIN)
  const maxY = Math.max(WINDOW_TOP_MARGIN, viewport.height - windowHeight - WINDOW_MARGIN)

  return {
    x: Math.min(Math.max(WINDOW_MARGIN, position.x), maxX),
    y: Math.min(Math.max(WINDOW_TOP_MARGIN, position.y), maxY),
  }
}

export function AppWindow({
  title,
  closeLabel,
  minimizeLabel,
  maximizeLabel,
  restoreLabel,
  dragLabel = 'Use arrow keys to move this window.',
  position,
  zIndex,
  isVisible,
  isMaximized,
  children,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
}: AppWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const dragHintId = useId()
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))
  const displayedPosition = clampPosition(position, viewport)

  useEffect(() => {
    const handleResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const previousActiveElement = document.activeElement
    windowRef.current?.focus({ preventScroll: true })

    return () => {
      if (previousActiveElement instanceof HTMLElement && previousActiveElement.isConnected) {
        previousActiveElement.focus({ preventScroll: true })
      }
    }
  }, [isVisible])

  const handleDragStart = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (isMaximized || event.button !== 0) {
        return
      }

      const target = event.target
      if (target instanceof Element && target.closest('[data-window-control="true"]')) {
        return
      }

      event.preventDefault()
      event.currentTarget.focus({ preventScroll: true })
      onFocus()

      const dragStartPoint = { x: event.clientX, y: event.clientY }
      const dragStartPosition = clampPosition(position, viewport)

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const movedX = dragStartPosition.x + moveEvent.clientX - dragStartPoint.x
        const movedY = dragStartPosition.y + moveEvent.clientY - dragStartPoint.y

        onMove(clampPosition({ x: movedX, y: movedY }, {
          width: window.innerWidth,
          height: window.innerHeight,
        }))
      }

      const handlePointerUp = () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
        window.removeEventListener('pointercancel', handlePointerUp)
      }

      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
      window.addEventListener('pointercancel', handlePointerUp)
    },
    [isMaximized, onFocus, onMove, position, viewport],
  )

  const sectionStyle = isMaximized
    ? {
        top: WINDOW_WORKSPACE_TOP,
        left: WINDOW_MARGIN,
        right: WINDOW_MARGIN,
        bottom: WINDOW_WORKSPACE_BOTTOM,
        zIndex,
      }
    : {
        transform: `translate3d(${displayedPosition.x}px, ${displayedPosition.y}px, 0)`,
        zIndex,
      }

  return (
    <section
      ref={windowRef}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      hidden={!isVisible}
      style={sectionStyle}
      className={`app-window absolute flex flex-col overflow-hidden backdrop-blur-xl ${
        isMaximized ? 'h-auto w-auto' : 'h-[min(74vh,540px)] w-[min(92vw,760px)]'
      } ${
        isMaximized ? 'rounded-none' : 'rounded-2xl'
      }`}
      onMouseDown={onFocus}
      onFocusCapture={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
          onFocus()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && event.target instanceof Node && event.currentTarget.contains(event.target)) {
          event.preventDefault()
          event.stopPropagation()
          onClose()
        }
      }}
    >
      <header
        tabIndex={isMaximized ? -1 : 0}
        aria-labelledby={titleId}
        aria-describedby={isMaximized ? undefined : dragHintId}
        title={isMaximized ? undefined : dragLabel}
        className={`app-window-header flex items-center justify-between px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset ${
          isMaximized ? 'cursor-default' : 'cursor-move'
        }`}
        onPointerDown={handleDragStart}
        onKeyDown={(event) => {
          if (isMaximized || event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return

          const step = event.shiftKey ? 40 : 10
          let { x, y } = displayedPosition
          switch (event.key) {
            case 'ArrowLeft': x -= step; break
            case 'ArrowRight': x += step; break
            case 'ArrowUp': y -= step; break
            case 'ArrowDown': y += step; break
            default: return
          }
          event.preventDefault()
          event.stopPropagation()
          onMove(clampPosition({ x, y }, viewport))
        }}
      >
        <h2 id={titleId} className="text-sm tracking-wide text-slate-100">{title}</h2>
        <span id={dragHintId} className="sr-only">{dragLabel}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-window-control="true"
            aria-label={minimizeLabel}
            title={minimizeLabel}
            onClick={onMinimize}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-amber-300/45 bg-amber-500/20 px-2 py-1 text-xs text-amber-100 transition hover:bg-amber-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
          >
            <Minus size={16} weight="regular" aria-hidden />
          </button>
          <button
            type="button"
            data-window-control="true"
            aria-label={isMaximized ? restoreLabel : maximizeLabel}
            title={isMaximized ? restoreLabel : maximizeLabel}
            onClick={onToggleMaximize}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-emerald-300/45 bg-emerald-500/20 px-2 py-1 text-xs text-emerald-100 transition hover:bg-emerald-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
          >
            {isMaximized ? (
              <CornersIn size={16} weight="regular" aria-hidden />
            ) : (
              <CornersOut size={16} weight="regular" aria-hidden />
            )}
          </button>
          <button
            type="button"
            data-window-control="true"
            aria-label={closeLabel}
            title={closeLabel}
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-rose-300/40 bg-rose-500/20 px-2 py-1 text-xs text-rose-100 transition hover:bg-rose-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
          >
            <X size={16} weight="regular" aria-hidden />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
    </section>
  )
}
