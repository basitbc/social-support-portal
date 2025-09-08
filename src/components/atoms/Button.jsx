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

    // Base styles - Common styles applied to all button variants
    const baseStyles = `
      inline-flex items-center justify-center font-medium
      cursor-pointer transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:cursor-not-allowed select-none shadow-sm
    `;

    // Button variant styles - Different visual styles for different button types
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

    // Button size styles - Different padding and text sizes
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 sm:px-6 sm:py-3 text-base",
      lg: "px-6 py-3 sm:px-8 sm:py-4 text-lg",
    };

    // RTL (Right-to-Left) layout support styles
    const rtlStyles = `
      rtl:flex-row-reverse
    `;

    /**
     * Check if button has visible text content
     * This helps determine proper icon spacing when text is present
     */
    const hasVisibleText = React.Children.toArray(children).some(child => {
      // Check for non-empty string children
      if (typeof child === 'string') return child.trim().length > 0;
      
      // Check for React elements that aren't hidden
      if (React.isValidElement(child)) {
        const className = child.props?.className || '';
        const isHidden = className.includes('hidden') && !className.includes('sm:inline');
        return !isHidden;
      }
      
      return true;
    });

    /**
     * Render icon element with proper spacing
     * Supports both icon class strings and React elements
     */
    const iconElement = icon && (
      <span
        className={cn(
          "flex-shrink-0",
          // Left icon spacing (with RTL support)
          hasVisibleText && iconPosition === "left" && "mr-1 rtl:mr-0 rtl:ml-2",
          // Right icon spacing (with RTL support)
          hasVisibleText && iconPosition === "right" && "ml-2 rtl:ml-0 rtl:mr-2"
        )}
      >
        {typeof icon === "string" ? <i className={icon} /> : icon}
      </span>
    );

    /**
     * Compose button content with loading spinner, icons, and children
     * Order: [loading spinner] [left icon] [children] [right icon]
     */
    const content = (
      <>
        {/* Loading spinner - shown when loading state is active */}
        {loading && (
          <LoadingSpinner
            size="sm"
            className={cn("text-current", hasVisibleText && "mr-2 rtl:mr-0 rtl:ml-2")}
          />
        )}
        
        {/* Left-positioned icon (when not loading) */}
        {!loading && iconPosition === "left" && iconElement}
        
        {/* Button content/children */}
        {children}
        
        {/* Right-positioned icon (when not loading) */}
        {!loading && iconPosition === "right" && iconElement}
      </>
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading} // Disable button when explicitly disabled or loading
        onClick={onClick}
        dir={dir} // Text direction for RTL support
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size], 
          rtlStyles,
          className // Allow custom classes to override defaults
        )}
        {...props} // Spread any additional props
      >
        {content}
      </button>
    );
  }
);

// Set display name for better debugging in React DevTools
Button.displayName = "Button";

export default Button;