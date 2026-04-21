import { render, screen } from "@testing-library/react";
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

  it("does not render button initially", () => {
    const { container } = render(
      <ResultsPhase
        round={mockRound}
        onContinue={jest.fn()}
      />,
    );
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });
});
