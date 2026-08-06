'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  status: string;
  tech: string[];
  description: string;
  color: string;
  metrics: { label: string; value: string; }[];
}

const holographicProjects: Project[] = [
  {
    id: '1',
    title: 'PulseSync',
    subtitle: 'Real-Time Communication Engine',
    type: 'Android Enterprise',
    status: 'PRODUCTION',
    tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Clean Architecture'],
    description: 'Enterprise-grade real-time sync platform with offline-first architecture, conflict resolution using CRDTs, and multi-module design.',
    color: '#00E5FF',
    metrics: [
      { label: 'Coverage', value: '96%' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Users', value: '25K+' },
      { label: 'Latency', value: '<35ms' },
    ],
  },
  {
    id: '2',
    title: 'MoekyawTranslator',
    subtitle: 'Neural AI Translation',
    type: 'Mobile AI',
    status: 'BETA',
    tech: ['Kotlin', 'TFLite', 'ML Kit', 'Claude API', 'On-Device ML'],
    description: 'Revolutionary AI translator using on-device ML + cloud LLMs. 50+ languages with real-time voice translation.',
    color: '#FF6B35',
    metrics: [
      { label: 'Accuracy', value: '97%' },
      { label: 'Languages', value: '50+' },
      { label: 'Offline', value: '30K phrases' },
      { label: 'Speed', value: '<80ms' },
    ],
  },
  {
    id: '3',
    title: 'Quantum Lab',
    subtitle: 'Interactive Architecture Visualizer',
    type: 'Developer Tool',
    status: 'LIVE',
    tech: ['Next.js', 'WebGL', 'Paper.js', 'AI Engine', '3D Rendering'],
    description: 'Revolutionary visualization tool that auto-generates architecture blueprints from code analysis using AI.',
    color: '#A855F7',
    metrics: [
      { label: 'Diagrams', value: '10K+' },
      { label: 'Accuracy', value: '94%' },
      { label: 'Processing', value: '<5s' },
      { label: 'Performance', value: '60FPS' },
    ],
  },
];

export default function HolographicProjection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = holographicProjects[activeIndex];

  // Auto-rotate
  useEffect(() => {
    if (!isFullscreen && inView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % holographicProjects.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isFullscreen, inView]);

  const navigate = (direction: number) => {
    setActiveIndex((prev) => {
      const newIndex = (prev + direction + holographicProjects.length) % holographicProjects.length;
      return newIndex;
    });
  };

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-20 px-4 relative overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto' : ''}`}
    >
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
              Holographic Projection
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#00E5FF] to-transparent" />
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-white/10 rounded transition-all"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display">
            Interactive{' '}
            <span className="holographic">Holograms</span>
          </h2>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-3 quantum-card rounded-xl hover:border-[#00E5FF]/50"
          >
            <ChevronLeft size={20} className="text-[#00E5FF]" />
          </motion.button>

          <div className="flex items-center gap-1">
            {holographicProjects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveIndex(index)}
                className={`w-8 h-1 transition-all duration-300 rounded ${
                  index === activeIndex ? 'bg-[#00E5FF] w-12' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(1)}
            className="p-3 quantum-card rounded-xl hover:border-[#00E5FF]/50"
          >
            <ChevronRight size={20} className="text-[#FF6B35]" />
          </motion.button>
        </div>

        {/* Holographic Display */}
        <div ref={containerRef} className="relative holo-projector">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="quantum-card p-8 md:p-12 mb-8"
              style={{
                borderColor: `${activeProject.color}33`,
                boxShadow: `0 0 60px ${activeProject.color}22`,
              }}
            >
              {/* Project Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#00E5FF]">
                      {activeProject.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-xs font-mono text-gray-400">{activeProject.status}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-display mb-2">
                    {activeProject.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{activeProject.subtitle}</p>
                </div>

                {/* Holographic Icon */}
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-16 h-16 ml-auto rounded-2xl flex items-center justify-center"
                  style={{ border: `1px solid ${activeProject.color}44` }}
                >
                  <Cpu size={28} style={{ color: activeProject.color }} />
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
                {activeProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {activeProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 quantum-card rounded-full text-xs font-mono"
                    style={{ borderColor: `${activeProject.color}22` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeProject.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="quantum-card p-4 text-center"
                  >
                    <div className="text-2xl font-bold font-display" style={{ color: activeProject.color }}>
                      {metric.value}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500 mt-1">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Holographic Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-4 -right-4 w-20 h-20 rounded-3xl opacity-20"
            style={{
              background: `linear-gradient(135deg, ${activeProject.color}, transparent)`,
              filter: 'blur(20px)',
            }}
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-3xl opacity-20"
            style={{
              background: `linear-gradient(135deg, ${activeProject.color}, transparent)`,
              filter: 'blur(30px)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
