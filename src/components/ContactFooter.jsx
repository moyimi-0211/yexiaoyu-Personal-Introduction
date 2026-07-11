export default function ContactFooter() {
  return (
    <footer className="mt-24 pt-12" style={{ borderTop: '1px solid var(--border-rule)' }}>
      <h2
        className="text-[13px] font-bold uppercase tracking-wider mb-6"
        style={{ color: 'var(--grey3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
      >
        聊聊？
      </h2>

      <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'var(--grey2)' }}>
        有项目想合作？或者只是想聊聊天？来，交个朋友。
      </p>

      <div className="flex flex-wrap gap-3">
        {[
          { label: '邮件', href: 'mailto:hello@example.com' },
          { label: 'GitHub', href: 'https://github.com' },
          { label: '小红书', href: 'https://xiaohongshu.com' },
          { label: '即刻', href: 'https://jike.com' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center px-4 py-2 rounded-full text-[13px] transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--wash2)',
              color: 'var(--grey2)',
              border: '1px solid var(--transparent-border)',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <p className="mt-16 text-[12px]" style={{ color: 'var(--grey3)' }}>
        © {new Date().getFullYear()} 叶小鱼 · 用 React + Tailwind 搭建
      </p>
    </footer>
  )
}
