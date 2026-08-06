'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bot, Cpu, Home, User, Code2, FolderGit2, Award, BookOpen, Mail, Database, Globe } from 'lucide-react';

interface UltimateNavProps {
  onAIOpen: () => void;
}

export default function UltimateNav({ onAIOpen }: UltimateNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [systemOnline, setSystemOnline] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if system is online
    setSystemOnline(navigator.onLine);
    window.addEventListener('online', () => setSystemOnline(true));
    window.addEventListener('offline', () => setSystemOnline(false));
    return () => {
      window.removeEventListener('online', () => setSystemOnline(true));
      window.removeEventListener('offline', () => setSystemOnline(false));
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home, number: '01' },
    { name: 'Profile', href: '#profile', icon: User, number: '02' },
    { name: 'Genome', href: '#genome', icon: Cpu, number: '03' },
    { name: 'Projects', href: '#projects', icon: FolderGit2, number: '04' },
    { name: 'Certifications', href: '#certifications', icon: Award, number: '05' },
    { name: 'Journal', href: '#journal', icon: BookOpen, number: '06' },
    { name: 'Contact', href: '#contact', icon: Mail, number: '07' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'quantum-card !rounded-none' : 'bg-transparent'
      }`}
    >
      {/* System Alert */}
      <AnimatePresence>
        {!systemOnline && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="bg-red-500/10 border-b border-red-500/20"
          >
            <div className="max-w-7xl mx-auto px-4 py-2 text-xs font-mono text-red-500">
              ⚠ SYSTEM OFFLINE — SHOWING CACHED DATA
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#A855F7] 
                         flex items-center justify-center shadow-lg"
            >
              <Cpu size={20} className="text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold font-display">MOE KYAW AUNG</div>
              <div className="text-[8px] font-mono text-[#00E5FF] uppercase tracking-wider">
                Quantum Engineering System
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative flex items-center gap-1 px-2 py-1 text-xs font-mono uppercase tracking-wider transition-all"
              >
                <span className="text-[8px] text-gray-500">{item.number}</span>
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-[#00E5FF]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </a>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAIOpen}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF]/20 to-[#FF6B35]/20 
                         border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono"
            >
              <Bot size={14} className="animate-pulse" />
              <span className="hidden md:inline">ENGAGE AI</span>
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={onAIOpen} className="p-2 text-[#00E5FF]">
              <Bot size={20} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden quantum-card rounded-none mx-4 my-2 p-4 space-y-1"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
              >
                <item.icon size={18} className="text-[#00E5FF]" />
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-[8px] font-mono text-[#00E5FF]/50">SHEET {item.number}/07</div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
