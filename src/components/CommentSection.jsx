import { useState } from 'react'

// ⚠️ 替换为你的飞书 Webhook 地址
const FEISHU_WEBHOOK = 'https://open.feishu.cn/open-apis/bot/v2/hook/REPLACE_ME'

export default function CommentSection({ reviews }) {
  const [form, setForm] = useState({ name: '', role: '', learned: '', result: '', words: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const text = [
      `📝 **新评论待审核**`,
      ``,
      `👤 **姓名**：${form.name}`,
      `🏷 **身份**：${form.role}`,
      `📖 **学习收获**：${form.learned}`,
      `📊 **成果/变化**：${form.result}`,
      `💬 **推荐语**：${form.words}`,
      ``,
      `---`,
      `审核通过后将在网站评论区展示`,
    ].join('\n')

    try {
      await fetch(FEISHU_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          msg_type: 'interactive',
          card: {
            header: { title: { tag: 'plain_text', content: '新评论待审核' }, template: 'blue' },
            elements: [
              { tag: 'div', text: { tag: 'lark_md', content: `**姓名**：${form.name}\n**身份**：${form.role}\n**学习收获**：${form.learned}\n**成果/变化**：${form.result}\n**推荐语**：${form.words}` } },
              { tag: 'hr' },
              { tag: 'note', elements: [{ tag: 'plain_text', content: '审核通过后将在网站评论区展示' }] },
            ],
          },
        }),
      })
    } catch (err) {
      // Webhook 配置前，静默失败
      console.log('提交到飞书（Webhook 未配置时会报错，属正常）:', err)
    }

    setSending(false)
    setSubmitted(true)
  }

  return (
    <section className="mt-16" style={{ animation: 'fvIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)' }}>
      <h2
        className="text-[13px] font-bold uppercase tracking-wider mb-6"
        style={{ color: 'var(--grey3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
      >
        评论区
      </h2>

      {/* ====== Approved Reviews ====== */}
      {reviews.length > 0 && (
        <div className="flex flex-col gap-0 mb-12">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="py-5"
              style={{ borderBottom: '1px solid var(--border-rule)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: r.color || 'var(--accent)' }}
                >
                  {r.name[0]}
                </div>
                <span className="text-[13px] font-medium" style={{ color: 'var(--grey1)' }}>
                  {r.name}
                </span>
                {r.badge && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ color: 'var(--grey3)', background: 'var(--wash2)' }}
                  >
                    {r.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--grey2)' }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ====== Submit Form ====== */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-rule)' }}
        >
          <p className="text-[14px] mb-5" style={{ color: 'var(--grey2)' }}>
            学过课程、读过书、有过改变？来，留个脚印。
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                required
                placeholder="你的名字"
                value={form.name}
                onChange={handleChange('name')}
                className="flex-1 px-3 py-2 rounded-lg text-[13px] outline-none"
                style={{
                  background: 'var(--wash1)',
                  color: 'var(--grey1)',
                  border: '1px solid var(--border-rule)',
                }}
              />
              <input
                required
                placeholder="身份（学员 / 读者 / 同行）"
                value={form.role}
                onChange={handleChange('role')}
                className="flex-1 px-3 py-2 rounded-lg text-[13px] outline-none"
                style={{
                  background: 'var(--wash1)',
                  color: 'var(--grey1)',
                  border: '1px solid var(--border-rule)',
                }}
              />
            </div>

            <textarea
              required
              placeholder="从课程/书里学到了什么？"
              rows={2}
              value={form.learned}
              onChange={handleChange('learned')}
              className="px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
              style={{
                background: 'var(--wash1)',
                color: 'var(--grey1)',
                border: '1px solid var(--border-rule)',
              }}
            />

            <textarea
              required
              placeholder="有什么具体成果或变化？（收入、转行、认知...）"
              rows={2}
              value={form.result}
              onChange={handleChange('result')}
              className="px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
              style={{
                background: 'var(--wash1)',
                color: 'var(--grey1)',
                border: '1px solid var(--border-rule)',
              }}
            />

            <textarea
              required
              placeholder="写一句推荐语吧（会展示在评论区）"
              rows={2}
              value={form.words}
              onChange={handleChange('words')}
              className="px-3 py-2 rounded-lg text-[13px] outline-none resize-none"
              style={{
                background: 'var(--wash1)',
                color: 'var(--grey1)',
                border: '1px solid var(--border-rule)',
              }}
            />

            <button
              type="submit"
              disabled={sending}
              className="self-start px-6 py-2 rounded-full text-[13px] font-medium transition-all hover:-translate-y-0.5 disabled:opacity-50"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {sending ? '发送中...' : '提交评价'}
            </button>
          </div>
        </form>
      ) : (
        <div
          className="p-8 rounded-2xl text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-rule)' }}
        >
          <p className="text-[14px] mb-1" style={{ color: 'var(--grey1)' }}>
            收到你的评价了 ✨
          </p>
          <p className="text-[12px]" style={{ color: 'var(--grey3)' }}>
            审核通过后会展示在评论区，感谢留言。
          </p>
        </div>
      )}
    </section>
  )
}
