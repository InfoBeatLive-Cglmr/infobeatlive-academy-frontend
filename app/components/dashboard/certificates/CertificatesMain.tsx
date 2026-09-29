'use client';

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import DashboardContent from '@/app/components/dashboard/DashboardContent';
import { useTheme } from '@/app/context/ThemeContext';
import { SearchableSelect, SelectOption } from '@/app/components/dashboard/study-programs/SearchableSelect';
import {
  AcademicCapIcon,
  SparklesIcon,
  BuildingLibraryIcon,
  PrinterIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {
  fetchCertificateList,
  fetchCertificateById,
  CertificateDocType,
  StudentProfile,
  CourseResult
} from './certificateService';

function getGradeBadgeStyle(grade: CourseResult['grade']) {
  switch (grade) {
    case 'A':
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
    case 'B':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    case 'C':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
    case 'D':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
    case 'F':
      return 'bg-rose-500/10 text-rose-500 border-rose-500/30';
  }
}

export default function CertificatesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const certificateRef = useRef<HTMLDivElement>(null);

  // Selector Options State
  const [certOptions, setCertOptions] = useState<SelectOption[]>([]);
  
  // Selection & Fetch State
  const [selectedCertId, setSelectedCertId] = useState<string>('cert_msc_cs');
  const [docType, setDocType] = useState<CertificateDocType>('result_sheet');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [courseResults, setCourseResults] = useState<CourseResult[]>([]);

  // Document Type Options (Testimonial vs Result Sheet)
  const docTypeOptions: SelectOption[] = [
    { value: 'testimonial', label: 'Official Institutional Testimonial', sublabel: 'Formal Seal & Executive Signature', icon: '🎓' },
    { value: 'result_sheet', label: 'Academic Result Sheet / Transcript', sublabel: 'Course Breakdown & Cumulative Metrics', icon: '🎓' }
  ];

  // Fetch available certificates for the first selector
  useEffect(() => {
    const loadCertificateOptions = async () => {
      try {
        const list = await fetchCertificateList();
        const options: SelectOption[] = list.map((cert) => ({
          value: cert.id,
          label: cert.name,
          sublabel: 'Certificate Testimonial & Academic Transcript',
          icon: '🎓'
        }));
        setCertOptions(options);
      } catch (error) {
        console.error('Failed to load certificate options', error);
      }
    };

    loadCertificateOptions();
  }, []);

  // Fetch target certificate data when selectedCertId changes
  useEffect(() => {
    const getCertificateData = async () => {
      if (!selectedCertId) return;
      setIsLoading(true);
      try {
        const data = await fetchCertificateById(selectedCertId);
        setStudentProfile(data.profile);
        setCourseResults(data.results);
      } catch (error) {
        console.error('Error fetching certificate data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCertificateData();
  }, [selectedCertId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <DashboardContent title="" description="">
        <div className="max-w-7xl mx-auto -mt-6 space-y-6">

          {/* PAGE BANNER */}
          <div
            className={`relative overflow-hidden rounded-2xl p-8 border ${
              isDark
                ? 'bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-emerald-950/30 border-zinc-700'
                : 'bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30 border-zinc-300'
            } shadow`}
          >
            <div className="relative z-10 flex flex-col lg:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                  <SparklesIcon className="w-4 h-4" /> InfoBeatLive Accredited Credentials
                </div>
                <h1 className={`text-xl sm:text-3xl tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                  Certificates & Academic Transcripts
                </h1>
                <p className={`text-sm max-w-2xl ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  Verify, view, and export your accredited academic testimonials and official grade sheets.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="shrink-0 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all"
              >
                <PrinterIcon className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* SELECTOR CONTROLS */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300 shadow-md'} grid grid-cols-1 md:grid-cols-2 gap-6 items-center`}>

            {/* 1. SELECT CERTIFICATE NAME (FETCHED LIST) */}
            <div className="md:col-span-1">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                  Select Certificate Name
                </label>
              </div>
              <SearchableSelect
                options={certOptions}
                value={selectedCertId}
                onChange={(val) => setSelectedCertId(val)}
                placeholder="Select certificates..."
              />
            </div>

            {/* 2. SELECT CERTIFICATE TYPE (TESTIMONIAL OR RESULT SHEET) */}
            <div className="md:col-span-1">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                  Select Certificate Type
                </label>
              </div>
              <SearchableSelect
                options={docTypeOptions}
                value={docType}
                onChange={(val) => setDocType(val as CertificateDocType)}
                placeholder="Select document type..."
              />
            </div>

          </div>

          {/* LOADING STATE */}
          {isLoading && (
            <div className="p-16 text-center space-y-3">
              <ArrowPathIcon className="w-8 h-8 animate-spin text-emerald-500 mx-auto" />
              <p className="text-sm font-semibold text-zinc-400">Fetching accredited academic record from API...</p>
            </div>
          )}

          {/* DOCUMENT CONTENT */}
          {!isLoading && studentProfile && (
            <div ref={certificateRef} className="space-y-6">

              {/* VIEW 1: OFFICIAL TESTIMONIAL CERTIFICATE */}
              {docType === 'testimonial' && (
                <div
                  className={`relative p-8 md:p-14 rounded-3xl border-8 border-double transition-all shadow overflow-hidden ${
                    isDark
                      ? 'bg-zinc-950 border-zinc-700 text-zinc-100'
                      : 'bg-white border-zinc-300 text-zinc-900'
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <BuildingLibraryIcon className="w-[500px] h-[500px] text-emerald-500" />
                  </div>

                  <div className="text-center space-y-4 mb-10 relative z-10 border-b pb-8 border-zinc-800/40">
                    <div className="inline-flex items-center gap-2 text-emerald-500">
                      <AcademicCapIcon className="w-10 h-10 mx-auto" />
                    </div>
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-widest font-serif">
                      {studentProfile.institution}
                    </h2>
                    <p className="text-xs uppercase tracking-widest text-emerald-500 font-semibold">
                      {studentProfile.faculty}
                    </p>
                    <div className="inline-block px-6 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mt-2">
                      Academic Testimonial & Honor Roll
                    </div>
                  </div>

                  <div className="max-w-3xl mx-auto space-y-6 text-center leading-relaxed relative z-10 my-8">
                    <p className="text-sm text-zinc-400 uppercase tracking-widest">This is to officially attest that</p>
                    <h3 className="text-3xl md:text-5xl font-black text-emerald-400 font-serif tracking-tight">
                      {studentProfile.studentName}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      Matriculation Number: {studentProfile.matricNumber}
                    </p>

                    <p className={`text-base md:text-lg font-serif italic py-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      "{studentProfile.testimonialBody}"
                    </p>

                    <div className="pt-4">
                      <p className="text-xs font-semibold text-zinc-400">Program Completed:</p>
                      <p className="text-base font-bold text-emerald-400">{studentProfile.programTitle}</p>
                      <p className="text-xs text-zinc-500 mt-1">Conferred on {studentProfile.graduationDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-zinc-800/40 text-center items-end relative z-10">
                    <div className="space-y-2">
                      <div className="font-serif italic text-xl text-emerald-400 font-bold border-b border-zinc-700 pb-1 w-3/4 mx-auto">
                        Prof. A. S. Bayero
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider">Dean of Faculty</p>
                      <p className="text-[10px] text-zinc-500">Faculty of Computing & AI</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-4 border-dashed border-emerald-500/40 flex flex-col items-center justify-center p-2 bg-emerald-500/5">
                        <SparklesIcon className="w-6 h-6 text-emerald-500 mb-1" />
                        <span className="text-[8px] font-black uppercase text-emerald-400 tracking-tighter text-center">
                          OFFICIAL ACADEMIC SEAL
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-serif italic text-xl text-emerald-400 font-bold border-b border-zinc-700 pb-1 w-3/4 mx-auto">
                        InfoBeatLive Executive
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider">Registrar & Director</p>
                      <p className="text-[10px] text-zinc-500">InfoBeatLive Global Credentials</p>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: OFFICIAL RESULT SHEET / TRANSCRIPT */}
              {docType === 'result_sheet' && (
                <div className="space-y-6">

                  <div className={`rounded-2xl border p-6 overflow-hidden shadow ${isDark ? 'bg-zinc-900/70 border-zinc-700' : 'bg-white border-zinc-300'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-700">
                      <div>
                        <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                          Academic Course Breakdown
                        </h2>
                        <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-600'} mt-0.5`}>
                          Student: <strong>{studentProfile.studentName}</strong> ({studentProfile.matricNumber})
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${isDark ? 'text-zinc-300' : 'text-zinc-900'}`}>
                          InfoBeatLive Accredited Credentials
                        </span>
                        <p className="text-xs font-bold text-emerald-400 max-w-xs">{studentProfile.programTitle}</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[650px]">
                        <thead>
                          <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${isDark ? 'border-zinc-700 text-zinc-400 bg-zinc-950/50' : 'border-zinc-300 text-zinc-500 bg-zinc-50'}`}>
                            <th className="py-3 px-4">Course Title</th>
                            <th className="py-3 px-4 text-center">Test (30)</th>
                            <th className="py-3 px-4 text-center">Exam (70)</th>
                            <th className="py-3 px-4 text-center">Total (100)</th>
                            <th className="py-3 px-4 text-center">Grade</th>
                            <th className="py-3 px-4 text-right">Remark</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-700 text-xs font-medium">
                          {courseResults.map((res) => {
                            const badgeStyle = getGradeBadgeStyle(res.grade);
                            return (
                              <tr key={res.id} className={`transition-colors ${isDark ? 'hover:bg-zinc-700' : 'hover:bg-zinc-50'}`}>
                                <td className={`py-3.5 px-4 font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                  {res.courseTitle}
                                </td>
                                <td className={`py-3.5 px-4 text-center font-mono ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                  {res.testScore}
                                </td>
                                <td className={`py-3.5 px-4 text-center font-mono ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                  {res.examScore}
                                </td>
                                <td className={`py-3.5 px-4 text-center font-mono font-black text-sm ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                  {res.totalScore}
                                </td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className={`inline-block px-2.5 py-0.5 rounded-md font-bold border text-xs ${badgeStyle}`}>
                                    {res.grade}
                                  </span>
                                </td>
                                <td className={`py-3.5 px-4 text-right font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                  {res.remark}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300 shadow-md'}`}>
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
                        Academic Classification
                      </p>
                      <h3 className={`text-2xl font-black ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                        {studentProfile.degreeClass}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mt-2`}>
                        Official honor classification awarded upon program completion.
                      </p>
                    </div>

                    <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300 shadow-md'}`}>
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">
                        Cumulative GPA
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-black ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                          {studentProfile.cumulativeGpa.toFixed(2)}
                        </span>
                        <span className="text-xs text-zinc-500 font-bold">/ {studentProfile.maxGpa.toFixed(2)}</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mt-2`}>
                        Weighted average score calculated across all enrolled course units.
                      </p>
                    </div>

                    <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300 shadow-md'}`}>
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 mb-1">
                        Overall Percentage
                      </p>
                      <h3 className={`text-3xl font-black ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                        {studentProfile.overallPercentage}%
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mt-2`}>
                        Aggregate percentage total derived from continuous tests and final exams.
                      </p>
                    </div>

                    <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300 shadow-md'}`}>
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 mb-1">
                        Executive Standing
                      </p>
                      <h3 className="text-2xl font-black text-amber-400">
                        {studentProfile.overallRemark}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-700'} mt-2`}>
                        Institutional recommendation standing for fellowship and research tracks.
                      </p>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}

