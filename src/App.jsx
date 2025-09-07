import React, { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Providers Wrapper

// Router Component
import AppRouter from './router/AppRouter.jsx';

// Error Boundary
import ErrorBoundary from './components/organisms/ErrorBoundary.jsx';

// Loading Component
import LoadingSpinner from './components/atoms/LoadingSpinner.jsx';

// Custom Hooks
import useAccessibility from './hooks/useAccessibility.js';
import AppProviders from './context/AppProviders.jsx';

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">Loading application...</p>
    </div>
  </div>
);

function App() {
  const { i18n } = useTranslation();
  const { setupSkipLinks } = useAccessibility();

  useEffect(() => {

    setupSkipLinks();
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language, setupSkipLinks]);

  return (
    <ErrorBoundary>
      <div className="App" id="app">
        <BrowserRouter>
          <AppProviders>
            <Suspense fallback={<LoadingFallback />}>
              <AppRouter />
            </Suspense>
          </AppProviders>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
