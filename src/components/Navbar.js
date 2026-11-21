'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { CloseIcon, MenuIcon, PhoneIcon } from './Icons';
import { site } from '@/data/site';

const MENU_ID = 'site-menu';

const links = [
  { id: 'story', label: 'Our story' },
  { id: 'menu', label: 'Menu' },
  { id: 'order', label: 'Visit' },
];

// Page sections, in page order, and the nav link each one belongs to.
const sectionLinks = [
  { section: 'story', link: 'story' },
  { section: 'brand', link: 'story' },
  { section: 'menu', link: 'menu' },
  { section: 'full-menu', link: 'menu' },
  { section: 'order', link: 'order' },
];

// Returns the nav link for whichever section crosses the middle of the screen.
function useActiveLink() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const hit = sectionLinks.find(({ section }) => visible.get(section));
        setActive(hit ? hit.link : null);
      },
      // A zero-height strip across the middle of the viewport.
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sectionLinks.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const closeRef = useRef(null);
  const activeLink = useActiveLink();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  // A popover does not move focus by itself, so put it on the Close button.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return undefined;

    const onToggle = (e) => {
      if (e.newState === 'open') closeRef.current?.focus();
    };

    menu.addEventListener('toggle', onToggle);
    return () => menu.removeEventListener('toggle', onToggle);
  }, []);

  const closeMenu = () => {
    const menu = menuRef.current;
    if (menu?.matches(':popover-open')) menu.hidePopover();
  };

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
              {links.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} aria-current={activeLink === link.id ? 'location' : undefined}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <a className="btn btn-primary nav-call" href={site.phoneHref} aria-label="Call to order">
              <PhoneIcon />
              <span className="nav-call-text">Call to order</span>
            </a>
            <button
              type="button"
              className="menu-toggle"
              popoverTarget={MENU_ID}
              popoverTargetAction="toggle"
              aria-controls={MENU_ID}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <nav id={MENU_ID} className="mobile-menu" popover="auto" ref={menuRef} aria-label="Mobile menu">
        <div className="mobile-menu-top">
          <span className="brand-mark">
            <img src="/logo.png" alt="" width="46" height="46" />
            <span>Paros</span>
          </span>
          <button
            type="button"
            className="round-btn"
            ref={closeRef}
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="mobile-menu-links">
          {links.map((link, i) => (
            <li key={link.id} style={{ '--i': i }}>
              <a
                href={`#${link.id}`}
                onClick={closeMenu}
                aria-current={activeLink === link.id ? 'location' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-menu-foot" style={{ '--i': links.length }}>
          <a className="btn btn-primary" href={site.phoneHref}>
            <PhoneIcon />
            {site.phone}
          </a>
          <p>{site.address}</p>
        </div>
      </nav>
    </>
  );
}
