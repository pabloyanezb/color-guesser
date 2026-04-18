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

  it("shows countdown after delay", () => {
    render(<MemorizePhase targetColor="#ff0000" onComplete={jest.fn()} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Memorize")).toBeInTheDocument();
  });

  it("displays countdown number during countdown phase", () => {
    render(<MemorizePhase targetColor="#ff0000" onComplete={jest.fn()} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("shows countdown decreases over time", () => {
    render(<MemorizePhase targetColor="#ff0000" onComplete={jest.fn()} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("5")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("4")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders ColorSwatch with correct target color", () => {
    render(<MemorizePhase targetColor="#ff0000" onComplete={jest.fn()} />);
    const swatch = document.querySelector("[style*='background-color']");
    expect(swatch).toHaveStyle({ backgroundColor: "#ff0000" });
  });
});
