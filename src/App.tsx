import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppShowcase } from './components/AppShowcase';
import { ComparisonSection } from './components/ComparisonSection';
import { InteractiveDemo } from './components/InteractiveDemo';
import { FeaturesBento } from './components/FeaturesBento';
import { PrivacySection } from './components/PrivacySection';
import { DownloadSection } from './components/DownloadSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="app-container">
      {/* Visual background ambient lighting */}
      <div className="ambient-bg" />
      <div className="noise-overlay" />

      {/* Main Page Layout */}
      <Navbar />
      <main>
        <Hero />
        <AppShowcase />
        <ComparisonSection />
        <InteractiveDemo />
        <FeaturesBento />
        <PrivacySection />
        <DownloadSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
