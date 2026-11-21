'use client';

import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Embers from './Embers';
import FallbackImage from './FallbackImage';
import { PhoneIcon } from './Icons';
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
      <Embers count={12} />

      <div className="container order-inner">
        <span className="kicker reveal">Hungry?</span>
        <h2 id="order-title" className="reveal">
          Order by phone, or come hungry.
        </h2>
        <p className="order-lede reveal" style={{ '--i': 1 }}>
          Dial for home delivery, or walk in and sit down on University Road.
        </p>
        <a className="phone-big reveal" style={{ '--i': 2 }} href={site.phoneHref}>
          <span className="call-orb" aria-hidden="true">
            <PhoneIcon size={28} />
          </span>
          {site.phone}
        </a>
        <p className="address reveal" style={{ '--i': 3 }}>
          {site.address}
        </p>
      </div>
    </section>
  );
}
