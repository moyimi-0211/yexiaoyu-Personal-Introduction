function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  return `${r},${g},${b}`
}

export default function FolderGrid({ folders, active, onSelect }) {
  return (
    <div className="folder-grid">
      {folders.map((f) => {
        const isActive = active === f.id
        const previews = f.previews || [f.color]
        const rgb = hexToRgb(f.color)
        return (
          <button
            key={f.id}
            className={`folder-card ${isActive ? 'folder-open' : ''}`}
            onClick={() => onSelect(f.id)}
            style={{ '--fc': f.color, '--fc-rgb': rgb }}
          >
            {/* 主体 */}
            <div className="folder-body">
              {/* 顶部白色标签 */}
              <div className="folder-tab" />

              {/* 预览屏幕 */}
              <div className="folder-screen-frame">
                <div className="folder-screen">
                  <div className="folder-screen-inner">
                    {previews.map((bg, i) => (
                      <div
                        key={i}
                        className="folder-slide"
                        style={{ background: bg }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 标题 + 数量 */}
            <div className="folder-meta">
              <span className="folder-label">{f.label}</span>
              {f.count && <span className="folder-count">{f.count}</span>}
            </div>
          </button>
        )
      })}
    </div>
  )
}
