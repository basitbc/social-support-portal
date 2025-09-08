// AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import ProtectedRoute from './ProtectedRoute';
import Docs from '../pages/Documentation';
import LoadingSpinner from '../components/atoms/LoadingSpinner';

// Lazy loaded page components for code splitting
const Start = React.lazy(() => import('../pages/Start'));
const Step1 = React.lazy(() => import('../pages/Step1'));
const Step2 = React.lazy(() => import('../pages/Step2'));
const Step3 = React.lazy(() => import('../pages/Step3'));
const Review = React.lazy(() => import('../pages/Review'));
const Success = React.lazy(() => import('../pages/Success'));

// Configuration for protected step routes with step numbers
const STEP_ROUTES = [
  { path: ROUTES.STEP_1, component: Step1, stepNumber: 1 },
  { path: ROUTES.STEP_2, component: Step2, stepNumber: 2 },
  { path: ROUTES.STEP_3, component: Step3, stepNumber: 3 },
  { path: ROUTES.REVIEW, component: Review, stepNumber: 4 }
];

// Loading fallback component for lazy loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[700px]">
    <div className="flex flex-col items-center gap-3">
      <LoadingSpinner size="lg" color="pink" />
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  </div>
);

// Main application router component
const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes - accessible without authentication */}
      <Route 
        path={ROUTES.HOME} 
        element={
          <React.Suspense fallback={<LoadingFallback />}>
            <Start />
          </React.Suspense>
        } 
      />
      
      <Route 
        path={ROUTES.SUCCESS} 
        element={
          <React.Suspense fallback={<LoadingFallback />}>
            <Success />
          </React.Suspense>
        } 
      />

      <Route 
        path={ROUTES.DOCS} 
        element={
          <React.Suspense fallback={<LoadingFallback />}>
            <Docs />
          </React.Suspense>
        } 
      />
      
      {/* Protected Step Routes - wrapped with step validation */}
      {STEP_ROUTES.map(({ path, component: Component, stepNumber }) => (
        <Route 
          key={path}
          path={path} 
          element={
            <ProtectedRoute stepNumber={stepNumber}>
              <React.Suspense fallback={<LoadingFallback />}>
                <Component />
              </React.Suspense>
            </ProtectedRoute>
          } 
        />
      ))}
      
      {/* Catch-all route - redirect unknown paths to home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};

export default AppRouter;