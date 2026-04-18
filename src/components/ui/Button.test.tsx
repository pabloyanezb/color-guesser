import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

afterEach(cleanup);

describe("Button", () => {
  it("renders with children", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies fullWidth class when fullWidth prop is true", () => {
    render(<Button onClick={() => {}} fullWidth>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");
  });

  it("applies brand variant classes correctly", () => {
    render(<Button onClick={() => {}} variant="brand">Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-500");
    expect(button).toHaveClass("text-black");
  });

  it("has type button by default", () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("accepts custom type prop", () => {
    render(<Button onClick={() => {}} type="submit">Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("accepts reset type prop", () => {
    render(<Button onClick={() => {}} type="reset">Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "reset");
  });

  it("has no disabled attribute by default", () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).not.toHaveAttribute("disabled");
  });

  it("applies disabled attribute when disabled prop is true", () => {
    render(<Button onClick={() => {}} disabled>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("disabled");
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies disabled styles when disabled", () => {
    render(<Button onClick={() => {}} disabled>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("opacity-50");
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("applies base classes correctly for all variants", () => {
    const variants = ["primary", "brand", "info", "success", "warning"] as const;

    variants.forEach((variant) => {
      render(<Button onClick={() => {}} variant={variant}>Test</Button>);
      const button = screen.getByRole("button");

      expect(button).toHaveClass("uppercase");
      expect(button).toHaveClass("font-bold");
      expect(button).toHaveClass("border-4");
      expect(button).toHaveClass("border-black");
      expect(button).toHaveClass("transition-colors");

      cleanup();
    });
  });

  it("renders without onClick prop", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with multiple children", () => {
    render(
      <Button onClick={() => {}}>
        <span>Icon</span>
        <span>Text</span>
      </Button>,
    );

    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button onClick={() => {}} className="custom-class">Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
