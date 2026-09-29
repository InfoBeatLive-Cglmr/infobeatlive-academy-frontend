// components/dashboard/settings/RolesPermissionsPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import DashboardContent from '@/app/components/dashboard/DashboardContent';
import { useTheme } from '@/app/context/ThemeContext';
import Button from './Button';
import { UserPlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/navigation';

const RolesPage: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isExceeded, setIsExceeded] = useState(false);
  const [roleInCompany, setRoleInCompany] = useState('');
  const companyId = Cookies.get("companyId");
  const projectId = Cookies.get("projectId");
  const managerName = Cookies.get("userName");
 
  const employeesAllowed =  Number(Cookies.get('numberOfUSersAllowed'));
  const employees = Number(Cookies.get('employeesCount'));

  useEffect(() => {
  
    if (employees && employeesAllowed && employees === employeesAllowed ) {
       setIsExceeded(true) } 

  }, [employeesAllowed, employees ]);

  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const roles = [
    { value: '', label: 'Select Member Role', description: '' },
    { value: 'Supervisor', label: 'Supervisor', description: `
      Onboard new supervisor to your portal, A supervisor will have access to review your learning materials and manage 
      your curriculum based on your academic preferences.` },

    { value: 'Parent', label: 'Parent', description: `
      Onboard parent to your portal, the parent will have access to view their child's progress and communicate with supervisors
      about the quality of education you consume and any potential concerns.` },

    { value: 'Course mate', label: 'Course mate', description: `
      Onboard new course mate to your portal, the course mate will have access to collaborate with other students 
      and participate in group activities.` }, 
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsCreatingUser(true);
  setError(null);
  setSuccessMessage(null);

  if (!companyId || !projectId || !managerName) {
    return router.push(`/auth/signin`);
  }

  try {
   
    const payload = {
      projectId,
      companyId,
      roleInCompany,
      managerName,
      name,
      email,
    };

    setName('');
    setEmail('');
    setRoleInCompany('');
  } catch (err: any) {
    setError(err.response?.data?.message || err.message || 'An unexpected error occurred during user onboarding.');
    console.error('User onboarding failed:', err);
  } finally {
    setIsCreatingUser(false);
  }
};

  const inputClass = `w-full p-3 rounded-lg border focus:ring-brand-primary focus:border-brand-primary
   outline-none transition-colors ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400' 
    : 'bg-zinc-50 border-zinc-300 text-zinc-800 placeholder-zinc-500'}`;
  
    const labelClass = `block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-700'}`;

  const title = "Onboard New Member";
  const description = "Add a new member to your portal. Assign their role and provide necessary details.";

  return (
    <DashboardLayout>
      <DashboardContent
        title={title}
        description={description}
      >
        <div className={`p-2 sm:p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-zinc-800 border border-zinc-700' 
        : 'bg-white border border-zinc-200'}`}>
        

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">

          <h3 className={`text-xl font-semibold mb-6 flex items-center ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
            <UserPlusIcon className="h-6 w-6 mr-2 text-brand-primary" /> New Member Details
          </h3>
           
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="e.g., Jane Doe"
                required
              />
            </div>

           
            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="e.g., jane.doe@example.com"
                required
              />
            </div>
           
            <div>
              <label htmlFor="role" className={labelClass}>Assign Role</label>
              <select
                id="role"
                name="role"
                value={roleInCompany}
                onChange={(e) => setRoleInCompany(e.target.value)}
                className={inputClass}
                required
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {roleInCompany && (
                <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {roles.find(r => r.value === roleInCompany)?.description}
                </p>
              )}
            </div>
          
            {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}

           {isExceeded ? (
               <div className="flex justify-center pt-4 border-t border-zinc-200 dark:border-zinc-700 mt-6">
                 <span  className="w-full flex items-center justify-center rounded-xl py-2
                  border bg-zinc-900 text-white max-w-xs opacity-50 cursor-not-allowed">
                   <CheckCircleIcon className="h-5 w-5 mr-2" /> {'You Exceeded Your Team Limit'}
                 </span>
               </div>
            ) : (
               <div className="flex justify-center pt-4 border-t border-zinc-200 dark:border-zinc-700 mt-6">
                  <Button  type="submit" loading={isCreatingUser} className="w-full border bg-zinc-900 text-white max-w-xs">
                    <CheckCircleIcon className="h-5 w-5 mr-2" /> {isCreatingUser ? 'Onboarding...' : 'Onboard Member'}
                  </Button>
               </div>
            )}

          </form>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default RolesPage;
