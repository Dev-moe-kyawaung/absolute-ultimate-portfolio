'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, Terminal, Cpu, Code2, Shield, Zap, Download, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

export default function AbsoluteUltimateHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Advanced Mouse Tracking with Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Parallax Layers
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const glowX = useTransform(springX, [-0.5, 0.5], ['30%', '70%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['30%', '70%']);

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const holographicSkills = [
    'KOTLIN', 'JETPACK COMPOSE', 'CLEAN ARCH', 'MVVM', 'MVI',
    'COROUTINES', 'FLOW', 'FIREBASE', 'TFLITE', 'KMP',
    'GIT', 'CI/CD', 'DOCKER', 'LINUX', 'FIGMA',
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: 1000 }}
    >
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00E5FF] to-[#FF6B35]"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
        />
      </div>

      {/* Mouse Reactive Glow */}
      <motion.div
        className="pointer-events-none fixed w-96 h-96 rounded-full z-0"
        style={{
          background: `radial-gradient(circle at center, rgba(0,229,255,0.1) 0%, transparent 70%)`,
          left: glowX,
          top: glowY,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 3D Tilt Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 text-center px-4 max-w-7xl mx-auto"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-2 quantum-card rounded-full mb-8"
          style={{ transform: 'translateZ(50px)' }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC71] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2ECC71]"></span>
          </span>
          <span className="text-xs font-mono text-[#00E5FF] tracking-wider uppercase">
            △ System Online — Quantum Ready
          </span>
          <span className="text-[10px] font-mono text-gray-500 hidden sm:inline">
            v4.0.0
          </span>
        </motion.div>

        {/* Holo Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display leading-none mb-4"
          style={{ transform: 'translateZ(80px)' }}
        >
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block holographic"
          >
            MOE
          </motion.span>{' '}
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block text-white"
          >
            KYAW
          </motion.span>{' '}
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className="inline-block bg-gradient-to-r from-[#00E5FF] to-[#FF6B35] bg-clip-text text-transparent"
          >
            AUNG
          </motion.span>
        </motion.h1>

        {/* Role Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="text-lg md:text-2xl font-mono text-[#00E5FF]/80">
            <span className="text-white/40">&lt;</span>
            <span className="holographic font-semibold">SENIOR_ANDROID_ENGINEER</span>
            <span className="text-white/40">/&gt;</span>
          </div>
          <div className="mt-2 text-sm md:text-base font-mono text-gray-500">
            <span className="text-[#FF6B35]">fn</span> getTechStack() {'{'}
            <span className="text-white"> return [</span>
            {holographicSkills.slice(0, 3).map((skill, i) => (
              <span key={skill} className="text-[#00E5FF]">
                "{skill}"{i < 2 && ','}
              </span>
            ))}
            <span className="text-white">]</span> {'}'}
          </div>
        </motion.div>

        {/* Holographic Skills Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
          style={{ transform: 'translateZ(40px)' }}
        >
          {holographicSkills.map((skill, index) => (
            <motion.span
              key={skill}
              animate={{
                y: [0, Math.sin(index * 0.5) * 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + index * 0.3,
                delay: index * 0.1,
              }}
              className="px-3 py-2 quantum-card rounded-full text-xs font-mono
                         hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/50 transition-all
                         cursor-default"
            >
              <span className="text-[#00E5FF]">◈</span> {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Holographic Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-xl mx-auto mb-12 text-left"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="terminal-projection">
            {/* Terminal Header with macOS dots */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#00FF9D]/20">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-2 text-xs font-mono text-[#00FF9D]">engineer@quantum:~/portfolio</span>
              <span className="ml-auto text-xs font-mono text-gray-600">bash</span>
            </div>
            {/* Terminal Content */}
            <div className="p-4 text-xs font-mono text-[#00FF9D] space-y-1">
              <div className="flex gap-2">
                <span className="text-[#FFD700]">$</span>
                <span>whoami</span>
              </div>
              <div className="text-[#00FF9D]">senior-android-engineer</div>
              <div className="flex gap-2 mt-2">
                <span className="text-[#FFD700]">$</span>
                <span>cat technical-skills.txt | grep "senior"</span>
              </div>
              <div className="text-[#00FF9D]">✓ Kotlin expert level: 95%</div>
              <div className="text-[#00FF9D]">✓ Clean Architecture: 98%</div>
              <div className="text-[#00FF9D]">✓ Jetpack Compose: 94%</div>
              <div className="text-[#00FF9D]">✓ ML Integration: 92%</div>
              <div className="flex gap-2 mt-2">
                <span className="text-[#FFD700]">$</span>
                <span>system status --check</span>
              </div>
              <div className="text-[#2ECC71]">✓ All systems operational</div>
              <div className="text-[#2ECC71]">✓ Ready for new challenges</div>
              <div className="flex gap-2 mt-2">
                <span className="text-[#FFD700]">$</span>
                <span className="animate-pulse">▊</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons with Holographic Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          style={{ transform: 'translateZ(50px)' }}
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                       bg-gradient-to-r from-[#00E5FF] to-[#FF6B35] text-white font-mono text-sm
                       shadow-xl hover:shadow-2xl transition-all overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles size={16} className="group-hover:animate-spin" />
            INITIATE_VIEW_PROTOCOL
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl quantum-card
                       text-white font-mono text-sm hover:border-[#00E5FF]/50 transition-all"
          >
            <Terminal size={14} className="text-[#00E5FF]" />
            ENGAGE_AI
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            download
            className="group flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10
                       hover:border-[#FF6B35]/50 transition-all font-mono text-sm"
          >
            <Download size={14} className="text-[#FF6B35]" />
            DOWNLOAD
          </motion.a>
        </motion.div>

        {/* Social Icons with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center justify-center gap-4 pb-8"
          style={{ transform: 'translateZ(20px)' }}
        >
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="group relative w-12 h-12 quantum-card rounded-xl flex items-center justify-center
                         hover:border-[#00E5FF]/50 transition-all"
            >
              <Icon size={20} className="text-[#00E5FF] group-hover:text-[#FF6B35] transition-colors" />
              <span className="absolute -bottom-6 text-[8px] font-mono text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Background Holographic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Particle fields */}
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="quantum-particle"
            animate={{
              x: [Math.random() * 100, Math.random() * 100 + 50, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100 - 30, Math.random() * 100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + Math.random() * 10,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Holographic Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.line
              key={index}
              x1={Math.random() * 100}
              y1={Math.random() * 100}
              x2={Math.random() * 100}
              y2={Math.random() * 100}
              stroke={index % 2 === 0 ? '#00E5FF' : '#FF6B35'}
              strokeWidth="0.5"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, delay: index * 0.3 }}
            />
          ))}
        </svg>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="text-[10px] font-mono text-[#00E5FF]/60 uppercase tracking-wider text-center mb-2">
            ▼ Scroll to Enter Universe ▼
          </div>
          <Cpu size={16} className="mx-auto text-[#00E5FF]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
