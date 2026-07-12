import { useState, useRef, useEffect, useCallback } from 'react'

/* ============================================================
   FolderCard — 单个文件夹卡片
   参考 creativeatishay.in：彩色底座 + 3 层设备卡片错位旋转叠放
   hover 时前端卡片 3D 翻转循环预览
   ============================================================ */
function FolderCard({ folder, isActive, onSelect }) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef(null)
  const previews = folder.previews || []     // 3 张渐变/图片作为预览
  const len = previews.length || 3

  // ── hover 启动定时器 ──
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setActiveIdx(prev => (prev + 1) % len)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % len)
    }, 2200)   // 0.5s 翻转 + 1.7s 停留
  }, [len])

  // ── 离开清除定时器，停在当前 ──
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const rotateY = activeIdx * (360 / len)   // 每张面间隔角度

  /* 为底下的两层各取一张预览（与正面不同） */
  const backPreview  = previews[(activeIdx + 1) % len]   // 中层可见的
  const backPreview2 = previews[(activeIdx + 2) % len]   // 底层可见的

  return (
    <button
      className={`folder-card ${isActive ? 'folder-open' : ''}`}
      onClick={() => onSelect(folder.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ======== 主体区 ======== */}
      <div className="folder-body">
        {/* 大面积彩色圆角底座 */}
        <div
          className="folder-color-base"
          style={{ backgroundColor: folder.color }}
        />

        {/* 3 层卡片叠放 */}
        <div className="folder-stack-wrap">
          {/* 第 3 层 — 最底 */}
          <div
            className="folder-layer folder-layer-3"
            style={{ background: backPreview2 || folder.color }}
          />

          {/* 第 2 层 — 中间 */}
          <div
            className="folder-layer folder-layer-2"
            style={{ background: backPreview || folder.color }}
          />

          {/* 第 1 层 — 最上（含 3D 翻转） */}
          <div className="folder-layer folder-layer-1">
            <div className="folder-layer-screen">
              <div
                className="folder-layer-flip"
                style={{ transform: `rotateY(${rotateY}deg)` }}
              >
                {previews.map((bg, i) => (
                  <div
                    key={i}
                    className="folder-layer-face"
                    style={{
                      background: bg,
                      transform: `rotateY(${i * (360 / len)}deg) translateZ(1px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======== 文字 ======== */}
      <div className="folder-meta">
        <span className="folder-label">{folder.label}</span>
        {folder.count && <span className="folder-count">{folder.count}</span>}
      </div>
    </button>
  )
}

/* ============================================================
   FolderGrid — 3×3 网格
   ============================================================ */
export default function FolderGrid({ folders, active, onSelect }) {
  return (
    <div className="folder-grid">
      {folders.map((f) => (
        <FolderCard
          key={f.id}
          folder={f}
          isActive={active === f.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
