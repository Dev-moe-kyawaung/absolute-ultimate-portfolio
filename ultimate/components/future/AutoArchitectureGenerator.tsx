'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { neuralEngine } from '@/lib/ai/NeuralEngine';
import * as d3 from 'd3';
import { Download, Loader2, Sparkles, Wand2, Settings } from 'lucide-react';

interface AutoArchitectureGeneratorProps {
  initialDescription?: string;
}

export default function AutoArchitectureGenerator({
  initialDescription = '',
}: AutoArchitectureGeneratorProps) {
  const [description, setDescription] = useState(initialDescription);
  const [isGenerating, setIsGenerating] = useState(false);
  const [architecture, setArchitecture] = useState<any>(null);
  const [history, setHistory] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([
    'Clean Architecture with MVVM',
    'Multi-module presentation layer',
    'Event-driven microservices',
    'Offline-first data layer',
  ]);

  useEffect(() => {
    if (architecture && svgRef.current) {
      renderArchitectureDiagram();
    }
  }, [architecture]);

  const renderArchitectureDiagram = () => {
    if (!svgRef.current || !architecture) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;
    const margin = 40;

    svg.attr('viewBox', `0 0 \${width} \${height}`)
       .attr('width', '100%')
       .attr('height', 'auto');

    // Background grid
    for (let x = margin; x < width; x += 40) {
      svg.append('line')
         .attr('x1', x).attr('y1', margin)
         .attr('x2', x).attr('y2', height - margin)
         .attr('stroke', 'rgba(0,229,255,0.05)')
         .attr('stroke-width', 0.5);
    }

    for (let y = margin; y < height; y += 40) {
      svg.append('line')
         .attr('x1', margin).attr('y1', y)
         .attr('x2', width - margin).attr('y2', y)
         .attr('stroke', 'rgba(0,229,255,0.05)')
         .attr('stroke-width', 0.5);
    }

    // Render layers
    const layers = architecture.layers;
    const layerHeight = (height - 2 * margin) / layers.length;
    const layerWidth = width - 2 * margin;
    const colors = ['#00E5FF', '#FF6B35', '#2ECC71', '#E74C3C', '#A855F7', '#F1C40F'];

    layers.forEach((layer: string, index: number) => {
      const y = margin + index * layerHeight;
      const x = 80;
      const w = layerWidth - 160;
      const rectW = w;
      const rectH = layerHeight - 20;

      // Layer rectangle
      const rect = svg.append('rect')
        .attr('x', x)
        .attr('y', y + 10)
        .attr('width', rectW)
        .attr('height', rectH)
        .attr('fill', `rgba(\${index * 20}, \${index * 30}, \${index * 40}, 0.1)`)
        .attr('stroke', colors[index % colors.length])
        .attr('stroke-width', 1.5)
        .attr('rx', 8)
        .attr('ry', 8);

      // Layer label
      svg.append('text')
        .attr('x', x + rectW / 2)
        .attr('y', y + rectH / 2 + 5)
        .attr('text-anchor', 'middle')
        .attr('fill', colors[index % colors.length])
        .attr('font-family', 'monospace')
        .attr('font-size', '12px')
        .text(layer);

      // Connection arrow to next layer
      if (index < layers.length - 1) {
        const nextY = y + layerHeight;
        svg.append('line')
          .attr('x1', x + rectW / 2)
          .attr('y1', y + rectH)
          .attr('x2', x + rectW / 2)
          .attr('y2', nextY)
          .attr('stroke', colors[index % colors.length])
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '5,3')
          .attr('opacity', 0.5);

        // Arrow head
        const arrow = svg.append('path')
          .attr('d', 'M 0,0 L 6,5 L 0,10 L -6,5 Z')
          .attr('fill', colors[index % colors.length])
          .attr('opacity', 0.5)
          .attr('transform', `translate(\${x + rectW / 2}, \${nextY}) rotate(90)`);
      }
    });

    // Recommendations
    if (architecture.recommendations) {
      const recY = height - margin + 10;
      architecture.recommendations.forEach((rec: string, idx: number) => {
        svg.append('text')
          .attr('x', margin + 10)
          .attr('y', recY + idx * 20)
          .attr('fill', '#FFD700')
          .attr('font-family', 'monospace')
          .attr('font-size', '10px')
          .text(`⚠ \${rec}`);
      });
    }

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('fill', '#00E5FF')
      .attr('font-family', 'monospace')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('ARCHITECTURE BLUEPRINT — AUTO-GENERATED');
  };

  const handleGenerate = async () => {
    if (!description.trim() || isGenerating) return;

    setIsGenerating(true);
    
    // Simulate AI processing time for visual effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = neuralEngine.generateArchitecture(description);
    setArchitecture(result);
    setHistory(prev => [...prev, description]);
    setIsGenerating(false);
  };

  const downloadBlueprint = () => {
    if (!svgRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `architecture-\${Date.now()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="quantum-card p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#00E5FF]" />
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
              Neural Architecture Engine
            </span>
          </div>
          <h3 className="text-2xl font-bold font-display">
            Auto-Generate{' '}
            <span className="holographic">Architecture Blueprint</span>
          </h3>
          <p className="text-xs font-mono text-gray-400 mt-2">
            Describe your system and the AI will design the architecture
          </p>
        </div>

        <button
          onClick={downloadBlueprint}
          disabled={!architecture}
          className="p-2 hover:bg-white/10 rounded transition-all disabled:opacity-50"
          title="Download Blueprint"
        >
          <Download size={18} />
        </button>
      </div>

      {/* Input */}
      <div className="mb-6">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your system architecture... e.g., 'Multi-module Android app with Clean Architecture, MVVM pattern, offline-first data layer, and push notifications'"
          className="w-full px-4 py-3 bg-white/5 border border-[#00E5FF]/20 rounded-lg text-sm 
                     text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/50 
                     resize-none h-24 transition-all"
        />

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-2 flex-1">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setDescription(suggestion)}
                className="px-2 py-1 text-[10px] font-mono text-[#00E5FF]/70 border border-[#00E5FF]/20 
                           hover:bg-[#00E5FF]/10 rounded transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            disabled={!description.trim() || isGenerating}
            className="ml-4 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00E5FF] to-[#FF6B35] 
                       text-white rounded-lg font-mono text-sm hover:opacity-90 disabled:opacity-50 
                       transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                GENERATING...
              </>
            ) : (
              <>
                <Wand2 size={16} />
                GENERATE
              </>
            )}
          </button>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="relative border border-[#00E5FF]/10 rounded-lg overflow-hidden bg-white/[0.02] min-h-[300px]">
        {architecture ? (
          <>
            <svg ref={svgRef} className="w-full" />
          </>
        ) : (
          <div className="flex items-center justify-center py-28">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#00E5FF]/10 flex items-center justify-center mb-4">
                <Sparkles size={32} className="text-[#00E5FF] animate-pulse" />
              </div>
              <p className="text-sm font-mono text-gray-400">
                Architecture diagram will appear here
              </p>
              <p className="text-xs font-mono text-gray-500 mt-2">
                Powered by Neural Engine AI
              </p>
            </div>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-mono text-gray-500 mb-2">RECENT GENERATIONS</div>
          <div className="space-y-1">
            {history.slice(-5).reverse().map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs font-mono text-gray-600">
                <span className="w-1 h-1 rounded-full bg-[#00E5FF]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
