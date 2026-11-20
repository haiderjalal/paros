'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import FallbackImage from './FallbackImage';
import { ChevronIcon, PauseIcon, PlayIcon } from './Icons';
import { heroSlides } from '@/data/site';
import { EASE } from '@/lib/motion';

const COUNT = heroSlides.length;
const STEP = 360 / COUNT;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const stageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);

  const slide = heroSlides[index];
  const autoplay = !reduce && !paused;

  const next = () => setIndex((i) => (i + 1) % COUNT);
  const prev = () => setIndex((i) => (i - 1 + COUNT) % COUNT);

  return (
    <section id="top" className="hero" ref={sectionRef} aria-label="Featured dishes">
      <div className="hero-glow hero-glow-a" aria-hidden="true" />
      <div className="hero-glow hero-glow-b" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">
            {['Fresh from the fire', 'to your table.'].map((line, i) => (
              <span className="hero-line" key={line}>
                <m.span
                  className="hero-line-inner"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.14, ease: EASE }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p
            className="hero-lede"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            Pizza, burgers, wings, wraps and fried chicken, made fresh to order on University Road, Chakdara.
          </m.p>

          <div className="slide-info">
            <AnimatePresence mode="wait">
              <m.div
                key={slide.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h2 className="slide-name">{slide.name}</h2>
                <p className="slide-blurb">{slide.blurb}</p>
                <span className="slide-price">{slide.price}</span>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="hero-controls">
            <button type="button" className="round-btn" onClick={prev} aria-label="Previous dish">
              <ChevronIcon dir="left" />
            </button>
            <div className="dots">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`dot${i === index ? ' is-active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${s.name}`}
                  aria-current={i === index ? 'true' : undefined}
                />
              ))}
            </div>
            <button type="button" className="round-btn" onClick={next} aria-label="Next dish">
              <ChevronIcon dir="right" />
            </button>
            <button
              type="button"
              className="round-btn"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play featured dishes' : 'Pause featured dishes'}
            >
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>
          </div>

          {!reduce && (
            <div className="progress" aria-hidden="true">
              <span
                key={index}
                className="progress-fill"
                style={{ animationPlayState: autoplay ? 'running' : 'paused' }}
                onAnimationEnd={(e) => {
                  if (e.target === e.currentTarget && autoplay) next();
                }}
              />
            </div>
          )}
        </div>

        <m.div className="ring-stage" style={{ y: stageY }}>
          <div className="ring-platform" aria-hidden="true" />
          <div className="ring" style={{ transform: `rotateY(${-index * STEP}deg)` }}>
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="ring-item"
                style={{ '--a': `${i * STEP}deg` }}
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.name}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <FallbackImage
                  photo={s.photo}
                  label={s.name}
                  className="cover"
                  sizes="(min-width: 900px) 230px, 170px"
                  widths={[320, 480, 640]}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                />
              </button>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
