'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Mic, Volume2, Sparkles, Loader2, X } from 'lucide-react';
import { neuralEngine } from '@/lib/ai/NeuralEngine';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

interface NeuralNetworkAIProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NeuralNetworkAI({ isOpen, onClose }: NeuralNetworkAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Neural AI Core Online. I am ready to assist with engineering queries. How can I help you?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [aiPowered, setAIPowered] = useState(true);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      // Process with Neural Engine
      const response = await neuralEngine.processInput(input);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        text: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        text: 'Neural engine encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleAudioInput = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsSpeaking(true);
      recognition.onend = () => setIsSpeaking(false);
      recognition.onerror = () => setIsSpeaking(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.start();
    }
  };

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl z-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 w-full max-w-3xl h-3/4 max-h-680 quantum-chat flex flex-col"
          >
            {/* AI Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#00E5FF]/10">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#A855F7] flex items-center justify-center">
                  <Bot size={24} className="text-white" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#2ECC71]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Neural AI Core</h3>
                  <div className="flex items-center gap-2">
                    {aiPowered ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                        <span className="text-[10px] font-mono text-[#2ECC71]">QUANTUM AI</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[#F1C40F]" />
                        <span className="text-[10px] font-mono text-[#F1C40F]">BASIC MODE</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#FF6B35]/20 border border-[#00E5FF]/30'
                        : message.isError
                        ? 'bg-red-500/10 border border-red-500/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 text-[10px] font-mono opacity-50">
                      <span>{message.role === 'user' ? 'YOU' : 'NIA'}</span>
                      <span>·</span>
                      <span>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {message.role === 'assistant' && !message.isError && (
                        <button
                          onClick={() => handleSpeak(message.text)}
                          className="ml-1 text-[#00E5FF] hover:text-[#FF6B35] transition-colors"
                        >
                          <Volume2 size={12} />
                        </button>
                      )}
                    </div>
                    <div className="text-sm leading-relaxed">{message.text}</div>
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-[#00E5FF]" />
                      <span className="text-xs font-mono text-[#00E5FF]">PROCESSING...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Commands */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto hide-scrollbar">
              {['show projects', 'explain architecture', 'skills', 'contact'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => setInput(cmd)}
                  className="px-3 py-1.5 text-xs font-mono bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all whitespace-nowrap"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#00E5FF]/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAudioInput}
                  className={`p-2 rounded-lg transition-all ${
                    isSpeaking
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Mic size={18} />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about technical expertise..."
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm 
                             focus:outline-none focus:border-[#00E5FF]/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  className={`p-2 rounded-lg transition-all ${
                    isThinking
                      ? 'opacity-50'
                      : 'bg-gradient-to-r from-[#00E5FF] to-[#FF6B35] text-white hover:opacity-90'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
