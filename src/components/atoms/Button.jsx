import React, { forwardRef } from "react";
import { cn } from "../../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      type = "button",
      disabled = false,
      loading = false,
      onClick,
      className,
      icon,
      iconPosition = "left",
      dir = "auto",
      ...props
    },
    ref
  ) => {

    // base-styles
    const baseStyles = `
      inline-flex items-center justify-center font-medium
      cursor-pointer transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:cursor-not-allowed select-none shadow-sm
    `;

    // variants
    const variants = {
      primary: `
        bg-primary-500 text-white border border-primary-500
        hover:bg-primary-600 hover:border-primary-600
        focus:ring-primary-500
        disabled:bg-primary-300 disabled:border-primary-300
      `,
      secondary: `
        bg-gray-100 text-gray-800 border border-gray-200
        hover:bg-gray-200 hover:border-gray-300
        focus:ring-gray-400
        disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200
      `,
      outline: `
        bg-white text-primary-600 border border-primary-600
        hover:bg-primary-50 hover:border-primary-700
        focus:ring-primary-500
        disabled:text-primary-300 disabled:border-primary-200 disabled:bg-gray-50
      `,
      danger: `
        bg-red-600 text-white border border-red-600
        hover:bg-red-700 hover:border-red-700
        focus:ring-red-500
        disabled:bg-red-300 disabled:border-red-300
      `,
      success: `
        bg-mint-500 text-white border border-mint-500
        hover:bg-mint-600 hover:border-mint-600
        focus:ring-mint-500
        disabled:bg-mint-300 disabled:border-mint-300
      `,
    };

    // button-sizes
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 sm:px-6 sm:py-3 text-base",
      lg: "px-6 py-3 sm:px-8 sm:py-4 text-lg",
    };


    const rtlStyles = `
      rtl:flex-row-reverse
    `;


    // check if text is visible
    const hasVisibleText = React.Children.toArray(children).some(child => {
      if (typeof child === 'string') return child.trim().length > 0;
      if (React.isValidElement(child)) {
        const className = child.props?.className || '';
        const isHidden = className.includes('hidden') && !className.includes('sm:inline');
        return !isHidden;
      }
      return true;
    });



    const iconElement = icon && (
      <span
        className={cn(
          "flex-shrink-0",
          hasVisibleText && iconPosition === "left" && "mr-1 rtl:mr-0 rtl:ml-2",
          hasVisibleText && iconPosition === "right" && "ml-2 rtl:ml-0 rtl:mr-2"
        )}
      >
        {typeof icon === "string" ? <i className={icon} /> : icon}
      </span>
    );


    const content = (
      <>
        {loading && (
          <LoadingSpinner
            size="sm"
            className={cn("text-current", hasVisibleText && "mr-2 rtl:mr-0 rtl:ml-2")}
          />
        )}
        {!loading && iconPosition === "left" && iconElement}
        {children}
        {!loading && iconPosition === "right" && iconElement}
      </>
    );

    

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        dir={dir}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size], 
          rtlStyles,
          className
        )}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;