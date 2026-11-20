'use client';

import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import FallbackImage from './FallbackImage';
import { storyChapters } from '@/data/site';

const COUNT = storyChapters.length;

// Each chapter owns a slice of the scroll range: fade in, hold, fade out.
function sliceFor(index) {
  const a = index / COUNT;
  const b = (index + 1) / COUNT;
  return [Math.max(0, a - 0.02), a + 0.05, b - 0.05, Math.min(1, b + 0.02)];
}

export default function Story() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section id="story" className="story" ref={ref} aria-label="Our story">
      <div className="story-sticky">
        <div className="story-media">
          {storyChapters.map((c, i) => (
            <StorySlide key={c.id} chapter={c} index={i} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>
        <div className="story-copy">
          <div className="story-rail" aria-hidden="true">
            <m.span style={{ scaleY: scrollYProgress }} />
          </div>
          {storyChapters.map((c, i) => (
            <StoryChapter key={c.id} chapter={c} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySlide({ chapter, index, progress, reduce }) {
  const input = sliceFor(index);
  const first = index === 0;
  const last = index === COUNT - 1;
  const opacity = useTransform(progress, input, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const scale = useTransform(progress, input, reduce ? [1, 1, 1, 1] : [1.1, 1.02, 1, 1.04]);

  return (
    <m.div className="story-slide" style={{ opacity, scale }}>
      <FallbackImage
        photo={chapter.photo}
        label={chapter.title}
        alt={chapter.alt}
        className="cover"
        sizes="(min-width: 900px) 55vw, 100vw"
        widths={[640, 960, 1280]}
        loading={first ? 'eager' : 'lazy'}
      />
    </m.div>
  );
}

function StoryChapter({ chapter, index, progress }) {
  const input = sliceFor(index);
  const first = index === 0;
  const last = index === COUNT - 1;
  const opacity = useTransform(progress, input, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(progress, input, [first ? 0 : 40, 0, 0, last ? 0 : -40]);

  return (
    <m.article className="chapter" style={{ opacity, y }}>
      <h2>{chapter.title}</h2>
      <p>{chapter.body}</p>
    </m.article>
  );
}
