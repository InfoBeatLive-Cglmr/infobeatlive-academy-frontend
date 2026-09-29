import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-to-br
     from-zink-900 to-zink-900  sm:p-6 lg:p-8">
      <div className="relative bg-zink-900 border border-zink-700 text-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 
      max-w-lg w-full transform transition-all duration-300 scale-95 md:scale-100">

        <div className="text-center mb-8">
            <h1 className="text-xl sm:text-3xl font-bold text-text-heading mb-2">
              {title}
            </h1>
          <p className="text-md text-text-light">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
