'use client';
import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import DashboardContent from '@/app/components/dashboard/DashboardContent';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import {
  UserIcon,
  AcademicCapIcon,
  CreditCardIcon,
  KeyIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  CameraIcon,
  ExclamationCircleIcon,
  BriefcaseIcon,
  GlobeAmericasIcon,
  CalendarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { UserCircleIcon } from 'lucide-react';

export interface UserProfileData {
  id: string;
  email: string;
  fullName: string;
  count: number;
  profileImage: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  highestEducation: string | null;
  countryOfOrigin: string | null;
  maritalStatus: string | null;
  employmentStatus: string | null;
  currentJobRole: string | null;
  fieldOfStudy: string | null;
  planType: string | null;
  billingCycle: string | null;
  nextBillingDate: string | null;
  lastPaymentDate: string | null;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  isBlocked: boolean;
  isSuspended: boolean;
  isActive: boolean;
  emailVerified: string | null;
}

//https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256
const INITIAL_MOCK_USER: UserProfileData = {
  id: 'cuid_usr_982341a8bc',
  email: 'abdurrahman.dev@example.com',
  fullName: 'Abdurrahman Sale',
  count: 1042,
  profileImage: '',
  bio: 'Backend & Cloud Systems Engineer focusing on distributed architectures, high-throughput microservices, and AI integrations.',
  dateOfBirth: '2000-08-15',
  highestEducation: "Master's Degree",
  countryOfOrigin: 'Nigeria',
  maritalStatus: 'Single',
  employmentStatus: 'Employed Full-time',
  currentJobRole: 'Senior Backend Engineer',
  fieldOfStudy: 'Computer Science & Software Engineering',
  planType: 'Academic Plus',
  billingCycle: 'Monthly',
  nextBillingDate: '2027-08-15',
  lastPaymentDate: '2026-08-15',
  createdAt: '2025-08-15T10:00:00.000Z',
  updatedAt: '2026-09-10T14:30:00.000Z',
  isAdmin: false,
  isBlocked: false,
  isSuspended: false,
  isActive: true,
  emailVerified: '2025-08-15T10:05:00.000Z'
};

const fetchUserProfile = async (): Promise<UserProfileData> => {
  return new Promise((resolve) => setTimeout(() => resolve(INITIAL_MOCK_USER), 600));
};

const updateUserProfile = async (updatedData: Partial<UserProfileData>): Promise<UserProfileData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...INITIAL_MOCK_USER,
        ...updatedData,
        updatedAt: new Date().toISOString()
      });
    }, 800);
  });
};

export default function SettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'billing' | 'security'>('profile');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserProfileData>(INITIAL_MOCK_USER);

  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile();
        setFormData(data);
      } catch (err) {
        setErrorMessage('Failed to load profile details. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleInputChange = (field: keyof UserProfileData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    setSaveSuccess(false);

    try {
      const updated = await updateUserProfile(formData);
      setFormData(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setErrorMessage('Failed to update settings. Please check your network and try again.');
    } finally {
      setSaving(false);
    }
  };

  // Mock Avatar Upload handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      handleInputChange('profileImage', previewUrl);
    }
  };

  // if (loading) {
  //   return (
  //     <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
  //       <div className="flex items-center gap-3">
  //         <ArrowPathIcon className="w-6 h-6 animate-spin text-emerald-500" />
  //         <span className="font-mono text-sm font-semibold">Loading Profile Settings...</span>
  //       </div>
  //     </div>
  //   );
  // }

  
  const title = "Account & Profile Settings";
  const description = "Manage your personal information, academic credentials, and billing details.";

  return (
    
    <DashboardLayout>
    <DashboardContent title={''} description={''}>
    <div className={`min-h-screen font-sans rounded-xl -mt-6
      ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
      
      <main className="max-w-7xl mx-auto">
        
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
              <span>Your settings have been updated successfully!</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Updated just now</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <ExclamationCircleIcon className="w-5 h-5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
            <div className="space-y-6">
              
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-zinc-900/40 border-zinc-700' 
                : 'bg-white border-zinc-300'}`}>
                <h2 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-6 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-emerald-400" /> Profile Information
                </h2>

                <div className={`flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6
                   ${isDark ? 'border-b border-zinc-700 ' : 'border-b border-zinc-300 '} `}>
                  <div className="relative group">
                   {formData.profileImage ? (
                   <img
                      src={formData.profileImage}
                      alt="Avatar"
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-500/50"
                    />) : (
                      <UserCircleIcon className="h-32 w-32 text-brand-primary" /> 
                    )} 

                    <label className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 
                    group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer 
                    transition-opacity text-white text-[10px] font-semibold">
                      <CameraIcon className="w-5 h-5 mb-1" />
                      Upload
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                  </div>

                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h3 className="text-base font-bold">{formData.fullName}</h3>
                    <p className="text-xs text-zinc-400">
                      {formData.currentJobRole}
                    </p>
                    <div className="pt-2 flex justify-center sm:justify-start gap-2">
                      <label className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                        isDark ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200'
                      }`}>
                        Change Photo
                        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                      </label>
                      {formData.profileImage && (
                        <button
                          type="button"
                          onClick={() => handleInputChange('profileImage', null)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 border border-rose-500/20 hover:bg-rose-500/10"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                        isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                        isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" /> Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                        isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <GlobeAmericasIcon className="w-3.5 h-3.5 text-emerald-400" /> Country of Origin
                    </label>
                    <input
                      type="text"
                      value={formData.countryOfOrigin || ''}
                      onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
                      placeholder="e.g. Nigeria, United States"
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                        isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-zinc-400">Marital Status</label>
                    <select
                      value={formData.maritalStatus || ''}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                        isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-zinc-400">Biography</label>
                    <textarea
                      rows={3}
                      value={formData.bio || ''}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors resize-none ${
                        isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

            </div>
      
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-zinc-900/40 border-zinc-700' : 'bg-white border-zinc-300'}`}>
              <h2 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-6 flex items-center gap-2">
                <AcademicCapIcon className="w-4 h-4 text-emerald-400" /> Academic & Professional Background
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Highest Education Qualification</label>
                  <select
                    value={formData.highestEducation || ''}
                    onChange={(e) => handleInputChange('highestEducation', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  >
                    <option value="">Select Qualification</option>
                    <option value="High School Diploma">High School Diploma</option>
                    <option value="Associate Degree">Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate / Ph.D.">Doctorate / Ph.D.</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Field of Study / Discipline</label>
                  <input
                    type="text"
                    value={formData.fieldOfStudy || ''}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science, Economics"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                    <BriefcaseIcon className="w-3.5 h-3.5 text-emerald-400" /> Employment Status
                  </label>
                  <select
                    value={formData.employmentStatus || ''}
                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  >
                    <option value="">Select Status</option>
                    <option value="Employed Full-time">Employed Full-time</option>
                    <option value="Employed Part-time">Employed Part-time</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Student">Student</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Current Job Role / Occupation</label>
                  <input
                    type="text"
                    value={formData.currentJobRole || ''}
                    onChange={(e) => handleInputChange('currentJobRole', e.target.value)}
                    placeholder="e.g. Senior Software Architect"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>
              </div>
            </div>
         
            <div className={`p-6 rounded-3xl border space-y-6 ${isDark ? 'bg-zinc-900/40 border-zinc-700' 
              : 'bg-white border-zinc-300'}`}>
              <h2 className="text-sm font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <CreditCardIcon className="w-4 h-4 text-emerald-400" /> Subscription Plan & Billing
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Selected Plan Tier</label>
                  <select
                    value={formData.planType || ''}
                    onChange={(e) => handleInputChange('planType', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  >
                    <option value="Academic Basic">Academic Basic ($10/mo)</option>
                    <option value="Academic Plus">Academic Plus ($79/mo)</option>
                    <option value="Academic Pro">Academic Pro ($199/mo)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Billing Frequency</label>
                  <select
                    value={formData.billingCycle || ''}
                    onChange={(e) => handleInputChange('billingCycle', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  >
                    <option value="Monthly">Monthly Billing</option>
                    <option value="Annual">Annual Billing (25% Off)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Last Payment Date</label>
                  <input
                    type="text"
                    disabled
                    value={formData.lastPaymentDate ? new Date(formData.lastPaymentDate).toLocaleDateString() : 'N/A'}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border opacity-70 cursor-not-allowed ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Next Billing Renewal</label>
                  <input
                    type="text"
                    disabled
                    value={formData.nextBillingDate ? new Date(formData.nextBillingDate).toLocaleDateString() : 'N/A'}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border opacity-70 cursor-not-allowed ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                    }`}
                  />
                </div>
              </div>
            </div>
          
            <div className={`p-6 rounded-3xl border space-y-6 ${isDark ? 'bg-zinc-900/40 border-zinc-700' 
              : 'bg-white border-zinc-300'}`}>
              <h2 className="text-sm font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <KeyIcon className="w-4 h-4 text-emerald-400" /> Password & Account Security
              </h2>

              <div className="space-y-4 max-w-7xl">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={passwordState.currentPassword}
                    onChange={(e) => setPasswordState({ ...passwordState, currentPassword: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">New Password</label>
                  <input
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={passwordState.newPassword}
                    onChange={(e) => setPasswordState({ ...passwordState, newPassword: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    value={passwordState.confirmPassword}
                    onChange={(e) => setPasswordState({ ...passwordState, confirmPassword: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none focus:border-emerald-500 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>
              </div>

              {/* <div className="pt-4 border-t border-zinc-800/40">
                <h3 className="text-xs font-bold text-zinc-400 mb-2">Account Metadata Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono">
                  <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/30">
                    <span className="text-zinc-500 block">Is Active</span>
                    <span className="font-bold text-emerald-400">{formData.isActive ? 'TRUE' : 'FALSE'}</span>
                  </div>
                  <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/30">
                    <span className="text-zinc-500 block">Is Suspended</span>
                    <span className="font-bold text-rose-400">{formData.isSuspended ? 'TRUE' : 'FALSE'}</span>
                  </div>
                  <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/30">
                    <span className="text-zinc-500 block">Is Blocked</span>
                    <span className="font-bold text-rose-400">{formData.isBlocked ? 'TRUE' : 'FALSE'}</span>
                  </div>
                  <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/30">
                    <span className="text-zinc-500 block">Role</span>
                    <span className="font-bold text-purple-400">{formData.isAdmin ? 'ADMINISTRATOR' : 'USER'}</span>
                  </div>
                </div>
              </div>*/}

            </div> 
         
          <div className={`flex items-center justify-end gap-3 pt-4 border-t 
            ${ isDark ? 'border-zinc-700' : 'border-zinc-300' }`}>
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                const fresh = await fetchUserProfile();
                setFormData(fresh);
                setLoading(false);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                isDark ? 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300' 
                : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              Reset Changes
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-zinc-950 
              hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  Saving Updates...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>

        </form>
      </main>

    </div>
    </DashboardContent>
  </DashboardLayout>

  );
}


