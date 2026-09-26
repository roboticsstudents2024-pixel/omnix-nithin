import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  AudioWaveform,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  Radio,
  RefreshCw,
} from 'lucide-react';

interface VoiceTranscript {
  speaker: 'user' | 'omnix';
  text: string;
  time: string;
}

interface LiveVoiceViewProps {
  onSendVoiceMessage: (text: string) => Promise<string>;
}

export const LiveVoiceView: React.FC<LiveVoiceViewProps> = ({
  onSendVoiceMessage,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusMessage, setStatusMessage] = useState('OMNIX Live Voice Ready');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [transcripts, setTranscripts] = useState<VoiceTranscript[]>([
    {
      speaker: 'omnix',
      text: 'Greetings. OMNIX Live Voice interface is connected. Tap the microphone to begin voice synthesis or voice inquiries.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage('Listening to your voice input...');
      };

      recognition.onresult = async (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setIsListening(false);
        setStatusMessage('Processing speech through neural core...');

        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setTranscripts((prev) => [...prev, { speaker: 'user', text: spokenText, time: timeNow }]);

        // Get AI answer
        const responseText = await onSendVoiceMessage(spokenText);

        setTranscripts((prev) => [
          ...prev,
          { speaker: 'omnix', text: responseText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ]);

        setStatusMessage('Speaking response...');
        speakText(responseText);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition notice:', e.error);
        setIsListening(false);
        setStatusMessage('Microphone idle. Click to speak.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [onSendVoiceMessage]);

  const speakText = (text: string) => {
    if (!soundEnabled || !window.speechSynthesis) {
      setStatusMessage('OMNIX Live Voice Ready');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setStatusMessage('OMNIX Live Voice Ready');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setStatusMessage('OMNIX Live Voice Ready');
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setStatusMessage('Stopped listening');
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // Restart if already running
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current?.start(), 100);
        }
      } else {
        // Fallback simulation if browser blocks mic permissions
        simulateVoiceInteraction();
      }
    }
  };

  const simulateVoiceInteraction = async () => {
    const prompt = 'Synthesize current global technology and market posture';
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTranscripts((prev) => [...prev, { speaker: 'user', text: prompt, time: timeNow }]);
    setIsListening(false);
    setStatusMessage('Neural reasoning in progress...');

    const res = await onSendVoiceMessage(prompt);
    setTranscripts((prev) => [
      ...prev,
      { speaker: 'omnix', text: res, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    speakText(res);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Voice Visualizer Orb & Controls */}
      <div className="p-8 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl text-center shadow-2xl flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center justify-between w-full text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Radio className={`w-3.5 h-3.5 ${isListening || isSpeaking ? 'text-cyan-400 animate-pulse' : 'text-zinc-600'}`} />
            <span className="font-mono uppercase tracking-wider">OMNIX Live Audio Channel</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isSpeaking) window.speechSynthesis.cancel();
              setSoundEnabled(!soundEnabled);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
            <span className="text-[11px] font-mono">{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>
        </div>

        {/* Central Glowing Mic / Visualizer */}
        <div className="relative flex items-center justify-center my-4">
          {/* Pulsing Aura */}
          {(isListening || isSpeaking) && (
            <div className="absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
          )}

          {/* Core Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`relative z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
              isListening
                ? 'bg-rose-500 text-white scale-110 shadow-[0_0_40px_rgba(244,63,94,0.6)]'
                : isSpeaking
                ? 'bg-cyan-500 text-zinc-950 scale-105 shadow-[0_0_35px_rgba(6,182,212,0.6)]'
                : 'bg-zinc-800 hover:bg-zinc-700 text-cyan-400 border-2 border-cyan-500/40 hover:border-cyan-400'
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 animate-bounce" />
            ) : isSpeaking ? (
              <AudioWaveform className="w-10 h-10 animate-pulse" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
            <span className="text-[10px] font-mono uppercase mt-1 font-bold">
              {isListening ? 'Listening' : isSpeaking ? 'Speaking' : 'Tap to Speak'}
            </span>
          </button>
        </div>

        {/* Frequency Wave Animation Bars */}
        <div className="flex items-center gap-1.5 h-12 justify-center">
          {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 35, 65, 85, 40, 75, 50].map((h, idx) => (
            <div
              key={idx}
              style={{
                height: isListening || isSpeaking ? `${Math.max(15, Math.floor(h * Math.random()))}%` : '20%',
                transition: 'height 0.15s ease-in-out',
              }}
              className={`w-1.5 rounded-full ${
                isListening
                  ? 'bg-rose-400'
                  : isSpeaking
                  ? 'bg-cyan-400'
                  : 'bg-zinc-800'
              }`}
            ></div>
          ))}
        </div>

        {/* Status Text */}
        <div className="font-mono text-xs text-zinc-300 bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800">
          {statusMessage}
        </div>
      </div>

      {/* Live Voice Transcript Log */}
      <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <AudioWaveform className="w-4 h-4 text-cyan-400" />
          <span>Live Conversation Stream</span>
        </h3>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {transcripts.map((t, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl text-xs sm:text-sm flex gap-3 ${
                t.speaker === 'user'
                  ? 'bg-zinc-800/80 border border-zinc-700/60 text-zinc-200 ml-8'
                  : 'bg-cyan-950/30 border border-cyan-500/20 text-cyan-100 mr-8'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {t.speaker === 'user' ? (
                  <User className="w-4 h-4 text-zinc-400" />
                ) : (
                  <Bot className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                  <span>{t.speaker === 'user' ? 'Voice Input' : 'OMNIX Response'}</span>
                  <span>{t.time}</span>
                </div>
                <p className="leading-relaxed">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
