import { render, screen, fireEvent } from "@testing-library/react";
import { HSLSliders } from "./HSLSliders";
import type { HSL } from "@/types";

describe("HSLSliders", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders three sliders", () => {
    const hsl: HSL = { h: 180, s: 50, l: 50 };
    render(<HSLSliders hsl={hsl} onChange={mockOnChange} />);

    expect(screen.getByText("Hue")).toBeInTheDocument();
    expect(screen.getByText("Saturation")).toBeInTheDocument();
    expect(screen.getByText("Lightness")).toBeInTheDocument();
  });

  it("renders sliders with correct values", () => {
    const hsl: HSL = { h: 180, s: 50, l: 50 };
    render(<HSLSliders hsl={hsl} onChange={mockOnChange} />);

    const inputs = screen.getAllByRole("slider");
    expect(inputs[0]).toHaveValue("180");
    expect(inputs[1]).toHaveValue("50");
    expect(inputs[2]).toHaveValue("50");
  });

  it("calls onChange when Hue slider changes", () => {
    const hsl: HSL = { h: 0, s: 50, l: 50 };
    render(<HSLSliders hsl={hsl} onChange={mockOnChange} />);

    const hueInput = screen.getAllByRole("slider")[0];
    fireEvent.change(hueInput, { target: { value: 120 } });

    expect(mockOnChange).toHaveBeenCalledWith({ h: 120, s: 50, l: 50 });
  });

  it("calls onChange when Saturation slider changes", () => {
    const hsl: HSL = { h: 180, s: 0, l: 50 };
    render(<HSLSliders hsl={hsl} onChange={mockOnChange} />);

    const satInput = screen.getAllByRole("slider")[1];
    fireEvent.change(satInput, { target: { value: 75 } });

    expect(mockOnChange).toHaveBeenCalledWith({ h: 180, s: 75, l: 50 });
  });

  it("calls onChange when Lightness slider changes", () => {
    const hsl: HSL = { h: 180, s: 50, l: 0 };
    render(<HSLSliders hsl={hsl} onChange={mockOnChange} />);

    const lightInput = screen.getAllByRole("slider")[2];
    fireEvent.change(lightInput, { target: { value: 80 } });

    expect(mockOnChange).toHaveBeenCalledWith({ h: 180, s: 50, l: 80 });
  });

  it("has correct min/max for Hue slider", () => {
    const hsl: HSL = { h: 180, s: 50, l: 50 };
    render(<HSLSliders hsl={hsl} onChange={mockOnChange} />);

    const hueInput = screen.getAllByRole("slider")[0];
    expect(hueInput).toHaveAttribute("min", "0");
    expect(hueInput).toHaveAttribute("max", "360");
  });

  it("has correct min/max for Saturation slider", () => {
    const hsl: HSL = { h: 180, s: 50, l: 50 };
    render(<HSLSliders hsl={hsl} onChange={mockOnChange} />);

    const satInput = screen.getAllByRole("slider")[1];
    expect(satInput).toHaveAttribute("min", "0");
    expect(satInput).toHaveAttribute("max", "100");
  });

  it("has correct min/max for Lightness slider", () => {
    const hsl: HSL = { h: 180, s: 50, l: 50 };
    render(<HSLSliders hsl={hsl} onChange={mockOnChange} />);

    const lightInput = screen.getAllByRole("slider")[2];
    expect(lightInput).toHaveAttribute("min", "0");
    expect(lightInput).toHaveAttribute("max", "100");
  });
});
