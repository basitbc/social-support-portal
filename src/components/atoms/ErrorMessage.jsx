import React from 'react';
import { cn } from '../../utils/helpers';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({
  children,
  error,
  errors = [],
  show = true,
  icon = true,
  className,
  id,
  role = 'alert',
  'aria-live': ariaLive = 'polite',
  dir = 'auto',
  ...props
}) => {
  // Handle different error formats
  const errorMessages = (() => {
    if (error) {
      if (typeof error === 'string') return [error];
      if (error.message) return [error.message];
      if (Array.isArray(error)) return error;
    }
    
    if (children) {
      if (typeof children === 'string') return [children];
      if (Array.isArray(children)) return children;
    }
    
    if (errors.length > 0) return errors;
    
    return [];
  })();

  // Don't render if no errors or show is false
  if (!show || errorMessages.length === 0) {
    return null;
  }

  const baseStyles = `
    text-sm font-medium text-red-600 transition-all duration-200
  `;

  const containerStyles = cn(
    baseStyles,
    'flex items-start rtl:flex-row-reverse',
    className
  );

  const ErrorIcon = () => (
    <AlertCircle 
      className="w-4 h-4 mt-0.5 flex-shrink-0" 
      aria-hidden="true"
    />
  );

  // Single error message
  if (errorMessages.length === 1) {
    return (
      <div
        id={id}
        role={role}
        aria-live={ariaLive}
        dir={dir}
        className={containerStyles}
        {...props}
      >
        {icon && (
          <span className="mr-1.5 rtl:mr-0 rtl:ml-1.5">
            <ErrorIcon />
          </span>
        )}
        <span>{errorMessages[0]}</span>
      </div>
    );
  }

  // Multiple error messages
  return (
    <div
      id={id}
      role={role}
      aria-live={ariaLive}
      dir={dir}
      className={cn(baseStyles, className)}
      {...props}
    >
      <div className="flex items-start rtl:flex-row-reverse">
        {icon && (
          <span className="mr-1.5 rtl:mr-0 rtl:ml-1.5 mt-0.5">
            <ErrorIcon />
          </span>
        )}
        <div className="flex-1">
          <ul className="space-y-1 list-none">
            {errorMessages.map((message, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0" />
                <span>{message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;