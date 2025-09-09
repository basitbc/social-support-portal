import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

vi.mock('../router/AppRouter.jsx', () => ({
  default: () => <div data-testid="app-router">App Router</div>
}));

vi.mock('../components/organisms/ErrorBoundary.jsx', () => ({
  default: ({ children }) => <div data-testid="error-boundary">{children}</div>
}));

vi.mock('../components/atoms/LoadingSpinner.jsx', () => ({
  default: ({ size }) => <div data-testid="loading-spinner">Loading Spinner {size}</div>
}));

vi.mock('../context/AppProviders.jsx', () => ({
  default: ({ children }) => <div data-testid="app-providers">{children}</div>
}));

vi.mock('../components/atoms/ScrollToTop.jsx', () => ({
  default: () => <div data-testid="scroll-to-top">Scroll to Top</div>
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en'
    }
  })
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    
    const appDiv = screen.getByText('App Router');
    expect(appDiv).toBeInTheDocument();
  });

  it('renders all main components', () => {
    render(<App />);
    
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('app-providers')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
  });

  it('sets correct document attributes for English', () => {
    render(<App />);
    
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('has the correct App structure', () => {
    render(<App />);
    
    const appDiv = document.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
    expect(appDiv).toHaveAttribute('id', 'app');
  });
});