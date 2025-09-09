import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import ProtectedRoute from './ProtectedRoute';
import Docs from '../pages/Documentation';
import LoadingSpinner from '../components/atoms/LoadingSpinner';

// Code splitting with descriptive component names
const Start = React.lazy(() => import('../pages/Start'));
const PersonalInfo = React.lazy(() => import('../pages/PersonalInfo'));
const FamilyFinancial = React.lazy(() => import('../pages/FamilyFinancial'));
const SituationDetails = React.lazy(() => import('../pages/SituationDetails'));
const Review = React.lazy(() => import('../pages/Review'));
const Success = React.lazy(() => import('../pages/Success'));

const STEP_ROUTES = [
  { path: ROUTES.PERSONAL_INFO, component: PersonalInfo, stepNumber: 1 },
  { path: ROUTES.FAMILY_FINANCIAL, component: FamilyFinancial, stepNumber: 2 },
  { path: ROUTES.SITUATION_DETAILS, component: SituationDetails, stepNumber: 3 },
  { path: ROUTES.REVIEW, component: Review, stepNumber: 4 }
];

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[700px]">
    <div className="flex flex-col items-center gap-3">
      <LoadingSpinner size="lg" color="pink" />
      <p className="text-gray-600 text-sm">Loading...</p>
    </div>
  </div>
);

const AppRouter = () => {
  return (
    <Routes>
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
      
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};

export default AppRouter;