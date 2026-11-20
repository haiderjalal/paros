import { marqueeWords } from '@/data/site';

// Decorative band. Pure CSS animation, so it costs no JavaScript.
export default function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <div className="marquee" aria-hidden="true">
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
