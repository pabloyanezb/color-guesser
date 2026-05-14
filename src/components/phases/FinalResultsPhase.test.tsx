import { render, screen, act, fireEvent } from "@testing-library/react";
import { FinalResultsPhase } from "./FinalResultsPhase";

describe("FinalResultsPhase", () => {
  const mockRounds = [
    { targetColor: "#ff0000", guessColor: "#00ff00", score: 85.5 },
    { targetColor: "#00ff00", guessColor: "#0000ff", score: 70.3 },
    { targetColor: "#0000ff", guessColor: "#ffff00", score: 90.1 },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const advanceDelay = () => {
    act(() => {
      jest.advanceTimersByTime(1300);
    });
  };

  it("renders without crashing", () => {
    const { container } = render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
      />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders Final Results title", () => {
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
      />,
    );
    expect(screen.getByText("Final Results")).toBeInTheDocument();
  });

  it("shows save UI and play again after delay", () => {
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
      />,
    );
    expect(screen.queryByText("Save your score?")).not.toBeInTheDocument();
    advanceDelay();
    expect(screen.getByText("Save your score?")).toBeInTheDocument();
  });

  it("shows error when OK button is clicked with empty tag", () => {
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
        onSaveScore={jest.fn()}
      />,
    );
    advanceDelay();
    fireEvent.click(screen.getByText("✓"));
    expect(screen.getByText("Name required (3-4 letters or numbers)")).toBeInTheDocument();
  });

  it("shows error when OK button is clicked with short tag", () => {
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
        onSaveScore={jest.fn()}
      />,
    );
    advanceDelay();
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "AB" } });
    fireEvent.click(screen.getByText("✓"));
    expect(screen.getByText("Name required (3-4 letters or numbers)")).toBeInTheDocument();
  });

  it("calls onSaveScore when OK button is clicked with valid tag", () => {
    const onSaveScore = jest.fn();
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
        onSaveScore={onSaveScore}
      />,
    );
    advanceDelay();
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "PAB" } });
    fireEvent.click(screen.getByText("✓"));
    const avgScore = (85.5 + 70.3 + 90.1) / 3;
    expect(onSaveScore).toHaveBeenCalledWith("PAB", avgScore, [85.5, 70.3, 90.1]);
  });

  it("prefills player tag when initialPlayerTag is provided", () => {
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
        onSaveScore={jest.fn()}
        initialPlayerTag="PAB"
      />,
    );
    advanceDelay();
    expect(screen.getByRole("textbox")).toHaveValue("PAB");
  });

  it("saves with prefilled player tag without editing", () => {
    const onSaveScore = jest.fn();
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
        onSaveScore={onSaveScore}
        initialPlayerTag="PAB"
      />,
    );
    advanceDelay();
    fireEvent.click(screen.getByText("✓"));
    const avgScore = (85.5 + 70.3 + 90.1) / 3;
    expect(onSaveScore).toHaveBeenCalledWith("PAB", avgScore, [85.5, 70.3, 90.1]);
  });

  it("shows Play Again after X button is clicked", () => {
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
      />,
    );
    advanceDelay();
    fireEvent.click(screen.getByText("✕"));
    expect(screen.getByText("Play Again")).toBeInTheDocument();
  });

  it("calls onPlayAgain when Play Again is clicked", () => {
    const onPlayAgain = jest.fn();
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={onPlayAgain}
      />,
    );
    advanceDelay();
    fireEvent.click(screen.getByText("✕"));
    fireEvent.click(screen.getByText("Play Again"));
    expect(onPlayAgain).toHaveBeenCalled();
  });

  it("does not call onSaveScore when tag is invalid", () => {
    const onSaveScore = jest.fn();
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
        onSaveScore={onSaveScore}
      />,
    );
    advanceDelay();
    fireEvent.click(screen.getByText("✓"));
    expect(onSaveScore).not.toHaveBeenCalled();
  });

  it("does not call onSaveScore when X button is clicked", () => {
    const onSaveScore = jest.fn();
    render(
      <FinalResultsPhase
        rounds={mockRounds}
        onPlayAgain={jest.fn()}
        onSaveScore={onSaveScore}
      />,
    );
    advanceDelay();
    fireEvent.click(screen.getByText("✕"));
    expect(onSaveScore).not.toHaveBeenCalled();
  });
});
