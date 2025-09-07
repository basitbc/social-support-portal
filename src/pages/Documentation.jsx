import React, { useState, memo, useMemo } from 'react';
import { ChevronDown, ChevronRight, Database, Layers, Zap, Globe, ArrowRight, Users, Settings, AlertCircle } from 'lucide-react';

// Data constants for better maintainability
const TECH_STACK = ['React', 'Vite', 'Tailwind v4', 'Context API', 'i18next', 'OpenAI', 'Atomic Design'];

const ATOMS_DATA = [
  { name: 'Input.jsx', desc: 'Text input with validation, error states, accessibility attributes' },
  { name: 'Select.jsx', desc: 'Dropdown with option groups, keyboard navigation, RTL support' },
  { name: 'Textarea.jsx', desc: 'Multi-line text with AI button integration, character count' },
  { name: 'Button.jsx', desc: 'Multi-variant (primary, secondary, outline), loading states' },
  { name: 'ProgressBar.jsx', desc: 'Step progress with ARIA labels, visual indicators' },
  { name: 'RadioGroup.jsx', desc: 'Radio buttons with proper grouping, validation' },
  { name: 'Checkbox.jsx', desc: 'Single checkbox with indeterminate state support' },
  { name: 'Label.jsx', desc: 'Form label with required indicator, proper associations' },
  { name: 'ErrorMessage.jsx', desc: 'Validation error display with ARIA live regions' },
  { name: 'LoadingSpinner.jsx', desc: 'Loading indicator with accessibility announcements' }
];

const FUNCTIONAL_REQUIREMENTS = [
  {
    title: 'Core User Journey',
    color: 'green',
    items: [
      'Multi-step wizard form (3 steps + review)',
      'Form validation with real-time feedback',
      'Data persistence across sessions',
      'Progress tracking and navigation',
      'Final submission with confirmation'
    ]
  },
  {
    title: 'Form Fields',
    color: 'blue',
    items: [
      'Step 1: 9 personal info fields',
      'Step 2: 5 family & financial fields',
      'Step 3: 3 situation description textareas',
      'Field validation with error messages',
      'Required field indicators'
    ]
  },
  {
    title: 'AI Integration',
    color: 'purple',
    items: [
      '"Help Me Write" button on textareas',
      'OpenAI GPT text suggestions',
      'Modal with Accept/Edit/Discard options',
      'Context-aware prompting',
      'Fallback for API failures'
    ]
  },
  {
    title: 'Internationalization',
    color: 'orange',
    items: [
      'Bilingual support (English + Arabic)',
      'RTL (Right-to-Left) layout support',
      'Dynamic language switching',
      'Culturally appropriate formatting',
      'Translation persistence'
    ]
  },
  {
    title: 'Data Management',
    color: 'teal',
    items: [
      'LocalStorage persistence',
      'Auto-save on field changes',
      'Data recovery on page reload',
      'Final submission via mock API',
      'Reference number generation'
    ]
  },
  {
    title: 'User Experience',
    color: 'pink',
    items: [
      'Responsive, mobile-first design',
      'Loading states and transitions',
      'Error boundaries for graceful failures',
      'Confirmation and success pages',
      'Terms & conditions acceptance'
    ]
  }
];

const NON_FUNCTIONAL_REQUIREMENTS = [
  {
    title: 'Performance',
    color: 'red',
    items: [
      'Initial load time < 3 seconds',
      'Form submission < 2 seconds',
      'AI response time < 10 seconds',
      'Smooth animations (60fps)',
      'Lazy loading for heavy components'
    ]
  },
  {
    title: 'Accessibility',
    color: 'blue',
    items: [
      'WCAG 2.1 AA compliance',
      'Screen reader compatibility',
      'Keyboard navigation support',
      'High contrast mode support',
      'Focus management and ARIA labels'
    ]
  },
  {
    title: 'Reliability',
    color: 'green',
    items: [
      '99.5% uptime availability',
      'Error recovery mechanisms',
      'Data persistence reliability',
      'Graceful API failure handling',
      'Cross-browser compatibility'
    ]
  },
  {
    title: 'Security',
    color: 'yellow',
    items: [
      'Client-side data validation',
      'Secure API communication',
      'PII data protection',
      'Content Security Policy (CSP)',
      'XSS and injection prevention'
    ]
  },
  {
    title: 'Scalability',
    color: 'purple',
    items: [
      'Component reusability',
      'Modular architecture',
      'Easy step addition/removal',
      'Language expansion support',
      'API integration flexibility'
    ]
  },
  {
    title: 'Maintainability',
    color: 'teal',
    items: [
      'Clean code principles',
      'Comprehensive documentation',
      'Automated testing setup',
      'Version control best practices',
      'Code review processes'
    ]
  }
];

// Reusable Components
const RequirementCard = memo(({ title, color, items }) => (
  <div className={`bg-${color}-50 p-4 rounded border-l-4 border-${color}-400`}>
    <h5 className={`font-semibold text-${color}-900 mb-2`}>{title}</h5>
    <ul className={`text-sm text-${color}-800 space-y-1`}>
      {items.map((item, index) => (
        <li key={index}>• {item}</li>
      ))}
    </ul>
  </div>
));

const FlowStep = memo(({ step, action, index, isLast }) => (
  <div className="flex items-center">
    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
      {index + 1}. {step}
    </div>
    {!isLast && <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />}
  </div>
));

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
        <button 
          onClick={() => setHasError(false)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return children;
};

// Memoized Section Components
const RequirementsSection = memo(() => (
  <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-xl border border-indigo-200">
    <div className="space-y-6">
      {/* Functional Requirements */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" aria-hidden="true" />
          Functional Requirements
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FUNCTIONAL_REQUIREMENTS.map((req, index) => (
            <RequirementCard key={req.title} {...req} />
          ))}
        </div>
      </div>

      {/* Non-Functional Requirements */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" aria-hidden="true" />
          Non-Functional Requirements
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {NON_FUNCTIONAL_REQUIREMENTS.map((req) => (
            <RequirementCard key={req.title} {...req} />
          ))}
        </div>
      </div>

      {/* Out of Scope */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-semibold text-red-900 mb-4">Out of Scope (Non-Requirements)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h5 className="font-semibold text-gray-800 mb-2">Backend Implementation</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Real database integration</li>
              <li>• User authentication system</li>
              <li>• Server-side validation</li>
              <li>• Payment processing</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h5 className="font-semibold text-gray-800 mb-2">Advanced Features</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Document upload/attachment</li>
              <li>• Email notifications</li>
              <li>• Application status tracking</li>
              <li>• Admin dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const ArchitectureDiagram = memo(() => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl border border-blue-200">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Presentation Layer */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4" aria-hidden="true" />
          Presentation Layer
        </h4>
        <div className="space-y-3 text-sm">
          <div className="bg-blue-50 p-3 rounded">
            <strong>Layouts</strong>
            <div className="text-gray-600 mt-1">WizardLayout, MainLayout</div>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <strong>Pages</strong>
            <div className="text-gray-600 mt-1">Start → Step1 → Step2 → Step3 → Review → Success</div>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <strong>Organisms</strong>
            <div className="text-gray-600 mt-1">StepForm, AISuggestionModal, ReviewSection</div>
          </div>
        </div>
      </div>

      {/* State Management Layer */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
        <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4" aria-hidden="true" />
          State Management
        </h4>
        <div className="space-y-3 text-sm">
          <div className="bg-green-50 p-3 rounded">
            <strong>FormContext</strong>
            <div className="text-gray-600 mt-1">Form data, validation, step management</div>
          </div>
          <div className="bg-blue-50 p-3 rounded">
            <strong>UIContext</strong>
            <div className="text-gray-600 mt-1">Loading states, language, errors</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded">
            <strong>Local Storage</strong>
            <div className="text-gray-600 mt-1">Data persistence & recovery</div>
          </div>
        </div>
      </div>

      {/* Service Layer */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
        <h4 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4" aria-hidden="true" />
          Service Layer
        </h4>
        <div className="space-y-3 text-sm">
          <div className="bg-purple-50 p-3 rounded">
            <strong>API Service</strong>
            <div className="text-gray-600 mt-1">HTTP calls, error handling</div>
          </div>
          <div className="bg-orange-50 p-3 rounded">
            <strong>AI Service</strong>
            <div className="text-gray-600 mt-1">OpenAI integration, prompts</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <strong>i18n Service</strong>
            <div className="text-gray-600 mt-1">Translation, RTL support</div>
          </div>
        </div>
      </div>
    </div>

    {/* Data Flow Arrows */}
    <div className="flex justify-center space-x-8 text-gray-500" aria-hidden="true">
      <ArrowRight className="w-6 h-6" />
      <ArrowRight className="w-6 h-6" />
      <ArrowRight className="w-6 h-6" />
    </div>
  </div>
));

const DataFlowDiagram = memo(() => {
  const persistenceSteps = useMemo(() => [
    'User Input',
    'Form Validation', 
    'Context Update',
    'LocalStorage Save',
    'Step Navigation',
    'Final Submit'
  ], []);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl border border-green-200">
      <div className="space-y-6">
        {/* State Flow */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="font-semibold text-green-900 mb-4">State Flow Architecture</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">FormContext State</h5>
              <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                {`{
  currentStep: 1,
  formData: {
    step1: { name, email, phone... },
    step2: { family, income... },
    step3: { descriptions... }
  },
  isValid: boolean,
  errors: object
}`}
              </pre>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">UIContext State</h5>
              <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                {`{
  language: 'en' | 'ar',
  isRTL: boolean,
  isLoading: boolean,
  globalError: string,
  aiModalOpen: boolean
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Data Persistence Flow */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="font-semibold text-green-900 mb-4">Data Persistence Flow</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {persistenceSteps.map((step, index) => (
              <FlowStep
                key={step}
                step={step}
                index={index}
                isLast={index === persistenceSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const ComponentFlow = memo(() => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-xl border border-purple-200">
    <div className="space-y-6">
      {/* Atomic Design Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-semibold text-purple-900 mb-4">Atomic Design Hierarchy</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Atoms', desc: 'Basic UI elements', color: 'blue' },
            { name: 'Molecules', desc: 'Simple combinations', color: 'green' },
            { name: 'Organisms', desc: 'Complex UI sections', color: 'yellow' },
            { name: 'Layouts', desc: 'Page templates', color: 'purple' }
          ].map(level => (
            <div key={level.name} className="text-center">
              <div className={`bg-${level.color}-100 text-${level.color}-800 p-3 rounded-lg mb-2`}>
                <strong>{level.name}</strong>
              </div>
              <div className="text-sm text-gray-600">{level.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Atoms */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-semibold text-blue-900 mb-4">Atoms (Basic Building Blocks)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ATOMS_DATA.map(atom => (
            <div key={atom.name} className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
              <div className="font-semibold text-blue-900 text-sm">{atom.name}</div>
              <div className="text-xs text-blue-700 mt-1">{atom.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Example */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-semibold text-purple-900 mb-4">Component Data Flow Example</h4>
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
          {`// Example: Step1.jsx → StepForm → FormField → Input
<Step1>
  <StepForm currentStep={1} onSubmit={handleNext}>
    <FormField name="fullName" label="Full Name" required>
      <Input 
        value={formData.step1.fullName} 
        onChange={updateFormData}
        validation={nameValidation}
        placeholder={t('form.fullName.placeholder')}
        aria-describedby="fullName-error"
      />
    </FormField>
  </StepForm>
</Step1>`}
        </pre>
      </div>
    </div>
  </div>
));

const IntegrationFlow = memo(() => (
  <div className="bg-gradient-to-br from-orange-50 to-red-100 p-8 rounded-xl border border-orange-200">
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-semibold text-orange-900 mb-4">AI Integration Flow</h4>
        <div className="space-y-4">
          {[
            { step: 'User clicks "Help Me Write"', action: 'Opens AI modal' },
            { step: 'User provides context', action: 'Validates input' },
            { step: 'API call to OpenAI', action: 'Shows loading state' },
            { step: 'Receive AI response', action: 'Display suggestions' },
            { step: 'User accepts/edits', action: 'Updates form field' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-orange-50 p-3 rounded">
              <span className="font-medium">{item.step}</span>
              <ArrowRight className="w-4 h-4 text-orange-500" aria-hidden="true" />
              <span className="text-gray-600">{item.action}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-semibold text-orange-900 mb-4">Error Handling Strategy</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Network Errors', desc: 'Retry mechanism, offline fallback', color: 'red' },
            { title: 'Validation Errors', desc: 'Field-level validation, error boundaries', color: 'yellow' },
            { title: 'AI API Errors', desc: 'Graceful degradation, manual input fallback', color: 'blue' }
          ].map(error => (
            <div key={error.title} className={`bg-${error.color}-50 p-3 rounded`}>
              <strong className={`text-${error.color}-800`}>{error.title}</strong>
              <div className="text-sm text-gray-600 mt-1">{error.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
));

const SystemDesignDocs = () => {
  const [activeSection, setActiveSection] = useState('requirements');

  const sections = useMemo(() => [
    { id: 'requirements', title: 'Requirements', icon: Settings },
    { id: 'architecture', title: 'System Architecture', icon: Layers },
    { id: 'dataflow', title: 'Data Flow & State', icon: Database },
    { id: 'components', title: 'Component Flow', icon: Users },
    { id: 'integrations', title: 'AI & API Integration', icon: Zap }
  ], []);

  const renderContent = () => {
    switch (activeSection) {
      case 'requirements':
        return <RequirementsSection />;
      case 'architecture':
        return <ArchitectureDiagram />;
      case 'dataflow':
        return <DataFlowDiagram />;
      case 'components':
        return <ComponentFlow />;
      case 'integrations':
        return <IntegrationFlow />;
      default:
        return <RequirementsSection />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="bg-white p-8 rounded-xl shadow-sm border mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Government Social Support Portal
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              System Architecture & Design Documentation
            </p>
            <div className="flex flex-wrap gap-2" role="list">
              {TECH_STACK.map(tech => (
                <span 
                  key={tech} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  role="listitem"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          {/* Navigation */}
          <nav 
            className="bg-white p-4 rounded-xl shadow-sm border mb-8"
            role="navigation"
            aria-label="Documentation sections"
          >
            <div className="flex flex-wrap gap-2">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-pressed={activeSection === section.id}
                    aria-label={`View ${section.title} section`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {section.title}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Content */}
          <main className="mb-8" role="main">
            {renderContent()}
          </main>

          {/* Key Principles */}
          <section className="bg-white p-8 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Architecture Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'SOLID Principles', desc: 'Single responsibility, open/closed, dependency inversion for maintainable code.', color: 'blue' },
                { title: 'Atomic Design', desc: 'Hierarchical component structure from atoms to templates for consistency.', color: 'green' },
                { title: 'Context Pattern', desc: 'Centralized state management with separation of concerns.', color: 'purple' },
                { title: 'Progressive Enhancement', desc: 'AI features enhance but don\'t replace core functionality.', color: 'orange' },
                { title: 'Accessibility First', desc: 'ARIA roles, keyboard navigation, screen reader support.', color: 'teal' },
                { title: 'Internationalization', desc: 'RTL support, dynamic translations, cultural considerations.', color: 'pink' }
              ].map(principle => (
                <div key={principle.title} className={`bg-${principle.color}-50 p-6 rounded-lg`}>
                  <h3 className={`font-semibold text-${principle.color}-900 mb-3`}>{principle.title}</h3>
                  <p className={`text-${principle.color}-800 text-sm`}>{principle.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SystemDesignDocs;