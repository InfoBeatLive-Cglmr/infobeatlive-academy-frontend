import { FC } from 'react';
import { 
  ArrowRight, 
  BrainCircuit, 
  ShieldCheck, 
  Play, 
  GraduationCap, 
  BookOpenCheck, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  School,
  Sparkles,
  Layers,
  Award,
  Volume2,
  Lock,
  UserCheck,
  Compass,
  Building2,
  Briefcase
} from 'lucide-react';
import { NavigationTab } from './utils';
import { CredibilityPageView } from './Credibility';
import { FragmentedPageView } from './Fragmented';

interface ViewProps { onNavigate: (tab: NavigationTab) => void; onOpenAuth: () => void }

export const HomePageView: FC<ViewProps> = ({ onNavigate, onOpenAuth }) => {
  return (
    <div className="space-y-20 pb-12 text-zinc-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-8 lg:pt-8 lg:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">

            <div className="inline-flex items-center max-sm:hidden space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Structured Curriculum • AI Instruction • Verified Mastery
              </span>
            </div>

            <div className="inline-flex items-center sm:hidden space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Structured Curriculum • Verified Mastery
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-[1.12]">
              Architected for Serious Academic & Professional Mastery.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
              InfoBeatLive Academy delivers full academic and professional education through
              structured curricula, intelligent instruction, real assessments, and
              automated progression — replicating how elite institutions teach, test, and certify mastery.
           
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => onNavigate('catalog')}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black font-bold text-sm tracking-wider uppercase hover:brightness-110 shadow-xl shadow-amber-500/10 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span className='font-serif'>Explore Study Programs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenAuth}
                className="px-7 py-4  rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className='font-serif'>See Video Demo Now</span>
              </button>
            </div>

            <div className="pt-6 grid max-sm:hidden grid-cols-3 gap-6 border-t border-zinc-800/80">
              <div>
                <p className="text-2xl font-bold font-mono text-amber-400">100%</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Verified Syllabus</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-zinc-100">4,800+</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Academic Modules</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-zinc-100">99.4%</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Exam Rigor Score</p>
              </div>
            </div>

            
            <div className="pt-6 grid sm:hidden grid-cols-3 gap-6 border-t border-zinc-800/80">
              <div>
                <p className="text-xl font-bold font-mono text-amber-400">100%</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Verified</p>
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-zinc-100">4,800+</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Modules</p>
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-zinc-100">99.4%</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Exam Rigor</p>
              </div>
            </div>

          </div>



          {/* Interactive Academic Terminal Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-zinc-400">ACADEMIC PORTAL</span>
                </div>
                <span className="inline-flex items-center text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  • LIVE LECTURE SESSION
                </span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
                    FACULTY OF COMPUTER SCIENCE • 300 LEVEL
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">Module 07 / 16</span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-100">
                  Advanced Distributed Systems & Consensus Protocols
                </h4>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[72%]" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Progress: 72% Mastered</span>
                  <span>Exam Readiness: 94/100</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-400/[0.03] border border-amber-400/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BrainCircuit className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-300">
                      AI Faculty Instructor Evaluation
                    </span>
                  </div>
                  <span className="inline-flex items-center text-[9px] font-mono bg-amber-400/10 text-amber-300 px-1.5 py-0.5 rounded">
                    <Volume2 className="w-3 h-3 mr-1" /> VOICE SYNTH
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                  "Your solution for Byzantine Fault Tolerance in distributed ledgers meets strict consensus thresholds. You are cleared for the mid-semester examination."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            System Architecture
          </span>
          <h2 className="text-3xl font-serif font-bold text-white mt-5">What InfoBeatLive Academy Does</h2>
          <p className="text-zinc-400 text-sm sm:text-base ">
            Replacing unstructured video catalogs with a fully controlled, institution-grade education ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 -mt-4 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all group backdrop-blur-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <School className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Strict Institutional Hierarchy</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Organized directly into real academic levels: Institution → Faculty → Department → Program → Level/Year → Semester → Courses → Modules.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all group backdrop-blur-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Intelligent Faculty Instructors</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              AI acts as instructor, proctor, examiner, and reviewer. It evaluates assignments, conducts timed examinations, and decides when you advance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all group backdrop-blur-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Timed Classroom Lectures</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Lectures mirror real classrooms with enforced study periods (20m to 120m) featuring theory, real-time examples, guided practice, and live Q&amp;A.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all group backdrop-blur-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Voice + Interactive Text Modes</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Experience dynamic audio lectures spoken by voice faculty paired with visual diagrams, interactive code environments, and comprehensive study notes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all group backdrop-blur-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Automated Performance Progression</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              You cannot skip ahead. Promotion across lessons, modules, and semesters occurs automatically only upon proving 100% concept mastery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all group backdrop-blur-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100">Verified Academic Transcripts</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Earn institutional transcripts, semester GPA reports, and degree certificates recognized by academic standard boards and partner institutions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHO INFOBEATLIVE ACADEMY IS FOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Audience & Alignment
            </span>
            <h2 className="text-3xl font-serif font-bold text-white mt-5">Who InfoBeatLive Academy Is Built For</h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Designed exclusively for serious scholars, university students, and professionals seeking rigorous education—not casual entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-zinc-950/90 border border-zinc-800 p-6 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">University & Degree Scholars</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Undergraduate and postgraduate students requiring structured parallel coursework aligned directly with national university standards.
                </p>
              </div>
              <ul className="space-y-2 border-t border-zinc-800/80 pt-4 text-xs text-zinc-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Country-Specific Curricula</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Proctored Semester Examinations</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-zinc-950/90 border border-amber-500/40 p-6 flex flex-col justify-between space-y-6 relative shadow-xl shadow-amber-500/5">
              <div className="absolute -top-3 right-6 bg-amber-400 text-black font-mono text-[10px] uppercase font-bold px-3 py-0.5 rounded-full">
                Primary Standard
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Senior Technical Professionals</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Engineers, architects, and scientists mastering complex specializations (Software Systems, Cybersecurity, AI Architecture) through formal rigor.
                </p>
              </div>
              <ul className="space-y-2 border-t border-zinc-800/80 pt-4 text-xs text-zinc-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Deep Theory + Practical Defense</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Verifiable Industry Diplomas</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-zinc-950/90 border border-zinc-800 p-6 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Advanced Academic K–12</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Primary and secondary students preparing for elite academic placement through structured STEM, language, and mathematical tracks.
                </p>
              </div>
              <ul className="space-y-2 border-t border-zinc-800/80 pt-4 text-xs text-zinc-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Enforced Daily Study Timetables</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Parent & School Transcripts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STEP-BY-STEP PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Enrolment to Graduation
          </span>
          <h2 className="text-3xl font-serif font-bold text-white mt-5">The Academic Journey</h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            From initial matriculation to degree certification through four structured milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 -mt-4 -mb-10 lg:grid-cols-4 gap-6 relative">
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 relative flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-amber-400">01</span>
                <UserCheck className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">1. Account & Placement</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Register your account, select your country curriculum, and pick your target academic level (K–12, University, or Professional).
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-mono text-amber-400">
              <span>Step 1: Matriculation</span>
              <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 relative flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-amber-400">02</span>
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">2. Automated Timetable</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The platform instantly synthesizes your daily lectures, study notes, laboratory assignments, and multi-subject schedule.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-mono text-amber-400">
              <span>Step 2: Program Generation</span>
              <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 relative flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-amber-400">03</span>
                <BookOpenCheck className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">3. Timed Lectures & Exams</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Attend structured 20–120 minute voice or text lectures, complete continuous assessments, and sit for proctored examinations.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-mono text-amber-400">
              <span>Step 3: Academic Study</span>
              <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-900/60 border border-amber-500/40 p-6 relative flex flex-col 
          justify-between space-y-4 bg-amber-400/[0.02]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-amber-400">04</span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">4. Graduation & Certificate</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Upon passing all required modules and semester grade thresholds, receive your verified
                 transcript and institutional degree certificate.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-mono text-amber-400">
              <span>Step 4: Mastery Certification</span>
              <CheckCircle2 className="w-3 h-3 ml-1 text-amber-400" />
            </div>
          </div>
        </div>
      </section>

      <FragmentedPageView />
      <div className="-mt-6 -mb-16"> 
        <CredibilityPageView /> 
      </div>
    </div>
  );
};
