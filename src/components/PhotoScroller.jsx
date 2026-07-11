import { useRef } from 'react'

export default function PhotoScroller({ title, items }) {
  const scrollRef = useRef(null)

  return (
    <section className="mt-16" style={{ animation: 'fvIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)' }}>
      <h2
        className="text-[13px] font-bold uppercase tracking-wider mb-6"
        style={{ color: 'var(--grey3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
      >
        {title}
      </h2>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2.5 pt-2.5"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((item, i) => (
          <a
            key={i}
            href={item.link || '#'}
            className="flex-shrink-0 scroll-snap-align-start transition-transform hover:scale-[1.02]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div
              className="w-[180px] h-[130px] rounded-[13px] flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: item.color,
                border: '1px solid var(--transparent-border)',
                color: '#fff',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              <span style={{ fontFamily: "'Smiley Sans', '得意黑', sans-serif" }}>
                {item.title}
              </span>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .photo-scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
