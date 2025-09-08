import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  options = [],
  optionGroups = [],
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  className,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  dir = 'auto',
  ...props
}, ref) => {
  const baseStyles = `
    w-full px-4 py-3 border rounded-lg transition-all duration-200 font-medium
    text-gray-900 bg-white appearance-none cursor-pointer
    focus:outline-none focus:ring-2 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
  `;

  const validStyles = `
    border-gray-300 hover:border-gray-400 focus:ring-blue-500
  `;

  const errorStyles = `
    border-red-300 hover:border-red-400 focus:ring-red-500 bg-red-50
  `;

  const rtlStyles = `
    rtl:text-right rtl:pr-10 rtl:pl-4
  `;

  const hasGroups = optionGroups.length > 0;
  const simpleOptions = hasGroups ? [] : options;

  const renderOption = (option, index) => {
    if (typeof option === 'string') {
      return (
        <option key={index} value={option}>
          {option}
        </option>
      );
    }
    
    return (
      <option 
        key={option.value || index} 
        value={option.value} 
        disabled={option.disabled}
      >
        {option.label}
      </option>
    );
  };

  const renderOptionGroup = (group, groupIndex) => (
    <optgroup key={group.label || groupIndex} label={group.label}>
      {group.options.map((option, optionIndex) => 
        renderOption(option, `${groupIndex}-${optionIndex}`)
      )}
    </optgroup>
  );

  return (
    <div className="relative">
      <select
        ref={ref}
        disabled={disabled}
        required={required}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid || error ? 'true' : 'false'}
        dir={dir}
        className={cn(
          baseStyles,
          error ? errorStyles : validStyles,
          rtlStyles,
          'pr-10 rtl:pr-4 rtl:pl-10', 
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {hasGroups ? (
          optionGroups.map(renderOptionGroup)
        ) : (
          simpleOptions.map(renderOption)
        )}
      </select>

      <div className={cn(
        'absolute inset-y-0 right-0 rtl:right-auto rtl:left-0',
        'flex items-center px-2 pointer-events-none',
        disabled ? 'text-gray-400' : 'text-gray-500'
      )}>
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;