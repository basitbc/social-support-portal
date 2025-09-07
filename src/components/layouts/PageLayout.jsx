// layouts/PageLayout.jsx
import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { cn } from '../../utils/helpers';
import Button from '../atoms/Button';

const PageLayout = ({
  children,
  title,
  subtitle,
  breadcrumbs = [],
  showBackButton = false,
  onBack,
  backUrl,
  actions,
  maxWidth = '4xl',
  centered = true,
  background = 'default',
  className,
  ...props
}) => {
  const backgroundClasses = {
    default: 'bg-gray-50',
    white: 'bg-white',
    gray: 'bg-gray-100',
  };

  const maxWidthClasses = {
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      window.location.href = backUrl;
    } else {
      window.history.back();
    }
  };

  return (
    <div className={cn('min-h-screen', backgroundClasses[background], className)} {...props}>
      <div className={cn(
        'w-full px-4 py-6 sm:px-6 sm:py-8',
        centered && 'mx-auto',
        maxWidthClasses[maxWidth]
      )}>
        {/* Header */}
        {(title || breadcrumbs.length > 0 || showBackButton || actions) && (
          <header className="mb-6 sm:mb-8">
            {/* Navigation Row */}
            {(breadcrumbs.length > 0 || showBackButton) && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {showBackButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      icon={<ArrowLeft className="w-4 h-4" />}
                      className="text-gray-600 hover:text-primary-600"
                    >
                      <span className="hidden sm:inline">Back</span>
                    </Button>
                  )}
                </div>
                {actions && (
                  <div className="flex items-center space-x-2">
                    {actions}
                  </div>
                )}
              </div>
            )}

            {/* Title Section */}
            {(title || subtitle) && (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {title && (
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl">
                      {subtitle}
                    </p>
                  )}
                </div>
                {!breadcrumbs.length && !showBackButton && actions && (
                  <div className="flex-shrink-0 ml-4">
                    <div className="flex items-center space-x-2">
                      {actions}
                    </div>
                  </div>
                )}
              </div>
            )}
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;