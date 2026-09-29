'use client';
import React, { useState, useMemo } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { SearchableSelect, SelectOption } from '@/app/components/dashboard/study-programs/SearchableSelect';
import {
  GLOBAL_ACADEMIC_DATASET,
  CountryAcademicConfig,
  AcademicTier
} from '@/app/utils/data/studyProgramsData';
import { EnrollmentFormData, StudyPace, MaritalStatus, EmploymentStatus } from './academy';
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';

interface LibraryEnrollmentFormProps {
  hasActiveFullTimeReading: boolean;
  onEnrollSuccess: (data: EnrollmentFormData) => void;
  onCancel?: () => void;
}

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const LibraryEnrollmentForm: React.FC<LibraryEnrollmentFormProps> = ({
  hasActiveFullTimeReading,
  onEnrollSuccess,
  onCancel
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Form State
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US');
  const [selectedTierId, setSelectedTierId] = useState<string>('');
  const [selectedLevelId, setSelectedLevelId] = useState<string>('');
  const [institutionName, setInstitutionName] = useState<string>('InfoBeatLive AI Faculty Of Study ');
  const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [educationLevel, setEducationLevel] = useState<string>('');
  const [countryOfOrigin, setCountryOfOrigin] = useState<string>('');
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('single');
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>('employed');
  const [currentRole, setCurrentRole] = useState<string>('');
  const [externalCourses, setExternalCourses] = useState<string>('');
  const [researchPace, setResearchPace] = useState<StudyPace>(hasActiveFullTimeReading ? 'full_time' : 'part_time');
  const [researchContext, setResearchContext] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  
  // Part-time custom schedule states
  const [partTimeDays, setPartTimeDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday']);
  const [partTimeResearchPerDay, setPartTimeResearchPerDay] = useState<number>(2);
  const [partTimeDurationMin, setPartTimeDurationMin] = useState<number>(45);

  const [careerBio, setCareerBio] = useState<string>('');

  const currentCountryConfig: CountryAcademicConfig | undefined = useMemo(() => {
    return GLOBAL_ACADEMIC_DATASET.find((c) => c.countryCode === selectedCountryCode);
  }, [selectedCountryCode]);

const countryOptions: SelectOption[] = useMemo(() => {
  return GLOBAL_ACADEMIC_DATASET.map((c: CountryAcademicConfig) => ({
    value: c.countryCode,
    label: `${c.flagEmoji} ${c.countryName}`,
    //sublabel: c.countryCode,
  }));
}, []);


const selectedTierObj: AcademicTier | undefined = useMemo(() => {
  if (!currentCountryConfig) return undefined;
  return currentCountryConfig.institutions.find(
    (t: AcademicTier) => t.id === selectedTierId
  );
}, [currentCountryConfig, selectedTierId]);

  const isK12Tier = useMemo(() => {
    if (!selectedTierId) return false;
    const lower = selectedTierId.toLowerCase();
    return lower.includes('k12') || lower.includes('elementary') || lower.includes('high_school');
  }, [selectedTierId]);

  const togglePartTimeDay = (day: string) => {
    if (partTimeDays.includes(day)) {
      if (partTimeDays.length > 1) {
        setPartTimeDays(partTimeDays.filter((d) => d !== day));
      }
    } else {
      setPartTimeDays([...partTimeDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTierId || !selectedLevelId || !institutionName || (!isK12Tier && !fieldOfStudy)) {
      alert('Please fill in all mandatory curriculum requirements.');
      return;
    }

    const formData: EnrollmentFormData = {
      countryCode: currentCountryConfig?.countryName || selectedCountryCode,
      institutionTierId: selectedTierObj?.label || selectedTierId,
      levelQualificationId: selectedLevelId,
      institutionName,
      language,
      fieldOfStudy: isK12Tier ? undefined : fieldOfStudy,
      dateOfBirth,
      educationLevel,
      countryOfOrigin,
      maritalStatus,
      employmentStatus,
      currentRoleOrExperience: currentRole,
      externalCoursesCompleted: externalCourses,
      schedule: {
        researchPace,
        hoursPerDay: researchPace === 'full_time' ? 4.5 : (partTimeResearchPerDay * partTimeDurationMin) / 60,
        researchPerDay: researchPace === 'full_time' ? 3 : partTimeResearchPerDay,
        researchDurationMinutes: researchPace === 'full_time' ? 90 : partTimeDurationMin,
        selectedDays: researchPace === 'full_time' ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] : partTimeDays
      },
      careerBio,
      researchContext
    };

    onEnrollSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-zinc-900/80 border-zinc-700' : 'bg-white border-zinc-300 shadow-xl'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <AcademicCapIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
              Academic Study Configuration
            </h2>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Configure your academic study, specialized framework, and pace.</p>
          </div>
        </div>
      </div>

      {/* SECTION 1: COUNTRY & INSTITUTION SELECTION */}
      <div className={`p-6 rounded-2xl border space-y-6 ${isDark ? 'bg-zinc-900/60 border-zinc-700' 
        : 'bg-white border-zinc-300 shadow-md'}`}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <BuildingLibraryIcon className="w-4 h-4" /> 1. Academic Jurisdiction & Level
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block `}>Curriculum Country System</label>
            <SearchableSelect
              options={countryOptions}
              value={selectedCountryCode}
              onChange={(v) => {
                setSelectedCountryCode(v);
                setSelectedTierId('');
                setSelectedLevelId('');
              }}
              placeholder="Select Country..."
            />
          </div>
          
           <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' 
              : 'text-zinc-600'} mb-1 block`}> Study Framework / Tier </label>
            <select
              value={selectedTierId}
              required
              onChange={(e) => setSelectedTierId(e.target.value)}
              className={`w-full px-4 py-4.5 rounded-xl border text-xs font-medium focus:outline-none ${
              isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'}`}>
              <option value="InfoBeatLive Study Center">InfoBeatLive Study Center</option>
            </select>
          </div>

           <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' 
              : 'text-zinc-600'} mb-1 block`}> Slect A Study Style</label>
            <select
              value={selectedLevelId}
              required
              onChange={(e) => setSelectedLevelId(e.target.value)}
              className={`w-full px-4 py-4.5 rounded-xl border text-xs font-medium focus:outline-none ${
              isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'}`}>

              <option value="">Select Study Style</option>
              <option value="Learning Style">Learning Style</option>
              <option value="Research Style">Research Style</option>
            </select>
          </div>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>
              Academy / Institution Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Bayero University, Kano or MIT"
              value={institutionName}
              disabled
              onChange={(e) => setInstitutionName(e.target.value)}
              className={`w-full px-4 cursor-not-allowed py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
              }`}
            />
          </div>

          {!isK12Tier && (
            <div>
              <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>
               Book Name You Want Study (Only One) *</label>
              <input
                type="text"
                required={!isK12Tier}
                placeholder="Book Name Here"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                  isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                }`}
              />
            </div>
          )}

          
          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' 
              : 'text-zinc-600'} mb-1 block`}>Choose Lecture Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'  }` }>

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

      {/* SECTION 2: BIOGRAPHICAL & BACKGROUND */}
      <div className={`p-6 rounded-2xl border space-y-6 ${isDark ? 'bg-zinc-900/60 border-zinc-700' 
        : 'bg-white border-zinc-300 shadow-md'}`}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <UserIcon className="w-4 h-4" /> 2. Personal & Academic Background
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>Date of Birth</label>
            <input
              type="date"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-emerald-500 border-zinc-300 text-zinc-900'
              }`}
            />
          </div>

          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>Highest Education Attained</label>
            <input
              type="text"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              placeholder="e.g. High School Diploma, B.Sc"
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
              }`}
            />
          </div>

          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>Country of Origin</label>
            <input
              type="text"
              value={countryOfOrigin}
              onChange={(e) => setCountryOfOrigin(e.target.value)}
              placeholder='country name here'
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
              }`}
            />
          </div>

          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>Marital Status</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
              }`}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>Employment Status</label>
            <select
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value as EmploymentStatus)}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
              }`}
            >
              <option value="employed">Employed (Full/Part-time)</option>
              <option value="self_employed">Self-Employed / Founder</option>
              <option value="unemployed">Unemployed / Seeking Work</option>
              <option value="student">Full-time Student</option>
            </select>
          </div>

          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>Current Job / Career Role</label>
            <input
              type="text"
              placeholder="e.g. Senior Backend Engineer"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
              }`}
            />
          </div>

          <div>
            <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>External Courses / Certifications</label>
            <input
              type="text"
              placeholder="e.g. AWS Certified, Coursera ML"
              value={externalCourses}
              onChange={(e) => setExternalCourses(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
              }`}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: STUDY PACE & DYNAMIC SCHEDULE */}
      <div className={`p-6 rounded-2xl border space-y-6 ${isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300 shadow-md'}`}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <ClockIcon className="w-4 h-4" /> 3. Research Pace & Customization
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setResearchPace('full_time')}
            className={`p-4 rounded-xl border text-left transition-all ${
              researchPace === 'full_time'
                ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                : isDark ? 'bg-zinc-950 border-zinc-700 hover:border-zinc-700' : 'bg-zinc-50 border-zinc-300'
            } ${hasActiveFullTimeReading ? '' : ''}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-bold text-sm ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Full-Time Track</span>
              {researchPace === 'full_time' && <CheckCircleIcon className="w-5 h-5 text-emerald-500" />}
            </div>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              System auto-allocates 4.5 hours/day across Mon-Fri (3 lectures/day @ 90 min each).</p>
            </button>

          <button
            type="button"
            onClick={() => setResearchPace('part_time')}
            className={`p-4 rounded-xl border text-left transition-all ${
              researchPace === 'part_time'
                ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                : isDark ? 'bg-zinc-950 border-zinc-700 hover:border-zinc-700' : 'bg-zinc-50 border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-bold text-sm ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Part-Time Flexible</span>
              {researchPace === 'part_time' && <CheckCircleIcon className="w-5 h-5 text-emerald-500" />}
            </div>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Customize available days, lecture frequency, and individual session durations.</p>
          </button>
        </div>

        {/* DYNAMIC PART-TIME SELECTORS */}
        {researchPace === 'part_time' && (
          <div className={`p-5 rounded-xl border space-y-4 ${isDark ? 'bg-zinc-950/80 border-zinc-700' : 'bg-zinc-50 border-zinc-300'}`}>
            <div>
              <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-2 block`}>Select Available Weekly Days:</label>
              <div className="flex flex-wrap gap-2">
                {WEEK_DAYS.map((day) => {
                  const active = partTimeDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => togglePartTimeDay(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        active
                          ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md'
                          : isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-white border-zinc-300 text-zinc-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>Research per Selected Day:</label>
                <select
                  value={partTimeResearchPerDay}
                  onChange={(e) => setPartTimeResearchPerDay(Number(e.target.value))}
                  className={`w-full px-4 py-2 rounded-xl border text-xs font-medium ${
                    isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
                  }`}
                >
                  <option value={1}>1 Lecture / Day</option>
                  <option value={2}>2 Lectures / Day</option>
                  <option value={3}>3 Lectures / Day</option>
                  <option value={4}>4 Lectures / Day</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-1 block`}>
                  Duration Per Research (Minutes):</label>
                <select
                  value={partTimeDurationMin}
                  onChange={(e) => setPartTimeDurationMin(Number(e.target.value))}
                  className={`w-full px-4 py-2 rounded-xl border text-xs font-medium ${
                    isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
                  }`}
                >
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes (1 Hour)</option>
                  <option value={90}>90 Minutes (1.5 Hours)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* CAREER BIO */}
        <div>
          <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} 
          mb-1 block`}>Career & Academic Bio Statement {careerBio.length}/1000 *</label>
          <textarea
            rows={3}
            maxLength={1000}
            placeholder="Briefly describe your long-term career ambition and educational background..."
            value={careerBio}
            required
            onChange={(e) => setCareerBio(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none ${
              isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
            }`}
          />
        </div>

          <div>
          <label className={`text-xs font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-600'} 
          mb-1 block`}>Write Your All Study Context Here {researchContext.length}/1000 *</label>
          <textarea
            rows={3}
            maxLength={1000}
            placeholder="Briefly describe the book you want study which you wrote at very top of this form..."
            value={researchContext}
            required
            onChange={(e) => setResearchContext(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none ${
              isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
            }`}
          />
        </div>

      </div>

      {/* FORM ACTION BUTTONS */}
      <div className="flex flex-wrap justify-between items-center gap-4 ">

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 ">

        <div className={`w-full sm:w-auto p-4 rounded-xl border flex items-center gap-3 ${
        isDark ? 'bg-zinc-900/40 border-zinc-700' : 'bg-zinc-100 border-zinc-300' }`}>
        <div className="p-2.5 rounded-lg bg-zinc-800 text-emerald-400"> <MicrophoneIcon className="w-5 h-5" /> </div>

        <div> <div className="flex items-center gap-2">
        <span className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>InfoBeatLive Study Center</span>
        <span className="text-[9px] uppercase font-bold text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
        Advance Engine </span></div>

        <p className={`text-[11px] ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
        Structured AI breakdown of prerequisites and steps structure.</p>
        </div></div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`px-20 py-3  rounded-xl text-xs font-bold transition-all ${
              isDark ? 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300' : 'bg-zinc-200 border border-zinc-400 hover:bg-zinc-300 text-zinc-700'
            }`}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="px-8 py-3.5 rounded-xl bg-emerald-500 
          hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs flex items-center 
          gap-2 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <SparklesIcon className="w-4 h-4" />
          <span>Configure & Enroll Study</span>
        </button>
      </div>
    </div>
    </form>
  );
};