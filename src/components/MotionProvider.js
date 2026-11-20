'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

// Loads only the animation features we use, which keeps the JavaScript small.
export default function MotionProvider({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
