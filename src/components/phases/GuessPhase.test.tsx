import { render, screen, fireEvent } from "@testing-library/react";
import { GuessPhase } from "./GuessPhase";

describe("GuessPhase", () => {
  it("renders title with color index", () => {
    render(
      <GuessPhase
        hsl={{ h: 180, s: 50, l: 50 }}
        colorIndex={1}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );
    expect(screen.getByText("2/3")).toBeInTheDocument();
  });

  it("renders HSLSliders", () => {
    render(
      <GuessPhase
        hsl={{ h: 180, s: 50, l: 50 }}
        colorIndex={0}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );
    expect(screen.getByText("Hue")).toBeInTheDocument();
    expect(screen.getByText("Saturation")).toBeInTheDocument();
    expect(screen.getByText("Lightness")).toBeInTheDocument();
  });

  it("renders ColorSwatch", () => {
    render(
      <GuessPhase
        hsl={{ h: 180, s: 50, l: 50 }}
        colorIndex={0}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );
    const swatch = document.querySelector("[style*='background-color']");
    expect(swatch).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(
      <GuessPhase
        hsl={{ h: 180, s: 50, l: 50 }}
        colorIndex={0}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("calls onSubmit when submit button is clicked", () => {
    const mockOnSubmit = jest.fn();
    render(
      <GuessPhase
        hsl={{ h: 180, s: 50, l: 50 }}
        colorIndex={0}
        onChange={jest.fn()}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onChange when sliders change", () => {
    const mockOnChange = jest.fn();
    render(
      <GuessPhase
        hsl={{ h: 0, s: 50, l: 50 }}
        colorIndex={0}
        onChange={mockOnChange}
        onSubmit={jest.fn()}
      />,
    );

    const sliders = screen.getAllByRole("slider");

    fireEvent.change(sliders[0], { target: { value: 120 } });
    expect(mockOnChange).toHaveBeenCalledWith({ h: 120, s: 50, l: 50 });

    fireEvent.change(sliders[1], { target: { value: 75 } });
    expect(mockOnChange).toHaveBeenCalledWith({ h: 0, s: 75, l: 50 });

    fireEvent.change(sliders[2], { target: { value: 80 } });
    expect(mockOnChange).toHaveBeenCalledWith({ h: 0, s: 50, l: 80 });
  });
});
