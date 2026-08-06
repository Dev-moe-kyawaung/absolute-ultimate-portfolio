'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Heart, Cpu, Globe, Shield, Database } from 'lucide-react';

export default function QuantumFooter() {
  const currentYear = new Date().getFullYear();

  const systemStatus = {
    uptime: '99.99%',
    version: '4.0.0',
    build: 'ULTIMATE_2024',
  };

  return (
    <footer className="relative py-20 px-4 border-t border-[#00E5FF]/10 overflow-hidden">
      {/* Quantum Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00E5FF]/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#FF6B35]/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#A855F7] flex items-center justify-center">
                <Cpu size={24} className="text-white" />
              </div>
              <div>
                <div className="text-lg font-bold font-display">Moe Kyaw Aung</div>
                <div className="text-xs font-mono text-[#00E5FF]">Senior Android Engineer</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Engineering the future of mobile technology.
              Building high-performance Android experiences with quantum precision.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-[#00E5FF] transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#A855F7] transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* System Vector */}
          <div>
            <div className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-4">
              System Vector
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Engineer Status</span>
                <span className="text-[#2ECC71] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">System Uptime</span>
                <span className="text-[#00E5FF] font-mono">{systemStatus.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Build Version</span>
                <span className="text-[#00E5FF] font-mono">{systemStatus.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Build ID</span>
                <span className="text-[#FF6B35] font-mono">{systemStatus.build}</span>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <div className="text-xs font-mono text-[#FF6B35] uppercase tracking-wider mb-4">
              Quick Access
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Home', 'Projects', 'Blog', 'Certifications', 'Journal', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Matrix */}
        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span>Quantum Engineered with</span>
              <Heart size={12} className="text-[#FF6B35] fill-current animate-pulse" />
              <span>in Myanmar & Thailand</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-600">
              <span>© {currentYear} Moe Kyaw Aung</span>
              <span>·</span>
              <span>All Rights Reserved</span>
              <span>·</span>
              <span>v{systemStatus.version}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
