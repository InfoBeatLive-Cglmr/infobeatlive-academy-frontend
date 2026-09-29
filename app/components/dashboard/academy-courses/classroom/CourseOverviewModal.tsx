'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import {
  XMarkIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowRightCircleIcon,
  BeakerIcon,
  DocumentCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// ==========================================
// API RESPONSE INTERFACES & MOCK DATA
// ==========================================

export interface CourseCombinationItem {
  id: string;
  code: string;
  name: string;
  type: 'mandatory' | 'selective';
  isDefaultSelected?: boolean;
}

export interface LectureTopic {
  id: string;
  lectureNumber: number;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'in_progress' | 'upcoming';
}

export interface ExamTestRecord {
  id: string;
  title: string;
  type: 'exam' | 'test';
  sessionSemester: string;
  date: string;
  token: string;
  score?: string;
  status: 'passed' | 'failed' | 'pending';
}

export interface AcademicOverviewApiResponse {
  programName: string;
  selectedCourseName: string;
  enrolledDate: string;
  expectedGraduationDate: string;
  totalYears: number;
  currentYear: number;
  totalSemesters: number;
  currentSemester: number;
  lectureCount: number;
  totalExamsCount: number;
  totalTestsCount: number;
  upcomingExamCountdownSeconds: number;
  upcomingTestCountdownSeconds: number;
  mandatoryCourses: CourseCombinationItem[];
  selectiveCourses: CourseCombinationItem[];
  lecturesList: LectureTopic[];
  pastRecords: ExamTestRecord[];
}

// Simulated Backend API Payload
const MOCK_ACADEMIC_API_RESPONSE: AcademicOverviewApiResponse = {
  programName: 'Computer Science',
  selectedCourseName: 'Advanced Distributed Systems',
  enrolledDate: 'October 15, 2023',
  expectedGraduationDate: 'August 28, 2027',
  totalYears: 4,
  currentYear: 3,
  totalSemesters: 8,
  currentSemester: 5,
  lectureCount: 48,
  totalExamsCount: 8,
  totalTestsCount: 16,
  upcomingExamCountdownSeconds: 86400, // 24 hours (Clickable when reaches 0)
  upcomingTestCountdownSeconds: 0,     // 0 seconds (Currently Active & Clickable)
  mandatoryCourses: [
    { id: 'm1', code: 'PHY-301', name: 'Quantum Physics & Semiconductor Physics', type: 'mandatory', isDefaultSelected: true },
    { id: 'm2', code: 'CHM-201', name: 'Physical Chemistry & Molecular Modeling', type: 'mandatory', isDefaultSelected: true },
    { id: 'm3', code: 'MTH-302', name: 'Discrete Mathematics & Dynamic Systems', type: 'mandatory', isDefaultSelected: true },
    { id: 'm4', code: 'CSC-311', name: 'Data Structures, Memory & Algorithm Complexity', type: 'mandatory', isDefaultSelected: true }
  ],
  selectiveCourses: [
    { id: 's1', code: 'CSC-320', name: 'Neural Network Architectures & Deep Learning', type: 'selective', isDefaultSelected: false },
    { id: 's2', code: 'CSC-322', name: 'Distributed Consensus & Blockchain Systems', type: 'selective', isDefaultSelected: false },
    { id: 's3', code: 'MTH-310', name: 'Stochastic Calculus & Matrix Decompositions', type: 'selective', isDefaultSelected: false },
    { id: 's4', code: 'ENG-305', name: 'Technical Systems Writing & Engineering Ethics', type: 'selective', isDefaultSelected: false },
    //{ id: 's5', code: 'STA-301', name: 'Bayesian Probability & Telemetry Analysis', type: 'selective', isDefaultSelected: false }
  ],
  lecturesList: [
    { id: 't1', lectureNumber: 1, title: 'Introduction to Microservices & Geo-Distributed Nodes', description: 'Overview of decoupled monoliths, high availability paradigms, and service meshes.', duration: '60 mins', status: 'completed' },
    { id: 't2', lectureNumber: 2, title: 'REST, gRPC & High-Throughput Protobuf Protocols', description: 'Comparative benchmark analysis between JSON over HTTP/2 and binary RPC serialization.', duration: '60 mins', status: 'completed' },
    { id: 't3', lectureNumber: 3, title: 'Vector Indexing Engine Architecture (HNSW & IVF-PQ)', description: 'Indexing high-dimensional embeddings for real-time similarity search engines.', duration: '60 mins', status: 'in_progress' },
    { id: 't4', lectureNumber: 4, title: 'Distributed State Replication via Raft Consensus', description: 'Leader election, log replication, and atomic state recovery in partition scenarios.', duration: '60 mins', status: 'upcoming' },
    { id: 't5', lectureNumber: 5, title: 'PostgreSQL Sharding & Distributed Database Engines', description: 'Horizontal sharding keys, connection pooling, and multi-region database sync.', duration: '60 mins', status: 'upcoming' },
    { id: 't6', lectureNumber: 6, title: 'Asynchronous Event Bus Integration with Kafka & NATS', description: 'Event-driven streaming, dead-letter queues, and exactly-once processing guarantees.', duration: '60 mins', status: 'upcoming' },
    { id: 't7', lectureNumber: 7, title: 'Containerization & Cloud Native Orchestration with Docker', description: 'Multi-stage Docker builds, image hardening, and cloud runtime container setups.', duration: '60 mins', status: 'upcoming' },
    { id: 't8', lectureNumber: 8, title: 'Zero-Trust API Security, OAuth2 & JWT Verification', description: 'Cryptographic token validation, public/private key rotation, and API gateway routing.', duration: '60 mins', status: 'upcoming' },
    { id: 't9', lectureNumber: 9, title: 'Autonomous AI Multi-Agent Handshakes & Task Dispatch', description: 'Orchestrating AI agents with structured schema exchanges and fallback mechanisms.', duration: '60 mins', status: 'upcoming' },
    { id: 't10', lectureNumber: 10, title: 'Telemetry, Observability & Distributed Tracing', description: 'Tracing requests across microservice pipelines using OpenTelemetry and Prometheus.', duration: '60 mins', status: 'upcoming' },
    { id: 't11', lectureNumber: 11, title: 'Fault Injection, Chaos Engineering & Resiliency Testing', description: 'Simulating latency spikes, network drops, and graceful system degradation.', duration: '60 mins', status: 'upcoming' },
    { id: 't12', lectureNumber: 12, title: 'Final Capstone System Review & Production Deployment', description: 'End-to-end cloud deployment, load testing, and production handover certification.', duration: '60 mins', status: 'upcoming' }
  ],
  pastRecords: [
    { id: 'r1', title: 'Mid-Term Assessment Test 01', type: 'test', sessionSemester: 'Semester 5 (Session 2025/2026)', date: 'Nov 12, 2025', token: 'TKN-9942-88', score: '94/100', status: 'passed' },
    { id: 'r2', title: 'Mid-Term Assessment Test 02', type: 'test', sessionSemester: 'Semester 5 (Session 2025/2026)', date: 'Dec 18, 2025', token: 'TKN-4110-32', score: '88/100', status: 'passed' },
    { id: 'r3', title: 'Semester 4 Final Examinations', type: 'exam', sessionSemester: 'Semester 4 (Session 2024/2025)', date: 'June 04, 2025', token: 'EXM-8821-01', score: 'A (4.85 GPA)', status: 'passed' }
  ]
};

interface CourseOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CourseOverviewModal: React.FC<CourseOverviewModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'program' | 'lecture' | 'academic'>('program');
  const [apiData, setApiData] = useState<AcademicOverviewApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Selected Selective Courses State
  const [selectedSelectives, setSelectedSelectives] = useState<string[]>([]);
  
  // Accordion Toggles for Past Records
  const [isPastRecordsOpen, setIsPastRecordsOpen] = useState<boolean>(false);

  // Countdown Timers State
  const [examTimer, setExamTimer] = useState<number>(0);
  const [testTimer, setTestTimer] = useState<number>(0);

  // Simulate API Data Fetching
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setApiData(MOCK_ACADEMIC_API_RESPONSE);
        setSelectedSelectives(
          MOCK_ACADEMIC_API_RESPONSE.selectiveCourses
            .filter((c) => c.isDefaultSelected)
            .map((c) => c.id)
        );
        setExamTimer(MOCK_ACADEMIC_API_RESPONSE.upcomingExamCountdownSeconds);
        setTestTimer(MOCK_ACADEMIC_API_RESPONSE.upcomingTestCountdownSeconds);
        setIsLoading(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Countdown Interval Simulation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setExamTimer((prev) => (prev > 0 ? prev - 1 : 0));
      setTestTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSelectiveCourse = (id: string) => {
    if (selectedSelectives.includes(id)) {
      setSelectedSelectives(selectedSelectives.filter((item) => item !== id));
    } else {
      if (selectedSelectives.length < 5) {
        setSelectedSelectives([...selectedSelectives, id]);
      }
    }
  };

  const formatCountdown = (seconds: number) => {
    if (seconds <= 0) return 'READY / OPEN NOW';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-lg">
      <div className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col 
      max-h-[92vh] sm:max-h-[88vh] transition-all ${
        isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
      }`}>
        
        {/* ==========================================
            1. MODAL TOP HEADER: PROGRAM & COURSE DISPLAY
           ========================================== */}
        <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 ${
          isDark ? 'border-zinc-700 bg-zinc-900/60' : 'border-zinc-300 bg-zinc-50'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider 
              bg-emerald-00 text-emerald-400 border border-emerald-500 flex items-center gap-1">
                <SparklesIcon className="w-3 h-3" />
                {apiData?.programName || 'Loading Program...'}
              </span>
              <span className="text-xs text-zinc-500 font-mono">Academic Standard Framework</span>
            </div>
            <h2 className="text-base sm:text-xl font-black tracking-tight leading-snug">
              {apiData?.selectedCourseName || 'Fetching Course Configuration...'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              isDark ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white' 
              : 'border-zinc-300 hover:bg-zinc-200 text-zinc-600'
            }`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* ==========================================
            2. THREE INTERACTIVE TAB SWITCHERS
           ========================================== */}
        <div className={`flex border-b  px-4 sm:px-6 pt-3 gap-2 sm:gap-6 overflow-x-auto ${
          isDark ? 'border-zinc-700 bg-zinc-950' : 'border-zinc-300 bg-white'
        }`}>
          <button
            onClick={() => setActiveTab('program')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'program'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <AcademicCapIcon className="w-4 h-4" />
            <span>Program & Courses</span>
          </button>

          <button
            onClick={() => setActiveTab('lecture')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex 
              items-center gap-2 whitespace-nowrap ${
              activeTab === 'lecture'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <BookOpenIcon className="w-4 h-4" />
            <span>Lecture Syllabus</span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex 
              items-center gap-2 whitespace-nowrap ${
              activeTab === 'academic'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <CalendarDaysIcon className="w-4 h-4" />
            <span>Exams, Tests & Status</span>
          </button>
        </div>

        {/* ==========================================
            3. TAB CONTENT CONTAINERS
           ========================================== */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <ArrowPathIcon className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs text-zinc-500 font-mono">Syncing official academic record with server API...</p>
            </div>
          ) : (
            <>
              {/* ------------------------------------------
                  TAB 1: PROGRAM OVERVIEW & COMBINATIONS
                 ------------------------------------------ */}
              {activeTab === 'program' && (
                <div className="space-y-6">
                  
                  {/* Enrollment & Graduation Meta Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                      isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                    }`}>
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <CalendarDaysIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Official Enrollment Date</p>
                        <p className="text-sm font-black text-blue-400">{apiData?.enrolledDate}</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                      isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                    }`}>
                      <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <AcademicCapIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Expected Graduation</p>
                        <p className="text-sm font-black text-purple-400">{apiData?.expectedGraduationDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Combinations Section */}
                  <div className="space-y-5">
                    
                    {/* Mandatory Courses (4 Required) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <ShieldCheckIcon className="w-4 h-4" /> 4 Mandatory Core Courses (Required)
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-500">Default Selected • Fixed</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {apiData?.mandatoryCourses.map((course) => (
                          <div
                            key={course.id}
                            className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                              isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-300 shadow-sm'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono text-emerald-400 font-bold">{course.code}</span>
                              <p className="text-xs font-bold">{course.name}</p>
                            </div>
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selective Courses (Up to 5 Selectable) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <BeakerIcon className="w-4 h-4" /> Selective Elective Courses (Choose Up to 5)
                        </h3>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">
                          Selected: {selectedSelectives.length} / 5
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {apiData?.selectiveCourses.map((course) => {
                          const isSelected = selectedSelectives.includes(course.id);
                          return (
                            <div
                              key={course.id}
                              onClick={() => toggleSelectiveCourse(course.id)}
                              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex
                                 items-center justify-between ${
                                isSelected
                                  ? isDark
                                    ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                                    : 'bg-amber-50 border-amber-300 text-amber-900'
                                  : isDark
                                    ? 'bg-zinc-900/40 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                    : 'bg-white border-zinc-300 text-zinc-600'
                              }`}
                            >
                              <div className="space-y-0.5">
                                <span className={`text-[10px] font-mono font-bold 
                                  ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`}>
                                  {course.code}
                                </span>
                                <p className="text-xs font-bold leading-snug">{course.name}</p>
                              </div>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ------------------------------------------
                  TAB 2: LECTURE SYLLABUS (12 DETAILED TOPICS)
                 ------------------------------------------ */}
              {activeTab === 'lecture' && (
                <div className="space-y-4 ">
                  <div className="flex items-center justify-between border-b pb-3 border-zinc-700">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400">Classroom Lecture Syllabus</h3>
                      <p className="text-xs font-bold text-emerald-400">{apiData?.selectedCourseName}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-00
                    text-emerald-400 border border-emerald-500">
                      {apiData?.lecturesList.length} Lectures Programmed
                    </span>
                  </div>

                  <div className="space-y-3">
                    {apiData?.lecturesList.map((topic) => (
                      <div
                        key={topic.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                          topic.status === 'completed'
                            ? isDark ? 'bg-zinc-900/30 border-zinc-700 opacity-80' : 'bg-zinc-100 border-zinc-300'
                            : topic.status === 'in_progress'
                            ? isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-200 border-emerald-200'
                            : isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300 shadow-sm'
                        }`}
                      >
                        {/* Status Icon Indicator */}
                        <div className="mt-0.5">
                          {topic.status === 'completed' && <CheckCircleIcon className="w-5 h-5 text-emerald-500" />}
                          {topic.status === 'in_progress' && <ClockIcon className="w-5 h-5 text-emerald-400 animate-pulse" />}
                          {topic.status === 'upcoming' && <ClockIcon className="w-5 h-5 text-zinc-600" />}
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h4 className="text-xs sm:text-sm font-bold flex items-center gap-2">
                              <span className="text-emerald-400 font-mono text-xs">Lecture {topic.lectureNumber.toString().padStart(2, '0')}:</span>
                              {topic.title}
                            </h4>
                            <span className="text-[12px] font-mono text-emerald-500  px-2 py-0.5 rounded-md">
                              {topic.duration}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">{topic.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ------------------------------------------
                  TAB 3: ACADEMIC TIMELINE & EXAM PORTAL
                 ------------------------------------------ */}
              {activeTab === 'academic' && (
                <div className="space-y-6">
                  
                  {/* Session / Semester Progress Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-700' 
                      : 'bg-zinc-50 border-zinc-300'}`}>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">Academic Level</p>
                      <p className="text-base font-black text-emerald-400">Year {apiData?.currentYear} / {apiData?.totalYears}</p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-700' 
                      : 'bg-zinc-50 border-zinc-300'}`}>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">Semester</p>
                      <p className="text-base font-black text-blue-400">Sem {apiData?.currentSemester} / {apiData?.totalSemesters}</p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-700' 
                      : 'bg-zinc-50 border-zinc-300'}`}>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">Lectures Held</p>
                      <p className="text-base font-black text-purple-400">{apiData?.lectureCount} Total</p>
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-700' 
                      : 'bg-zinc-50 border-zinc-300'}`}>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">Exams / Tests</p>
                      <p className="text-base font-black text-amber-400">{apiData?.totalExamsCount} Ex • {apiData?.totalTestsCount} Tst</p>
                    </div>
                  </div>

                  {/* Exam & Test Counter Launchpads */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Test Portal Card */}
                    <div className={`p-5 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-zinc-900/80 border-zinc-700' : 'bg-white border-zinc-300 shadow-md'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">Semester Test Room</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{formatCountdown(testTimer)}</span>
                      </div>
                      <h4 className="text-sm font-bold">Continuous Assessment Test</h4>
                      <button
                        disabled={testTimer > 0}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center 
                          gap-2 transition-all ${
                          testTimer === 0
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg cursor-pointer'
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <ArrowRightCircleIcon className="w-4 h-4" />
                        <span>{testTimer === 0 ? 'Enter Test Assessment Room' : 'Locked Until Schedule'}</span>
                      </button>
                    </div>

                    {/* Final Exam Portal Card */}
                    <div className={`p-5 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-zinc-900/80 border-zinc-700' : 'bg-white border-zinc-300 shadow-md'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">Official Exam Hall</span>
                        <span className="text-xs font-mono font-bold text-amber-400">{formatCountdown(examTimer)}</span>
                      </div>
                      <h4 className="text-sm font-bold">Final Semester Examination</h4>
                      <button
                        disabled={examTimer > 0}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center 
                          gap-2 transition-all ${
                          examTimer === 0
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg cursor-pointer'
                            : 'bg-zinc-600 text-zinc-100 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <ArrowRightCircleIcon className="w-4 h-4" />
                        <span>{examTimer === 0 ? 'Enter Official Exam Portal' : 'Exam Portal Locked'}</span>
                      </button>
                    </div>

                  </div>

                  {/* Dropdown Section: Past Exams, Tests & Validation Tokens */}
                  <div className={`rounded-2xl border overflow-hidden transition-all ${
                    isDark ? 'bg-zinc-900/50 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                  }`}>
                    <button
                      onClick={() => setIsPastRecordsOpen(!isPastRecordsOpen)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <DocumentCheckIcon className="w-4 h-4 text-emerald-400" />
                        <span>View Completed Exams, Tests & Result Tokens ({apiData?.pastRecords.length})</span>
                      </div>
                      {isPastRecordsOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                    </button>

                    {isPastRecordsOpen && (
                      <div className={`p-4 border-t space-y-3 ${isDark ? 'border-zinc-700 bg-zinc-950/60' 
                      : 'border-zinc-300 bg-white'}`}>
                        {apiData?.pastRecords.map((record) => (
                          <div
                            key={record.id}
                            className={`p-3 rounded-xl border flex items-center justify-between ${
                              isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold">{record.title}</p>
                              <p className="text-[10px] text-zinc-500 font-mono">
                                {record.sessionSemester} • Token: <span className="text-emerald-400">{record.token}</span>
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-emerald-400">{record.score}</span>
                              <p className="text-[10px] text-zinc-500 uppercase">{record.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};


