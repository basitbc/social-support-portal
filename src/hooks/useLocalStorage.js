import { useState, useEffect, useCallback } from 'react';

// Custom hook for managing localStorage with React state synchronization
export const useLocalStorage = (key, initialValue) => {
  // Initialize state with localStorage value or fallback to initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Wrapped setter function that persists to localStorage
  const setValue = useCallback((value) => {
    try {
      // Support function values like useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update state
      setStoredValue(valueToStore);
      
      // Persist to localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove item from localStorage and reset to initial value
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};