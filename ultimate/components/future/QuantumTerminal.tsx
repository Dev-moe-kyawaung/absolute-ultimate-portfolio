'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Command, Cpu, Globe, Bot, Shield, Zap, Database, GitBranch, Cloud, Code2 } from 'lucide-react';

// ============================================================
// TYPE DEFINITIONS
// ============================================================

interface Command {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[], ctx: TerminalContext) => string[];
}

interface TerminalContext {
  print: (text: string) => void;
  clear: () => void;
  close: () => void;
  setMatrixMode: (enabled: boolean) => void;
  getHistory: () => string[];
  setInput: (value: string) => void;
}

// ============================================================
// COMMAND DEFINITIONS
// ============================================================

const commands: Command[] = [
  // Basic Commands
  {
    name: 'help',
    description: 'Display all available commands',
    usage: 'help',
    execute: () => [
      '',
      '╔══════════════════════════════════════════════════════╗',
      '║            QUANTUM TERMINAL v4.0.0                  ║',
      '║         Type "neofetch" for system info              ║',
      '╚══════════════════════════════════════════════════════╝',
      '',
      ' BASIC COMMANDS:',
      ' ┌─────────────────────────────────────────────┐',
      ' │ help          Show this help message       │',
      ' │ about         Display engineer info         │',
      ' │ whoami        Show current user             │',
      ' │ clear         Clear terminal                │',
      ' │ exit          Close terminal                │',
      ' │ date          Show current date/time        │',
      ' │ neofetch      Display system information    │',
      ' │ matrix        Enter The Matrix mode         │',
      ' └─────────────────────────────────────────────┘',
      '',
      ' ENGINEERING COMMANDS:',
      ' ┌─────────────────────────────────────────────┐',
      ' │ skills        List technical skills         │',
      ' │ projects      Show project overview         │',
      ' │ dna           Show engineering DNA sequence │',
      ' │ architecture  Display system architecture   │',
      ' │ performance   Show performance metrics      │',
      ' │ security      Display security protocols    │',
      ' │ stack         Show full tech stack          │',
      ' └─────────────────────────────────────────────┘',
      '',
      ' AI COMMANDS:',
      ' ┌─────────────────────────────────────────────┐',
      ' │ ai            Engage AI assistant           │',
      ' │ ai:skills     AI analyzes skills            │',
      ' │ ai:projects   AI recommends project         │',
      ' │ ai:optimize   AI suggests optimizations     │',
      ' └─────────────────────────────────────────────┘',
      '',
      ' NETWORK COMMANDS:',
      ' ┌─────────────────────────────────────────────┐',
      ' │ github        Open GitHub profile           │',
      ' │ linkedin      Open LinkedIn profile         │',
      ' │ email         Display contact email         │',
      ' └─────────────────────────────────────────────┘',
      '',
      ' Type "help [command]" for more details on any command.',
      '',
    ];
  },
  {
    name: 'help',
    description: 'Display commands',
    usage: 'help [command]',
    execute: (args) => {
      if (args[0]) {
        const cmd = commands.find((c) => c.name === args[0]);
        if (cmd) {
          return [
            `COMMAND: ${cmd.name}`,
            `DESCRIPTION: ${cmd.description}`,
            `USAGE: ${cmd.usage}`,
          ];
        }
        return [`Command not found: ${args[0]}`];
      }
      return [];
    },
  },
  {
    name: 'about',
    description: 'Display information about the engineer',
    usage: 'about',
    execute: () => [
      '',
      '╔═════════════════════════════════════════════╗',
      '║       ENGINEER PROFILE — MOE KYAW AUNG      ║',
      '╚═════════════════════════════════════════════╝',
      '',
      ' ▸ Name: Moe Kyaw Aung',
      ' ▸ Role: Senior Android Engineer',
      ' ▸ Status: OPEN TO OPPORTUNITIES 🟢',
      ' ▸ Location: Tachileik, MM ↔ Bangkok, TH',
      ' ▸ Experience: 3+ Years',
      ' ▸ Certifications: 82+ (Programming Hub)',
      '',
      ' SPECIALIZATIONS:',
      '  ├─ Mobile Development (Kotlin, Compose)',
      '  ├─ Clean Architecture (MVVM, MVI)',
      '  ├─ Backend & Cloud (Firebase, REST)',
      '  ├─ AI/ML Integration (TFLite, Claude API)',
      '  └─ Security (Ethical Hacking, OWASP)',
      '',
      ' ▸ Current Focus: Building AI-powered mobile apps',
      ' ▸ Philosophy: "Code with precision. Build with purpose."',
      '',
    ];
  },
  {
    name: 'whoami',
    description: 'Display current user',
    usage: 'whoami',
    execute: () => [
      'engineer@quantum-system',
      'Role: Senior Android Engineer',
      'Clearance: PRODUCTION_READY',
      'Team: Mobile Innovation Lab',
    ];
  },
  {
    name: 'clear',
    description: 'Clear the terminal screen',
    usage: 'clear',
    execute: () => [],
  },
  {
    name: 'exit',
    description: 'Close the terminal',
    usage: 'exit',
    execute: (_args, ctx) => {
      ctx.close();
      return ['Terminal session terminated.'];
    },
  },
  {
    name: 'date',
    description: 'Display current date and time',
    usage: 'date',
    execute: () => {
      const now = new Date();
      return [
        `Current date: ${now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}`,
        `Current time: ${now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })}`,
        `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      ];
    },
  },
  {
    name: 'neofetch',
    description: 'Display system information in style',
    usage: 'neofetch',
    execute: () => [
      '        ▄▄▄▄▄▄▄▄▄▄▄  engineer@quantum-system',
      '      ▄█████████████▄  -------------------------',
      '     ▄████████████████▄  OS: QuantumOS 4.0',
      '    ▄███████████████████▄  Host: Moe-Kyaw-Aung-MBP',
      '   ██████████████████████  Kernel: 4.0.0-ultimate',
      '   ██████████████████████  Uptime: 3 years 2 months',
      '   ██████████████████████  Shell: Quantum Terminal',
      '   ██████████████████████  Resolution: 2560x1440',
      '   ██████████████████████  DE: Compose Desktop',
      '   ██████████████████████  WM: QuantumWM',
      '    ▀██████████████████▀  WM Theme: Quantum Dark',
      '     ▀████████████████▀   Icons: Blueprint',
      '       ▀████████████▀     Terminal: QuantumTerm',
      '          ▀██████▀        CPU: Kotlin Compiler',
      '            ▀▀▀▀         GPU: Compose Renderer',
      '',
      '    ╭──────────────────────────╮',
      '    │ ENGINEER STATUS: ACTIVE  │',
      '    │ LOCATION: TACHILEIK, MM  │',
      '    │ AVAILABILITY: IMMEDIATE  │',
      '    ╰──────────────────────────╯',
    ];
  },
  {
    name: 'matrix',
    description: 'Enter The Matrix mode',
    usage: 'matrix',
    execute: (_args, ctx) => {
      ctx.setMatrixMode(true);
      return [
        'Wake up, Neo...',
        'The Matrix has you.',
        'Follow the white rabbit.',
        'Knock, knock, Neo.',
        '',
        'Rendering matrix mode...',
        '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
        'Matrix mode activated. Enjoy the rain.',
      ];
    },
  },
  // Engineering Commands
  {
    name: 'skills',
    description: 'Display technical skills with proficiency',
    usage: 'skills [category]',
    execute: (args) => {
      if (args[0] === 'mobile') {
        return [
          'MOBILE DEVELOPMENT SKILLS:',
          '',
          ' Kotlin             ████████████████████ 95%',
          ' Jetpack Compose    ██████████████████░░ 92%',
          ' Android SDK        ██████████████████░░ 90%',
          ' Material 3         █████████████████░░░ 88%',
          ' Room DB            █████████████████░░░ 86%',
          ' Navigation         █████████████████░░░ 85%',
          ''
        ];
      }
      if (args[0] === 'architecture') {
        return [
          'ARCHITECTURE SKILLS:',
          '',
          ' Clean Architecture  ████████████████████ 98%',
          ' MVVM Pattern        ███████████████████░ 95%',
          ' MVI Pattern         █████████████████░░░ 93%',
          ' Multi-module        ████████████████░░░░ 90%',
          ' SOLID Principles    ██████████████████░░ 92%',
          ' Design Patterns     █████████████████░░░ 89%',
          ''
        ];
      }
      if (args[0] === 'all') {
        return [
          'FULL TECHNICAL SKILLS MATRIX:',
          '',
          ' LANGUAGES:',
          '  Kotlin ████████████████████ 95%',
          '  Java   ████████████████░░░░ 80%',
          '  Python ████████████████░░░░ 78%',
          '  JS/TS  ██████████████░░░░░░ 75%',
          '',
          ' MOBILE:',
          '  Compose ██████████████████░░ 92%',
          '  Flutter ██████████████░░░░░░ 70%',
          '  Swift   ████████████░░░░░░░░ 65%',
          '',
          ' BACKEND:',
          '  Firebase ██████████████████░░ 92%',
          '  REST     ██████████████████░░ 90%',
          '  GraphQL  ███████████████░░░░░ 82%',
          '',
          ' AI/ML:',
          '  TFLite   ████████████████░░░░ 85%',
          '  ML Kit   ██████████████░░░░░░ 78%',
          '  Claude   ████████████████░░░░ 84%',
          '',
          ' TOOLS:',
          '  Git   ████████████████████░ 94%',
          '  Docker ████████████████░░░░ 86%',
          '  CI/CD  █████████████████░░░ 88%',
          ''
        ];
      }
      return [
        'SKILLS CATEGORIES:',
        '  skills mobile        — Mobile dev skills',
        '  skills architecture  — Architecture skills',
        '  skills all           — Full skill matrix',
        '  skills ai            — AI/ML skills',
        '  skills security      — Security skills',
      ];
    },
  },
  {
    name: 'projects',
    description: 'Display project overview',
    usage: 'projects',
    execute: () => [
      '',
      '╔═══════════════════════════════════════════════╗',
      '║              PROJECT REGISTRY v2               ║',
      '╚═══════════════════════════════════════════════╝',
      '',
      ' ┌────────────────────────────────────────────┐',
      ' │  PROJECT ID: PULSE_SYNC                    │',
      ' │  STATUS: ● PRODUCTION                      │',
      ' │  TYPE: Android Enterprise App              │',
      ' │  STACK: Kotlin · Compose · Firebase        │',
      ' │  VERSION: v3.2.0                           │',
      ' │  ───────────────────────────────────────   │',
      ' │  ▸ Real-time sync platform                 │',
      ' │  ▸ Offline-first architecture              │',
      ' │  ▸ 25K+ active users                       │',
      ' │  ▸ <35ms response time                     │',
      ' └────────────────────────────────────────────┘',
      '',
      ' ┌────────────────────────────────────────────┐',
      ' │  PROJECT ID: MOEKYAW_TRANSLATOR           │',
      ' │  STATUS: ◉ BETA                            │',
      ' │  TYPE: Mobile AI Application               │',
      ' │  STACK: Kotlin · TFLite · Claude API       │',
      ' │  VERSION: v2.1.0                           │',
      ' │  ───────────────────────────────────────   │',
      ' │  ▸ AI-powered translation                  │',
      ' │  ▸ 50+ languages supported                 │',
      ' │  ▸ On-device ML inference                  │',
      ' │  ▸ 97% accuracy                            │',
      ' └────────────────────────────────────────────┘',
      '',
      ' ┌────────────────────────────────────────────┐',
      ' │  PROJECT ID: QUANTUM_LAB                   │',
      ' │  STATUS: ● LIVE                            │',
      ' │  TYPE: Developer Tool                      │',
      ' │  STACK: Next.js · WebGL · Paper.js         │',
      ' │  VERSION: v1.0.0                           │',
      ' │  ───────────────────────────────────────   │',
      ' │  ▸ Auto-blueprint generator                │',
      ' │  ▸ AI architecture analysis                │',
      ' │  ▸ 10K+ diagrams generated                 │',
      ' │  ▸ 94% accuracy                            │',
      ' └────────────────────────────────────────────┘',
      '',
    ];
  },
  {
    name: 'dna',
    description: 'Display engineering DNA sequence',
    usage: 'dna',
    execute: () => [
      '',
      '╔═══════════════════════════════════════════════╗',
      '║        ENGINEERING DNA SEQUENCING              ║',
      '╚═══════════════════════════════════════════════╝',
      '',
      ' GENETIC MARKERS:',
      ' ┌─────────────────────────────────────────────┐',
      ' │  Chromosome 01 │ Kotlin Expertise   95%    │',
      ' │  Chromosome 02 │ Architecture      98%    │',
      ' │  Chromosome 03 │ ML Integration     92%    │',
      ' │  Chromosome 04 │ Security           88%    │',
      ' │  Chromosome 05 │ Performance       94%    │',
      ' │  Chromosome 06 │ Cloud/Firebase     90%    │',
      ' └─────────────────────────────────────────────┘',
      '',
      ' DNA SEQUENCE:',
      ' ATCGATCGATCG ATCGATCG ATCGATCG',
      ' TACGATCG ATCGATCG ATCGATC GATCGA',
      ' CGATCG ATCGAT ATCGAT C GA TACG',
      '',
      ' MUTATIONS:',
      ' ├─ COROUTINE_AWARE — Enhanced async processing',
      ' ├─ COMPOSE_NATIVE — Deep UI Framework mastery',
      ' ├─ ARCHITECT_SAVVY — System design expertise',
      ' └─ AI_INTEGRATOR — Neural network integration',
      '',
      ' GENETIC STRENGTH SCORE: 94.7%',
      ' ENGINEER FITNESS: EXCELLENT',
      '',
    ];
  },
  {
    name: 'architecture',
    description: 'Display system architecture blueprint',
    usage: 'architecture',
    execute: () => [
      '',
      '╔═══════════════════════════════════════════════╗',
      '║        SYSTEM ARCHITECTURE BLUEPRINT           ║',
      '╚═══════════════════════════════════════════════╝',
      '',
      ' CLEAN ARCHITECTURE LAYERS:',
      '',
      ' ┌─────────────────────────────────────────────┐',
      ' │              PRESENTATION LAYER             │',
      ' │         Compose UI · Screens · State        │',
      ' │          (Jetpack Compose + MVI)            │',
      ' └────────────────────┬────────────────────────┘',
      '                      │ observe()',
      ' ┌────────────────────▼────────────────────────┐',
      ' │              VIEWMODEL LAYER                │',
      ' │       State Holder · Events · StateFlow     │',
      ' │          (Android ViewModel)                │',
      ' └────────────────────┬────────────────────────┘',
      '                      │ execute()',
      ' ┌────────────────────▼────────────────────────┐',
      ' │               DOMAIN LAYER                  │',
      ' │       Use Cases · Business Logic · Rules    │',
      ' │          (Kotlin + Coroutines)              │',
      ' └────────────────────┬────────────────────────┘',
      '                      │ getData()',
      ' ┌────────────────────▼────────────────────────┐',
      ' │               DATA LAYER                    │',
      ' │    Repository · Data Sources · Mappers      │',
      ' │    (Room · Retrofit · Firebase)             │',
      ' └─────────────────────────────────────────────┘',
      '',
      ' PATTERN: Clean Architecture + MVVM',
      ' MODULES: 18 features + 3 core modules',
      ' DI: Hilt (Dagger) for dependency injection',
      ' ASYNC: Coroutines + Flow',
      ' TESTING: Unit (96%) + UI (89%) + E2E (78%)',
      '',
      ' DEPENDENCY RULES:',
      '  ┌→ Presentation → Domain ← Data ┐',
      '  │        └──────┬────────┘      │',
      '  └───────────────┘               │',
      '  Core module provides DI & Utils  │',
      '  ─────────────────────────────────┘',
      '',
    ];
  },
  {
    name: 'performance',
    description: 'Display performance metrics',
    usage: 'performance',
    execute: () => [
      '',
      '╔═══════════════════════════════════════════════╗',
      '║            PERFORMANCE METRICS                ║',
      '╚═══════════════════════════════════════════════╝',
      '',
      ' APP PERFORMANCE:',
      ' ├─ Cold Start: 0.42s [TARGET: <0.5s] ✓',
      ' ├─ Warm Start: 0.18s [TARGET: <0.2s] ✓',
      ' ├─ Hot Start: 0.05s [EXCELLENT] ✓',
      ' ├─ Frame Rate: 60 FPS [STABLE] ✓',
      ' ├─ Jank Rate: 0.01% [TARGET: <0.5%] ✓',
      ' └─ Memory Usage: 45MB [OPTIMAL] ✓',
      '',
      ' BUILD PERFORMANCE:',
      ' ├─ Build Time: 12.4s [PARALLEL] ✓',
      ' ├─ APK Size: 8.2MB [R8 MINIFIED] ✓',
      ' ├─ Test Time: 2.1s [RUNS CONCURRENT] ✓',
      ' └─ Lint Time: 0.8s [FAST] ✓',
      '',
      ' QA METRICS:',
      ' ├─ Test Coverage: 96% [TARGET: >90%] ✓',
      ' ├─ Pass Rate: 99.9% [EXCELLENT] ✓',
      ' ├─ Crash Rate: <0.1% [TARGET: <1%] ✓',
      ' └─ ANR Rate: 0.001% [PERFECT] ✓',
      '',
      ' INFRASTRUCTURE:',
      ' ├─ CDN Cache Hit: 94% [HIGH] ✓',
      ' ├─ API Response: <45ms [LATENCY: LOW] ✓',
      ' ├─ Uptime: 99.99% [SLA: INDUSTRY LEADING] ✓',
      ' └─ Edge Computing: ENABLED [GLOBAL] ✓',
      '',
      ' ════════════ ALL TARGETS EXCEEDED ════════════',
      '',
    ];
  },
  {
    name: 'security',
    description: 'Display security protocols',
    usage: 'security',
    execute: () => [
      '',
      '╔═══════════════════════════════════════════════╗',
      '║              SECURITY PROTOCOLS                ║',
      '╚═══════════════════════════════════════════════╝',
      '',
      ' APP SECURITY:',
      ' ├─ OWASP Mobile Top 10 Compliance: ✅ PASS',
      ' ├─ Code Obfuscation: ✅ PROGUARD/R8 ENABLED',
      ' ├─ SSL Pinning: ✅ OKHTTP IMPLEMENTED',
      ' ├─ Encryption: ✅ AES-256-GCM',
      ' ├─ Secure Storage: ✅ KEYSTORE + BIOMETRIC',
      ' ├─ Network Security: ✅ HTTPS ONLY',
      ' └─ Dependency Scanning: ✅ VERIFIED CLEAN',
      '',
      ' BACKEND SECURITY:',
      ' ├─ Authentication: ✅ FIREBASE AUTH',
      ' ├─ Authorization: ✅ RULE-BASED ACCESS',
      ' ├─ Rate Limiting: ✅ IMPLEMENTED',
      ' ├─ CORS Policy: ✅ RESTRICTIVE',
      ' ├─ Input Validation: ✅ SERVER + CLIENT',
      ' └─ WAF: ✅ CLOUDFLARE ENABLED',
      '',
      ' DEVOPS SECURITY:',
      ' ├─ CI/CD: ✅ SECURED PIPELINE',
      ' ├─ Secrets: ✅ VAULT MANAGED',
      ' ├─ Docker Scanning: ✅ CLEAN',
      ' ├─ Code Review: ✅ REQUIRED FOR ALL PRs',
      ' └─ Monitoring: ✅ ALERTS CONFIGURED',
      '',
      ' ════════════ STATUS: ALL SYSTEMS PROTECTED ════════════',
      '',
    ];
  },
  {
    name: 'stack',
    description: 'Display full technology stack',
    usage: 'stack',
    execute: () => [
      '',
      '╔═══════════════════════════════════════════════╗',
      '║               TECHNOLOGY STACK                 ║',
      '╚═══════════════════════════════════════════════╝',
      '',
      ' FRONTEND FRAMEWORKS:',
      ' ├─ Next.js 14 (App Router)',
      ' ├─ React 18 (Concurrent Mode)',
      ' ├─ TypeScript (Strict Mode)',
      ' └─ Tailwind CSS',
      '',
      ' MOBILE DEVELOPMENT:',
      ' ├─ Kotlin 2.0 (Coroutines, Flow, KMP)',
      ' ├─ Jetpack Compose (Material 3)',
      ' ├─ Jetpack (Navigation, Room, Paging)',
      ' └─ Multi-module Architecture',
      '',
      ' AI & MACHINE LEARNING:',
      ' ├─ TensorFlow Lite (On-device ML)',
      ' ├─ ML Kit (Vision, NLP, Translation)',
      ' ├─ Claude API (LLM Integration)',
      ' └─ Neural Networks (Brain.js)',
      '',
      ' BACKEND & CLOUD:',
      ' ├─ Firebase (Auth, Firestore, Functions)',
      ' ├─ Node.js (Serverless)',
      ' ├─ REST APIs (Retrofit, OkHttp)',
      ' └─ GraphQL (Apollo)',
      '',
      ' DEVOPS & TOOLS:',
      ' ├─ GitHub Actions (CI/CD)',
      ' ├─ Docker (Containerization)',
      ' ├─ Git (Version Control)',
      ' └─ Cloudflare (CDN + Security)',
      '',
      ' 3D & VISUALIZATION:',
      ' ├─ Three.js / WebGL',
      ' ├─ Paper.js (Blueprint Generation)',
      ' ├─ SVG / Canvas',
      ' └─ Framer Motion (Animations)',
      '',
    ];
  },
  // AI Commands
  {
    name: 'ai',
    description: 'Engage AI assistant',
    usage: 'ai <topic>',
    execute: (args) => {
      const topics: Record<string, string[]> = {
        default: [
          '🤖 Neural AI Core Online.',
          '',
          'I can help you understand:',
          ' ▸ Architecture decisions',
          ' ▸ Code best practices',
          ' ▸ Project recommendations',
          ' ▸ Performance optimization',
          ' ▸ Security considerations',
          '',
          'Try: ai architecture, ai kotlin, ai optimize',
        ],
        architecture: [
          '🤖 ARCHITECTURE ANALYSIS:',
          '',
          ' Based on market trends and best practices:',
          ' ✓ Clean Architecture is ideal for enterprise apps',
          ' ✓ MVVM + MVI hybrid provides best reactivity',
          ' ✓ Modularization reduces build times by 40%',
          '',
          ' RECOMMENDATION:',
          ' For your next project, consider Event-Sourcing CQRS',
          ' for high-throughput applications.',
          '',
          ' KEY PRINCIPLES:',
          ' ▸ Single Responsibility',
          ' ▸ Open/Closed Principle',
          ' ▸ Dependency Inversion',
          ' ▸ Interface Segregation',
          '',
        ],
        kotlin: [
          '🤖 KOTLIN BEST PRACTICES:',
          '',
          ' ✓ Use sealed classes for state management',
          ' ✓ Leverage coroutines for async operations',
          ' ✓ Prefer Flow over LiveData for reactive streams',
          ' ✓ Use inline classes for type-safe wrappers',
          '',
          ' NUMBER ONE TIP:',
          ' Use Kotlin Flow with StateFlow for',
          ' predictable and testable state management.',
          '',
          ' Performance Point:',
          ' Use @Immutable annotation for data classes',
          ' in Compose to avoid unnecessary re-composition.',
          '',
        ],
        optimize: [
          '🤖 PERFORMANCE OPTIMIZATION STRATEGIES:',
          '',
          ' IMMEDIATE IMPROVEMENTS:',
          ' ✓ Enable Baseline Profiles (saves 30% startup)',
          ' ✓ Implement lazy loading for screens',
          ' ✓ Use rememberSaveable for state preservation',
          '',
          ' LONG-TERM STRATEGIES:',
          ' ✓ Shard database for faster queries',
          ' ✓ Implement edge caching',
          ' ✓ Use predictive back navigation',
          '',
          ' MEASUREMENT:',
          ' Use Macrobenchmark for reliable metrics.',
          ' Track: coldStart, frameDuration, memoryUsage.',
          '',
        ],
        security: [
          '🤖 SECURITY BEST PRACTICES:',
          '',
          ' ✓ Implement SSL pinning to prevent MITM attacks',
          ' ✓ Use RSA key encryption for sensitive data',
          ' ✓ Apply OWASP Mobile Top 10 checklist',
          '',
          ' CRITICAL:',
          ' Never store secrets in SharedPreferences.',
          ' Use Android Keystore + EncryptedSharedPreferences.',
          '',
          ' ✓ Enable Firebase App Check for backend security',
          ' ✓ Implement certificate transparency',
          ' ✓ Regular security audits',
          '',
        ],
      };

      const key = args[0]?.toLowerCase() || 'default';
      return topics[key] || topics.default;
    },
  },
  {
    name: 'ai:skills',
    description: 'AI analyzes skill gaps',
    usage: 'ai:skills',
    execute: () => [
      '🤖 AI SKILL ANALYSIS COMPLETE:',
      '',
      ' CURRENT ASSESSMENT:',
      ' ✓ Kotlin — Expert Level (Top 5%)',
      ' ✓ Compose — Advanced (Top 10%)',
      ' ✓ Architecture — Expert Level (Top 3%)',
      ' ✓ Security — Advanced Intermediate',
      '',
      ' IDENTIFIED GROWTH AREAS:',
      ' ▸ Compose Multiplatform (iOS)',
      ' ▸ Advanced KSP / KAPT',
      ' ▸ Server-Side Kotlin (Ktor)',
      '',
      ' SUGGESTED LEARNING PATH:',
      ' Month 1: Compose Multiplatform basics',
      ' Month 2: Ktor + SQLDelight',
      ' Month 3: Advanced Kotlin DSL design',
      '',
      ' PROJECTED MASTERY: 8/10 within 6 months',
    ];
  },
  {
    name: 'ai:projects',
    description: 'AI recommends next project',
    usage: 'ai:projects',
    execute: () => [
      '🤖 PROJECT RECOMMENDATION ENGINE:',
      '',
      ' BASED ON:',
      ' ✓ Market demand: HIGH for AI apps',
      ' ✓ Skill alignment: 92% match',
      ' ✓ Trending: Edge AI solutions',
      '',
      ' RECOMMENDED PROJECTS:',
      '',
      ' 1. ⭐ RECOMMENDED:',
      '    NAME: "AI-Powered Offline TransLator Pro"',
      '    VALUE: High — 5B+ language users globally',
      '    EFFORT: Medium — 2 months',
      '    IMPACT: Creates market-ready product',
      '',
      ' 2. ADDITIONAL OPTION:',
      '    NAME: "Smart Home Automation Engineer"',
      '    VALUE: Emerging — IoT growing 25%/year',
      '    EFFORT: High — 4 months',
      '    IMPACT: Positions as IoT specialist',
      '',
      ' FINAL VERDICT:',
      ' Pursue Translation Pro to leverage ML skills',
      ' with immediate market applications.',
      '',
    ];
  },
  {
    name: 'ai:optimize',
    description: 'AI suggests optimizations',
    usage: 'ai:optimize',
    execute: () => [
      '🤖 AI CODE OPTIMIZATION REPORT:',
      '',
      ' ANALYZING PATTERNS:',
      ' ✓ Code organization: CLEAN ✓',
      ' ✓ Function composition: GOOD ✓',
      ' ✓ State management: OPTIMAL ✓',
      ' ✓ Resource usage: EFFICIENT ✓',
      ' ⚠ Concurrency: CAN IMPROVE',
      '',
      ' SUGGESTED OPTIMIZATIONS:',
      '',
      ' HIGH IMPACT:',
      ' 1. Convert repeated heavy computations',
      '    → Use remember with key:',
      '    "val result = remember(key) { heavyComputation() }"',
      '',
      ' 2. Implement pagination for Lists:',
      '    → Use Paging 3 instead of loading all:',
      '    "Pager(PagingConfig(pageSize = 20))"',
      '',
      ' MEDIUM IMPACT:',
      ' 3. Use derivedStateOf:',
      '    → "val state by produceState { ... }"',
      '    → "val derived by derivedStateOf { state.count > 0 }"',
      '',
      ' 4. Implement StateFlow instead of LiveData:',
      '    → "MutableStateFlow(initialValue).asStateFlow()"',
      '',
      ' ESTIMATED GAIN: 35% performance improvement',
      ' EFFORT: 1 day to implement',
      '',
    ];
  },
  // Network Commands
  {
    name: 'github',
    description: 'Open GitHub profile',
    usage: 'github',
    execute: (_args, ctx) => {
      ctx.print('Opening GitHub profile...');
      setTimeout(() => {
        window.open('https://github.com/Dev-moe-kyawaung', '_blank');
      }, 1000);
      return ['🌐 Redirecting to GitHub...'];
    },
  },
  {
    name: 'linkedin',
    description: 'Open LinkedIn profile',
    usage: 'linkedin',
    execute: (_args, ctx) => {
      ctx.print('Opening LinkedIn profile...');
      setTimeout(() => {
        window.open('https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', '_blank');
      }, 1000);
      return ['🌐 Redirecting to LinkedIn...'];
    },
  },
  {
    name: 'email',
    description: 'Display contact email',
    usage: 'email',
    execute: () => [
      'CONTACT EMAILS:',
      '',
      ' PRIMARY:',
      '   moekyawaung@programmer.net',
      '',
      ' SECONDARY:',
      '   moekyawaung@technologist.com',
      '   moekyawaung@engineer.com',
      '',
      ' Use "mailto:moekyawaung@programmer.net" for instant contact.',
    ];
  },
];

// ============================================================
// QUANTUM TERMINAL COMPONENT
// ============================================================

interface QuantumTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuantumTerminal({ isOpen, onClose }: QuantumTerminalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    '░▒▓ QUANTUM TERMINAL v4.0.0▓▒░',
    '────────────────────────────────────────',
    'Welcome to the Quantum Engineering Terminal.',
    'Type "help" to see available commands.',
    'Type "exit" to close terminal.',
    '────────────────────────────────────────',
    '',
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixMode, setMatrixMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Context for commands
  const ctx: TerminalContext = {
    print: (text) => {
      setOutput((prev) => [...prev, text]);
    },
    clear: () => {
      setOutput([]);
    },
    close: onClose,
    setMatrixMode: (enabled) => setMatrixMode(enabled),
    getHistory: () => history,
    setInput: (value) => setInput(value),
  };

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom on output change
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, isTyping]);

  // Matrix rain effect
  useEffect(() => {
    if (!matrixMode || !outputRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    outputRef.current.style.position = 'relative';
    outputRef.current.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const columns = canvas.width / 20;
    const drops: number[] = new Array(Math.floor(columns)).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let animationFrame: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = `hsl(${Math.random() * 60 + 90}, 100%, ${Math.random() * 50 + 40}%)`;
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      if (outputRef.current && canvas.parentNode === outputRef.current) {
        outputRef.current.removeChild(canvas);
      }
    };
  }, [matrixMode]);

  // Execute command
  const executeCommand = (cmdInput: string) => {
    const trimmed = cmdInput.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Clear command
    if (trimmed.toLowerCase() === 'clear') {
      setOutput([]);
      setInput('');
      return;
    }

    // Exit command
    if (trimmed.toLowerCase() === 'exit') {
      onClose();
      setInput('');
      return;
    }

    // Parse command and args
    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Find command
    const command = commands.find((c) => c.name === cmdName);

    // Show typed command
    let newOutput: string[] = [`$ ${trimmed}`];

    if (command) {
      try {
        const result = command.execute(args, ctx);
        newOutput = [...newOutput, ...result];
      } catch (error) {
        newOutput = [...newOutput, `⚠ Error executing command: ${error}`];
      }
    } else if (cmdName === 'help') {
      // Default help
      const helpCommand = commands.find((c) => c.name === 'help');
      if (helpCommand) {
        newOutput = [...newOutput, ...helpCommand.execute([], ctx)];
      }
    } else {
      newOutput = [...newOutput, `Command not found: ${cmdName}`, 'Type "help" to see available commands.'];
    }

    setOutput((prev) => [...prev, ...newOutput]);
    setInput('');
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 500);
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setInput(history[idx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIndex === -1 ? -1 : Math.min(history.length - 1, historyIndex + 1);
      setHistoryIndex(idx);
      setInput(idx === -1 ? '' : history[idx] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Command completion
      const currentInput = input.toLowerCase();
      const matchingCommands = commands.filter((c) => c.name.startsWith(currentInput));
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0].name + ' ');
      } else if (matchingCommands.length > 1) {
        setOutput((prev) => [...prev, 'Matching commands:', ...matchingCommands.map((c) => `  ${c.name}`)]);
      }
    }
  };

  // Render terminal
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl z-0"
            onClick={onClose}
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="relative z-10 w-full max-w-4xl h-3/4 max-h-[650px] flex flex-col rounded-xl overflow-hidden"
            style={{
              background: matrixMode
                ? 'rgba(0, 10, 0, 0.97)'
                : 'rgba(8, 12, 24, 0.97)',
              border: matrixMode
                ? '1px solid rgba(0, 255, 0, 0.3)'
                : '1px solid rgba(0, 229, 255, 0.3)',
              boxShadow: matrixMode
                ? '0 0 40px rgba(0, 255, 0, 0.2)'
                : '0 0 40px rgba(0, 229, 255, 0.2)',
            }}
          >
            {/* Terminal Header */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b border-opacity-20"
              style={{
                background: matrixMode
                  ? 'rgba(0, 30, 0, 0.5)'
                  : 'rgba(0, 229, 255, 0.05)',
                borderColor: matrixMode
                  ? 'rgba(0, 255, 0, 0.2)'
                  : 'rgba(0, 229, 255, 0.1)',
              }}
            >
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>

              {/* Terminal Title */}
              <div className="flex items-center gap-2 text-xs font-mono"
                style={{ color: matrixMode ? '#00FF00' : '#00E5FF' }}
              >
                <TerminalIcon size={12} />
                {matrixMode ? 'MATRIX TERMINAL' : 'QUANTUM TERMINAL v4.0'}
                {matrixMode && ' — WAKE UP, NEO...'}
              </div>

              {/* System Status */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                <span className="text-[10px] font-mono" style={{ color: matrixMode ? '#00FF00' : '#00E5FF' }}>
                  ONLINE
                </span>
                <button onClick={onClose} className="p-1 hover:opacity-70 transition-opacity"
                  style={{ color: matrixMode ? '#00FF00' : '#00E5FF' }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Output */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed"
              style={{
                color: matrixMode ? '#00FF00' : '#00FF9D',
                background: 'transparent',
                scrollbarWidth: 'thin',
                scrollbarColor: matrixMode ? '#00FF00' : '#00E5FF',
              }}
            >
              {output.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1, delay: 0.05 }}
                  className="whitespace-pre-wrap"
                >
                  {line}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1">
                  <span className="inline-block w-2 h-4 bg-current animate-pulse" />
                </div>
              )}
            </div>

            {/* Terminal Input */}
            <div
              className="px-4 py-3 border-t border-opacity-20"
              style={{
                background: matrixMode
                  ? 'rgba(0, 20, 0, 0.5)'
                  : 'rgba(0, 0, 0, 0.3)',
                borderColor: matrixMode
                  ? 'rgba(0, 255, 0, 0.1)'
                  : 'rgba(0, 229, 255, 0.1)',
              }}
            >
              {/* Quick Command Buttons */}
              <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {['help', 'skills', 'projects', 'dna', 'ai', 'neofetch', 'architecture', 'performance'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setInput(cmd);
                      executeCommand(cmd);
                    }}
                    className="px-2 py-0.5 text-[10px] font-mono rounded transition-all"
                    style={{
                      background: matrixMode ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 229, 255, 0.1)',
                      color: matrixMode ? '#00FF00' : '#00E5FF',
                      border: `1px solid ${matrixMode ? 'rgba(0,255,0,0.2)' : 'rgba(0,229,255,0.2)'}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = matrixMode ? 'rgba(0,255,0,0.2)' : 'rgba(0,229,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = matrixMode ? 'rgba(0,255,0,0.1)' : 'rgba(0,229,255,0.1)';
                    }}
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Input Line */}
              <div className="flex items-center gap-2">
                {/* Prompt Symbol */}
                <span className="text-sm font-mono" style={{ color: matrixMode ? '#00FF00' : '#FF6B35' }}>
                  $
                </span>

                {/* Input Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-sm font-mono"
                  style={{
                    color: matrixMode ? '#00FF00' : '#00E5FF',
                    caretColor: matrixMode ? '#00FF00' : '#00E5FF',
                  }}
                  placeholder="Type 'help' for available commands..."
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                />

                {/* Matrix Mode Toggle */}
                <button
                  onClick={() => setMatrixMode(!matrixMode)}
                  className="px-2 py-1 text-[10px] font-mono rounded transition-all"
                  style={{
                    background: matrixMode ? 'rgba(0,255,0,0.1)' : 'rgba(0,229,255,0.1)',
                    color: matrixMode ? '#00FF00' : '#00E5FF',
                    border: `1px solid ${matrixMode ? 'rgba(0,255,0,0.3)' : 'rgba(0,229,255,0.3)'}`,
                  }}
                  title="Toggle Matrix Mode"
                >
                  {matrixMode ? 'MATRIX: ON' : 'MATRIX: OFF'}
                </button>
              </div>

              {/* Terminal Footer */}
              <div className="flex items-center justify-between text-[9px] font-mono mt-2"
                style={{ color: matrixMode ? 'rgba(0,255,0,0.5)' : 'rgba(0,229,255,0.35)' }}
              >
                <div className="flex items-center gap-2">
                  <span>USE ↑↓ FOR HISTORY</span>
                  <span>·</span>
                  <span>TAB FOR COMPLETION</span>
                </div>
                <div>QUANTUM TERMINAL © 2024</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
