'use client';
import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import DashboardContent from '@/app/components/dashboard/DashboardContent';
import { useTheme } from '@/app/context/ThemeContext';
import { SearchableSelect, SelectOption } from '@/app/components/dashboard/study-programs/SearchableSelect';
import { CalendarDaysIcon, AcademicCapIcon, ClockIcon, BookOpenIcon, DocumentCheckIcon,
ClipboardDocumentCheckIcon, SparklesIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export type ScheduleType = 'lecture' | 'test' | 'exam';

export interface TimetableItem {
  id: string;
  type: ScheduleType;
  title: string; 
  courseName: string;
  courseCode: string;

  targetDate: string; // ISO string format
  startTime: string; // e.g. "09:00 AM"
  duration: string; // e.g. "1 hr 30 mins"
  location: string; // e.g. "AI Virtual Classroom 1" or "Exam Portal A"
  isCompleted?: boolean;
}

export interface EnrolledProgram {
  id: string;
  title: string;
  institution: string;
  progress: number;
}

// Simulated Enrolled Programs Data
const MOCK_ENROLLED_PROGRAMS: EnrolledProgram[] = [
  {
    id: 'prog_1',
    title: 'B.Sc Computer Science',
    institution: 'Bayero University, Kano (BUK)',
    progress: 68
  },
  {
    id: 'prog_2',
    title: 'Google Cloud Certified Professional Architect',
    institution: 'Global Professional Certification Track',
    progress: 42
  },
  {
    id: 'prog_3',
    title: 'Advanced Full-Stack Engineering with Next.js',
    institution: 'InfoBeatLive Executive Academy',
    progress: 85
  }
];

// Sample 9 Timetable Events (3 Lectures, 3 Tests, 3 Exams)
const MOCK_TIMETABLE_ITEMS: TimetableItem[] = [

  // TESTS
  {
    id: 'tst_1',
    type: 'test',
    title: 'Database Indexing & Querying',
    courseName: 'Relational & NoSQL Database Systems',
    courseCode: 'DBS-301',
    targetDate: '2026-08-26T10:00:00',
    startTime: '10:00 AM',
    duration: '45 mins',
    location: 'Evaluation Portal Alpha'
  },
  {
    id: 'tst_2',
    type: 'test',
    title: 'Container Deployment on Cloud Run',
    courseName: 'Cloud Infrastructure & DevOps',
    courseCode: 'GCP-202',
    targetDate: '2026-08-31T15:00:00',
    startTime: '03:00 PM',
    duration: '1 hr 00 mins',
    location: 'Evaluation Portal Beta'
  },
  {
    id: 'tst_3',
    type: 'test',
    title: 'Vector Search & Embeddings',
    courseName: 'Information Retrieval Systems',
    courseCode: 'AI-409',
    targetDate: '2026-09-03T11:00:00',
    startTime: '11:00 AM',
    duration: '50 mins',
    location: 'Evaluation Portal Alpha'
  },

  // EXAMS
  {
    id: 'exm_1',
    type: 'exam',
    title: 'Advanced Data Structures & Algorithms',
    courseName: 'Algorithmic Complexity & Optimization',
    courseCode: 'CSC-305',
    targetDate: '2026-09-05T09:00:00',
    startTime: '09:00 AM',
    duration: '3 hrs 00 mins',
    location: 'Proctored Exam Portal'
  },
  {
    id: 'exm_2',
    type: 'exam',
    title: 'Cloud Architect Solutions',
    courseName: 'Google Cloud Architecture Mastery',
    courseCode: 'PCA-500',
    targetDate: '2026-09-12T13:00:00',
    startTime: '01:00 PM',
    duration: '2 hrs 30 mins',
    location: 'Proctored Exam Portal'
  },
  {
    id: 'exm_3',
    type: 'exam',
    title: 'Software Engineering Principles',
    courseName: 'Enterprise System Architecture',
    courseCode: 'SWE-410',
    targetDate: '2026-09-20T10:00:00',
    startTime: '10:00 AM',
    duration: '3 hrs 00 mins',
    location: 'Proctored Exam Portal'
  }
];

// Helper: Live Timer Countdown Hook
function useCountdown(targetIsoDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetIsoDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetIsoDate]);

  return timeLeft;
}

// Countdown Component Card Badge
const CountdownBadge: React.FC<{ targetDate: string; isDark: boolean }> = ({ targetDate, isDark }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const formattedDateString = useMemo(() => {
    const d = new Date(targetDate);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, [targetDate]);

  return (
    <div className="space-y-2">
      <div className={`text-[11px] font-semibold flex items-center gap-1.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
        <CalendarDaysIcon className="w-3.5 h-3.5 text-emerald-500" />
        <span>{formattedDateString}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 text-center">
        {[
          { label: 'DAYS', val: days },
          { label: 'HRS', val: hours },
          { label: 'MIN', val: minutes },
          { label: 'SEC', val: seconds }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-1.5 rounded-lg border flex flex-col items-center justify-center ${
              isDark
                ? 'bg-zinc-950/80 border-zinc-800/80'
                : 'bg-zinc-100 border-zinc-200'
            }`}
          >
            <span className="text-xs font-black text-emerald-400 font-mono">
              {String(item.val).padStart(2, '0')}
            </span>
            <span className="text-[8px] font-bold tracking-wider text-zinc-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TimetableSystemPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // API State Simulation
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [enrolledPrograms, setEnrolledPrograms] = useState<EnrolledProgram[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'lecture' | 'test' | 'exam'>('all');

  // Simulated API Fetch Call for Enrolled Programs
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoadingPrograms(true);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Simulating network latency
      setEnrolledPrograms(MOCK_ENROLLED_PROGRAMS);
      setSelectedProgramId(MOCK_ENROLLED_PROGRAMS[0].id);
      setLoadingPrograms(false);
    };

    fetchPrograms();
  }, []);

  // Options for Program Select
  const programOptions: SelectOption[] = useMemo(() => {
    return enrolledPrograms.map((prog) => ({
      value: prog.id,
      label: prog.title,
      sublabel: prog.institution,
      icon: '🎓'
    }));
  }, [enrolledPrograms]);

  const typeOptions: SelectOption[] = [
    { value: 'all', label: 'All Schedule Types', sublabel: 'Tests & Exams',icon: '🎓' },
    { value: 'test', label: 'Tests & Assessments', sublabel: 'Continuous Assessment',icon: '🎓' },
    { value: 'exam', label: 'Final Examinations', sublabel: 'Proctored Evaluations',icon: '🎓' }
  ];

  // Filtered Timetable Data
  const filteredSchedule = useMemo(() => {
    if (filterType === 'all') return MOCK_TIMETABLE_ITEMS;
    return MOCK_TIMETABLE_ITEMS.filter((item) => item.type === filterType);
  }, [filterType]);
 
  return (
    <DashboardLayout>
      <DashboardContent
        title=""
        description=""
      >
        <div className="max-w-7xl mx-auto -mt-6 space-y-2  sm:space-y-6">

          {/* HEADER BANNER */}
          <div
            className={`relative overflow-hidden rounded-2xl p-8 border ${
              isDark
                ? 'bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-emerald-950/30 border-zinc-700'
                : 'bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30 border-zinc-300'
            } shadow`}
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                <SparklesIcon className="w-4 h-4" />
                InfoBeatLive Academic Scheduler
              </div>

              <h1 className={`text-2xl sm:text-3xl  tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                Study Timetable & Live Countdown
              </h1>

              <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                Track upcoming live AI events, continuous tests, and certification examinations.<br/>
              </p>
            </div>
          </div>

          {/* DYNAMIC SELECTORS SECTION */}
          <div
            className={`p-6 rounded-2xl border ${
              isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300'
            } grid grid-cols-1 md:grid-cols-2 gap-6 backdrop-blur-md`}
          >
            {/* ENROLLED PROGRAM SELECTOR */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                  Select Enrolled Program
                </label>
                {loadingPrograms && (
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <ArrowPathIcon className="w-3 h-3 animate-spin text-emerald-500" /> Fetching...
                  </span>
                )}
              </div>
              <SearchableSelect
                options={programOptions}
                value={selectedProgramId}
                onChange={(val) => setSelectedProgramId(val)}
                placeholder="Select Program..."
                disabled={loadingPrograms}
                searchPlaceholder="Search enrolled programs..."
              />
            </div>

            {/* TIMETABLE TYPE SELECTOR */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-1 block">
                Filter Schedule Category
              </label>
              <SearchableSelect
                options={typeOptions}
                value={filterType}
                onChange={(val) => setFilterType(val as any)}
                placeholder="Filter schedule type..."
                searchPlaceholder="Search category..."
              />
            </div>
          </div>

          <div className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchedule.map((item) => {
                const isLecture = item.type === 'lecture';
                const isTest = item.type === 'test';
                const isExam = item.type === 'exam';

                const badgeColor = isLecture
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : isTest
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';

                const icon = isLecture ? (
                  <BookOpenIcon className="w-4 h-4 text-amber-400" />
                ) : isTest ? (
                  <DocumentCheckIcon className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-indigo-400" />
                );

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all 
                      duration-300 hover:shadow-2xl ${
                      isDark
                        ? 'bg-zinc-900/70 border-zinc-700 hover:border-zinc-700'
                        : 'bg-white border-zinc-300 shadow-lg hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      {/* TYPE BADGE & COURSE CODE */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px]
                           font-bold uppercase border ${badgeColor}`}>
                          {icon}
                          {item.type}
                        </span>
                        <span className="text-xs font-mono font-semibold text-zinc-500">
                          {item.courseCode}
                        </span>
                      </div>

                      {/* TITLE & COURSE NAME */}
                      <h3 className={`font-bold text-sm mb-1 leading-snug line-clamp-2 
                        ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-emerald-500 font-medium mb-4">
                        {item.courseName}
                      </p>

                      {/* DURATION & TIME METADATA */}
                      <div className={`p-3 rounded-xl border text-xs space-y-2 mb-4 ${
                        isDark ? 'bg-zinc-950/50 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                      }`}>
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className={`flex items-center gap-1.5  ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>
                            <ClockIcon className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`} />
                            Exact Time:
                          </span>
                          <strong className={isDark ? 'text-zinc-200' : 'text-zinc-800'}>{item.startTime}</strong>
                        </div>

                        <div className="flex items-center justify-between text-zinc-400">
                          <span className={`flex items-center gap-1.5  ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>
                            <AcademicCapIcon className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}/>
                            Duration:
                          </span>
                          <strong className={isDark ? 'text-zinc-200' : 'text-zinc-800'}>{item.duration}</strong>
                        </div>

                        <div className="flex items-center justify-between text-zinc-400">
                          <span className={`flex items-center gap-1.5  ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>
                            <SparklesIcon className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`} />
                            Venue:
                          </span>
                          <strong className="text-emerald-400 truncate max-w-[130px]">{item.location}</strong>
                        </div>
                      </div>
                    </div>

                    {/* COUNTDOWN TIMER BADGE */}
                    <div className={`pt-2 border-t ${isDark ? 'border-zinc-700' : 'border-zinc-300'}`}>
                      <CountdownBadge targetDate={item.targetDate} isDark={isDark} />

                      {/* JOIN / LAUNCH BUTTON */}
                      <button
                        type="button"
                        className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 
                        text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all 
                        shadow-md shadow-emerald-500/20"
                      >
                        <PlayIcon className="w-3.5 h-3.5 fill-current" />
                        <span>Enter Session Room</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}