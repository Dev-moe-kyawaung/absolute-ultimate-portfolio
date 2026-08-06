'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Command, Cpu, Database, Globe } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  name: string;
  description: string;
  execute: () => string[];
}

interface AiCommand extends Command {
  ai: boolean;
}

const commands: AiCommand[] = [
  {
    name: 'help',
    description: 'List all available commands',
    ai: false,
    execute: () => [
      'Available commands for QUANTUM TERMINAL v4.0.0:',
      '',
      '  help               - Display this help message',
      '  about              - Display engineer information',
      '  skills             - List technical skills',
      '  projects           - Show project overview',
      '  dna                - Show engineering DNA sequence',
      '  architecture       - Display system architecture',
      '  performance        - Show performance metrics',
      '  security           - Display security protocols',
      '  contact            - Show contact information',
      '  clear              - Clear terminal',
      '  whoami            - Display active session',
      '  date               - Display current date/time',
      '  uptime             - Display system uptime',
      '  version            - Show version information',
      '  ai:query <text>   - Ask the AI engine',
      '  ai:analyze        - Analyze project structure',
      '  ai:optimize       - Suggest performance optimizations',
      '  ai:generate       - Generate code snippet',
      '  neofetch          - Display system information',
      '  matrix            - Enter The Matrix mode',
      '  exit              - Close terminal',
    ],
  },
  {
    name: 'dna',
    description: 'Show DNA sequence',
    ai: false,
    execute: () => [
      '═══ ENGINEERING DNA SEQUENCE ═══',
      '',
      'Chromosome 01: Kotlin Expertise [██████████████████░] 95%',
      'Chromosome 02: Architecture [███████████████████▙] 98%',
      'Chromosome 03: Machine Learning [█████████████████░] 92%',
      'Chromosome 04: Security [███████████████▍▍▍] 88%',
      'Chromosome 05: Performance [██████████████████▍] 94%',
      '',
      'Genetic markers: COROUTINE_AWARE, COMPOSE_NATIVE, ASYNC_MASTER',
      'Mutation: SUPER_ARCHITECT',
    ],
  },
  {
    name: 'ai:query',
    description: 'Query the AI engine',
    ai: true,
    execute: () => ['AI Engine active. Please provide a specific query.'],
  },
  {
    name: 'matrix',
    description: 'Enter matrix mode',
    ai: false,
    execute: () => [
      'WAKE UP, ENGINEER...',
      'The Matrix has you. Welcome to the real world.',
      'Follow the blue code, never the green.',
      'Rendering matrix rain...',
    ],
  },
];

export default function QuantumTerminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    '░▒▓ UNIX QUANTUM TERMINAL 4.0.0▓▒░',
    'Copyright (c) 2024 Moe Kyaw Aung Industries',
    'Type "help" to see available commands',
    'Type "exit" to close terminal',
    '────────────────────────────────────────',
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixMode, setMatrixMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executeCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    let newOutput: string[] = [`\$ \${cmd}`];

    if (lowerCmd === 'clear') {
      setOutput([]);
      setHistory((prev) => [...prev, cmd]);
      setInput('');
      return;
    }

    if (lowerCmd === 'exit') {
      onClose();
      return;
    }

    const command = commands.find((c) => c.name === lowerCmd);

    if (command) {
      newOutput = [...newOutput, ...command.execute()];
      if (command.ai) {
        // Simulate AI thinking
        newOutput = [...newOutput, '🤖 AI ENGINE PROCESSING...'];
        setTimeout(() => {
          setOutput((prev) => [...prev, '\$ AI: Neural network is now pathfinding optimal response...']);
        }, 1000);
      }
    } else if (lowerCmd.startsWith('ai:query')) {
      const query = cmd.slice(8).trim();
      newOutput = [
        ...newOutput,
        '🤖 Neural Engine activated...',
        '',
        `Analyzing query: "\${query}"`,
        '',
        'Based on analysis: The optimal architectural pattern for this requirement would be...',
        'Adopting a composable microservices approach with event-driven communication.',
        '',
        'Recommended stack: Kotlin + Clean Architecture + Ktor/Spring Boot + PostgreSQL',
        'Expected performance: 99.9% uptime with <50ms response time',
      ];
    } else if (lowerCmd.startsWith('ai:')) {
      newOutput = [...newOutput, '🤖 AI processing: ' + cmd.slice(3)];
    } else if (lowerCmd === 'neofetch') {
      newOutput = [
        ...newOutput,
        '        ▄▄▄▄▄▄▄▄▄▄▄  Moe@engineer',
        '      ▄█████████████▄  -----------',
        '     ▄████████████████▄  OS: QuantumOS',
        '    ▄███████████████████▄  Host: Moe-Kyaw-Aung-Pro',
        '   ██████████████████████  Kernel: 4.0.0-ultimate',
        '   ██████████████████████  Uptime: 82% uptime since 2020',
        '   ██████████████████████  Shell: Quantum Shell 4.0',
        '   ██████████████████████  Resolution: Infinite',
        '   ██████████████████████  DE: Compose Desktop',
        '    ▀██████████████████▀  Theme: Quantum Dark',
        '     ▀████████████████▀  Icons: Blueprint',
        '       ▀████████████▀    Terminal: QuantumTerm',
        '          ▀██████▀       CPU: Kotlin Compiler',
        '            ▀▀▀▀        GPU: Compose Renderer',
      ];
    } else if (lowerCmd === 'performance') {
      newOutput = [
        ...newOutput,
        '⚡ Performance Metrics Report:',
        '',
        '  App Startup Time: 0.42s (optimized with Baseline Profiles)',
        '  Frame Rate: 60 FPS stable (Compose Performance Mode)',
        '  APK Size: 8.2 MB (minified with R8/ProGuard)',
        '  Cache Hit Rate: 94% (efficient caching strategy)',
        '  Build Time: 12.4s (parallel Gradle build)',
        '  Test Success Rate: 99.9% (comprehensive test suite)',
        '  Crash Rate: <0.1% (Catastrophic-free releases)',
        '',
        '╠══ All performance targets exceeded ══╣',
      ];
    } else if (lowerCmd === 'architecture') {
      newOutput = [
        ...newOutput,
        '🏗️ System Architecture Blueprint:',
        '',
        '┌─────────────────────────────┐',
        '│      PRESENTATION LAYER     │',
        '│   Compose UI · Screens     │',
        '└──────────┬──────────────────┘',
        '           │  observe()',
        '┌──────────▼──────────────────┐',
        '│      VIEWMODEL LAYER       │',
        '│  State · Events · Data      │',
        '└──────────┬──────────────────┘',
        '           │  execute()',
        '┌──────────▼──────────────────┐',
        '│       DOMAIN LAYER         │',
        '│  Use Cases · Logic · Rules  │',
        '└──────────┬──────────────────┘',
        '           │  getData()',
        '┌──────────▼──────────────────┐',
        '│       DATA LAYER           │',
        '│  Repository · Data sources │',
        '└─────────────────────────────┘',
        '',
        'Pattern: Clean Architecture + MVVM',
        'Modules: 18 feature modules + 3 core modules',
      ];
    } else {
      newOutput = [...newOutput, `Command not found: \${cmd}`, 'Type "help" to see available commands'];
    }

    setOutput((prev) => [...prev, ...newOutput]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      if (history[idx]) {
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = historyIndex === -1 ? -1 : Math.min(history.length - 1, historyIndex + 1);
      if (idx === -1) {
        setInput('');
      } else {
        setInput(history[idx] || '');
      }
      setHistoryIndex(idx);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-4xl h-[550px] terminal-projection"
            style={{
              background: matrixMode
                ? 'rgba(0, 10, 0, 0.95)'
                : 'rgba(10, 14, 26, 0.97)',
              borderColor: matrixMode ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 255, 157, 0.2)',
            }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-opacity-20"
              style={{ borderColor: matrixMode ? 'rgba(0,255,0,0.2)' : 'rgba(0,255,157,0.1)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono"
                style={{ color: matrixMode ? '#00FF00' : '#00FF9D' }}
              >
                <Command size={12} />
                engineer@quantum:~
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Matrix Mode Visual */}
            {matrixMode && (
              <style jsx global>{`
                @keyframes matrixRain {
                  0% { background-position: 0 0; }
                  100% { background-position: 0 1000px; }
                }
              `}</style>
            )}

            {/* Terminal Output */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-0.5"
              style={{
                color: matrixMode ? '#00FF00' : '#00FF9D',
                backgroundImage: matrixMode
                  ? 'repeating-linear-gradient(0deg,


I will now complete the **ABSOLUTE ULTIMATE EDITION** with the remaining core components, the full README and deployment configuration, and finish all the necessary files to make this a complete, production-ready futuristic engineering portfolio.

---

## COMPLETING THE ABSOLUTE ULTIMATE EDITION

### File 9: `ultimate/components/future/AbsoluteUltimateHero.tsx`

```tsx
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
          style={{ width: `\${scrollProgress}%` }}
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
                <span className="text-[#FFD700]">\$</span>
                <span>whoami</span>
              </div>
              <div className="text-[#00FF9D]">senior-android-engineer</div>
              <div className="flex gap-2 mt-2">
                <span className="text-[#FFD700]">\$</span>
                <span>cat technical-skills.txt | grep "senior"</span>
              </div>
              <div className="text-[#00FF9D]">✓ Kotlin expert level: 95%</div>
              <div className="text-[#00FF9D]">✓ Clean Architecture: 98%</div>
              <div className="text-[#00FF9D]">✓ Jetpack Compose: 94%</div>
              <div className="text-[#00FF9D]">✓ ML Integration: 92%</div>
              <div className="flex gap-2 mt-2">
                <span className="text-[#FFD700]">\$</span>
                <span>system status --check</span>
              </div>
              <div className="text-[#2ECC71]">✓ All systems operational</div>
              <div className="text-[#2ECC71]">✓ Ready for new challenges</div>
              <div className="flex gap-2 mt-2">
                <span className="text-[#FFD700]">\$</span>
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
              left: `\${Math.random() * 100}%`,
              top: `\${Math.random() * 100}%`,
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
