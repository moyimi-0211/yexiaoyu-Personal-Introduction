# Portfolio Site · 复刻 Atishay Tuli

## 项目概述
复刻 creativeatishay.in 的核心骨架布局和交互，用 React + Tailwind 实现。

## 参考来源
- **原站**: https://www.creativeatishay.in
- **分析日期**: 2026-07-13
- **复刻策略**: 骨架复刻（核心布局+交互），不复制个人内容

---

## 设计系统

### 色彩体系（从原站 CSS 变量精确提取）
```css
:root {
  --body-bg: #0E0E12;
  --body-color: #EAEAEA;
  --grey1: #EAEAEA;
  --grey2: #A0A0A8;
  --grey3: #787880;
  --accent: #3B5BFF;
  --wash1: #2A2A32;
  --wash2: #1C1C22;
  --border: #2A2A32;
  --selection-bg: #2A2A3A;
  --focus-color: rgba(255,255,255,0.5);
}
```

### 字体
| 用途 | 字体 | 字重 |
|------|------|------|
| 标题 | Bricolage Grotesque | 400-800 可变 |
| 正文 | Hanken Grotesk | 400 |
| 代码/标签 | JetBrains Mono | 400 |

### 字号
| 层级 | 大小 |
|------|------|
| Hero 标题 | clamp(40px, 9vw, 84px) |
| Section 标题 | clamp(34px, 7vw, 72px) |
| 中标题 | clamp(16px, 2.4vw, 22px) |
| 正文 | 14-15px |
| 小标签 | 10-13.5px |

### 圆角
| 元素 | 圆角 |
|------|------|
| 头像 | 12px |
| 按钮/药丸 | 100px |
| 卡片 | 13-14px |
| 小元素 | 5-6px |

---

## 组件清单

### 1. Header
- 头像 106×106，圆角12px，4px 边框
- 姓名（Hanken Grotesk）
- 职位标签
- 个人简介段落

### 2. FolderNav（文件夹导航）
- 3 列 grid（桌面），2 列（平板），1 列（手机）
- gap: 30px 20px
- 每个 folder 是按钮，带颜色标签
- 点击过滤下方内容

### 3. PostList（产品/项目列表）
- 列表项带悬停预览图
- 预览图 230×165，跟随鼠标
- 状态标签（JetBrains Mono, 10px）

### 4. PhotoScroller（水平滚动画廊）
- 横向可滚动的图片列表
- GSAP 动画（可选）

### 5. GitHubActivity
- 贡献热力图嵌入
- 暗色主题适配

### 6. ThemeToggle
- Minimal（浅色）/ Creative（暗色）切换
- CSS 变量覆盖实现

### 7. Contact Footer
- 联系信息区

---

## 交互说明
- 悬停预览：mousemove 事件驱动，position:fixed
- 文件夹导航：点击切换显示内容区
- 主题切换：即时 CSS 变量覆盖
- 平滑滚动：Lenis
- 入场动画：GSAP ScrollTrigger（可选）

## 技术栈
- React 18 + Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger（动画）
- Lenis（平滑滚动）
- 字体：Google Fonts CDN（Bricolage Grotesque, Hanken Grotesk, JetBrains Mono）

## 交付标准
- [ ] 8 个组件全部可运行
- [ ] 颜色/字体/间距与原站 CSS 变量一致
- [ ] 悬停预览正常工作
- [ ] 文件夹导航可过滤
- [ ] 主题切换可用
- [ ] 无 JS 报错
- [ ] 响应式（桌面/平板/手机）
