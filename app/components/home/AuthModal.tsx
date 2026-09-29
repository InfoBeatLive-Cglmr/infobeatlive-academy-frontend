import { useState, FC } from 'react';
import { GraduationCap, X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Scholar authenticated for: ${email || 'scholar@university.edu'}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-md w-full p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto text-amber-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">Scholar Access Portal</h3>
          <p className="text-xs text-zinc-400">Sign in to access your proctored dashboard and accredited study plans.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Scholar Email</label>
            <input
              type="email"
              required
              placeholder="scholar@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Access Token / Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider"
          >
            Authenticate Scholar
          </button>
        </form>
      </div>
    </div>
  );
};
