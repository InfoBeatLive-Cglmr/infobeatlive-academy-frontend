'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import {
  AcademicCapIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export interface TopicItem {
  id: string;
  topicNumber: number;
  title: string;
  duration: string;
  status: 'completed' | 'in_progress' | 'upcoming';
}

const MOCK_SIDEBAR_TOPICS: TopicItem[] = [
  { id: 't1', topicNumber: 1, title: 'Introduction to Microservices & Geo-Distributed Nodes', duration: '5 mins', status: 'completed' },
  { id: 't2', topicNumber: 2, title: 'REST, gRPC & High-Throughput Protobuf Protocols', duration: '5 mins', status: 'completed' },
  { id: 't3', topicNumber: 3, title: 'Vector Indexing Engine Architecture (HNSW & IVF-PQ)', duration: '5 mins', status: 'completed' },
  { id: 't4', topicNumber: 4, title: 'Distributed State Replication via Raft Consensus', duration: '5 mins', status: 'completed' },
  { id: 't5', topicNumber: 5, title: 'PostgreSQL Sharding & Distributed Database Engines', duration: '5 mins', status: 'completed' },
  { id: 't6', topicNumber: 6, title: 'Asynchronous Event Bus Integration with Kafka & NATS', duration: '5 mins', status: 'in_progress' },
  { id: 't7', topicNumber: 7, title: 'Containerization & Cloud Native Orchestration with Docker', duration: '5 mins', status: 'upcoming' },
  { id: 't8', topicNumber: 8, title: 'Zero-Trust API Security, OAuth2 & JWT Verification', duration: '5 mins', status: 'upcoming' },
  { id: 't9', topicNumber: 9, title: 'Autonomous AI Multi-Agent Handshakes & Task Dispatch', duration: '5 mins', status: 'upcoming' },
  { id: 't10', topicNumber: 10, title: 'Telemetry, Observability & Distributed Tracing', duration: '5 mins', status: 'upcoming' },
  { id: 't11', topicNumber: 11, title: 'Fault Injection, Chaos Engineering & Resiliency Testing', duration: '5 mins', status: 'upcoming' },
  { id: 't12', topicNumber: 12, title: 'Final Capstone System Review & Production Deployment', duration: '5 mins', status: 'upcoming' },
];

export const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [topics, setTopics] = useState<TopicItem[]>(MOCK_SIDEBAR_TOPICS);
  const [activeTopicId, setActiveTopicId] = useState<string>('t3');

  // Calculate Course Completion Percentage
  const completedCount = topics.filter((t) => t.status === 'completed').length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  return (
    <aside className={`h-full flex flex-col justify-between overflow-y-auto select-none transition-colors ${
      isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'
    }`}>
      
      {/* Upper Content Stack */}
      <div className="p-4 space-y-5">
        
        {/* 1. Academic Program & Course Banner */}
        <div className={`p-4 rounded-2xl border space-y-2.5 ${
          isDark ? 'bg-zinc-900/80 border-zinc-700' : 'bg-zinc-50 border-zinc-300 shadow-sm'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider 
            bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <SparklesIcon className="w-3 h-3" />
              Computer Science & AI
            </span>
          </div>

          <div>
            {/* <h2 className="text-xs font-serif text-zinc-500 uppercase tracking-widest font-semibold">Current Course</h2> */}
            <h1 className="text-xs font-serif tracking-tight leading-snug">
              Distributed Systems & Microservices
            </h1>
          </div>

          <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-500 
          font-mono border-t border-zinc-700">
            <span>Lecture Date
                {/* Level: 300 / Year 3 */}

            </span>
            <span>October 15, 2023
                {/* Sem 5 / 8 */}

            </span>
          </div>
        </div>

        {/* 2. Course Syllabus Completion Progress Bar */}
        <div className={`p-3.5 rounded-2xl border space-y-2 ${
          isDark ? 'bg-zinc-900/40 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-400 flex items-center gap-1.5">
              <BookOpenIcon className="w-4 h-4 text-emerald-400" />
              Lecture Progress
            </span>
            <span className="font-mono font-black text-emerald-400">{progressPercent}%</span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all
               duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
            <span>{completedCount} Completed</span>
            <span>{topics.length - completedCount} Remaining</span>
          </div>
        </div>

        {/* 3. 12 Scheduled Lecture Topics */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <AcademicCapIcon className="w-3.5 h-3.5 text-emerald-400" />Topics (12)
            </h3>
            <span className="text-[9px] font-mono text-zinc-500">Syllabus</span>
          </div>

          <div className="space-y-1.5">
            {topics.map((topic) => {
              const isActive = topic.id === activeTopicId;
              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 group ${
                    isActive
                      ? isDark
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-sm'
                      : isDark
                        ? 'bg-zinc-900/50 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300'
                        : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="mt-0.5 shrink-0">
                    {topic.status === 'completed' && <CheckCircleIcon className="w-4 h-4 text-emerald-500" />}
                    {topic.status === 'in_progress' && <PlayIcon className="w-4 h-4 text-emerald-400 animate-pulse fill-emerald-400/20" />}
                    {topic.status === 'upcoming' && <ClockIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />}
                  </div>

                  {/* Topic Meta */}
                  <div className="flex-1 space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-extrabold text-emerald-400">
                        #{topic.topicNumber.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500 shrink-0">{topic.duration}</span>
                    </div>
                    <p className="text-xs font-bold truncate leading-tight">{topic.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Lower Signature & Institutional Certification Footer */}
      <div className="p-4 pt-2 border-t border-zinc-800/40 space-y-3">
        <div className={`p-3 rounded-2xl border space-y-2 ${
          isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1">
              <ShieldCheckIcon className="w-3.5 h-3.5" />AI Voice Faculty
            </span>
            <DocumentCheckIcon className="w-3.5 h-3.5 text-zinc-500" />
          </div>

          <p className="text-[11px] font-semibold text-zinc-400 leading-snug">
            InfoBeatLive AI Lecture Room
          </p>

          <div className="pt-2 border-t border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-[10px] text-emerald-400">
                IBL
              </div>
              <div className="text-[10px]">
                <p className="font-bold">Faculty Of Programs </p>
                <p className="text-zinc-500 text-[9px]">Structured AI breakdown </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
                VERIFIED
              </span>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
};