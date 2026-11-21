import CountUp from './CountUp';
import { menu, totalItems } from '@/data/menu';
import { brandValues } from '@/data/site';

// Figures come straight from the menu data, so they never drift out of date.
const stats = [
  { value: menu.length, label: 'Menu categories' },
  { value: totalItems, label: 'Dishes and drinks' },
  { value: 100, suffix: '%', label: 'Cooked to order' },
];

export default function Brand() {
  return (
    <section id="brand" className="brand" aria-labelledby="brand-title">
      <div className="container brand-grid">
        <div className="badge" aria-hidden="true">
          <svg className="badge-ring" viewBox="0 0 320 320">
            <defs>
              <path id="badge-circle" d="M160 160 m-130 0 a130 130 0 1 1 260 0 a130 130 0 1 1 -260 0" />
            </defs>
            <text>
              <textPath href="#badge-circle" textLength="812" lengthAdjust="spacing">
                FRESH FROM THE FIRE • MADE TO ORDER • SHARED IN CHAKDARA •
              </textPath>
            </text>
          </svg>
          <img className="badge-logo" src="/logo.png" alt="" width="200" height="200" loading="lazy" />
        </div>

        <div>
          <span className="kicker kicker-pill reveal">Why Paros</span>
          <h2 id="brand-title" className="reveal">
            Bold food, made the honest way.
          </h2>
          <ul className="values">
            {brandValues.map((v, i) => (
              <li key={v.title} className="reveal" style={{ '--i': i }}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <ul className="stats" aria-label="Paros at a glance">
          {stats.map((s) => (
            <li key={s.label}>
              <CountUp value={s.value} suffix={s.suffix} />
              <span className="stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
