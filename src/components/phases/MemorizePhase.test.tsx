import { render, screen } from "@testing-library/react";
import { MemorizePhase } from "./MemorizePhase";

jest.mock("@/lib/game", () => ({
  generateColorSequence: jest.fn(() => ["#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000"]),
  getRotationDelay: jest.fn(() => 10),
}));

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

  it("renders ColorSwatch with correct target color", () => {
    render(<MemorizePhase targetColor="#ff0000" onComplete={jest.fn()} />);
    const swatch = document.querySelector("[style*='background-color']");
    expect(swatch).toHaveStyle({ backgroundColor: "#ff0000" });
  });
});
