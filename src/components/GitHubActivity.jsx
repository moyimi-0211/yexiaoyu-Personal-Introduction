export default function GitHubActivity() {
  const days = 52
  const weeks = 7

  return (
    <section className="mt-12 relative">
      <h2
        className="text-[13px] font-bold uppercase tracking-wider mb-6"
        style={{ color: 'var(--grey3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
      >
        GitHub
      </h2>

      <div className="flex gap-[3px] overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {Array.from({ length: weeks }, (_, col) => (
          <div key={col} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }, (_, row) => {
              const level = Math.floor(Math.random() * 5)
              const colors = {
                0: 'var(--gh-empty)',
                1: '#0e4429',
                2: '#006d32',
                3: '#26a641',
                4: '#39d353',
              }
              return (
                <div
                  key={row}
                  className="w-[11px] h-[11px] rounded-[2px]"
                  style={{
                    backgroundColor: colors[level],
                  }}
                  title={`${level} 次提交`}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 mt-3 text-[10px]" style={{ color: 'var(--grey3)' }}>
        <span>少</span>
        {['var(--gh-empty)', '#0e4429', '#006d32', '#26a641', '#39d353'].map((c, i) => (
          <div key={i} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: c }} />
        ))}
        <span>多</span>
      </div>

      <a
        href="https://github.com"
        target="_blank"
        rel="noopener"
        className="inline-block mt-4 text-[13px]"
        style={{ color: 'var(--accent)' }}
      >
        在 GitHub 上查看 →
      </a>
    </section>
  )
}
