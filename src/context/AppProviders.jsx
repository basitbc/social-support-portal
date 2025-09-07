import React from 'react';
import { FormProvider } from './FormContext';
import { UIProvider } from './UIContext';

// Import i18n configuration to initialize it
import '../i18n';

/**
 * Combined providers wrapper for the application
 * This wraps all the context providers in the correct order
 */
const AppProviders = ({ children }) => {
  return (
    <UIProvider>
      <FormProvider>
        {children}
      </FormProvider>
    </UIProvider>
  );
};

export default AppProviders;