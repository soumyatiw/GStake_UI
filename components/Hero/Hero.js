'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const heroRef    = useRef(null);  // for parallax

  /* ── Fade-up animation on mount ── */
  useEffect(() => {
    const els = [headingRef.current, subRef.current, ctaRef.current];

    // Start invisible & translated down
    els.forEach((el) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
    });

    // Staggered reveal
    const delays = [0, 150, 280];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delays[i]);
    });
  }, []);

  /* ── Parallax: desktop-only, respects prefers-reduced-motion ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Skip on mobile/touch and reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile      = window.innerWidth < 768;
    if (prefersReduced || isMobile) return;

    function onScroll() {
      const scrollY = window.scrollY;
      // Move bg 40% the scroll speed (subtle)
      hero.style.backgroundPositionY = `calc(50% + ${scrollY * 0.3}px)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      className={styles.hero}
      aria-label="Hero — property investments"
      ref={heroRef}
    >
      {/* Dark gradient overlay is handled purely in CSS */}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        {/* ── Main heading ── */}
        <h1 className={styles.heading} ref={headingRef}>
          Discover{' '}
          <span className={styles.accent}>high-growth</span>
          <br />
          property investments
        </h1>

        {/* ── Subheading ── */}
        <p className={styles.sub} ref={subRef}>
          Join the CEG Equity Token batch. Start building your portfolio with
          fractional ownership of global assets.
        </p>

        {/* ── CTA button ── */}
        <a
          href="#stake-earn"
          className={styles.cta}
          id="hero-cta"
          ref={ctaRef}
        >
          Start Earning Now →
        </a>
      </div>
    </section>
  );
}
