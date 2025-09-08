import React, { useState } from 'react';
import { cn } from '../../utils/helpers';

const RadioGroup = ({
  options = [],
  value,
  onChange,
  name,
  error,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  dir = 'auto',
  ...props
}) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (event, index) => {
    const { key } = event;
    
    if (key === 'ArrowDown' || key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (index + 1) % options.length;
      setFocusedIndex(nextIndex);
      // Focus the next radio button
      const nextRadio = event.target.closest('.radio-group').querySelectorAll('input[type="radio"]')[nextIndex];
      nextRadio?.focus();
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = index === 0 ? options.length - 1 : index - 1;
      setFocusedIndex(prevIndex);
      // Focus the previous radio button
      const prevRadio = event.target.closest('.radio-group').querySelectorAll('input[type="radio"]')[prevIndex];
      prevRadio?.focus();
    }
  };

  const handleRadioChange = (optionValue) => {
    if (!disabled && onChange) {
      onChange(optionValue);
    }
  };

  const baseGroupStyles = cn(
    'radio-group space-y-3',
    orientation === 'horizontal' && 'flex flex-wrap gap-6 space-y-0',
    className
  );

  const renderOption = (option, index) => {
    const optionValue = typeof option === 'string' ? option : option.value;
    const optionLabel = typeof option === 'string' ? option : option.label;
    const optionDisabled = disabled || (typeof option === 'object' && option.disabled);
    const isSelected = value === optionValue;
    const radioId = `${name}-${index}`;

    return (
      <div 
        key={optionValue || index}
        className={cn(
          'flex items-start rtl:flex-row-reverse',
          orientation === 'horizontal' && 'flex-shrink-0'
        )}
      >
        <div className="flex items-center h-6">
          <input
            id={radioId}
            type="radio"
            name={name}
            value={optionValue}
            checked={isSelected}
            onChange={() => handleRadioChange(optionValue)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
            disabled={optionDisabled}
            required={required && index === 0} // Only first radio needs required
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid || error ? 'true' : 'false'}
            dir={dir}
            className={cn(
              'w-4 h-4 border-2 rounded-full transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isSelected ? (
                error 
                  ? 'border-red-500 bg-red-500 text-white' 
                  : 'border-blue-600 bg-blue-600 text-white'
              ) : (
                error 
                  ? 'border-red-300 text-red-600 hover:border-red-400' 
                  : 'border-gray-300 text-blue-600 hover:border-gray-400'
              ),
              optionDisabled && 'cursor-not-allowed opacity-50'
            )}
          />
        </div>
        
        <div className={cn(
          'ml-3 rtl:ml-0 rtl:mr-3',
          optionDisabled && 'opacity-50'
        )}>
          <label 
            htmlFor={radioId}
            className={cn(
              'block text-sm font-medium cursor-pointer transition-colors duration-200',
              error ? 'text-red-900' : 'text-gray-900',
              optionDisabled && 'cursor-not-allowed'
            )}
          >
            {optionLabel}
          </label>
          
          {typeof option === 'object' && option.description && (
            <p className={cn(
              'mt-1 text-xs',
              error ? 'text-red-600' : 'text-gray-500'
            )}>
              {option.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <fieldset 
      className={baseGroupStyles}
      aria-invalid={ariaInvalid || error ? 'true' : 'false'}
      {...props}
    >
      {options.map(renderOption)}
    </fieldset>
  );
};

export default RadioGroup;