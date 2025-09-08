import React, { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppRouter from './router/AppRouter.jsx';
import ErrorBoundary from './components/organisms/ErrorBoundary.jsx';
import LoadingSpinner from './components/atoms/LoadingSpinner.jsx';
import AppProviders from './context/AppProviders.jsx';
import ScrollToTop from './components/atoms/ScrollToTop.jsx';

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

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <ErrorBoundary>
      <div className="App" id="app">
        <BrowserRouter>
          <AppProviders>
            <ScrollToTop />
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
