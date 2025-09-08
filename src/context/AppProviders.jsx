import { FormProvider } from './FormContext';
import { UIProvider } from './UIContext';

// Initialize i18n configuration
import '../i18n';

// Combined providers wrapper
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