export default function MinimalOverview({ sections }) {
  return (
    <div className="minimal-overview">
      {sections.map((section) => (
        <section key={section.title} className="minimal-section" aria-labelledby={`minimal-${section.title}`}>
          <p className="minimal-section-label" id={`minimal-${section.title}`}>{section.title}</p>
          <div className="minimal-work-list">
            {section.items.map((item) => (
              <article className="minimal-work" key={item.title}>
                <div className="minimal-metric">
                  <strong>{item.metric}</strong>
                  <span>{item.metricLabel}</span>
                </div>
                <div className="minimal-work-copy">
                  <h2>{item.title} <span aria-hidden="true">→</span></h2>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
          {section.more && <button type="button" className="minimal-more">查看全部（另外 {section.more} 项）⌄</button>}
        </section>
      ))}
    </div>
  )
}
