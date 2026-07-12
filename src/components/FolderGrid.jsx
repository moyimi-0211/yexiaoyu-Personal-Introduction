export default function FolderGrid({ folders, active, onSelect }) {
  return (
    <div className="folder-grid">
      {folders.map((f) => (
        <button
          key={f.id}
          className={`folder-card ${active === f.id ? 'folder-open' : ''}`}
          onClick={() => onSelect(f.id)}
        >
          <div className="folder-tab-band" style={{ backgroundColor: f.color }} />
          <div className="folder-body">
            {f.image && (
              <div className="folder-thumb">
                <img src={f.image} alt={f.label} loading="lazy" />
              </div>
            )}
            <div className="folder-meta">
              <span className="folder-label">{f.label}</span>
              {f.count && <span className="folder-count">{f.count}</span>}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
