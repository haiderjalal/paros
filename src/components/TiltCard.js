'use client';

import { useRef } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

// A card that tilts toward the pointer in 3D with a soft light sweep.
// Mouse only: touch screens keep normal scrolling and skip the tilt.
export default function TiltCard({ children, className = '', intensity = 9 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const x = useSpring(px, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(py, { stiffness: 200, damping: 20, mass: 0.5 });

  const rotateY = useTransform(x, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(y, [0, 1], [intensity, -intensity]);
  const glare = useTransform(
    [x, y],
    ([gx, gy]) => `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(255, 255, 255, 0.5), transparent 55%)`
  );

  const handleMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <m.div
      ref={ref}
      className={`tilt ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
    >
      {children}
      <m.span className="tilt-glare" style={{ backgroundImage: glare }} aria-hidden="true" />
    </m.div>
  );
}
