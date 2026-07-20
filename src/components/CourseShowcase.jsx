import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import bookClubImage from '../assets/images/book-club.jpg'
import copywritingCourseImage from '../assets/images/copywriting-course.png'
import bootcampImage from '../assets/images/bootcamp.jpg'
import copywritingDetailImage from '../assets/images/copywriting-detail.jpg'

const filters = ['全部', '读书会', '文案课', '实战营']

const courses = [
  {
    id: 'book-club',
    category: '读书会',
    eyebrow: 'READING CLUB · ¥999 / 年',
    title: '青苔读书会',
    description: '一年精读 24 本书。叶小鱼与菜穗主讲，日更陪跑，从读书人走向自媒体人。',
    image: bookClubImage,
    palette: 'moss',
  },
  {
    id: 'copywriting-course',
    category: '文案课',
    eyebrow: 'COPYWRITING · 0 基础',
    title: '文案变现入门课',
    description: '人人都能学的销售文案课：通俗易懂、讲练结合、强效反馈，让文案变成更可靠的变现能力。',
    image: copywritingCourseImage,
    palette: 'sun',
  },
  {
    id: 'bootcamp',
    category: '实战营',
    eyebrow: 'BOOTCAMP · 4 次实战',
    title: '魔鬼实战营',
    description: '学一千次不如干上一次。带你完成 4 次实战，有机会把学费赚回来。',
    image: bootcampImage,
    palette: 'night',
  },
  {
    id: 'copywriting-detail',
    category: '文案课',
    eyebrow: 'COURSE GUIDE · 完整路径',
    title: '文案变现课程详情',
    description: '从痛点、导师、大纲到学员成果、福利与购买路径，一张长图看完整套课程设计。',
    image: copywritingDetailImage,
    palette: 'lilac',
    isTall: true,
  },
]

export default function CourseShowcase() {
  const [activeFilter, setActiveFilter] = useState('全部')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const cardsRef = useRef(null)

  const visibleCourses = activeFilter === '全部'
    ? courses
    : courses.filter((course) => course.category === activeFilter)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const cleanups = []
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('.course-card')
      cards.forEach((card) => {
        const image = card.querySelector('.course-card-image')
        const onEnter = () => {
          gsap.to(card, { y: -7, rotate: -0.45, duration: 0.28, ease: 'power2.out' })
          gsap.to(image, { scale: 1.045, duration: 0.42, ease: 'power2.out' })
        }
        const onLeave = () => {
          gsap.to(card, { y: 0, rotate: 0, duration: 0.34, ease: 'power2.out' })
          gsap.to(image, { scale: 1, duration: 0.42, ease: 'power2.out' })
        }
        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('mouseenter', onEnter)
          card.removeEventListener('mouseleave', onLeave)
        })
      })
    }, cardsRef)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      context.revert()
    }
  }, [activeFilter])

  useEffect(() => {
    if (!selectedCourse) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedCourse(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedCourse])

  return (
    <section className="course-showcase mt-16" aria-labelledby="courses-title">
      <div className="course-heading">
        <div>
          <p className="course-kicker">LEARN · PRACTISE · GROW</p>
          <h2 id="courses-title">课程产品</h2>
        </div>
        <p>把方法讲清楚，也陪你把它做出来。</p>
      </div>

      <div className="course-filters" aria-label="课程分类筛选">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={activeFilter === filter ? 'is-active' : ''}
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div ref={cardsRef} className="course-grid">
        {visibleCourses.map((course) => (
          <button
            key={course.id}
            type="button"
            className={`course-card course-card-${course.palette}`}
            onClick={() => setSelectedCourse(course)}
            aria-label={`查看${course.title}详情`}
          >
            <span className="course-image-wrap">
              <img
                className={`course-card-image ${course.isTall ? 'course-image-top' : ''}`}
                src={course.image}
                alt={`${course.title}海报`}
                loading="lazy"
              />
            </span>
            <span className="course-card-copy">
              <span className="course-card-meta">{course.category}</span>
              <span className="course-card-title">{course.title}</span>
              <span className="course-card-arrow" aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>

      {selectedCourse && (
        <div className="course-dialog-backdrop" role="presentation" onMouseDown={() => setSelectedCourse(null)}>
          <div
            className="course-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="course-dialog-close" type="button" onClick={() => setSelectedCourse(null)} aria-label="关闭详情">×</button>
            <div className="course-dialog-image-wrap">
              <img src={selectedCourse.image} alt={`${selectedCourse.title}海报`} />
            </div>
            <div className="course-dialog-copy">
              <p>{selectedCourse.eyebrow}</p>
              <h3 id="course-dialog-title">{selectedCourse.title}</h3>
              <span>{selectedCourse.category}</span>
              <div>{selectedCourse.description}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
