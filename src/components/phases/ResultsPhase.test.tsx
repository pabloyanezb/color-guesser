import { render, screen } from "@testing-library/react";
import { ResultsPhase } from "./ResultsPhase";

describe("ResultsPhase", () => {
  it("renders title", () => {
    render(
      <ResultsPhase
        original="#ff0000"
        guess="#00ff00"
        score={85.5}
        onPlayAgain={jest.fn()}
      />,
    );
    expect(screen.getByText("Results")).toBeInTheDocument();
  });

  it("renders ColorSwatch with both colors", () => {
    render(
      <ResultsPhase
        original="#ff0000"
        guess="#00ff00"
        score={85.5}
        onPlayAgain={jest.fn()}
      />,
    );
    const swatches = document.querySelectorAll("[style*='background-color']");
    expect(swatches.length).toBeGreaterThan(0);
  });

  it("does not render Play Again button initially", () => {
    const { container } = render(
      <ResultsPhase
        original="#ff0000"
        guess="#00ff00"
        score={85.5}
        onPlayAgain={jest.fn()}
      />,
    );
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });
});
