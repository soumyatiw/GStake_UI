'use client';

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'properties', label: 'Properties', href: '#properties' },
  { id: 'digital-assets', label: 'Digital Assets', href: '#digital-assets' },
  { id: 'stake-earn', label: 'Stake & Earn', href: '#stake-earn' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Set initial state in case page loads mid-scroll
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.inner}>
        {/* ── Logo ── */}
        <a href="/" className={styles.logo} aria-label="GStake home">
          <span className={styles.logoIcon} aria-hidden="true">G</span>
          <span className={styles.logoText}>Stake</span>
        </a>

        {/* ── Center nav links ── */}
        <nav className={styles.nav} aria-label="Primary navigation">
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  id={`nav-link-${link.id}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Right side actions ── */}
        <div className={styles.actions}>
          <a href="/login" className={styles.loginLink} id="nav-login">
            Login
          </a>
          <a href="/signup" className={styles.signUpBtn} id="nav-signup">
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}
