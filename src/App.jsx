import { useState } from 'react'
import Header from './components/Header'
import FolderGrid from './components/FolderGrid'
import PostList from './components/PostList'
import PhotoScroller from './components/PhotoScroller'
import ContactFooter from './components/ContactFooter'
import CommentSection from './components/CommentSection'
import './index.css'

const folders = [
  { id: 'books', label: '出版著作', count: '3本', color: '#3B5BFF', image: null },
  { id: 'cases', label: '文案案例', count: '12篇', color: '#F97316', image: null },
  { id: 'students', label: '学员成果', count: '500+人', color: '#10B981', image: null },
  { id: 'camp', label: '训练营', count: '8期', color: '#7C3AED', image: null },
  { id: 'media', label: '媒体报道', count: '15篇', color: '#EC4899', image: null },
  { id: 'free', label: '免费干货', count: '20+', color: '#F6C945', image: null },
  { id: 'reviews', label: '评论区', count: null, color: '#14B8A6', image: null },
  { id: 'collab', label: '合作', count: null, color: '#F43F5E', image: null },
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

const demoCamp = [
  { title: '7 天入门营', color: '#7C3AED', link: '#' },
  { title: '21 天进阶实战', color: '#8B5CF6', link: '#' },
  { title: '60 天变现陪跑', color: '#6366F1', link: '#' },
  { title: '1v1 私教辅导', color: '#A78BFA', link: '#' },
  { title: '企业内训定制', color: '#C4B5FD', link: '#' },
  { title: '线上直播课', color: '#DDD6FE', link: '#' },
  { title: '线下工作坊', color: '#818CF8', link: '#' },
  { title: '年度会员社群', color: '#4F46E5', link: '#' },
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

const approvedReviews = [
  // 审核通过的评论会出现在这里
  // { name: '', badge: '', text: '', color: '' },
]

export default function App() {
  const [activeFolder, setActiveFolder] = useState('books')

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--body-bg)', color: 'var(--body-color)' }}>
      <main className="mx-auto max-w-[640px] px-5 pb-24">

        <Header />

        <FolderGrid
          folders={folders}
          active={activeFolder}
          onSelect={setActiveFolder}
        />

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
            <PhotoScroller title="文案训练营" items={demoCamp} />
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
