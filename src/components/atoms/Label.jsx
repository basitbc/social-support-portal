import React from 'react';
import { cn } from '../../utils/helpers';

const Label = ({
  children,
  htmlFor,
  required = false,
  optional = false,
  error = false,
  disabled = false,
  size = 'md',
  className,
  requiredIndicator = '*',
  optionalText = '(optional)',
  dir = 'auto',
  ...props
}) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  };

  const baseStyles = `
    block font-medium transition-colors duration-200
  `;

  const labelStyles = cn(
    baseStyles,
    sizes[size],
    error 
      ? 'text-red-900' 
      : disabled 
        ? 'text-gray-400' 
        : 'text-gray-900',
    className
  );

  const requiredStyles = cn(
    'ml-1 rtl:ml-0 rtl:mr-1',
    error ? 'text-red-600' : 'text-red-500'
  );

  const optionalStyles = cn(
    'ml-2 rtl:ml-0 rtl:mr-2 font-normal',
    error ? 'text-red-600' : 'text-gray-500'
  );

  return (
    <label
      htmlFor={htmlFor}
      dir={dir}
      className={labelStyles}
      {...props}
    >
      <span>{children}</span>
      
      {required && !optional && (
        <span 
          className={requiredStyles}
          aria-label="required field"
          title="This field is required"
        >
          {requiredIndicator}
        </span>
      )}
      
      {optional && !required && (
        <span 
          className={optionalStyles}
          aria-label="optional field"
          title="This field is optional"
        >
          {optionalText}
        </span>
      )}
    </label>
  );
};

export default Label;