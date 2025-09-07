import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';
import { Lightbulb, Loader2 } from 'lucide-react';

const Textarea = forwardRef(({
  placeholder,
  error,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  className,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  dir = 'auto',
  ...props
}, ref) => {
  const baseStyles = `
    w-full px-4 py-3 border rounded-lg transition-all duration-200 font-medium
    text-gray-900 placeholder-gray-500 bg-white resize-y min-h-[100px]
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
    rtl:text-right rtl:pr-4 rtl:pl-4
  `;

  // For character count - we need to get the current value from props
  const currentValue = props.value || props.defaultValue || '';
  const currentLength = currentValue.length || 0;
  const isNearLimit = maxLength && currentLength > maxLength * 0.8;
  const isAtLimit = maxLength && currentLength >= maxLength;

  return (
    <div className="relative">
      <textarea
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid || error ? 'true' : 'false'}
        dir={dir}
        className={cn(
          baseStyles,
          error ? errorStyles : validStyles,
          rtlStyles,
          className
        )}
        {...props}
      />
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;