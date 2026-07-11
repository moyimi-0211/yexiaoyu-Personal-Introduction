import { useState } from 'react'

export default function ThemeToggle() {
  const [active, setActive] = useState('creative')

  const switchTheme = (theme) => {
    setActive(theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div className="flex justify-start pt-5 pb-3">
      <div
        className="inline-flex rounded-full p-0.5"
        style={{
          backgroundColor: 'var(--toggle-track)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.12)',
        }}
        role="radiogroup"
        aria-label="视图模式"
      >
        {[
          { key: 'minimal', label: '极简' },
          { key: 'creative', label: '创意' },
        ].map(mode => {
          const isActive = active === mode.key
          return (
            <button
              key={mode.key}
              onClick={() => switchTheme(mode.key)}
              className="relative px-4 py-1.5 rounded-full text-[12px] font-medium cursor-pointer select-none"
              style={{
                backgroundColor: isActive ? 'var(--toggle-thumb)' : 'transparent',
                color: isActive ? 'var(--grey1)' : 'var(--grey3)',
                transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                ...(isActive
                  ? { boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }
                  : {}),
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--grey2)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--grey3)'
                }
              }}
            >
              {mode.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
