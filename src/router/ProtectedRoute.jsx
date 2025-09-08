import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { ROUTES, stepRequirements } from '../config/constants';

const ProtectedRoute = ({ children, stepNumber, requiredData = [] }) => {
  const { formData, currentStep, setCurrentStep, termsAccepted } = useFormContext();

  // Sync currentStep with URL
  useEffect(() => {
    if (currentStep !== stepNumber) {
      setCurrentStep(stepNumber);
    }
  }, [stepNumber, currentStep, setCurrentStep]);

  if (!termsAccepted) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const hasRequiredData = (step) => {
    const required = stepRequirements[step] || [];
    return required.every(field => formData[field] && formData[field].trim() !== '');
  };

  const getHighestAccessibleStep = () => {
    if (hasRequiredData(4)) return 4; 
    if (hasRequiredData(3)) return 3;
    if (hasRequiredData(2)) return 2;
    return 1;
  };

  const highestAccessible = getHighestAccessibleStep();

  if (stepNumber > highestAccessible) {
    const redirectRoutes = {
      1: ROUTES.STEP_1,
      2: ROUTES.STEP_2,
      3: ROUTES.STEP_3,
      4: ROUTES.REVIEW
    };
    
    const redirectRoute = redirectRoutes[highestAccessible] || ROUTES.STEP_1;
    return <Navigate to={redirectRoute} replace />;
  }

  return children;
};

export default ProtectedRoute;