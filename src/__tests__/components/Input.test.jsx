import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Input from "../../components/atoms/Input";

describe("Input Component", () => {
  it("renders with default type text", () => {
    render(<Input placeholder="Enter name" />);
    const input = screen.getByPlaceholderText("Enter name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("applies disabled attribute", () => {
    render(<Input placeholder="Disabled" disabled />);
    const input = screen.getByPlaceholderText("Disabled");
    expect(input).toBeDisabled();
  });

  it("applies required attribute", () => {
    render(<Input placeholder="Required field" required />);
    const input = screen.getByPlaceholderText("Required field");
    expect(input).toBeRequired();
  });

  it("applies error styles when error is true", () => {
    render(<Input placeholder="Error field" error />);
    const input = screen.getByPlaceholderText("Error field");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("uses valid styles when no error", () => {
    render(<Input placeholder="Valid field" />);
    const input = screen.getByPlaceholderText("Valid field");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("passes custom className", () => {
    render(<Input placeholder="Custom class" className="custom-class" />);
    const input = screen.getByPlaceholderText("Custom class");
    expect(input).toHaveClass("custom-class");
  });

  it("respects dir attribute", () => {
    render(<Input placeholder="RTL input" dir="rtl" />);
    const input = screen.getByPlaceholderText("RTL input");
    expect(input).toHaveAttribute("dir", "rtl");
  });
});
