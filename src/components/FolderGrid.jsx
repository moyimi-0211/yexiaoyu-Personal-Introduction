import { useState, useRef, useEffect, useCallback } from 'react'

// 十六进制 → RGB（给 box-shadow 用）
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

/* ============================================================
   FolderCard — 单个文件夹卡片，独立管理 hover 翻页
   ============================================================ */
function FolderCard({ folder, isActive, onSelect }) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)       // 当前预览索引 0/1/2
  const timerRef = useRef(null)
  const previews = folder.previews || [folder.color]   // 至少 1 张
  const rgb = hexToRgb(folder.color)

  /* 进入 hover → 启动定时器 */
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    // 立即翻到下一张，然后每 2200ms 翻一次（≈0.5s 动画 + 1.7s 停留）
    setActiveIdx(prev => (prev + 1) % previews.length)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % previews.length)
    }, 2200)
  }, [previews.length])

  /* 离开 hover → 清除定时器，停在当前 */
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  /* 卸载清理 */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const rotateY = activeIdx * (360 / previews.length)  // 每张间隔 120°

  return (
    <button
      className={`folder-card ${isActive ? 'folder-open' : ''} ${isHovered ? 'folder-hover' : ''}`}
      onClick={() => onSelect(folder.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ '--fc': folder.color, '--fc-rgb': rgb }}
    >
      {/* 底部两层彩色叠纸（纯装饰） */}
      <div className="folder-stack folder-stack-2" style={{ backgroundColor: folder.color }} />
      <div className="folder-stack folder-stack-1" style={{ backgroundColor: folder.color }} />

      {/* body + 文件角 共用容器 */}
      <div className="folder-body-wrap">
        {/* 文件夹主体 */}
        <div className="folder-body" style={{ backgroundColor: folder.color }}>
          {/* 顶部白色半透明标签条 */}
          <div className="folder-tab" />

          {/* 预览屏幕 */}
          <div className="folder-screen-frame">
            <div className="folder-screen">
              <div
                className="folder-screen-inner"
                style={{ transform: `rotateY(${rotateY}deg)` }}
              >
                {previews.map((bg, i) => (
                  <div
                    key={i}
                    className="folder-slide"
                    style={{
                      background: bg,
                      transform: `rotateY(${i * (360 / previews.length)}deg) translateZ(1px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 蓝色文件角 */}
        <div className="folder-corner" />
      </div>

      {/* 标题 + 数量 */}
      <div className="folder-meta">
        <span className="folder-label">{folder.label}</span>
        {folder.count && <span className="folder-count">{folder.count}</span>}
      </div>
    </button>
  )
}

/* ============================================================
   FolderGrid — 3×3 网格容器
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
