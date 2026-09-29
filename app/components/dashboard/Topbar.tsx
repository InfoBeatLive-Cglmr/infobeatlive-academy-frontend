'use client';
import React, { useEffect, useState } from 'react';
import { Bars3Icon, BellIcon, UserPlusIcon, UserIcon, ArrowRightCircleIcon, 
UserCircleIcon, SunIcon, MoonIcon, Cog6ToothIcon} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/navigation';

interface TopbarProps { onMenuToggle: () => void }

  const Topbar: React.FC<TopbarProps> = ({ onMenuToggle }) => {
  const router = useRouter();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const userName = Cookies.get("userName");
  const accessToken = Cookies.get("accessToken");

  const handleLogout = async () => {
      try {
        //await logout();
        router.push('/'); 
      } catch (error:any) {
        console.error('Error during logout:', error.message);
      }
    };

  const handleNotifications = async () => {
      try {
        //router.push('/notifications'); 
      } catch (error:any) {
        console.error('Error during logout:', error.message);
      }
    };
               

  return (
    <header className={`sticky top-0 z-30 p-2 -mb-6 sm:p-3.5 flex items-center justify-between shado
                        ${theme === 'dark' ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'}
                        border-b ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-300'}
                        xl:ml-52`}> 
     
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className={`xl:hidden p-2 rounded-md ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-700' 
            : 'text-zinc-600 hover:bg-zinc-100'}`}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
         <span className="ml-3 text-xl font-bold text-brand-primary md:hidden">InfoBeatLive</span>
      </div>
  
      <div className="hidden md:flex items-center flex-grow max-w-md mx-4">
    
        <div className="relative w-full">
          <Link href={{pathname:'/dashboard/settings'}}>
            <button className={`flex justify-center gap-2 p-1 px-4 w-full  rounded-md transition-colors duration-200
                ${theme === 'dark' ? 'text-white-300 hover:bg-zinc-700 border border-zinc-700' 
                  : 'text-zinc-600 hover:bg-zinc-100 border'}`}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} >
              <span className='flex flex-row gap-2'> <Cog6ToothIcon className=' w-5'/>Academy Settings </span>
            </button>
          </Link>
        </div>
     
        <div className="relative ml-3 w-full">
        <Link href={{pathname:'/dashboard/roles'}}>
        <button className={`flex justify-center gap-2 p-1 px-4 w-full  rounded-md transition-colors duration-200
            ${theme === 'dark' ? 'text-white-300 hover:bg-zinc-700 border border-zinc-700'  
              : 'text-zinc-600 hover:bg-zinc-100 border'}`} 
            title={theme === 'dark' ? 'Switch to Light Mode'  : 'Switch to Dark Mode'}>
            <span className='flex flex-row gap-2'> <UserPlusIcon className=' w-5'/>See Video Demo</span>
         </button>
         </Link>
         </div>
        </div> 
   
      <div className="flex items-center space-x-4">
     
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-md transition-colors duration-200
                      ${theme === 'dark' ? 'text-yellow-300 hover:bg-zinc-700' : 'text-zinc-600 hover:bg-zinc-100'}`}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>

     
        <button onClick={handleNotifications} className={`p-2 rounded-md relative
                            ${theme === 'dark' ? 'text-gray-300 hover:bg-zinc-700' : 'text-gray-600 hover:bg-zinc-100'}`}>
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 
          text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {0}
          </span> 
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <UserCircleIcon className="h-8 w-8 text-brand-primary" /> 
          </button>
          {isProfileMenuOpen && (
            <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none
                            ${theme === 'dark' ? 'bg-zinc-700 ' : 'bg-white '}`}>
              <Link href="/dashboard/settings" className={`block px-4 py-2 text-sm
                ${theme === 'dark' ? 'text-zinc-200 hover:bg-zinc-600' : 'text-zinc-700 hover:bg-zinc-100'}`}>
             
                 <span className='flex flex-row gap-2'>
                   <UserIcon className=' w-5'/>
                   {userName ? `${userName}` : 'John Doe'} 
                 </span>
              </Link>

              <Link href="/dashboard/roles" className={`block px-4 py-2 text-sm
               ${theme === 'dark' ? 'text-zinc-200 hover:bg-zinc-600' : 'text-zinc-700 hover:bg-zinc-100'}`}>
                <span className='flex flex-row gap-2'>
                   <UserPlusIcon className=' w-5'/>
                   See Video Demo
                 </span>
              </Link>
         
              <Link href="/dashboard/settings" className={`block px-4 py-2 text-sm
                ${theme === 'dark' ? 'text-zinc-200 hover:bg-zinc-600' : 'text-zinc-700 hover:bg-zinc-100'}`}>
                <span className='flex flex-row gap-2'>
                  <Cog6ToothIcon className=' w-5'/>
                  Academy Settings
                </span>
              </Link>

              
              <Link href="/dashboard/academy/classroom" className={`block px-4 py-2 text-sm
                ${theme === 'dark' ? 'text-zinc-200 hover:bg-zinc-600' : 'text-zinc-700 hover:bg-zinc-100'}`}>
                <span className='flex flex-row gap-2'>
                  <Cog6ToothIcon className=' w-5'/>
                  Classroom Page
                </span>
              </Link>
        
              {accessToken ?(
              <button onClick={handleLogout}
                className={`flex  w-full text-left px-4 py-2 text-sm
                            ${theme === 'dark' ? 'text-zinc-200 hover:bg-zinc-600' : 'text-zinc-700 hover:bg-zinc-100'}`}>
               
                 <span className='flex flex-row gap-2'>
                  <ArrowRightCircleIcon className=' w-5'/>
                   Sign out
                </span>
              </button>):
              (
              
                <Link href="/auth/signin"> <button
                className={`flex  w-full text-left px-4 py-2 text-sm  
                ${theme === 'dark' ? 'text-zinc-200 hover:bg-zinc-600' : 'text-zinc-700 hover:bg-zinc-100'}`}>
                 <span className='flex flex-row gap-2'>
                  <ArrowRightCircleIcon className=' w-5'/> Signin </span>
                </button> </Link> 
              )}

            </div>
          )}
        </div>
        
      </div>

    </header>
  );
};

export default Topbar;


