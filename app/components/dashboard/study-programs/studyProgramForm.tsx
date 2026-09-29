// @/app/dashboard/study-programs/page.tsx
'use client';
import React, { useState, useMemo } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { SearchableSelect, SelectOption } from './SearchableSelect';
import {
  GLOBAL_ACADEMIC_DATASET,
  GLOBAL_PROFESSIONAL_PROGRAMS,
  AcademicTier,
  CountryAcademicConfig
} from '@/app/utils/data/studyProgramsData';
import {
  AcademicCapIcon,
  SparklesIcon,
  GlobeAltIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  MicrophoneIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface StudyFormState {
  countryCode: string; // "GLOBAL_PRO" for Professional Programs
  institutionTierId: string;
  selectedLevel: string;
  schoolName: string;
  languages: string;
  fieldOfStudy: string;
  studyMode: 'full_time' | 'part_time';
  description: string;
}

export default function StudyProgramsForm() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<StudyFormState>({
    countryCode: 'US',
    institutionTierId: 'university',
    selectedLevel: 'Bachelor’s Degree (B.Sc / B.A / B.Eng)',
    schoolName: '',
    languages: 'English',
    fieldOfStudy: '',
    studyMode: 'full_time',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Resolve Country or Global Track
  const isGlobalProfessional = formData.countryCode === 'GLOBAL_PRO';

  const selectedCountry: CountryAcademicConfig | undefined = useMemo(() => {
    if (isGlobalProfessional) return undefined;
    return GLOBAL_ACADEMIC_DATASET.find((c) => c.countryCode === formData.countryCode);
  }, [formData.countryCode, isGlobalProfessional]);

  // 2. Resolve Active Tiers
  const availableTiers: AcademicTier[] = useMemo(() => {
    if (isGlobalProfessional) return [GLOBAL_PROFESSIONAL_PROGRAMS];
    return selectedCountry?.institutions || [];
  }, [isGlobalProfessional, selectedCountry]);

  // 3. Resolve Selected Tier
  const selectedTier: AcademicTier | undefined = useMemo(() => {
    return availableTiers.find((t) => t.id === formData.institutionTierId) || availableTiers[0];
  }, [availableTiers, formData.institutionTierId]);

  // Handle Country Selection Change
  const handleCountryChange = (code: string) => {
    let nextTiers: AcademicTier[] = [];
    if (code === 'GLOBAL_PRO') {
      nextTiers = [GLOBAL_PROFESSIONAL_PROGRAMS];
    } else {
      const country = GLOBAL_ACADEMIC_DATASET.find((c) => c.countryCode === code);
      nextTiers = country?.institutions || [];
    }

    const defaultTier = nextTiers[0];

    setFormData({
      countryCode: code,
      institutionTierId: defaultTier?.id || '',
      selectedLevel: defaultTier?.levels[0] || '',
      schoolName: '',
      languages: 'English',
      fieldOfStudy: '',
      studyMode: 'full_time',
      description: ''
    });
  };

  // Handle Institution Tier Switch
  const handleTierChange = (tierId: string) => {
    const tier = availableTiers.find((t) => t.id === tierId);
    if (!tier) return;

    setFormData((prev) => ({
      ...prev,
      institutionTierId: tierId,
      selectedLevel: tier.levels[0] || '',
      fieldOfStudy: ''
    }));
  };

  // Country Options Dropdown
  const countryOptions: SelectOption[] = useMemo(() => {
    const countries = GLOBAL_ACADEMIC_DATASET.map((c) => ({
      value: c.countryCode,
      label: c.countryName,
      sublabel: 'Curriculum Alignment',
      icon: c.flagEmoji
    }));

    return [
      ...countries,
      {
        value: 'GLOBAL_PRO',
        label: 'Global Professional Certifications',
        sublabel: 'Industry Standard (Agnostic of Jurisdiction)',
        icon: '🌐'
      }
    ];
  }, []);

  // Level Options Dropdown
  const levelOptions: SelectOption[] = useMemo(() => {
    if (!selectedTier) return [];
    return selectedTier.levels.map((lvl) => ({
      value: lvl,
      label: lvl
    }));
  }, [selectedTier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
        <div className="max-w-7xl mx-auto mt-6 space-y-2  sm:space-y-6">

          {/* MAIN FORM CONTAINER */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div
              className={`rounded-2xl border p-6 sm:p-8 space-y-8 ${
                isDark ? 'bg-zinc-900/60 border-zinc-700' : 'bg-white border-zinc-300'
              } shadow backdrop-blur-md`}
            >
              {/* STEP 1: COUNTRY CURRICULUM SELECTOR */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <GlobeAltIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className={`text-sm font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-600'} uppercase tracking-wide`}>
                      Step 1: Jurisdiction 
                    </h2>
                    <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                     Select the country standard you want.
                    </p>
                  </div>
                </div>

                <SearchableSelect
                  options={countryOptions}
                  value={formData.countryCode}
                  onChange={handleCountryChange}
                  placeholder="Select curriculum country..."
                  searchPlaceholder="Search country dataset..."
                />
              </div>

              <hr className={isDark ? 'border-zinc-700' : 'border-zinc-300'} />

              {/* STEP 2: INSTITUTION TYPE */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <BuildingLibraryIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className={`text-sm font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-600'} uppercase tracking-wide`}>
                        Step 2: Institution Type
                      </h2>
                      <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {isGlobalProfessional
                          ? 'Global certification tracks'
                          : `Dynamic structure for ${selectedCountry?.countryName}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableTiers.map((tier) => {
                    const isSelected = formData.institutionTierId === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => handleTierChange(tier.id)}
                        className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500 shadow-md'
                            : isDark
                            ? 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-70'
                            : 'bg-zinc-50 border-zinc-300 hover:bg-zinc-100'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-bold text-sm ${isDark ? 'text-zinc-100' : 'text-zinc-600'}`}>{tier.label}</span>
                            {isSelected && <CheckCircleIcon className="w-4 h-4 text-emerald-400" />}
                          </div>
                          <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-600'} leading-relaxed`}>{tier.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <hr className={isDark ? 'border-zinc-700' : 'border-zinc-300'} />

              {/* STEP 3 & STEP 4: LEVEL & SCHOOL NAME INPUT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEVEL SELECTOR */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AcademicCapIcon className="w-4 h-4 text-emerald-500" />
                    <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                      Step 3: Level / Qualification
                    </label>
                  </div>
                  <SearchableSelect
                    options={levelOptions}
                    value={formData.selectedLevel}
                    onChange={(val) => setFormData((prev) => ({ ...prev, selectedLevel: val }))}
                    placeholder="Select qualification level..."
                    searchPlaceholder="Search level..."
                  />
                </div>

                {/* SCHOOL / INSTITUTION NAME (MANUAL TEXT INPUT) */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpenIcon className="w-4 h-4 text-emerald-500" />
                    <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                      Step 4: School / Institution 
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.schoolName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, schoolName: e.target.value }))}
                    placeholder={
                      isGlobalProfessional
                        ? 'e.g. Google Cloud Institute'
                        : 'e.g. Harvard University'
                    }
                    className={`w-full p-3.5 rounded-xl border text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-600'} placeholder-zinc-500 focus:outline-none transition-all ${
                      isDark
                        ? 'bg-zinc-900/50 border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                        : 'bg-zinc-50 border-zinc-300 focus:border-emerald-500'
                    }`}
                  />
                </div>
              </div>

              {/* STEP 5: FIELD OF STUDY / MAJOR (CONDITIONAL) */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {selectedTier?.requiresFieldOfStudy && (
                <div className="">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-4 h-4 text-emerald-500" />
                    <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                      Step 5: Field of Study / Specialty
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fieldOfStudy}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fieldOfStudy: e.target.value }))}
                    placeholder={selectedTier.fieldPlaceholder || 'e.g. Computer Science, Medicine'}
                    className={`w-full p-3.5 rounded-xl border text-sm ${isDark ? 'text-zinc-300' 
                      : 'text-zinc-600'} placeholder-zinc-500 focus:outline-none transition-all ${
                      isDark
                        ? 'bg-zinc-900/50 border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                        : 'bg-zinc-50 border-zinc-300 focus:border-emerald-500'
                    }`}
                  />
                </div>
              )}

              
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

              <hr className={isDark ? 'border-zinc-700' : 'border-zinc-300'} />

              {/* STEP 6: STUDY MODE */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-3">
                  Step 6: Study Pace
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'full_time', label: 'Full-Time', desc: 'Standard comprehensive progression pace.' },
                    { id: 'part_time', label: 'Part-Time', desc: 'Flexible modular schedule for parallel commitments.' }
                  ].map((mode) => {
                    const isSelected = formData.studyMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, studyMode: mode.id as any }))}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500'
                            : isDark
                            ? 'bg-zinc-900/40 border-zinc-700'
                            : 'bg-zinc-50 border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm font-bold ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>{mode.label}</span>
                          {isSelected && <CheckCircleIcon className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-400'}`} />}
                        </div>
                        <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>{mode.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 7: OPTIONAL DESCRIPTION */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                    Step 7: Learning Goals & Focus
                  </label>
                  <span className="text-[10px] text-zinc-500">{formData.description.length}/1000</span>
                </div>
                <textarea
                  rows={3}
                  maxLength={1000}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Specify key objectives, upcoming exams, or target skill focus..."
                  className={`w-full p-3.5 rounded-xl border text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-600'} 
                  placeholder-zinc-500 focus:outline-none transition-all ${
                    isDark
                      ? 'bg-zinc-900/50 border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                      : 'bg-zinc-50 border-zinc-300 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            {/* CALL TO ACTION & VOICE PLACEHOLDER */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 ">
              {/* FUTURE VOICE FEATURE PLACEHOLDER */}
              <div
                className={`w-full sm:w-auto p-4 rounded-xl border flex items-center gap-3 ${
                  isDark ? 'bg-zinc-900/40 border-zinc-700' : 'bg-zinc-100 border-zinc-300'
                }`}
              >
                <div className="p-2.5 rounded-lg bg-zinc-800 text-emerald-400">
                  <MicrophoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>AI Faculty Voice Diagnosis</span>
                    <span className="text-[9px] uppercase font-bold text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                      Advance Engine
                    </span>
                  </div>
                  <p className={`text-[11px] ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    30-minute AI audio breakdown of prerequisites and syllabus structure.
                  </p>
                </div>
              </div>

              {/* PRIMARY GENERATE BUTTON */}
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.schoolName ||
                  (selectedTier?.requiresFieldOfStudy && !formData.fieldOfStudy)
                }
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200 shrink-0"
              >
                {isSubmitting ? (
                  <span>Initializing AI Faculty...</span>
                ) : (
                  <>
                    <span>Explain My Academic Path</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
  );
}
 