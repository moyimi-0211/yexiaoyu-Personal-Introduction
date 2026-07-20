import { useState, useEffect } from 'react'
import Header from './components/Header'
import FolderNav from './components/FolderNav'
import FolderGrid from './components/FolderGrid'
import PostList from './components/PostList'
import PhotoScroller from './components/PhotoScroller'
import CourseShowcase from './components/CourseShowcase'
import ContactFooter from './components/ContactFooter'
import CommentSection from './components/CommentSection'
import './index.css'

const folders = [
  { id: 'books', label: '出版著作', count: '3本', color: '#4A86FF',
    previews: ['linear-gradient(135deg, #0a0a1a 0%, #1a2a4a 100%)', 'linear-gradient(135deg, #1a1a2e 0%, #2a3a5a 100%)', 'linear-gradient(135deg, #0d1d3a 0%, #3B5BFF 100%)']
  },
  { id: 'cases', label: '文案案例', count: '12篇', color: '#FF8D00',
    previews: ['linear-gradient(135deg, #1a0a00 0%, #3a1a00 100%)', 'linear-gradient(135deg, #0d0d00 0%, #4a2a00 100%)', 'linear-gradient(135deg, #1a0d00 0%, #F97316 100%)']
  },
  { id: 'students', label: '学员成果', count: '500+人', color: '#2ECB81',
    previews: ['linear-gradient(135deg, #001a0d 0%, #00331a 100%)', 'linear-gradient(135deg, #002a15 0%, #004d2a 100%)', 'linear-gradient(135deg, #00331a 0%, #10B981 100%)']
  },
  { id: 'camp', label: '课程产品', count: '4项', color: '#9E91C8',
    previews: ['linear-gradient(135deg, #0d0020 0%, #1a0040 100%)', 'linear-gradient(135deg, #150030 0%, #2a0060 100%)', 'linear-gradient(135deg, #1a0033 0%, #8B5CF6 100%)']
  },
  { id: 'media', label: '媒体报道', count: '15篇', color: '#F45CAB',
    previews: ['linear-gradient(135deg, #1a0010 0%, #2a0020 100%)', 'linear-gradient(135deg, #0d0015 0%, #3a0030 100%)', 'linear-gradient(135deg, #200015 0%, #EC4899 100%)']
  },
  { id: 'free', label: '免费干货', count: '20+', color: '#FFC107',
    previews: ['linear-gradient(135deg, #1a1500 0%, #2a2000 100%)', 'linear-gradient(135deg, #0d0d00 0%, #3a2a00 100%)', 'linear-gradient(135deg, #1a1000 0%, #F59E0B 100%)']
  },
  { id: 'reviews', label: '评论区', count: null, color: '#2DD4BF',
    previews: ['linear-gradient(135deg, #001a17 0%, #002a25 100%)', 'linear-gradient(135deg, #002520 0%, #004a40 100%)', 'linear-gradient(135deg, #002a22 0%, #14B8A6 100%)']
  },
  { id: 'collab', label: '合作', count: null, color: '#FFA500',
    previews: ['linear-gradient(135deg, #1a1000 0%, #2a1a00 100%)', 'linear-gradient(135deg, #0d0800 0%, #3a2500 100%)', 'linear-gradient(135deg, #1a0d00 0%, #F43F5E 100%)']
  },
  { id: 'achievements', label: '成就', count: '10+项', color: '#D97D2B',
    previews: ['linear-gradient(135deg, #1a0d00 0%, #2a1a00 100%)', 'linear-gradient(135deg, #0d0600 0%, #3a2500 100%)', 'linear-gradient(135deg, #1a1000 0%, #F59E0B 100%)']
  },
]

const demoBooks = [
  { title: '《文案变现》', desc: '从入门到变现的系统实操手册', source: '畅销书', color: '#3B5BFF', image: null },
  { title: '《新媒体文案创作与传播》', desc: '小红书+公众号+短视频文案全攻略', source: '双一流教材', color: '#6366F1', image: null },
  { title: '《一字千金》', desc: '写好每一个字，让文案自带销量', source: '新书', color: '#8B5CF6', image: null },
]

const demoCases = [
  { title: '卖货文案 · 单篇 30 万', desc: '一篇公众号推文带来 30 万销售额，ROI 超过 1:15', source: '电商', color: '#F97316', image: null },
  { title: '加盟文案 · 80% 转化', desc: '为服装公司撰写品牌文案后，加盟客户增长 80%', source: '招商', color: '#EF4444', image: null },
  { title: '软文传播 · 100+ 转载', desc: '一篇软文被 100+ 自媒体主动转载，自然阅读破百万', source: '品牌', color: '#F59E0B', image: null },
]

const demoStudents = [
  { title: '小雅 · 从行政到月入过万', desc: '0 基础入门，3 个月后首单 5000 元，现稳定月入 1.5 万+', source: '第七期', color: '#10B981', image: null },
  { title: '大刘 · 副业转正', desc: '白天上班晚上学文案，半年后辞职全职做文案，收入翻三倍', source: '第五期', color: '#34D399', image: null },
  { title: '阿琳 · 宝妈逆袭', desc: '带娃间隙学文案，第一篇作品就被甲方看中，现已签约稳定供稿', source: '第三期', color: '#6EE7B7', image: null },
]

const demoMedia = [
  { title: '36氪', color: '#EC4899', link: '#' },
  { title: '人人都是产品经理', color: '#F472B6', link: '#' },
  { title: '鸟哥笔记', color: '#FB7185', link: '#' },
  { title: '运营研究社', color: '#FDA4AF', link: '#' },
  { title: '知乎专栏', color: '#F43F5E', link: '#' },
  { title: '微信公众号', color: '#E11D48', link: '#' },
  { title: '小红书', color: '#BE123C', link: '#' },
  { title: 'B站', color: '#9F1239', link: '#' },
]

const demoFree = [
  { title: '文案自检清单', desc: '写完对照 12 项自查，告别自嗨', source: '工具', color: '#F6C945', image: null },
  { title: '爆款标题模板库', desc: '50 个经过验证的标题公式，拿来就用', source: '模板', color: '#FBBF24', image: null },
  { title: '月度文案精选集', desc: '每月精选 10 篇优秀文案并附拆解', source: '阅读', color: '#F59E0B', image: null },
]

const approvedReviews = []

export default function App() {
  const [activeFolder, setActiveFolder] = useState('books')
  const [mode, setMode] = useState(() =>
    document.documentElement.getAttribute('data-mode') || 'minimal'
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const next = document.documentElement.getAttribute('data-mode')
      if (next && next !== mode) setMode(next)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] })
    return () => observer.disconnect()
  }, [mode])

  const isCreative = mode === 'creative'

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--body-bg)', color: 'var(--body-color)' }}>
      <main className="mx-auto max-w-[640px] px-5 pb-24">

        <Header />

        {isCreative ? (
          <FolderGrid
            folders={folders}
            active={activeFolder}
            onSelect={setActiveFolder}
          />
        ) : (
          <FolderNav
            folders={folders}
            active={activeFolder}
            onSelect={setActiveFolder}
          />
        )}

        <div className="mt-16">
          {activeFolder === 'books' && (
            <PostList title="出版著作" items={demoBooks} />
          )}
          {activeFolder === 'cases' && (
            <PostList title="文案案例" items={demoCases} />
          )}
          {activeFolder === 'students' && (
            <PostList title="学员成果" items={demoStudents} />
          )}
          {activeFolder === 'camp' && (
            <CourseShowcase />
          )}
          {activeFolder === 'media' && (
            <PhotoScroller title="媒体报道" items={demoMedia} />
          )}
          {activeFolder === 'free' && (
            <PostList title="免费干货" items={demoFree} />
          )}
          {activeFolder === 'reviews' && (
            <CommentSection reviews={approvedReviews} />
          )}
          {activeFolder === 'collab' && (
            <section className="mt-16" style={{ animation: 'fvIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <h2
                className="text-[13px] font-bold uppercase tracking-wider mb-6"
                style={{ color: 'var(--grey3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
              >
                合作
              </h2>
              <div
                className="p-8 rounded-2xl text-center"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-rule)' }}
              >
                <p className="text-[14px]" style={{ color: 'var(--grey2)' }}>
                  合作方式规划中，敬请期待。
                </p>
                <p className="text-[12px] mt-2" style={{ color: 'var(--grey3)' }}>
                  品牌合作 / 企业培训 / 内容共创 / 更多可能
                </p>
              </div>
            </section>
          )}
        </div>

        <ContactFooter />
      </main>
    </div>
  )
}
