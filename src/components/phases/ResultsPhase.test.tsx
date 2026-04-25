import { render, screen, act } from "@testing-library/react";
import { ResultsPhase } from "./ResultsPhase";

describe("ResultsPhase", () => {
  const mockRound = {
    targetColor: "#ff0000",
    guessColor: "#00ff00",
    score: 85.5,
  };

  it("renders Result title", () => {
    render(
      <ResultsPhase
        round={mockRound}
        onContinue={jest.fn()}
      />,
    );
    expect(screen.getByText("Result")).toBeInTheDocument();
  });

  it("renders ColorSwatch with both colors", () => {
    render(
      <ResultsPhase
        round={mockRound}
        onContinue={jest.fn()}
      />,
    );
    const swatches = document.querySelectorAll("[style*='background-color']");
    expect(swatches.length).toBeGreaterThan(0);
  });

  it("renders Continue button after delay", () => {
    jest.useFakeTimers();
    render(
      <ResultsPhase
        round={mockRound}
        onContinue={jest.fn()}
      />,
    );
    expect(screen.queryByText("Continue")).not.toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Continue")).toBeInTheDocument();
    jest.useRealTimers();
  });
});
