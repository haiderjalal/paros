import { marqueeWords } from '@/data/site';

function Band({ words, className }) {
  // The list is doubled so the track can loop seamlessly.
  const items = [...words, ...words];

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        {items.map((word, i) => (
          <span key={`${word}-${i}`}>
            {word}
            <i className="marquee-star" />
          </span>
        ))}
      </div>
    </div>
  );
}

// Two ribbons that cross, running in opposite directions.
// Decorative band. Pure CSS animation, so it costs no JavaScript.
export default function Marquee() {
  return (
    <div className="marquee-cross" aria-hidden="true">
      <Band words={marqueeWords} className="marquee-a" />
      <Band words={[...marqueeWords].reverse()} className="marquee-b" />
    </div>
  );
}
