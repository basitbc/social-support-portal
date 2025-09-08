import React, { forwardRef } from 'react';
import { cn, generateId } from '../../utils/helpers';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Select from '../atoms/Select';
import RadioGroup from '../atoms/RadioGroup';
import Checkbox from '../atoms/Checkbox';
import ErrorMessage from '../atoms/ErrorMessage';

const FormField = forwardRef(({
  type = 'text',
  name,
  label,
  placeholder,
  
  register,
  rules = {},
  errors = {},
  control,
  
  options = [],
  optionGroups = [],
  
  required = false,
  optional = false,
  disabled = false,
  
  helpText,
  description,
  
  aiLoading = false,
  
  className,
  fieldClassName,
  labelClassName,
  layout = 'vertical', 
  size = 'md',
  
  'aria-describedby': ariaDescribedBy,
  dir = 'auto',
  
  ...props
}, ref) => {
  const fieldId = generateId(name || 'field');
  const fieldError = errors[name];
  const errorId = fieldError ? `${fieldId}-error` : undefined;
  const helpId = helpText ? `${fieldId}-help` : undefined;
  const describedBy = [ariaDescribedBy, errorId, helpId].filter(Boolean).join(' ');

  const containerClasses = cn(
    'form-field w-full',
    layout === 'horizontal' && 'flex flex-col sm:flex-row sm:items-start sm:gap-4',
    className
  );

  const labelWrapperClasses = cn(
    layout === 'horizontal' && 'sm:w-1/3 sm:flex-shrink-0 sm:pt-3'
  );

  const fieldWrapperClasses = cn(
    'w-full',
    layout === 'horizontal' && 'sm:w-2/3'
  );

  const fieldSpacing = cn(
    layout === 'vertical' ? 'space-y-2' : 'space-y-1'
  );

  const registerProps = register && name ? register(name, rules) : {};

  const renderField = () => {
    const commonProps = {
      id: fieldId,
      name,
      error: !!fieldError,
      disabled,
      required,
      placeholder,
      'aria-describedby': describedBy,
      'aria-invalid': fieldError ? 'true' : 'false',
      dir,
      className: fieldClassName,
      ...registerProps, 
      ...props
    };

    // For controlled components that don't support ref forwarding directly
    if (ref) {
      commonProps.ref = ref;
    }

    switch (type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
          />
        );

      case 'select':
        return (
          <Select
            {...commonProps}
            options={options}
            optionGroups={optionGroups}
          />
        );

      case 'radio':
        return (
          <RadioGroup
            {...commonProps}
            options={options}
            orientation="vertical"
          />
        );

      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            label={placeholder || label}
            description={description}
          />
        );

      case 'email':
      case 'password':
      case 'tel':
      case 'url':
      case 'number':
      case 'date':
      case 'text':
      default:
        return <Input {...commonProps} type={type} />;
    }
  };

  return (
    <div className={containerClasses}>
      {/* Label Section */}
      {label && type !== 'checkbox' && (
        <div className={labelWrapperClasses}>
          <Label
            htmlFor={fieldId}
            required={required}
            optional={optional}
            error={!!fieldError}
            disabled={disabled}
            size={size}
            className={labelClassName}
            dir={dir}
          >
            {label}
          </Label>
        </div>
      )}

      <div className={fieldWrapperClasses}>
        <div className={fieldSpacing}>
          {description && type !== 'checkbox' && (
            <p className="text-sm text-gray-600" id={`${fieldId}-description`}>
              {description}
            </p>
          )}

          {renderField()}

          {/* Help text */}
          {helpText && (
            <p 
              id={helpId}
              className="text-sm text-gray-500"
            >
              {helpText}
            </p>
          )}

          {fieldError && (
            <ErrorMessage
              id={errorId}
              error={fieldError.message || fieldError}
              show={true}
            />
          )}
        </div>
      </div>
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;