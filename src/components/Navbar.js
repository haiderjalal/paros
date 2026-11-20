'use client';

import { useState } from 'react';
import { m, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { site } from '@/data/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <m.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="brand-mark" aria-label="Paros, back to top">
            <img src="/logo.png" alt="" width="46" height="46" />
            <span>Paros</span>
          </a>
          <nav aria-label="Primary">
            <ul className="nav-links">
              <li>
                <a href="#story">Our story</a>
              </li>
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#order">Visit</a>
              </li>
            </ul>
          </nav>
          <a className="btn btn-primary" href={site.phoneHref}>
            Call to order
          </a>
        </div>
      </header>
    </>
  );
}
