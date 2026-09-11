/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArmoryProvider, useArmory } from './context/ArmoryContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SlideoverCart } from './components/SlideoverCart';
import { ToastHUD } from './components/ToastHUD';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { VaultView } from './views/VaultView';
import { DossierView } from './views/DossierView';

const MainAppContent: React.FC = () => {
  const { activeView } = useArmory();

  return (
    <div className="min-h-screen bg-[#101417] text-[#e0e3e7] flex flex-col selection:bg-[#f59e0b]/30 selection:text-[#ffc174]">
      {/* HUD Telemetry Notifications */}
      <ToastHUD />

      {/* Persistent Navigation Header */}
      <Header />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full">
        {activeView === 'home' && <HomeView />}
        {activeView === 'catalog' && <CatalogView />}
        {activeView === 'detail' && <ProductDetailView />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'vault' && <VaultView />}
        {activeView === 'dossier' && <DossierView />}
      </main>

      {/* Slide-over Armory Loadout Cart Drawer */}
      <SlideoverCart />

      {/* Military-Grade Compliance Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ArmoryProvider>
      <MainAppContent />
    </ArmoryProvider>
  );
}

