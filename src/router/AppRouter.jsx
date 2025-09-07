import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page Components
import Start from '../pages/Start';
import Step1 from '../pages/Step1';
import Step2 from '../pages/Step2';
import Step3 from '../pages/Step3';
import Review from '../pages/Review';
import Success from '../pages/Success';
import { ROUTES } from '../config/constants';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Start />} />
      {/* Protected Step Routes */}
      <Route 
        path={ROUTES.STEP_1} 
        element={
          <ProtectedRoute stepNumber={1}>
            <Step1 />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.STEP_2} 
        element={
          <ProtectedRoute stepNumber={2}>
            <Step2 />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.STEP_3} 
        element={
          <ProtectedRoute stepNumber={3}>
            <Step3 />
          </ProtectedRoute>
        } 
      />
      
      {/* Other Routes */}
      <Route 
        path={ROUTES.REVIEW} 
        element={
          <ProtectedRoute stepNumber={4}>
            <Review />
          </ProtectedRoute>
        } 
      />
      <Route path={ROUTES.SUCCESS} element={<Success />} />
      
      {/* Fallback - redirect to home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};

export default AppRouter;