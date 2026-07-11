import { useState, useCallback } from 'react'

export default function PostList({ title, items }) {
  const [preview, setPreview] = useState(null)

  const handleMouseMove = useCallback((e) => {
    setPreview({
      x: e.clientX + 16,
      y: e.clientY + 16,
      title: e.currentTarget.dataset.title,
      color: e.currentTarget.dataset.color,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPreview(null)
  }, [])

  return (
    <section className="mt-16" style={{ animation: 'fvIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)' }}>
      <h2
        className="text-[13px] font-bold uppercase tracking-wider mb-6"
        style={{ color: 'var(--grey3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
      >
        {title}
      </h2>

      <div className="flex flex-col gap-0">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative flex items-center gap-4 py-4 cursor-pointer group"
            style={{ borderBottom: `1px solid var(--border-rule)` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-title={item.title}
            data-color={item.color}
          >
            {/* Color indicator */}
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div
                className="text-[14px] font-medium truncate group-hover:underline"
                style={{ color: 'var(--grey1)', fontFamily: "'Smiley Sans', '得意黑', sans-serif" }}
              >
                {item.title}
              </div>
              {item.desc && (
                <div className="text-[12px] mt-0.5 truncate" style={{ color: 'var(--grey3)' }}>
                  {item.desc}
                </div>
              )}
            </div>

            {/* Source badge */}
            {item.source && (
              <span
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  color: 'var(--grey3)',
                  background: 'var(--wash2)',
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.04em',
                }}
              >
                {item.source}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Hover preview */}
      {preview && (
        <div
          className="fixed top-0 left-0 z-50 pointer-events-none"
          style={{
            transform: `translate(${preview.x}px, ${preview.y}px)`,
            willChange: 'transform',
          }}
        >
          <div
            className="w-[230px] h-[165px] overflow-hidden flex items-center justify-center"
            style={{
              background: preview.color || 'var(--wash2)',
              boxShadow: '0 10px 34px rgba(0, 0, 0, 0.14)',
            }}
          >
            <span className="text-white/80 text-sm font-medium" style={{ fontFamily: "'Smiley Sans', '得意黑', sans-serif" }}>
              {preview.title}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
