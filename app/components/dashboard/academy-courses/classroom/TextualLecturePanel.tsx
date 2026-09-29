'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import {
  ChatBubbleBottomCenterTextIcon,
  ChartBarIcon,
  TableCellsIcon,
  DocumentTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export const TextualLecturePanel: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`max-lg:h-[calc(95vh-4rem)] lg:h-[calc(93vh-4rem)] overflow-y-auto p-6 max-xl:m-6 xl:my-6 xl:mx-6 rounded-xl 
      border  space-y-6 ${ isDark ? ' bg-zinc-950 border-zinc-700 text-zinc-200' : 'bg-zinc-50 border-zinc-300 text-zinc-800'
    }`}>
      
      {/* AI Lecture Brief Card */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300'
      } shadow-lg space-y-4`}>
        <div className="flex items-center justify-between border-b pb-4 border-zinc-700">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold">Lecture Notes & Markdown Insights</h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">Topic 03 • Real-Time AI</span>
        </div>

        <div className="space-y-3 text-sm leading-relaxed font-serif">
          <p>
            In today's Master lecture, we analyze <strong>Autonomous Multi-Agent Communication Frameworks</strong>.
            When scaling real-time machine learning pipelines, asynchronous state synchronization guarantees high availability without deadlock.
          </p>
          <div className={`p-4 rounded-xl border-l-4 border-emerald-500 font-sans text-xs italic ${
            isDark ? 'bg-zinc-900/90 text-zinc-300' : 'bg-emerald-50/50 text-zinc-700'
          }`}>
            "Distributed consensus mechanisms must maintain deterministic ordering even in non-deterministic model environments."
          </div>
        </div>
      </div>

      {/* Performance Analytics & Metrics Graph Placeholder */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300'
      } shadow-lg space-y-4`}>
        <div className="flex items-center justify-between border-b pb-4 border-zinc-700">
          <div className="flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold">System Performance & Latency Spectrum</h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 
          rounded-full border border-emerald-500/20">
            Live Stream Data
          </span>
        </div>

        {/* Mock Graphic Data Metrics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-700' : 'bg-zinc-100 border-zinc-300'}`}>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">Consensus Latency</p>
            <p className="text-lg font-black text-emerald-400">14.2 ms</p>
          </div>
          <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-700' : 'bg-zinc-100 border-zinc-300'}`}>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">Throughput</p>
            <p className="text-lg font-black text-blue-400">120k req/s</p>
          </div>
          <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-700' : 'bg-zinc-100 border-zinc-300'}`}>
            <p className="text-[10px] text-zinc-500 uppercase font-semibold">Accuracy Index</p>
            <p className="text-lg font-black text-purple-400">99.8%</p>
          </div>
        </div>
      </div>

      {/* Structured Technical Comparison Table */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300'
      } shadow-lg space-y-4`}>
        <div className="flex items-center gap-2 border-b pb-4 border-zinc-700">
          <TableCellsIcon className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-bold">Protocol Benchmarks Comparison</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-zinc-700 text-zinc-400' : 'border-zinc-300 text-zinc-600'}`}>
                <th className="py-2 px-3">Architecture</th>
                <th className="py-2 px-3">Fault Tolerance</th>
                <th className="py-2 px-3">Network Overhead</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-zinc-800' : 'divide-zinc-200'}`}>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-emerald-400">Raft Protocol</td>
                <td className="py-2.5 px-3">High ($N/2 + 1$)</td>
                <td className="py-2.5 px-3">Low</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-blue-400">Paxos Algorithm</td>
                <td className="py-2.5 px-3">Very High</td>
                <td className="py-2.5 px-3">Medium</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-purple-400">Gossip Protocol</td>
                <td className="py-2.5 px-3">Eventual Consensus</td>
                <td className="py-2.5 px-3">Minimal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Assistant Chat Stream */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300'
      } shadow-lg space-y-4`}>
        <div className="flex items-center gap-2 border-b pb-4 border-zinc-700">
          <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold">AI Co-Teacher Live Insights</h3>
        </div>

        <div className={`p-4 rounded-xl border text-xs space-y-2 ${
          isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
        }`}>
          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <SparklesIcon className="w-4 h-4" />
            <span>AI Synthesis Engine</span>
          </div>
          <p>
            Students frequently ask about state recovery during network partitions. 
            Remember that heartbeat timers must exceed round-trip network variance to avoid split-brain elections.
          </p>
        </div>
      </div>

    </div>
  );
};