import { render, screen, act } from "@testing-library/react";
import { MemorizePhase } from "./MemorizePhase";

jest.mock("@/lib/game", () => ({
  generateColorSequence: jest.fn(() => ["#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000"]),
  getRotationDelay: jest.fn(() => 10),
}));

describe("MemorizePhase", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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

  it("transitions to Memorize phase after rotation", () => {
    render(<MemorizePhase targetColor="#ff0000" onComplete={jest.fn()} />);
    act(() => { jest.advanceTimersByTime(500); });
    expect(screen.getByText("Memorize")).toBeInTheDocument();
  });

  it("calls onComplete after memorize countdown finishes", () => {
    const onComplete = jest.fn();
    render(<MemorizePhase targetColor="#ff0000" onComplete={onComplete} />);
    act(() => { jest.advanceTimersByTime(500); });
    act(() => { jest.advanceTimersByTime(400); });
    for (let i = 0; i < 300; i++) {
      act(() => { jest.advanceTimersByTime(17); });
    }
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
