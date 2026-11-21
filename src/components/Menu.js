'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import CategoryCoverflow from './CategoryCoverflow';
import FallbackImage from './FallbackImage';
import TiltCard from './TiltCard';
import { menu } from '@/data/menu';
import { formatAmount, formatPrice } from '@/lib/format';
import { EASE } from '@/lib/motion';

const groupVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Menu() {
  const [active, setActive] = useState(0);
  const category = menu[active];

  return (
    <section id="menu" className="menu" aria-labelledby="menu-title">
      <div className="container">
        <header className="menu-head">
          <div className="reveal">
            <span className="kicker">What we cook</span>
            <h2 id="menu-title" className="section-title">
              The menu
            </h2>
          </div>
          <p className="menu-intro reveal">Every dish, every size, every price. Choose a category to explore.</p>
        </header>

        <CategoryCoverflow categories={menu} active={active} onChange={setActive} />

        <AnimatePresence mode="wait">
          <m.div
            key={category.id}
            className="menu-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="panel-banner">
              <FallbackImage
                photo={category.image}
                label={category.name}
                className="cover"
                sizes="(min-width: 1200px) 1100px, 100vw"
                widths={[640, 960, 1280]}
              />
              <div className="panel-banner-text">
                <h3>{category.name}</h3>
                <p>{category.tagline}</p>
              </div>
            </div>

            {category.groups.map((group) => (
              <m.div
                key={group.title ?? 'all'}
                className="group"
                variants={groupVariants}
                initial="hidden"
                animate="show"
              >
                {group.title && <h4 className="group-title">{group.title}</h4>}
                {group.note && <p className="group-note">{group.note}</p>}
                <div className="item-grid">
                  {group.items.map((item) => (
                    <ItemCard key={item.name} item={item} />
                  ))}
                </div>
              </m.div>
            ))}
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ItemCard({ item }) {
  const hasSizes = Array.isArray(item.options);

  return (
    <m.div className="item-cell" variants={cellVariants}>
      <TiltCard className="item-card">
        <h5 className="item-name">{item.name}</h5>
        {item.note && <p className="item-note">{item.note}</p>}

        {hasSizes ? (
          <div className="pill-row">
            {item.options.map((o) => (
              <span className="pill" key={o.label}>
                <small>{o.label}</small>
                {formatPrice(o.price)}
              </span>
            ))}
          </div>
        ) : (
          <Medallion price={item.price} />
        )}
      </TiltCard>
    </m.div>
  );
}

function Medallion({ price }) {
  if (price === null || price === undefined) {
    return (
      <span className="medallion">
        <strong>Ask</strong>
        <small>us</small>
      </span>
    );
  }

  return (
    <span className="medallion">
      <small>Rs</small>
      <strong>{formatAmount(price)}</strong>
    </span>
  );
}
