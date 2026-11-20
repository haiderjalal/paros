'use client';

import { useState } from 'react';
import { unsplash } from '@/data/images';

const DEFAULT_WIDTHS = [480, 800, 1200, 1600];

// Responsive stock photo (srcset + sizes) that degrades to a designed block
// if the image cannot be loaded, so the layout never shows a broken icon.
export default function FallbackImage({
  photo,
  label = '',
  alt = '',
  className = '',
  sizes = '100vw',
  widths = DEFAULT_WIDTHS,
  loading = 'lazy',
  fetchPriority,
}) {
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
    return (
      <div className={`img-fallback ${className}`.trim()} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
        <span>{label}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={unsplash(photo, widths[Math.floor(widths.length / 2)])}
      srcSet={widths.map((w) => `${unsplash(photo, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  );
}
