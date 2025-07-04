
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ text, icon, className, ...props }) => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center w-full px-6 py-4 text-lg font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-transform transform hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </button>
  );
};
