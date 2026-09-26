import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  User,
  Bot,
  RefreshCw,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}

interface AiConversationViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onClearHistory: () => void;
  onSwitchToLiveVoice: () => void;
}

export const AiConversationView: React.FC<AiConversationViewProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onClearHistory,
  onSwitchToLiveVoice,
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const text = input.trim();
      setInput('');
      onSendMessage(text);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const PROMPT_SUGGESTIONS = [
    'Synthesize latest breakthroughs in exoplanet atmospheric science',
    'Compare current market dynamics of semiconductors and AI accelerators',
    'Analyze geopolitical energy shifts and renewable grid adoption',
    'Explain quantum supremacy progress in 2026',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm">OMNIX Neural Conversation</h2>
            <p className="text-zinc-400 text-[11px]">Real-time reasoning &amp; multi-domain knowledge synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSwitchToLiveVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Launch Live Voice</span>
          </button>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClearHistory}
              className="text-zinc-500 hover:text-zinc-300 px-2 py-1 text-xs cursor-pointer"
            >
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <Bot className="w-8 h-8" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-bold text-white">How can OMNIX assist you today?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ask about global affairs, technological breakthroughs, deep research queries, or explore verified live intelligence.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-2xl text-left">
              {PROMPT_SUGGESTIONS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSendMessage(prompt)}
                  className="p-3 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-cyan-500/40 text-xs text-zinc-300 hover:text-white transition flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-2">{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 shrink-0 ml-2 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs sm:text-sm ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-2 ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-sm shadow-md'
                    : 'bg-zinc-900/90 border border-zinc-800/90 text-zinc-200 rounded-tl-sm shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[11px] opacity-70 mb-1">
                  <span className="font-mono font-semibold">
                    {msg.role === 'user' ? 'You' : 'OMNIX Intelligence'}
                  </span>
                  <span className="font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>

                {msg.role === 'assistant' && (
                  <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Neural Synthesis</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3 items-center text-xs text-cyan-400">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span className="font-mono">OMNIX is synthesizing verified response...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="pt-3 border-t border-zinc-800">
        <div className="relative flex items-center bg-zinc-900 border border-zinc-800 focus-within:border-cyan-500/60 rounded-2xl shadow-xl transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask OMNIX anything across science, markets, web, or intelligence..."
            className="flex-1 pl-4 pr-12 py-3 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:hover:bg-cyan-500 text-zinc-950 font-bold transition cursor-pointer shadow-md"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
