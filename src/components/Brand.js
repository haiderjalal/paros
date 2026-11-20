import { brandValues } from '@/data/site';

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
          <h2 id="brand-title">Bold food, made the honest way.</h2>
          <ul className="values">
            {brandValues.map((v) => (
              <li key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
