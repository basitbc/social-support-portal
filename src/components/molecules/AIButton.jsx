import React, { useState } from 'react';
import { Lightbulb, Loader2, Sparkles, MessageSquare, PenTool } from 'lucide-react';
import { cn } from '../../utils/helpers';
import Button from '../atoms/Button';

const AIButton = ({
  // Core functionality
  onClick,
  onRetry,
  loading = false,
  disabled = false,
  
  // Content & state
  fieldValue = '',
  placeholder = '',
  hasContent = false,
  
  // UI customization
  variant = 'secondary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md',
  label = 'Help Me Write',
  loadingLabel = 'AI is thinking...',
  icon = Lightbulb,
  
  // Features
  showTooltip = true,
  showProgress = false,
  animateOnHover = true,
  
  // Error handling
  error = null,
  retryLabel = 'Try Again',
  
  // Layout
  position = 'inline', // 'inline' | 'floating' | 'attached'
  className,
  
  // Analytics/tracking
  onAnalytics,
  
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine button state and styling
  const getButtonVariant = () => {
    if (error) return 'outline';
    if (loading) return 'secondary';
    return variant;
  };

  const getButtonIcon = () => {
    if (loading) return Loader2;
    if (error) return MessageSquare;
    if (hasContent) return PenTool;
    return icon;
  };

  const getButtonLabel = () => {
    if (loading) return loadingLabel;
    if (error) return retryLabel;
    if (hasContent) return 'Improve Text';
    return label;
  };

  // Handle button click with analytics
  const handleClick = () => {
    if (loading || disabled) return;
    
    // Track analytics if handler provided
    onAnalytics?.({
      action: error ? 'ai_retry' : 'ai_help_requested',
      fieldValue: fieldValue?.length || 0,
      hasExistingContent: hasContent
    });

    // Call appropriate handler
    if (error && onRetry) {
      onRetry();
    } else if (onClick) {
      onClick();
    }
  };

  // Position-specific classes
  const positionClasses = cn({
    // Inline with other content
    'inline-flex': position === 'inline',
    
    // Floating over content
    'absolute top-2 right-2 z-10': position === 'floating',
    
    // Attached to input/textarea
    'relative': position === 'attached'
  });

  // Animation classes
  const animationClasses = cn(
    animateOnHover && [
      'transition-all duration-200',
      isHovered && !loading && 'transform scale-105'
    ]
  );

  // Button content with proper loading states
  const buttonContent = (
    <Button
      variant={getButtonVariant()}
      size={size}
      onClick={handleClick}
      disabled={disabled}
      loading={loading}
      icon={getButtonIcon()}
      iconPosition="left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        positionClasses,
        animationClasses,
        // Error state styling
        error && 'border-red-300 text-red-600 hover:border-red-400',
        // AI-specific styling
        !error && !loading && [
          'hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700',
          'focus:ring-primary-500'
        ],
        // Loading state
        loading && 'cursor-wait',
        className
      )}
      aria-label={`${getButtonLabel()}${fieldValue ? ' for current text' : ''}`}
      aria-describedby={showTooltip ? 'ai-button-tooltip' : undefined}
      {...props}
    >
      <span className="flex items-center gap-2">
        {/* Progress indicator for loading */}
        {loading && showProgress && (
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-current rounded-full animate-pulse delay-75" />
            <div className="w-1 h-1 bg-current rounded-full animate-pulse delay-150" />
          </div>
        )}
        
        {/* Button text */}
        <span className="hidden sm:inline">
          {getButtonLabel()}
        </span>
        <span className="sm:hidden">
          {loading ? 'AI...' : error ? 'Retry' : hasContent ? 'Edit' : 'AI'}
        </span>
        
        {/* Sparkle effect for emphasis */}
        {!loading && !error && animateOnHover && isHovered && (
          <Sparkles className="w-3 h-3 text-primary-500 animate-pulse" />
        )}
      </span>
    </Button>
  );

  // Tooltip content
  const tooltipContent = (
    <div className="text-sm">
      {loading && 'AI is generating suggestions...'}
      {error && 'Something went wrong. Click to try again.'}
      {!loading && !error && hasContent && 'Get AI suggestions to improve your text'}
      {!loading && !error && !hasContent && 'Let AI help you write this section'}
    </div>
  );

  return (
    <div className="relative inline-block">
      {buttonContent}
      
      {/* Tooltip */}
      {showTooltip && (
        <div
          id="ai-button-tooltip"
          className={cn(
            'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2',
            'px-3 py-1 bg-gray-900 text-white text-xs rounded-lg',
            'opacity-0 pointer-events-none transition-opacity duration-200',
            'whitespace-nowrap z-20',
            isHovered && 'opacity-100'
          )}
          role="tooltip"
        >
          {tooltipContent}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-600 max-w-48">
          {typeof error === 'string' ? error : 'Failed to get AI suggestions'}
        </div>
      )}

      {/* Loading overlay for attached position */}
      {loading && position === 'attached' && (
        <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="hidden sm:inline">AI thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIButton;