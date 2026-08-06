'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Dna, Cpu, Brain, Eye, Ear, Heart, Zap, Shield, Code2, Database, Network, Cloud } from 'lucide-react';

interface Genotype {
  id: string;
  trait: string;
  value: number;
  icon: React.ComponentType;
  color: string;
  description: string;
}

const genomicData: Genotype[] = [
  { id: 'kotlin', trait: 'Kotlin Proficiency', value: 95, icon: Code2, color: '#00E5FF', description: 'Advanced coroutines, Flow, DSL design' },
  { id: 'architecture', trait: 'Architecture', value: 98, icon: Database, color: '#FF6B35', description: 'Clean Arch, MVVM, MVI, Modular' },
  { id: 'ml', trait: 'Machine Learning', value: 92, icon: Brain, color: '#A855F7', description: 'TFLite, ML Kit, On-device inference' },
  { id: 'security', trait: 'Security', value: 88, icon: Shield, color: '#2ECC71', description: 'OWASP, Encryption, SSL Pinning' },
  { id: 'performance', trait: 'Performance', value: 94, icon: Zap, color: '#F1C40F', description: 'Baseline profiles, Lazy loading' },
  { id: 'cloud', trait: 'Cloud', value: 85, icon: Cloud, color: '#FF2D55', description: 'Firebase, AWS, GCP' },
  { id: 'network', trait: 'Networking', value: 90, icon: Network, color: '#FF69B4', description: 'Retrofit, OkHttp, GraphQL' },
  { id: 'testing', trait: 'Testing', value: 93, icon: Eye, color: '#C0C0C0', description: 'JUnit, MockK, Compose Test' },
];

export default function GenomicProfile() {
  const [activeGene, setActiveGene] = useState<Genotype | null>(null);
  const [dnaColor, setDnaColor] = useState('#00E5FF');
  const [showAll, setShowAll] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref, inView } = useInView({ threshold: 0.3 });

  // DNA Animation on Canvas
  useEffect(() => {
    if (!canvasRef.current || !inView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // DNA Helix
      const centerY = canvas.height / 2;
      const amplitude = 60;
      const frequency = 0.02;
      
      // Draw helix strands
      for (let y = 0; y < canvas.height; y += 4) {
        const x1 = canvas.width / 2 + Math.sin(y * frequency + frame * 0.1) * amplitude;
        const x2 = canvas.width / 2 + Math.sin(y * frequency + frame * 0.1 + Math.PI) * amplitude;
        
        // Base pairs
        ctx.strokeStyle = `rgba(0, 229, 255, \${0.2 + Math.sin(y + frame) * 0.1})`;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y + 10);
        ctx.stroke();

        // Strand dots
        ctx.fillStyle = y % 40 < 20 ? '#00E5FF' : '#FF6B35';
        ctx.globalAlpha = 0.5 + Math.sin(y * 0.1 + frame * 0.05) * 0.3;
        ctx.beginPath();
        ctx.arc(x1, y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#A855F7';
        ctx.beginPath();
        ctx.arc(x2, y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Energy particles
        if (Math.random() > 0.95) {
          ctx.fillStyle = `hsl(\${Math.random() * 360}, 100%, 50%)`;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(x1 + (x2 - x1) * Math.random(), y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      frame++;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [inView]);

  const average = Math.round(genomicData.reduce((sum, gene) => sum + gene.value, 0) / genomicData.length);

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-[#00E5FF]" />
            <span className="text-xs font-mono text-[#00E5FF] tracking-[0.3em] uppercase">
              Genetic Engineering Profile
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#00E5FF] to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display">
            Engineering{' '}
            <span className="holographic">Genome</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl">
            Every engineer has a unique technical DNA. This is mine — sequenced from real projects.
          </p>
        </motion.div>

        {/* DNA Animation + Stats */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* DNA Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              className="w-full h-auto rounded-2xl border border-[#00E5FF]/10"
              style={{
                background: 'rgba(10,14,26,0.5)',
              }}
            />
            <div className="absolute top-4 left-4 text-xs font-mono text-[#00E5FF]">
              ENGINEERING DNA SEQUENCE
            </div>
            <div className="absolute top-4 right-4 text-xs font-mono text-[#FF6B35]">
              ACTIVE FOLDING
            </div>
          </motion.div>

          {/* Overall Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <div className="quantum-card p-8 text-center">
              <div className="text-6xl font-bold font-display holographic mb-2">
                {average}%
              </div>
              <div className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                Overall Engineering DNA Integrity
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: star * 0.2 }}
                  >
                    <Star size={16} className="text-[#FFD700] fill-current" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gene Sequence */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#00E5FF]">A</span>
              <span className="text-[#FF6B35]">T</span>
              <span className="text-[#2ECC71]">G</span>
              <span className="text-[#A855F7]">C</span>
              <span className="text-gray-500">—</span>
              <span className="text-[#00E5FF]">T</span>
              <span className="text-[#FF6B35]">G</span>
              <span className="text-[#2ECC71]">A</span>
              <span className="text-[#A855F7]">C</span>
              <span className="text-gray-700">...</span>
              <button
                onClick={() => setShowAll(!showAll)}
                className="ml-auto text-[#00E5FF] hover:text-[#FF6B35] transition-colors"
              >
                {showAll ? '▲ HIDE' : '▼ SHOW ALL'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Genome Map */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {genomicData.map((gene, index) => (
            <motion.button
              key={gene.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setActiveGene(gene)}
              className="quantum-card p-4 text-left cursor-pointer hover:border-[#00E5FF]/50 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <gene.icon size={18} style={{ color: gene.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold">{gene.trait}</span>
                    <span className="text-xs font-mono" style={{ color: gene.color }}>
                      {gene.value}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `\${gene.value}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: 0.2 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, \${gene.color}, \${gene.color}88)`,
                        boxShadow: `0 0 10px \${gene.color}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Gene Detail Modal */}
        <AnimatePresence>
          {activeGene && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setActiveGene(null)}
              />
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                className="relative quantum-card p-8 max-w-md w-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <activeGene.icon size={24} style={{ color: activeGene.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{activeGene.trait}</h3>
                    <div className="text-xs font-mono" style={{ color: activeGene.color }}>
                      SEQUENCE POSITION: {activeGene.id}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  {activeGene.description}
                  <br /><br />
                  This gene is expressed at {activeGene.value}% capacity in production environments.
                  Observations indicate exceptional performance in real-world applications.
                </p>
                <button
                  onClick={() => setActiveGene(null)}
                  className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded transition-all text-sm font-mono"
                >
                  CLOSE SEQUENCE
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
