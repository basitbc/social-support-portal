import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Textarea from "../../components/atoms/Textarea";


describe("Textarea Component", () => {
  it("renders with default rows", () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText("Enter text");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("rows", "4"); // default rows
  });

  it("applies disabled attribute", () => {
    render(<Textarea placeholder="Disabled textarea" disabled />);
    const textarea = screen.getByPlaceholderText("Disabled textarea");
    expect(textarea).toBeDisabled();
  });

  it("applies required attribute", () => {
    render(<Textarea placeholder="Required textarea" required />);
    const textarea = screen.getByPlaceholderText("Required textarea");
    expect(textarea).toBeRequired();
  });

  it("applies error styles when error is true", () => {
    render(<Textarea placeholder="Error textarea" error />);
    const textarea = screen.getByPlaceholderText("Error textarea");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("uses valid styles when no error", () => {
    render(<Textarea placeholder="Valid textarea" />);
    const textarea = screen.getByPlaceholderText("Valid textarea");
    expect(textarea).toHaveAttribute("aria-invalid", "false");
  });

  it("respects custom rows and maxLength", () => {
    render(<Textarea placeholder="Custom textarea" rows={6} maxLength={100} />);
    const textarea = screen.getByPlaceholderText("Custom textarea");
    expect(textarea).toHaveAttribute("rows", "6");
    expect(textarea).toHaveAttribute("maxLength", "100");
  });

  it("passes custom className", () => {
    render(<Textarea placeholder="With custom class" className="custom-class" />);
    const textarea = screen.getByPlaceholderText("With custom class");
    expect(textarea).toHaveClass("custom-class");
  });

  it("respects dir attribute", () => {
    render(<Textarea placeholder="RTL textarea" dir="rtl" />);
    const textarea = screen.getByPlaceholderText("RTL textarea");
    expect(textarea).toHaveAttribute("dir", "rtl");
  });
});
