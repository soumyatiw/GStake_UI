import styles from './page.module.css';
import Hero from '../components/Hero/Hero';
import PropertyCard from '../components/PropertyCard/PropertyCard';

import PriceProgression from '../components/PriceProgression/PriceProgression';

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* ── Hero Section ── */}
      <Hero />

      {/* ── Property Card (overlaps hero bottom) ── */}
      <PropertyCard />

      {/* ── Price Progression ── */}
      <PriceProgression />
      </main>

    )
  };