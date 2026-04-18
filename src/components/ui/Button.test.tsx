import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

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

  it("applies variant classes correctly", () => {
    render(<Button onClick={() => {}} variant="brand">Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-500");
    expect(button).toHaveClass("text-black");
  });
});
