'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './PropertyCard.module.css';

export default function PropertyCard() {
  const rightPanelRef = useRef(null);
  const counterRef = useRef(null);
  const hasCountedRef = useRef(false);  // fire once

  /* ── Slide-in from right on scroll into view ── */
  useEffect(() => {
    const el = rightPanelRef.current;
    if (!el) return;

    // Start hidden & offset
    el.style.opacity = '0';
    el.style.transform = 'translateX(40px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Count-up: 0 → 165,000 when stats card enters view ── */
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const TARGET = 165000;
    const DURATION = 1400; // ms

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasCountedRef.current) return;
        hasCountedRef.current = true;

        // Respect prefers-reduced-motion
        const prefersReduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;
        if (prefersReduced) {
          el.textContent = 'AED 165,000';
          observer.disconnect();
          return;
        }

        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / DURATION, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(eased * TARGET);
          el.textContent = 'AED ' + value.toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* ── Left: image with jigsaw overlay ── */}
        <div className={styles.imagePanel}>
          <Image
            src="/assets/Frame 1.png"
            alt="Luxury villa property"
            fill
            className={styles.propertyImage}
            sizes="(max-width: 767px) 100vw, 70vw"
          />
          {/* Jigsaw texture overlay */}
          <Image
            src="/assets/jigsaw.png"
            alt=""
            width={155}
            height={170}
            aria-hidden="true"
            className={styles.jigsawOverlay}
          />
          <Image
            src="/assets/arrow.png"
            alt=""
            width={250}
            height={60}
            className={styles.arrowIcon}
          />
        </div>

        {/* ── Right: info panel ── */}
        <div className={styles.infoPanel} ref={rightPanelRef}>
          {/* Heading */}
          <h2 className={styles.heading}>
            Access premium property ownership
          </h2>

          {/* "for $150" */}
          <p className={styles.price}>
            for <span className={styles.priceAccent}>$150</span>
          </p>

          {/* Stats mini-card */}
          <div className={styles.statsCard}>
            {/* Top row */}
            <div className={styles.statsTop}>
              <span className={styles.statsIcon} aria-hidden="true">G</span>
              <span className={styles.statsLabel}>All Time Returns</span>
            </div>
            {/* Bottom row */}
            <div className={styles.statsBottom}>
              <span
                className={styles.statsValue}
                ref={counterRef}
                aria-live="polite"
                aria-atomic="true"
              >
                AED 165,000
              </span>
              <span className={styles.statsBadge}>+111%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
