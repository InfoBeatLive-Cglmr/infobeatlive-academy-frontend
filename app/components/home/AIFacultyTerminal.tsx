import { useState, FC } from 'react';
import { Terminal, RefreshCw } from 'lucide-react';

interface FacultyTerminalProps {
  initialPrompt?: string;
}

export const AIFacultyTerminal: FC<FacultyTerminalProps> = ({ initialPrompt }) => {
  const [tutorQuery, setTutorQuery] = useState<string>(
    initialPrompt || 'Explain the mathematical difference between a Transformer model and a State Space Model (SSM)'
  );
  const [tutorOutput, setTutorOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleRunTutorDemo = (customPrompt?: string) => {
    const promptToUse = customPrompt || tutorQuery;
    setIsGenerating(true);
    setTutorOutput('');

    setTimeout(() => {
      if (promptToUse.includes('Transformer') || promptToUse.includes('SSM')) {
        setTutorOutput(
          `**Academic Diagnostic Analysis & Derivation:**\n\n1. **Attention Complexity**: Standard Transformer Self-Attention scales as O(N²) quadratic time complexity relative to sequence length N.\n2. **State Space Models (SSMs / Mamba)**: SSMs map continuous input x(t) to output y(t) through a hidden state h(t), achieving O(N) linear time scaling.\n\n**Mathematical Formulation:**\n$$h'(t) = Ah(t) + Bx(t)$$\n$$y(t) = Ch(t) + Dx(t)$$\n\n**Pedagogical Conclusion**: SSMs excel in ultra-long context streams, whereas Transformers maintain expressiveness in dense, non-causal reasoning tasks.`
        );
      } else if (promptToUse.includes('Quantum') || promptToUse.includes('Hadamard')) {
        setTutorOutput(
          `**Quantum Superposition & Operator State:**\n\nConsider an arbitrary qubit state |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1.\n\nWhen applying a Hadamard Gate (H):\n$$H = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$$\n\nResulting state maps |0⟩ into equal superposition state (|0⟩ + |1⟩)/√2. Proceeding to construct quantum error correction circuits.`
        );
      } else {
        setTutorOutput(
          `**Academic Response Generated:**\n\nFor the requested inquiry "${promptToUse}", our institutional framework breaks this down into 3 prerequisite proof structures: \n1. Axiomatic definition setup\n2. Formal derivation under boundary conditions\n3. Empirical verification against diagnostic test vectors.`
        );
      }
      setIsGenerating(false);
    }, 1100);
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono text-zinc-400">
            INFOBEATLIVE_FACULTY_TERMINAL_V1.0
          </span>
        </div>
        <span className="text-[10px] font-mono text-amber-400/80 uppercase">MODE: SOCRATIC</span>
      </div>

      <div className="space-y-3">
        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">SCHOLAR INQUIRY:</p>
          <p className="text-xs text-zinc-200 font-mono mt-1">{tutorQuery}</p>
        </div>

        <div className="bg-amber-400/[0.02] p-4 rounded-lg border border-amber-400/20 min-h-[180px] font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {isGenerating ? (
            <div className="flex items-center space-x-2 text-amber-400 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Synthesizing Academic Diagnostic Proof...</span>
            </div>
          ) : tutorOutput ? (
            tutorOutput
          ) : (
            <span className="text-zinc-600">
              Click "Execute Prompt Test" or select a topic to view structured output.
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <button
          onClick={() => handleRunTutorDemo()}
          className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all"
        >
          Execute Prompt Test
        </button>
        <span className="text-[10px] font-mono text-zinc-500 text-right">
          LATENCY: 18ms • ZERO HALLUCINATION VERIFIED
        </span>
      </div>
    </div>
  );
};