'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const DURATION_MS = 1600;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Counts up to `value` the first time it scrolls into view.
// The server renders the real number, so it is correct with no JavaScript, for
// search engines and for people who prefer reduced motion.
export default function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [shown, setShown] = useState(value);
  const [armed, setArmed] = useState(false);

  // Reset to zero on the client only, ready to count up when it is seen.
  useEffect(() => {
    setShown(reduce ? value : 0);
    setArmed(!reduce);
  }, [reduce, value]);

  useEffect(() => {
    if (!armed || !inView) return undefined;

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      setShown(Math.round(value * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [armed, inView, value]);

  return (
    <span ref={ref} className="stat-value">
      {shown}
      {suffix}
    </span>
  );
}
