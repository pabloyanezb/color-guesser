import { render, screen } from "@testing-library/react";
import { MemorizePhase } from "./MemorizePhase";

describe("MemorizePhase", () => {
  it("renders ColorSwatch", () => {
    const { container } = render(<MemorizePhase targetColor="#ff0000" onComplete={jest.fn()} />);
    const swatch = container.querySelector("div");
    expect(swatch).toBeInTheDocument();
  });

  it("renders initial phase text", () => {
    render(<MemorizePhase targetColor="#ff0000" onComplete={jest.fn()} />);
    expect(screen.getByText("Get Ready")).toBeInTheDocument();
  });
});
