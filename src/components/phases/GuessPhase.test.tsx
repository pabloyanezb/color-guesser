import { render, screen, fireEvent } from "@testing-library/react";
import { GuessPhase } from "./GuessPhase";

describe("GuessPhase", () => {
  it("renders title", () => {
    render(
      <GuessPhase
        hsl={{ h: 180, s: 50, l: 50 }}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );
    expect(screen.getByText("Guess")).toBeInTheDocument();
  });

  it("renders HSLSliders", () => {
    render(
      <GuessPhase
        hsl={{ h: 180, s: 50, l: 50 }}
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
        onChange={jest.fn()}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
