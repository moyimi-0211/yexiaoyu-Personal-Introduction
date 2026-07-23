export default function FolderNav({ folders, active, onSelect }) {
  return (
    <nav
      className="folder-nav grid gap-[30px_20px] mt-20 pt-2.5"
      style={{
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      {folders.map(f => (
        <button
          key={f.id}
          onClick={() => onSelect(f.id)}
          className="folder-btn"
          data-active={active === f.id}
          style={{
            '--folder-color': f.color,
          }}
        >
          <span className="folder-dot" />
          <span className="folder-label" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
            {f.label}
          </span>

          <style>{`
            .folder-btn {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 12px 16px;
              border-radius: 10px;
              background: var(--wash2);
              border: 1px solid var(--transparent-border);
              color: var(--grey2);
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .folder-btn:hover {
              border-color: var(--surface-border-hover);
              color: var(--grey1);
            }
            .folder-btn[data-active="true"] {
              background: var(--wash1);
              border-color: var(--surface-border-hover);
              color: var(--grey1);
            }
            .folder-dot {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: var(--folder-color, var(--accent));
              flex-shrink: 0;
            }
            .folder-label {
              white-space: nowrap;
            }
          `}</style>
        </button>
      ))}
    </nav>
  )
}
