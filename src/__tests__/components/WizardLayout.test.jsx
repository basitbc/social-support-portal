import React from "react";
import { render, screen } from "@testing-library/react";
import WizardLayout from "../../components/layouts/WizardLayout";

// Mock contexts (Vitest uses `vi.mock`)
vi.mock("../../context/FormContext", () => ({
  useFormContext: () => ({
    currentStep: 1,
    navigateToStep: vi.fn(),
  }),
}));

vi.mock("../../context/UIContext", () => ({
  useUIContext: () => ({
    isRTL: false,
  }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("../../components/atoms/ProgressBar", () => ({
  default: (props) => (
    <div data-testid="progress-bar">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("../../components/molecules/LanguageToggle", () => ({
  default: () => <div data-testid="language-toggle">LanguageToggle</div>,
}));

describe("WizardLayout", () => {
  it("renders with default title and subtitle", () => {
    render(<WizardLayout>Content</WizardLayout>);
    expect(
      screen.getByText("Social Support Application")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Complete this form to apply for financial assistance")
    ).toBeInTheDocument();
  });

  it("renders custom title and subtitle", () => {
    render(<WizardLayout title="Custom Title" subtitle="Custom Subtitle" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("hides subtitle when not provided", () => {
    render(<WizardLayout title="Custom Title" subtitle={null} />);
    expect(
      screen.queryByText(
        "Complete this form to apply for financial assistance"
      )
    ).not.toBeInTheDocument();
  });

  it("renders language toggle", () => {
    render(<WizardLayout />);
    expect(screen.getByTestId("language-toggle")).toBeInTheDocument();
  });

  it("renders progress bar when showProgress is true", () => {
    render(<WizardLayout showProgress={true} />);
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
  });

  it("does not render progress bar when showProgress is false", () => {
    render(<WizardLayout showProgress={false} />);
    expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(<WizardLayout footer={<div>Footer Content</div>} />);
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});
