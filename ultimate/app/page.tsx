'use client';

import { useState, Suspense, lazy, useEffect } from 'react';
import { Toaster } from 'sonner';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Lazy load for performance
const QuantumField = lazy(() => import('@/components/future/QuantumField'));
const AbsoluteUltimateHero = lazy(() => import('@/components/future/AbsoluteUltimateHero'));
const AutoArchitectureGenerator = lazy(() => import('@/components/future/AutoArchitectureGenerator'));
const NeuralNetworkAI = lazy(() => import('@/components/future/NeuralNetworkAI'));
const GenomicProfile = lazy(() => import('@/components/future/GenomicProfile'));
const QuantumTerminal = lazy(() => import('@/components/future/QuantumTerminal'));
const HolographicProjection = lazy(() => import('@/components/future/HolographicProjection'));

// Load all core components
import UltimateNav from '@/components/core/UltimateNav';
import QuantumFooter from '@/components/core/QuantumFooter';

export default function AbsoluteUltimatePortfolio() {
  const [mounted, setMounted] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Toaster richColors position="top-right" />

      {/* Quantum Background */}
      <div className="quantum-bg" />

      {/* Neural Interface Overlay */}
      <div className="neural-interface">
        <svg width="100%" height="100%">
          <pattern id="neural-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="rgba(0,229,255,0.1)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      {/* Quantum Field (3D Background) */}
      <Suspense fallback={null}>
        <QuantumField />
      </Suspense>

      {/* Navigation */}
      <UltimateNav onAIOpen={() => setAiOpen(true)} />

      {/* Hero Section */}
      <Suspense fallback={null}>
        <AbsoluteUltimateHero />
      </Suspense>

      {/* Genomic Profile — 100% Interactive */}
      <Suspense fallback={null}>
        <GenomicProfile />
      </Suspense>

      {/* Auto Architecture Generator */}
      <Suspense fallback={null}>
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <AutoArchitectureGenerator />
          </div>
        </div>
      </Suspense>

      {/* Holographic Projects */}
      <Suspense fallback={null}>
        <HolographicProjection />
      </Suspense>

      {/* Quantum Terminal */}
      <Suspense fallback={null}>
        <QuantumTerminal />
      </Suspense>

      {/* Footer */}
      <QuantumFooter />

      {/* AI Assistant */}
      <Suspense fallback={null}>
        <NeuralNetworkAI isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      </Suspense>

      {/* Floating Infinity Button */}
      {mounted && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setAiOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#FF6B35] 
                       text-white flex items-center justify-center shadow-xl"
          >
            <SparklesIcon size={24} />
          </motion.button>
        </div>
      )}
    </main>
  );
}
import { Sparkles, Bot, Activity, Command, Star } from 'lucide-react';

function SparklesIcon({ size }: { size: number }) {
  return <Sparkles size={size} />;
}
