import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';
import { Check, Minus } from 'lucide-react';

const Checkbox = forwardRef(({
  id,
  label,
  description,
  checked = false,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  indeterminate = false,
  size = 'md',
  className,
  labelClassName,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  dir = 'auto',
  ...props
}, ref) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const labelSizes = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  };

  const baseCheckboxStyles = `
    border-2 rounded transition-all duration-200 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  const checkboxStyles = cn(
    baseCheckboxStyles,
    sizes[size],
    checked || indeterminate ? (
      error 
        ? 'border-red-500 bg-red-500 text-white' 
        : 'border-blue-600 bg-blue-600 text-white'
    ) : (
      error 
        ? 'border-red-300 hover:border-red-400 bg-white' 
        : 'border-gray-300 hover:border-gray-400 bg-white'
    )
  );

  const containerStyles = cn(
    'flex items-start rtl:flex-row-reverse',
    disabled && 'opacity-50',
    className
  );

  const labelStyles = cn(
    'block font-medium cursor-pointer transition-colors duration-200',
    labelSizes[size],
    error ? 'text-red-900' : 'text-gray-900',
    disabled && 'cursor-not-allowed',
    labelClassName
  );

  const CheckIcon = () => (
    <Check className={cn('w-full h-full', size === 'sm' ? 'p-0.5' : 'p-0.5')} strokeWidth={3} />
  );

  const IndeterminateIcon = () => (
    <Minus className="w-full h-full p-0.5" strokeWidth={3} />
  );

  return (
    <div className={containerStyles}>
      <div className="flex items-center h-6">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid || error ? 'true' : 'false'}
          dir={dir}
          className="sr-only" 
          {...props}
        />
        
        <label 
          htmlFor={id}
          className={checkboxStyles}
          aria-hidden="true"
        >
          {indeterminate ? (
            <IndeterminateIcon />
          ) : checked ? (
            <CheckIcon />
          ) : null}
        </label>
      </div>

      {/* Label and Description */}
      {(label || description) && (
        <div className={cn(
          'ml-3 rtl:ml-0 rtl:mr-3',
          disabled && 'opacity-50'
        )}>
          {label && (
            <label htmlFor={id} className={labelStyles}>
              {label}
              {required && (
                <span className="text-red-500 ml-1" aria-label="required">
                  *
                </span>
              )}
            </label>
          )}
          
          {description && (
            <p className={cn(
              'mt-1 text-xs',
              error ? 'text-red-600' : 'text-gray-500'
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;