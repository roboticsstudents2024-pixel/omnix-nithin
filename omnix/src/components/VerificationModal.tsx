import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertOctagon } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  isDark = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`rounded-2xl max-w-xl w-full p-6 shadow-2xl border overflow-y-auto max-h-[90vh] transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div
          className={`flex items-center justify-between pb-4 border-b ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3
                className={`text-lg font-bold font-serif ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Live Source Verification Pipeline
              </h3>
              <p className="text-xs text-slate-400">
                100% Real Reporting Guarantee &amp; Zero Mock News Policy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs sm:text-sm">
          <div
            className={`p-4 border rounded-xl space-y-2 ${
              isDark
                ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}
          >
            <h4 className="font-bold flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Mandatory 5-Step Ingestion Checks</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs opacity-90">
              <li>
                <strong>URL Existence &amp; Reachability:</strong> Every article URL is tested for valid protocol and direct routing.
              </li>
              <li>
                <strong>Publisher Identity Verification:</strong> Publisher name is matched against the authoritative feed authority.
              </li>
              <li>
                <strong>Headline Fidelity:</strong> Real retrieved headline from the provider—never template-generated.
              </li>
              <li>
                <strong>Temporal Freshness:</strong> Authentic publication timestamp extracted directly from the feed metadata.
              </li>
              <li>
                <strong>Original URL Preservation:</strong> Permanent source URL stored and directly linked. Absolutely NO example.com replacement.
              </li>
            </ol>
          </div>

          <div
            className={`p-4 border rounded-xl space-y-2 ${
              isDark
                ? 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <h4 className="font-bold flex items-center gap-2 text-rose-400">
              <AlertOctagon className="w-4 h-4" />
              <span>Strictly Prohibited in Production</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
              <li>example.com or dummy placeholder links</li>
              <li>Generic headlines like “Major developments in world events”</li>
              <li>Fake Reuters, BBC, or AP attributions</li>
              <li>Fabricated dates, timestamps, or quotes</li>
              <li>LLM-generated news presented as real events</li>
            </ul>
          </div>

          <div
            className={`p-4 border rounded-xl space-y-1.5 text-xs ${
              isDark
                ? 'bg-slate-950 border-slate-800 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Summarization Standard
            </h4>
            <p className="leading-relaxed">
              AI summarization operates strictly on retrieved source facts. It is prohibited from inventing events, quotes, statistics, or people. Summaries are transparently labeled as AI SUMMARY alongside primary SOURCE INFORMATION.
            </p>
          </div>
        </div>

        <div
          className={`mt-6 pt-4 border-t flex justify-end ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer shadow-md transition"
          >
            Acknowledge &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
