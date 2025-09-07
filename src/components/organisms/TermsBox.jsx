import React, { useState, useRef } from 'react';
import { FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/helpers';
import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';

const TermsBox = ({
  // Content
  title,
  content,
  termsUrl,
  privacyUrl,
  
  // State
  accepted = false,
  onAcceptedChange,
  
  // Validation
  required = true,
  error,
  
  // UI Configuration
  collapsible = true,
  defaultExpanded = false,
  showExternalLinks = true,
  maxHeight = '300px',
  
  // Styling
  className,
  contentClassName,
  
  // Accessibility
  dir,
  'aria-describedby': ariaDescribedBy,
  
  ...props
}) => {
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentRef = useRef(null);

  // Use translation for title if not provided
  const displayTitle = title || t('components.termsBox.title');
  
  // Get direction from i18n if not explicitly set
  const textDirection = dir || (i18n.language === 'ar' ? 'rtl' : 'ltr');
  
  // Use translated content if not provided
  const displayContent = content || t('components.termsBox.content');

  const handleToggle = () => {
    if (!collapsible) return;
    setIsExpanded(!isExpanded);
  };

  const handleAcceptChange = (checked) => {
    onAcceptedChange?.(checked);
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  return (
    <div 
      className={cn('terms-box w-full', className)}
      dir={textDirection}
      {...props}
    >
      {/* Header */}
      <div 
        className={cn(
          'flex items-center justify-between p-4 bg-white border border-gray-200 rounded-t-lg',
          !isExpanded && !collapsible && 'rounded-b-lg',
          collapsible && 'cursor-pointer hover:bg-gray-50',
          error && 'border-red-300 bg-red-50'
        )}
        onClick={collapsible ? handleToggle : undefined}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            error ? 'bg-red-100' : 'bg-primary-100'
          )}>
            <FileText className={cn(
              'w-4 h-4',
              error ? 'text-red-600' : 'text-primary-600'
            )} />
          </div>
          
          <div>
            <h3 className={cn(
              'text-lg font-semibold',
              error ? 'text-red-900' : 'text-gray-900'
            )}>
              {displayTitle}
            </h3>
            {required && (
              <p className="text-sm text-gray-600">
                {t('components.termsBox.readAndAccept')}
              </p>
            )}
          </div>
        </div>

        {collapsible && (
          <Button
            variant="ghost"
            size="sm"
            icon={isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            className="text-gray-400 hover:text-gray-600"
            aria-label={isExpanded ? t('components.termsBox.collapse') : t('components.termsBox.expand')}
          />
        )}
      </div>

      {/* Content */}
      {(isExpanded || !collapsible) && (
        <div className={cn(
          'border-l border-r border-gray-200',
          error && 'border-red-300'
        )}>
          <div 
            ref={contentRef}
            className={cn(
              'p-4 overflow-y-auto prose prose-sm max-w-none',
              'prose-headings:text-gray-900 prose-p:text-gray-700',
              'prose-strong:text-gray-900 prose-ul:text-gray-700',
              contentClassName
            )}
            style={{ maxHeight }}
          >
            {/* Render markdown-style content */}
            <div 
              className="space-y-4 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: displayContent
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^/, '<p>')
                  .replace(/$/, '</p>')
              }} 
            />

            {/* Scroll to top button */}
            {isExpanded && (
              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  icon={<ChevronUp className="w-4 h-4" />}
                  className="text-gray-500 hover:text-primary-600"
                >
                  {t('components.termsBox.backToTop')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={cn(
        'p-4 bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg',
        error && 'border-red-300 bg-red-50'
      )}>
        {/* External Links */}
        {showExternalLinks && (termsUrl || privacyUrl) && (
          <div className="flex flex-wrap gap-4 mb-4">
            {termsUrl && (
              <a
                href={termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                {t('components.termsBox.fullTerms')}
              </a>
            )}
            
            {privacyUrl && (
              <a
                href={privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                {t('components.termsBox.privacyPolicy')}
              </a>
            )}
          </div>
        )}

        {/* Acceptance Checkbox */}
        <div className="space-y-2">
          <Checkbox
            id="terms-acceptance"
            checked={accepted}
            onChange={(e) => handleAcceptChange(e.target.checked)}
            required={required}
            error={!!error}
            label={
              <span>
                {t('components.termsBox.acceptanceLabel', { title: displayTitle })}
              </span>
            }
            description={
              required 
                ? t('components.termsBox.requiredDescription')
                : t('components.termsBox.optionalDescription')
            }
            aria-describedby={ariaDescribedBy}
          />

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 mt-2" role="alert">
              {error}
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-xs text-gray-500">
          <p>
            {t('components.termsBox.additionalInfo')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsBox;