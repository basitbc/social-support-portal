import React, { useEffect, useRef } from 'react';
import { AlertTriangle, AlertCircle, X, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';
import Button from '../atoms/Button';

const ValidationSummary = ({
  // Error data
  errors = [],
  warnings = [],
  
  // Display options
  title = 'Please fix the following issues:',
  showTitle = true,
  showIcon = true,
  showCloseButton = false,
  showErrorCount = true,
  
  // Behavior
  autoFocus = true,
  onClose,
  onErrorClick,
  dismissible = false,
  
  // Styling
  variant = 'error', // 'error' | 'warning' | 'mixed'
  size = 'md',
  className,
  
  // Animation
  animate = true,
  
  // Accessibility
  role = 'alert',
  'aria-live': ariaLive = 'polite',
  
  ...props
}) => {
  const summaryRef = useRef(null);
  const totalErrors = errors.length + warnings.length;
  
  // Auto-focus for accessibility
  useEffect(() => {
    if (autoFocus && totalErrors > 0 && summaryRef.current) {
      summaryRef.current.focus();
    }
  }, [autoFocus, totalErrors]);

  // Don't render if no errors or warnings
  if (totalErrors === 0) {
    return null;
  }

  // Determine styling based on variant and content
  const getVariantStyles = () => {
    if (errors.length > 0) {
      return {
        container: 'bg-red-50 border-red-200 text-red-800',
        icon: AlertCircle,
        iconColor: 'text-red-500',
        title: 'text-red-800',
        link: 'text-red-700 hover:text-red-900 hover:underline'
      };
    } else {
      return {
        container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        icon: AlertTriangle,
        iconColor: 'text-yellow-500',
        title: 'text-yellow-800',
        link: 'text-yellow-700 hover:text-yellow-900 hover:underline'
      };
    }
  };

  const styles = getVariantStyles();
  const Icon = styles.icon;

  // Size variants
  const sizeClasses = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-5 text-lg'
  };

  // Format error/warning for display
  const formatItem = (item, type = 'error') => {
    if (typeof item === 'string') {
      return { message: item, field: null, type };
    }
    if (typeof item === 'object' && item.message) {
      return { ...item, type };
    }
    return { message: String(item), field: null, type };
  };

  // Combine and format all items
  const allItems = [
    ...errors.map(error => formatItem(error, 'error')),
    ...warnings.map(warning => formatItem(warning, 'warning'))
  ];

  // Handle item click (scroll to field)
  const handleItemClick = (item) => {
    if (onErrorClick) {
      onErrorClick(item);
    } else if (item.field) {
      // Try to focus the field with error
      const fieldElement = document.getElementById(item.field) || 
                          document.querySelector(`[name="${item.field}"]`);
      if (fieldElement) {
        fieldElement.focus();
        fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div
      ref={summaryRef}
      role={role}
      aria-live={ariaLive}
      tabIndex={autoFocus ? -1 : undefined}
      className={cn(
        'border rounded-lg transition-all duration-300',
        styles.container,
        sizeClasses[size],
        animate && 'animate-fade-in',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Icon and content */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          {showIcon && (
            <div className="flex-shrink-0 pt-0.5">
              <Icon className={cn('w-5 h-5', styles.iconColor)} />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            {showTitle && (
              <div className="flex items-center gap-2 mb-2">
                <h3 className={cn('font-semibold', styles.title)}>
                  {title}
                </h3>
                {showErrorCount && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/50">
                    {totalErrors} {totalErrors === 1 ? 'issue' : 'issues'}
                  </span>
                )}
              </div>
            )}

            {/* Error/Warning list */}
            <ul className="space-y-1.5">
              {allItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  {/* Item type indicator */}
                  <div className="flex-shrink-0 pt-1">
                    {item.type === 'error' ? (
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    )}
                  </div>

                  {/* Item content */}
                  <div className="flex-1 min-w-0">
                    {item.field && onErrorClick ? (
                      <button
                        type="button"
                        onClick={() => handleItemClick(item)}
                        className={cn(
                          'text-left underline-offset-2 transition-colors duration-200',
                          styles.link,
                          'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current rounded'
                        )}
                      >
                        {item.message}
                      </button>
                    ) : (
                      <span>{item.message}</span>
                    )}

                    {/* Field name hint */}
                    {item.field && (
                      <div className="text-xs opacity-75 mt-0.5">
                        Field: {item.field}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Additional help text */}
            {totalErrors > 3 && (
              <div className="mt-3 text-sm opacity-75">
                Please fix these issues before proceeding to the next step.
              </div>
            )}
          </div>
        </div>

        {/* Close button */}
        {(showCloseButton || dismissible) && onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            icon={X}
            className={cn(
              'flex-shrink-0 w-8 h-8 p-0 rounded-full',
              'hover:bg-white/50 focus:bg-white/50',
              styles.iconColor
            )}
            aria-label="Dismiss validation summary"
          />
        )}
      </div>

      {/* Progress indicator for fixing errors */}
      {errors.length > 0 && warnings.length > 0 && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>{errors.length} errors</span>
                <span>{warnings.length} warnings</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-1.5">
                <div 
                  className="bg-current h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(warnings.length / totalErrors) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationSummary;