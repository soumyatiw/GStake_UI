'use client';

import { useEffect, useRef } from 'react';
import styles from './PriceProgression.module.css';

const BATCHES = [
  { batch: 1, price: '$4,000' },
  { batch: 2, price: '$4,250' },
  { batch: 3, price: '$4,500' },
  { batch: 4, price: '$4,750', active: true },
  { batch: 5, price: '$5,000' },
  { batch: 6, price: '$5,250' },
];

export default function PriceProgression() {
  const cardRefs = useRef([]);

  /* ── Staggered fade-in on scroll via IntersectionObserver ── */
  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((el, i) => {
      if (!el) return;

      // Start hidden
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition =
                'opacity 0.45s ease, transform 0.45s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, i * 80); // 0ms, 80ms, 160ms … 400ms
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      className={styles.wrapper}
      aria-label="Price progression batches"
    >
      {/* ── Header row ── */}
      <div className={styles.header}>
        <h2 className={styles.title}>Price Progression (200 Tokens)</h2>

        <div className={styles.pills}>
          <span className={styles.pillSold} aria-label="Batches 1 to 3 are sold out">
            SOLD OUT 1–3
          </span>
          <span className={styles.pillActive} aria-label="Batch 4 is active">
            ACTIVE 4
          </span>
        </div>
      </div>

      {/* ── Batch cards grid ── */}
      <div className={styles.grid}>
        {BATCHES.map((b, i) => (
          <div
            key={b.batch}
            id={`batch-card-${b.batch}`}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`${styles.card} ${b.active ? styles.cardActive : ''}`}
            role="group"
            aria-label={`Batch ${b.batch}, price ${b.price}${b.active ? ', currently active' : ''}`}
          >
            <span className={styles.cardLabel}>Batch {b.batch}</span>
            <span className={`${styles.cardPrice} ${b.active ? styles.cardPriceActive : ''}`}>
              {b.price}
            </span>

            {/* Active indicator dot */}
            {b.active && (
              <span className={styles.activeDot} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
