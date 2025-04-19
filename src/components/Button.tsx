import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | 'primary' 
    | 'secondary' 
    | 'warning' 
    | 'success' 
    | 'danger' 
    | 'gold' 
    | 'outline' 
    | 'ghost'
    | 'link'
    | 'social';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  loading?: boolean;
  social?: 'google' | 'facebook' | 'apple' | 'twitter';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  leftIcon,
  rightIcon,
  badge,
  badgeColor = 'bg-green-500',
  loading = false,
  social,
  rounded = 'md',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#bc9b54] text-white hover:bg-[#c69531] border border-transparent shadow-md hover:shadow-lg',
    secondary: 'border border-[#bc9b54] text-[#bc9b54] hover:bg-[#bc9b54]/10',
    warning: 'bg-orange-500 text-white hover:bg-orange-600 border border-transparent',
    success: 'bg-green-500 text-white hover:bg-green-600 border border-transparent',
    danger: 'bg-red-500 text-white hover:bg-red-600 border border-transparent',
    gold: 'bg-gradient-to-r from-[#bc9b54] to-[#c69531] text-white hover:from-[#c69531] hover:to-[#bc9b54] border border-transparent shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#bc9b54] bg-transparent text-[#bc9b54] hover:bg-[#bc9b54] hover:text-white',
    ghost: 'bg-transparent hover:bg-[#bc9b54]/10 text-[#bc9b54]',
    link: 'bg-transparent text-[#bc9b54] hover:underline p-0 h-auto',
    social: social === 'google' 
      ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50' 
      : social === 'facebook'
      ? 'bg-[#1877f2] text-white hover:bg-[#166fe5]'
      : social === 'apple'
      ? 'bg-black text-white hover:bg-gray-900'
      : 'bg-[#1da1f2] text-white hover:bg-[#1a91da]' // Twitter
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const roundedVariants = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const classes = twMerge(
    baseStyles,
    variants[variant],
    sizes[size],
    roundedVariants[rounded],
    fullWidth ? 'w-full' : '',
    className
  );

  // Social media icons
  const socialIcons = {
    google: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    apple: (
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm.5 3c1.666 0 3 1.334 3 3s-1.334 3-3 3-3-1.334-3-3 1.334-3 3-3zm0 8c2.577 0 4.674 1.957 4.674 4.37 0 .276-.224.5-.5.5H7.826c-.276 0-.5-.224-.5-.5 0-2.413 2.097-4.37 4.674-4.37z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    )
  };

  return (
    <button 
      className={classes} 
      disabled={loading || disabled} 
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && !social && <span className="mr-2">{leftIcon}</span>}
          {social && socialIcons[social]}
          <span className="flex items-center">
            {children}
            {badge && (
              <span className={`ml-1.5 ${badgeColor} text-white text-[10px] px-1 py-0.5 rounded leading-none font-medium`}>
                {badge}
              </span>
            )}
          </span>
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
