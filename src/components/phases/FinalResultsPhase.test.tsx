import { render } from "@testing-library/react";
import { FinalResultsPhase } from "./FinalResultsPhase";

describe("FinalResultsPhase", () => {
  const mockRounds = [
    { targetColor: "#ff0000", guessColor: "#00ff00", score: 85 },
    { targetColor: "#00ff00", guessColor: "#0000ff", score: 70 },
    { targetColor: "#0000ff", guessColor: "#ffff00", score: 90 },
  ];

  it("renders without crashing", () => {
    const { container } = render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
      />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
