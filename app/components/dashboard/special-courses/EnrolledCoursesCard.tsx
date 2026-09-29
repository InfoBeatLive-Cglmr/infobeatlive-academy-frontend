'use client';
import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { EnrolledProgramCardData } from './academy';
import {
  AcademicCapIcon,
  ClockIcon,
  PlayIcon,
  DocumentTextIcon,
  XMarkIcon,
  SparklesIcon,
  CheckCircleIcon,
  BuildingLibraryIcon,
  UserIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

interface EnrolledCourseCardProps {
  program: EnrolledProgramCardData;
}

export const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ program }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* PROGRAM CARD */}
      <div
        className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow ${
          isDark
            ? 'bg-zinc-900/70 border-zinc-700 hover:border-emerald-500/40'
            : 'bg-white border-zinc-300  hover:border-emerald-500/40'
        }`}
      >
        <div>
          {/* BADGES */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              {/* <span>{program.countryFlag}</span> */}
              <span>{program.countryName}</span>
            </span>

            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                program.studyPace === 'full_time'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
              }`}
            >
              {program.studyPace.replace('_', ' ')}
            </span>
          </div>

          <h3 className={`text-xs font-black tracking-tight mb-1 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
            {program.programTitle}
          </h3>

          <p className="text-xs font-semibold text-emerald-500 mb-3 flex items-center gap-1.5">
            <BuildingLibraryIcon className="w-4 h-4" />
            {program.institutionName}
          </p>

          <p className={`text-xs line-clamp-3 mb-6 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {program.programDescription}
          </p>

          {/* PROGRESS & METADATA */}
          <div
            className={`p-3.5 rounded-xl border text-xs space-y-2 mb-6 ${
              isDark ? 'bg-zinc-950/60 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Course Progress:</span>
              <span className="font-bold text-emerald-400">{program.completionPercentage}%</span>
            </div>

            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-1.5 rounded-full"
                style={{ width: `${program.completionPercentage}%` }}
              />
            </div>

            <div
              className={`flex items-center justify-between text-[11px] ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              } pt-1`}
            >
              <span>
                {program.currentSemester} / {program.totalSemestersOrSessions} Semisters
              </span>
              <span>
                Graduation: <strong>{program.estimatedGraduationDate}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* TWO BUTTONS */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/60">
          <button
            type="button"
            className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <PlayIcon className="w-3.5 h-3.5 fill-current" />
            <span>Lectures</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200'
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
            }`}
          >
            <DocumentTextIcon className="w-4 h-4 text-emerald-500" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* DETAILED BLUEPRINT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
          <div
            className={`relative w-full max-w-5xl my-8 rounded-3xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
              isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
            }`}
          >
            {/* MODAL HEADER */}
            <div className="p-6 md:p-8 border-b border-zinc-700 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <SparklesIcon className="w-4 h-4" /> AI Augmented Curriculum Blueprint
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">{program.programTitle}</h2>
                <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-2">
                  <span>{program.institutionName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {program.countryFlag} {program.countryName}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all shrink-0"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8">
              
              {/* KEY ACADEMIC STATS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-zinc-950/60 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                  }`}
                >
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Pace & Schedule</p>
                  <p className="text-xs font-bold mt-1 capitalize">{program.studyPace.replace('_', ' ')}</p>
                  <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-0.5`}>
                    {program.scheduleSummary}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-zinc-950/60 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                  }`}
                >
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Semesters / Progress</p>
                  <p className="text-xs font-bold mt-1">
                    Sem {program.currentSemester} of {program.totalSemestersOrSessions} ({program.completionPercentage}%)
                  </p>
                  <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-0.5`}>
                    Est. Grad: {program.estimatedGraduationDate}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-zinc-950/60 border-zinc-700' : 'bg-zinc-50 border-zinc-300'  }`} >
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Total Sessions</p>
                  <p className="text-xs font-bold mt-1">{program.totalSessions} Sessions</p>
                  <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-0.5`}>
                    {program.completedSessions} Completed
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-zinc-950/60 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                  }`}
                >
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Tier Framework</p>
                  <p className="text-xs font-bold mt-1 truncate">{program.levelTitle}</p>
                  <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-0.5`}>
                    {program.tierTitle}
                  </p>
                </div>
              </div>

              {/* STUDENT PROFILE & SCHEDULING DETAILS */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-zinc-950/40 border-zinc-800' : 'bg-zinc-50/80 border-zinc-200'
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
                  <UserIcon className="w-4 h-4" /> Enrolled Student Profile & Commitment Details
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">Date of Birth</span>
                    <span className="text-xs font-semibold">{program.dateOfBirth || 'N/A'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">Education Level</span>
                    <span className="text-xs font-semibold">{program.educationLevel || 'N/A'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">Origin</span>
                    <span className="text-xs font-semibold">{program.countryOfOrigin || 'N/A'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">Marital Status</span>
                    <span className="text-xs font-semibold capitalize">{program.maritalStatus || 'N/A'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">Employment</span>
                    <span className="text-xs font-semibold capitalize">
                      {program.employmentStatus?.replace(/_/g, ' ') || 'N/A'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">Daily Study Goal</span>
                    <span className="text-xs font-semibold">{program.hoursPerDay ? `${program.hoursPerDay} hrs/day` : 'N/A'}</span>
                  </div>
                </div>

                {/* DETAILED TIME COMMITMENT BREAKDOWN */}
                {(program.lecturesPerDay || program.lectureDurationMinutes || program.selectedDays) && (
                  <div
                    className={`pt-4 border-t ${
                      isDark ? 'border-zinc-800' : 'border-zinc-200'
                    } grid grid-cols-1 md:grid-cols-2 gap-4`}
                  >
                    <div className="flex items-center gap-3">
                      <ClockIcon className="w-10 h-10 text-indigo-400 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-zinc-500">Lecture Cadence</p>
                        <p className="text-xs font-semibold">
                          {program.lecturesPerDay || 0} Lectures/Day @ {program.lectureDurationMinutes || 0} Mins per lecture
                        </p>
                      </div>
                    </div>

                    {program.selectedDays && program.selectedDays.length > 0 && (
                      <div className="flex items-start gap-3">
                        <CalendarDaysIcon className="w-10 h-10 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-zinc-500">Active Study Days</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {program.selectedDays.map((day, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* PROGRAM OVERVIEW & CAREER BIO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      Program Overview
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {program.programDescription}
                    </p>
                  </div>

                  {program.careerBio && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                        <BriefcaseIcon className="w-4 h-4 text-emerald-400" /> Professional Background & Bio
                      </h4>
                      <p className={`text-xs leading-relaxed italic ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        "{program.careerBio}"
                      </p>
                    </div>
                  )}

                  {program.externalCoursesCompleted && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-1">
                        <BookOpenIcon className="w-4 h-4 text-blue-400" /> Prior Certifications & External Learning
                      </h4>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        {program.externalCoursesCompleted}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                      Target Career Pathways
                    </h4>
                    <ul className="space-y-1.5 text-xs">
                      {program.careerPathways.map((path, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>{path}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {program.prerequisitesMet && program.prerequisitesMet.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                        Prerequisites Satisfied
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {program.prerequisitesMet.map((prereq, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI CURRICULUM SEMESTER BREAKDOWN */}
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <AcademicCapIcon className="w-4 h-4" /> Semester Modules & Sequence
                </h4>

                <div className="space-y-3">
                  {program.aiCurriculumBreakdown.map((sem) => (
                    <div
                      key={sem.semesterNumber}
                      className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-zinc-950/80 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-black">
                            {sem.semesterNumber}
                          </span>
                          {sem.title}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {sem.totalLectures} Lectures
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {sem.coreModules.map((mod, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>{mod}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="p-6 border-t border-zinc-700 flex items-center justify-between">
              <span className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                InfoBeatLive Accredited Curriculum Engine
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
