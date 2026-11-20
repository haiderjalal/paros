'use client';

import { useRef } from 'react';
import FallbackImage from './FallbackImage';
import { ChevronIcon } from './Icons';
import { countItems } from '@/data/menu';

export default function CategoryCoverflow({ categories, active, onChange }) {
  const dragStart = useRef(null);
  const last = categories.length - 1;

  const go = (step) => onChange(Math.min(last, Math.max(0, active + step)));

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (e) => {
    dragStart.current = e.clientX;
  };

  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
  };

  const endDrag = () => {
    dragStart.current = null;
  };

  return (
    <div className="coverflow-wrap">
      <div
        className="coverflow"
        role="group"
        aria-roledescription="carousel"
        aria-label="Menu categories. Use the arrow keys or drag to browse."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {categories.map((c, i) => {
          const offset = i - active;
          const distance = Math.abs(offset);
          const hidden = distance > 2;

          return (
            <button
              key={c.id}
              type="button"
              className="cf-card"
              tabIndex={hidden ? -1 : 0}
              aria-current={i === active ? 'true' : undefined}
              aria-label={`${c.name}, ${countItems(c)} items`}
              onClick={() => onChange(i)}
              style={{
                transform: `translate3d(${offset * 72}%, 0, ${-distance * 180}px) rotateY(${-offset * 34}deg) scale(${1 - distance * 0.12})`,
                opacity: hidden ? 0 : 1 - distance * 0.28,
                zIndex: 10 - distance,
                pointerEvents: hidden ? 'none' : 'auto',
              }}
            >
              <FallbackImage
                photo={c.image}
                label={c.name}
                className="cover"
                sizes="240px"
                widths={[360, 480]}
                loading={distance <= 1 ? 'eager' : 'lazy'}
              />
              <span className="cf-shade" aria-hidden="true" />
              <span className="cf-label">
                <strong>{c.name}</strong>
                <small>{countItems(c)} items</small>
              </span>
            </button>
          );
        })}
      </div>

      <div className="cf-controls">
        <button
          type="button"
          className="round-btn"
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous category"
        >
          <ChevronIcon dir="left" />
        </button>
        <span className="cf-count" aria-hidden="true">
          {String(active + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="round-btn"
          onClick={() => go(1)}
          disabled={active === last}
          aria-label="Next category"
        >
          <ChevronIcon dir="right" />
        </button>
      </div>
    </div>
  );
}
