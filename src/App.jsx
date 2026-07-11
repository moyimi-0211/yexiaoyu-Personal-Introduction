import { useState } from 'react'
import Header from './components/Header'
import FolderNav from './components/FolderNav'
import PostList from './components/PostList'
import PhotoScroller from './components/PhotoScroller'
import GitHubActivity from './components/GitHubActivity'
import ContactFooter from './components/ContactFooter'
import './index.css'

const folders = [
  { id: 'products', label: '作品', color: '#3B5BFF' },
  { id: 'projects', label: '项目', color: '#F97316' },
  { id: 'clients', label: '客户案例', color: '#10B981' },
  { id: 'opensource', label: '开源', color: '#7C3AED' },
  { id: 'visuals', label: '视觉', color: '#EC4899' },
  { id: 'aivisuals', label: 'AI 生成', color: '#F6C945' },
]

const demoProducts = [
  { title: '小鱼工具箱', desc: '设计师常用工具合集，一键直达', source: 'Product Hunt', color: '#3B5BFF', image: null },
  { title: '配色灵感生成器', desc: '基于 AI 的颜色搭配推荐工具', source: 'GitHub', color: '#10B981', image: null },
  { title: '设计组件库', desc: '为独立开发者准备的 UI 组件', source: 'Figma', color: '#EC4899', image: null },
]

const demoVisuals = [
  { title: '流动光影', color: '#6366f1', link: '#' },
  { title: '粒子星河', color: '#f59e0b', link: '#' },
  { title: '霓虹夜幕', color: '#ec4899', link: '#' },
  { title: '水墨晕染', color: '#10b981', link: '#' },
  { title: '数据可视化', color: '#3b82f6', link: '#' },
  { title: '3D 场景', color: '#f97316', link: '#' },
  { title: '交互动效', color: '#8b5cf6', link: '#' },
  { title: '字体排印', color: '#ef4444', link: '#' },
]

export default function App() {
  const [activeFolder, setActiveFolder] = useState('products')

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--body-bg)', color: 'var(--body-color)' }}>
      <main className="mx-auto max-w-[640px] px-5 pb-24">

        <Header />

        <FolderNav
          folders={folders}
          active={activeFolder}
          onSelect={setActiveFolder}
        />

        <div className="mt-16">
          {activeFolder === 'products' && (
            <PostList title="作品" items={demoProducts} />
          )}
          {activeFolder === 'projects' && (
            <PostList title="项目" items={[
              { title: '个人网站重设计', desc: '从零搭建的极简作品集', source: '独立开发', color: '#F97316', image: null },
              { title: '品牌视觉升级', desc: '为独立咖啡馆做的全套设计', source: '商业项目', color: '#10B981', image: null },
              { title: '开源图标库', desc: '120+ 个手绘风格 SVG 图标', source: 'GitHub', color: '#7C3AED', image: null },
            ]} />
          )}
          {activeFolder === 'clients' && (
            <PostList title="客户案例" items={[
              { title: '某咖啡品牌官网', desc: '品牌官网设计与前端开发', source: '2024', color: '#10B981', image: null },
              { title: 'SaaS 后台界面', desc: '数据看板 UI 设计', source: '2023', color: '#3B5BFF', image: null },
            ]} />
          )}
          {activeFolder === 'opensource' && (
            <>
              <PostList title="开源" items={[
                { title: 'design.md', desc: '设计规范描述语言，用 Markdown 写设计系统', source: 'GitHub', color: '#7C3AED', image: null },
                { title: 'css-snippets', desc: '日常积累的 CSS 动画小片段', source: 'GitHub', color: '#EC4899', image: null },
              ]} />
              <GitHubActivity />
            </>
          )}
          {activeFolder === 'visuals' && (
            <PhotoScroller title="视觉" items={demoVisuals} />
          )}
          {activeFolder === 'aivisuals' && (
            <PhotoScroller title="AI 生成" items={[
              { title: '赛博园林', color: '#06b6d4', link: '#' },
              { title: '数据梦境', color: '#a855f7', link: '#' },
              { title: '故障美学', color: '#ef4444', link: '#' },
              { title: '极简海报', color: '#f97316', link: '#' },
              { title: '像素复古', color: '#84cc16', link: '#' },
              { title: '抽象几何', color: '#3b82f6', link: '#' },
              { title: '光影建筑', color: '#ec4899', link: '#' },
              { title: '流体质感', color: '#14b8a6', link: '#' },
            ]} />
          )}
        </div>

        <ContactFooter />
      </main>
    </div>
  )
}
