import React, { useState } from 'react';
import { Edit, ChevronDown, ChevronUp, Check, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';
import Button from '../atoms/Button';

const ReviewSection = ({
  // Data
  sections = [],
  formData = {},
  
  // Configuration
  title = 'Review Your Application',
  description = 'Please review all information before submitting your application.',
  
  // Handlers
  onEdit,
  onSectionEdit,
  
  // Validation
  errors = {},
  warnings = {},
  
  // UI Options
  allowEdit = true,
  showEmptyFields = false,
  collapsible = true,
  defaultExpanded = true,
  
  // Styling
  className,
  sectionClassName,
  
  // Accessibility
  dir = 'auto',
  
  ...props
}) => {
  const [expandedSections, setExpandedSections] = useState(() => {
    return sections.reduce((acc, section, index) => {
      acc[section.id || index] = defaultExpanded;
      return acc;
    }, {});
  });

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    if (!collapsible) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Handle edit button click
  const handleEdit = (section, field = null) => {
    if (onSectionEdit) {
      onSectionEdit(section.id || section.step, field);
    } else if (onEdit) {
      onEdit(section.step || section.id, field);
    }
  };

  // Format field value for display
  const formatValue = (value, field) => {
    if (value === null || value === undefined || value === '') {
      return showEmptyFields ? (
        <span className="text-gray-400 italic">Not provided</span>
      ) : null;
    }

    // Handle different field types
    switch (field.type) {
      case 'email':
        return <a href={`mailto:${value}`} className="text-primary-600 hover:text-primary-700">{value}</a>;
      
      case 'tel':
        return <a href={`tel:${value}`} className="text-primary-600 hover:text-primary-700">{value}</a>;
      
      case 'url':
        return <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">{value}</a>;
      
      case 'textarea':
        return (
          <div className="whitespace-pre-wrap break-words">
            {value.length > 200 ? (
              <details className="group">
                <summary className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium">
                  {value.substring(0, 200)}... <span className="group-open:hidden">Show more</span><span className="hidden group-open:inline">Show less</span>
                </summary>
                <div className="mt-2">{value.substring(200)}</div>
              </details>
            ) : value}
          </div>
        );
      
      case 'select':
      case 'radio':
        return <span className="capitalize">{value}</span>;
      
      case 'checkbox':
        return value ? (
          <span className="text-green-600 font-medium">Yes</span>
        ) : (
          <span className="text-gray-500">No</span>
        );
      
      case 'date':
        return new Date(value).toLocaleDateString();
      
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      
      default:
        return value;
    }
  };

  // Get section validation status
  const getSectionStatus = (section) => {
    const sectionErrors = errors[section.id] || [];
    const sectionWarnings = warnings[section.id] || [];
    
    if (sectionErrors.length > 0) return 'error';
    if (sectionWarnings.length > 0) return 'warning';
    return 'complete';
  };

  // Get status icon and color
  const getStatusIcon = (status) => {
    switch (status) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'complete':
        return <Check className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('review-section w-full', className)} dir={dir} {...props}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 text-lg">
            {description}
          </p>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => {
          const sectionId = section.id || index;
          const isExpanded = expandedSections[sectionId];
          const sectionStatus = getSectionStatus(section);
          const sectionErrors = errors[section.id] || [];
          const sectionWarnings = warnings[section.id] || [];

          return (
            <div
              key={sectionId}
              className={cn(
                'review-section-item bg-white rounded-lg border shadow-sm transition-all duration-200',
                sectionStatus === 'error' && 'border-red-200 bg-red-50',
                sectionStatus === 'warning' && 'border-yellow-200 bg-yellow-50',
                sectionStatus === 'complete' && 'border-green-200',
                sectionClassName
              )}
            >
              {/* Section Header */}
              <div
                className={cn(
                  'flex items-center justify-between p-4 sm:p-6',
                  collapsible && 'cursor-pointer hover:bg-gray-50',
                  isExpanded && collapsible && 'border-b border-gray-200'
                )}
                onClick={() => collapsible && toggleSection(sectionId)}
              >
                <div className="flex items-center gap-3">
                  {/* Status Icon */}
                  {getStatusIcon(sectionStatus)}
                  
                  {/* Section Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.title || section.label}
                    </h3>
                    {section.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {section.description}
                      </p>
                    )}
                    
                    {/* Error/Warning Count */}
                    {(sectionErrors.length > 0 || sectionWarnings.length > 0) && (
                      <div className="flex items-center gap-2 mt-2">
                        {sectionErrors.length > 0 && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            {sectionErrors.length} error{sectionErrors.length !== 1 ? 's' : ''}
                          </span>
                        )}
                        {sectionWarnings.length > 0 && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                            {sectionWarnings.length} warning{sectionWarnings.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Edit Button */}
                  {allowEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(section);
                      }}
                      icon={Edit}
                      className="hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700"
                    >
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  )}

                  {/* Collapse Toggle */}
                  {collapsible && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={isExpanded ? ChevronUp : ChevronDown}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                    />
                  )}
                </div>
              </div>

              {/* Section Content */}
              {isExpanded && (
                <div className="p-4 sm:p-6">
                  {/* Error Messages */}
                  {sectionErrors.length > 0 && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="text-sm font-medium text-red-800 mb-2">
                        Please fix the following issues:
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {sectionErrors.map((error, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            {error.message || error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warning Messages */}
                  {sectionWarnings.length > 0 && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="text-sm font-medium text-yellow-800 mb-2">
                        Please review:
                      </h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {sectionWarnings.map((warning, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                            {warning.message || warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.fields?.map((field, fieldIndex) => {
                      const fieldValue = formData[field.name];
                      const formattedValue = formatValue(fieldValue, field);
                      
                      if (!formattedValue && !showEmptyFields) {
                        return null;
                      }

                      return (
                        <div
                          key={field.name || fieldIndex}
                          className={cn(
                            'field-review p-3 rounded-lg border border-gray-200 bg-gray-50',
                            field.type === 'textarea' && 'md:col-span-2'
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <dt className="text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                                {field.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </dt>
                              <dd className="text-sm text-gray-900">
                                {formattedValue}
                              </dd>
                            </div>
                            
                            {allowEdit && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(section, field.name)}
                                icon={Edit}
                                className="text-gray-400 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Edit ${field.label}`}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Empty Section Message */}
                  {(!section.fields || section.fields.length === 0) && (
                    <div className="text-center py-6 text-gray-500">
                      <p>No fields defined for this section</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Application Summary
            </h3>
            <p className="text-sm text-gray-600">
              {sections.length} section{sections.length !== 1 ? 's' : ''} completed
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {Math.round((sections.filter(s => getSectionStatus(s) === 'complete').length / sections.length) * 100)}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;