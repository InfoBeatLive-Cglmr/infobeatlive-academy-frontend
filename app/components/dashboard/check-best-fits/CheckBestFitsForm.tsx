'use client';
import React, { useState, useMemo } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { SearchableSelect, SelectOption } from '@/app/components/dashboard/study-programs/SearchableSelect';
import { GLOBAL_ACADEMIC_DATASET, CountryAcademicConfig } from '@/app/utils/data/studyProgramsData';
import {
  SparklesIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  HeartIcon,
  LightBulbIcon,
  DocumentTextIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  InformationCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  CalendarIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';
import { PlusIcon } from 'lucide-react';

interface AssessmentFormState {
  countryCode: string;
  selectedLevel: string;
  dateOfBirth: string;
  languages: string;
  employmentStatus: 'employed' | 'unemployed' | 'self_employed' | 'student';
  maritalStatus: 'single' | 'married' | 'prefer_not_to_say';
  numberOfKids: number;
  targetIndustry: string;
  dreamCareer: string;
  previousEducationHistory: string;
  additionalNotes: string;
}

export default function CheckBestFitsForm() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<AssessmentFormState>({
    countryCode: 'US',
    selectedLevel: 'Bachelor’s Degree (B.Sc / B.A / B.Eng)',
    dateOfBirth: '',
    languages: 'English',
    employmentStatus: 'unemployed',
    maritalStatus: 'single',
    numberOfKids: 0,
    targetIndustry: '',
    dreamCareer: '',
    previousEducationHistory: '',
    additionalNotes: ''
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 1. Resolve Country Data & Dynamic Levels
  const selectedCountry: CountryAcademicConfig | undefined = useMemo(() => {
    return GLOBAL_ACADEMIC_DATASET.find((c) => c.countryCode === formData.countryCode);
  }, [formData.countryCode]);

  // Aggregate levels across all tiers in the selected country
  const dynamicLevelOptions: SelectOption[] = useMemo(() => {
    if (!selectedCountry) return [];
    const allLevels = selectedCountry.institutions.flatMap((tier) => tier.levels);
    const uniqueLevels = Array.from(new Set(allLevels));

    return uniqueLevels.map((lvl) => ({
      value: lvl,
      label: lvl,
      sublabel:"" // `${selectedCountry.countryName} Standard`
    }));
  }, [selectedCountry]);

  // Country Options Dropdown
  const countryOptions: SelectOption[] = useMemo(() => {
    return GLOBAL_ACADEMIC_DATASET.map((c) => ({
      value: c.countryCode,
      label: c.countryName,
      sublabel: '',//Localized Curriculum Mapping
      icon: c.flagEmoji
    }));
  }, []);

  const handleCountryChange = (code: string) => {
    const country = GLOBAL_ACADEMIC_DATASET.find((c) => c.countryCode === code);
    const defaultLevel = country?.institutions[0]?.levels[0] || '';

    setFormData((prev) => ({
      ...prev,
      countryCode: code,
      selectedLevel: defaultLevel
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    // Submit payload to backend / AI voice session route
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
        <div className="max-w-7xl mx-auto mt-6 space-y-2  sm:space-y-6">

          {/* MAIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div
              className={`rounded-2xl border p-6 sm:p-8 space-y-8 ${
                isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300 shadow'
              } backdrop-blur-md`}
            >

              {/* SECTION 1: REGION & CURRENT ACADEMIC LEVEL */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <GlobeAltIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className={`text-sm font-bold uppercase tracking-wide ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                      Section 1: Academic Baseline
                    </h2>
                    <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Adapt educational terminology to your country.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* COUNTRY OF RESIDENCE */}
                  <div>
                    <SearchableSelect
                      label="Country of Residence"
                      options={countryOptions}
                      value={formData.countryCode}
                      onChange={handleCountryChange}
                      placeholder="Select Country..."
                      searchPlaceholder="Search country..."
                    />
                  </div>

                  {/* DYNAMIC LEVEL OF EDUCATION */}
                  <div>
                    <SearchableSelect
                      label={`Education Level (${selectedCountry?.countryName || 'Selected Region'})`}
                      options={dynamicLevelOptions}
                      value={formData.selectedLevel}
                      onChange={(val) => setFormData((prev) => ({ ...prev, selectedLevel: val }))}
                      placeholder="Select Current Level..."
                      searchPlaceholder="Search level..."
                    />
                  </div>

                  {/* DATE OF BIRTH */}
                  <div className=''>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                        className={`w-full p-4 rounded-xl border text-sm focus:outline-none transition-all ${
                          isDark
                            ? 'bg-zinc-900/50 border-zinc-700 text-zinc-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                            : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-emerald-500'
                        }`}
                      />
                      <CalendarIcon className="w-4 h-4 text-zinc-400 absolute right-3.5 top-4 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <hr className={isDark ? 'border-zinc-700' : 'border-zinc-300'} />

              {/* SECTION 2: WORK & PERSONAL CIRCUMSTANCES */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <BriefcaseIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className={`text-sm font-bold uppercase tracking-wide ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                      Section 2: Personal Life Context
                    </h2>
                    <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Helps the AI factor in your available bandwidth.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* EMPLOYMENT STATUS */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
                      Employment Status
                    </label>
                    <select
                      value={formData.employmentStatus}
                      onChange={(e) => setFormData((prev) => ({ ...prev, employmentStatus: e.target.value as any }))}
                      className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none transition-all ${
                        isDark
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-emerald-500'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-emerald-500'
                      }`}
                    >
                      <option value="unemployed">Unemployed / Looking for Opportunities</option>
                      <option value="employed">Currently Employed (Full-Time / Part-Time)</option>
                      <option value="self_employed">Self-Employed / Business Owner</option>
                      <option value="student">Full-Time Student</option>
                    </select>
                  </div>

                  {/* MARITAL STATUS */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
                      Relationship / Marital Status
                    </label>
                    <select
                      value={formData.maritalStatus}
                      onChange={(e) => setFormData((prev) => ({ ...prev, maritalStatus: e.target.value as any }))}
                      className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none transition-all ${
                        isDark
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-emerald-500'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-emerald-500'
                      }`}
                    >
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="prefer_not_to_say">Prefer Not to Say</option>
                    </select>
                  </div>

                  {/* NUMBER OF KIDS (IF MARRIED / PARENT) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
                      Number of Children (If Any)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={formData.numberOfKids}
                      onChange={(e) => setFormData((prev) => ({ ...prev, numberOfKids: parseInt(e.target.value) || 0 }))}
                      className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none transition-all ${
                        isDark
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-emerald-500'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-emerald-500'
                      }`}
                    />
                  </div>

                </div>

                {/* TARGET INDUSTRY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
                    Industry or Work Field
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.targetIndustry}
                    onChange={(e) => setFormData((prev) => ({ ...prev, targetIndustry: e.target.value }))}
                    placeholder="e.g. software engineering, finance, healthcare..."
                    className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none transition-all ${
                      isDark
                        ? 'bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-500'
                    }`}
                  />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
                      Choose Lecture Language 
                    </label>
                    <select value={formData.languages}
                      onChange={(e) => setFormData((prev) => ({ ...prev, languages: e.target.value as any }))}
                      className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none transition-all ${
                        isDark  ? 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-emerald-500'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-emerald-500' }`} >

                      <option value="English">English </option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>

                      <option value="German">German</option>
                      <option value="Italian">Italian</option>
                      <option value="Portuguese">Portuguese</option>

                      <option value="Mandarin Chinese">Mandarin Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Russian">Russian</option>

                      <option value="Arabic">Arabic</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Turkish">Turkish</option>

                      <option value="Dutch">Dutch</option>
                      <option value="Polish">Polish</option>
                      <option value="Czech">Czech</option>

                      <option value="Swedish">Swedish</option>
                      <option value="Hungarian">Hungarian</option>
                      <option value="English Nigerian">English (African Accent)</option>

                      <option value="Hausa">Hausa</option>
                      <option value="Igbo">Igbo</option>
                      <option value="Yoruba">Yoruba</option>

                    </select>
                  </div>

                </div>

              </div>

              <hr className={isDark ? 'border-zinc-700' : 'border-zinc-300'} />

              {/* SECTION 3: DREAM CAREER & ASPIRATIONS (330 CHARS MAX) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <LightBulbIcon className="w-4 h-4 text-emerald-500" />
                    <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                      What is your dream career / role?
                    </label>
                  </div>
                  <span className={`text-[11px] ${formData.dreamCareer.length > 300 ? 'text-amber-500' : 'text-zinc-500'}`}>
                    {formData.dreamCareer.length}/330
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={330}
                  required
                  value={formData.dreamCareer}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dreamCareer: e.target.value }))}
                  placeholder="Describe what you truly want to achieve or build in your lifetime..."
                  className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none transition-all ${
                    isDark
                      ? 'bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-500'
                  }`}
                />
              </div>

              {/* SECTION 4: PAST EDUCATION & COURSES COMPLETED */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AcademicCapIcon className="w-4 h-4 text-emerald-500" />
                  <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                    Study, Degrees, orCourses Completed
                  </label>
                </div>
                <textarea
                  rows={3}
                  required
                  value={formData.previousEducationHistory}
                  onChange={(e) => setFormData((prev) => ({ ...prev, previousEducationHistory: e.target.value }))}
                  placeholder="Detail what you studied in school/college/university, plus any online certifications (Coursera, AWS, bootcamp certificates)..."
                  className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none transition-all ${
                    isDark
                      ? 'bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-500'
                  }`}
                />
              </div>

              {/* SECTION 5: ADDITIONAL NOTES (1000 CHARS MAX, OPTIONAL) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="w-4 h-4 text-emerald-500" />
                    <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                      Additional Context or Questions
                    </label>
                  </div>
                  <span className={`text-[11px] ${formData.additionalNotes.length > 900 ? 'text-amber-500' : 'text-zinc-500'}`}>
                    {formData.additionalNotes.length}/1000
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="Share any special challenges, financial constraints, relocation plans, or specific dilemmas you want the AI to address during the session..."
                  className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none transition-all ${
                    isDark
                      ? 'bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-500'
                  }`}
                />
              </div>

            </div>

            {/* WHAT TO EXPECT SECTION */}
            <div className='grid lg:grid-cols-2 grid-cols-1'>
          
              <div className={`w-auto sm:w-auto p-4 rounded-xl border flex items-center gap-3 ${
                isDark ? 'bg-zinc-900/40 border-zinc-700' : 'bg-zinc-100 border-zinc-300'  }`}>
               <div className="p-2.5 rounded-lg bg-zinc-800 text-emerald-400">
               <MicrophoneIcon className="w-5 h-5" /></div>
                <div>
                  <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    AI Faculty Voice Diagnosis</span>
                  <span className="text-[9px] uppercase font-bold text-zinc-400 px-1.5 py-0.5 rounded 
                  bg-zinc-800 border border-zinc-700">
                  Advance Engine
                  </span>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                30-minute AI audio breakdown of prerequisites and syllabus structure.</p>
                </div>
              </div>

            {/* CALL TO ACTION BUTTON */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={isAnalyzing || !formData.dateOfBirth || !formData.targetIndustry || !formData.dreamCareer}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-extrabold text-sm flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 transition-all duration-200"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    Synthesizing AI Diagnosis...
                  </span>
                ) : (
                  <>
                    <PlayIcon className="w-5 h-5 fill-current" />
                    <span>Launch Best Fits Diagnosis</span>
                  </>
                )}
              </button>
            </div>
           </div>
          </form>

        </div>
  );
}

