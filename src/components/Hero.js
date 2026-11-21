'use client';

import { useRef, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Embers from './Embers';
import FallbackImage from './FallbackImage';
import { ArrowDownIcon, ChevronIcon, PauseIcon, PhoneIcon, PlayIcon } from './Icons';
import { heroSlides, site } from '@/data/site';
import { EASE } from '@/lib/motion';

const COUNT = heroSlides.length;
const STEP = 360 / COUNT;

// How far (in degrees) the dish ring leans toward the mouse.
const TILT_Y_DEG = 14;
const TILT_X_DEG = 10;

const TITLE_LINES = [
  <>
    Fresh from the <span className="flame-text">fire</span>
  </>,
  <>to your table.</>,
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const stageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const ringRotateX = useSpring(tiltX, { stiffness: 90, damping: 18 });
  const ringRotateY = useSpring(tiltY, { stiffness: 90, damping: 18 });

  const slide = heroSlides[index];
  const autoplay = !reduce && !paused;

  const next = () => setIndex((i) => (i + 1) % COUNT);
  const prev = () => setIndex((i) => (i - 1 + COUNT) % COUNT);

  // Mouse only: touch screens keep normal scrolling and skip the lean.
  const handlePointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(nx * TILT_Y_DEG);
    tiltX.set(-ny * TILT_X_DEG);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      id="top"
      className="hero"
      ref={sectionRef}
      aria-label="Featured dishes"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-glow hero-glow-a" aria-hidden="true" />
      <div className="hero-glow hero-glow-b" aria-hidden="true" />
      <Embers />

      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">
            {TITLE_LINES.map((line, i) => (
              <span className="hero-line" key={i}>
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

          <m.div
            className="hero-cta"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          >
            <a className="btn btn-primary" href="#menu">
              Explore the menu
              <ArrowDownIcon />
            </a>
            <a className="btn btn-ghost" href={site.phoneHref}>
              <PhoneIcon />
              Call to order
            </a>
          </m.div>

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
              {heroSlides.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`dot${active ? ' is-active' : ''}${active && reduce ? ' is-static' : ''}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Show ${s.name}`}
                    aria-current={active ? 'true' : undefined}
                  >
                    {/* The active dot fills up over the autoplay time, then moves on. */}
                    {active && !reduce && (
                      <span
                        key={index}
                        className="dot-fill"
                        aria-hidden="true"
                        style={{ animationPlayState: autoplay ? 'running' : 'paused' }}
                        onAnimationEnd={(e) => {
                          if (e.target === e.currentTarget && autoplay) next();
                        }}
                      />
                    )}
                  </button>
                );
              })}
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
        </div>

        <m.div className="ring-stage" style={{ y: stageY }}>
          <div className="ring-platform" aria-hidden="true" />
          <m.div className="ring-tilt" style={{ rotateX: ringRotateX, rotateY: ringRotateY }}>
            <div className="ring" style={{ transform: `rotateY(${-index * STEP}deg)` }}>
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className="ring-item"
                  style={{ '--a': `${i * STEP}deg`, '--i': i }}
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
        </m.div>
      </div>

      <a className="scroll-cue" href="#story" aria-label="Scroll to our story">
        <span className="scroll-cue-mouse" aria-hidden="true" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
