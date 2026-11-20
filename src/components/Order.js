'use client';

import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import FallbackImage from './FallbackImage';
import { IMG } from '@/data/images';
import { site } from '@/data/site';

export default function Order() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <section id="order" className="order" ref={ref} aria-labelledby="order-title">
      <m.div className="order-bg" style={{ y }} aria-hidden="true">
        <FallbackImage photo={IMG.dining} className="cover" sizes="100vw" widths={[960, 1600, 2000]} />
      </m.div>
      <div className="order-shade" aria-hidden="true" />

      <div className="container order-inner">
        <h2 id="order-title">Order by phone, or come hungry.</h2>
        <p className="order-lede">Dial for home delivery, or walk in and sit down on University Road.</p>
        <a className="phone-big" href={site.phoneHref}>
          {site.phone}
        </a>
        <p className="address">{site.address}</p>
      </div>
    </section>
  );
}
