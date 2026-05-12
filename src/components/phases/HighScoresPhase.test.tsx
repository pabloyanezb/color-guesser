import { render, screen, fireEvent } from "@testing-library/react";
import { useHighScoresStore } from "@/store/highscoresStore";
import { HighScoresPhase } from "./HighScoresPhase";

describe("HighScoresPhase", () => {
  beforeEach(() => {
    useHighScoresStore.setState({
      activePlayerName: "",
      entries: [],
    });
  });

  it("renders High Scores title", () => {
    render(
      <HighScoresPhase onButtonClick={jest.fn()} />,
    );
    expect(screen.getByText("High Scores")).toBeInTheDocument();
  });

  it("shows empty state when no scores", () => {
    render(
      <HighScoresPhase onButtonClick={jest.fn()} />,
    );
    expect(screen.getByText("No saved scores yet")).toBeInTheDocument();
  });

  it("shows Top 5 header when player name is empty", () => {
    render(
      <HighScoresPhase onButtonClick={jest.fn()} />,
    );
    expect(screen.getByText("Top 5")).toBeInTheDocument();
  });

  it("shows Top 5 header with player name when active", () => {
    useHighScoresStore.setState({
      activePlayerName: "PAB",
      entries: [
        {
          id: "1",
          playerName: "PAB",
          finalScore: 95.5,
          roundScores: [90, 95, 100],
          createdAt: new Date().toISOString(),
        },
      ],
    });

    render(
      <HighScoresPhase onButtonClick={jest.fn()} />,
    );
    expect(screen.getByText("Top 5 (PAB)")).toBeInTheDocument();
  });

  it("renders top 5 scores for active player", () => {
    useHighScoresStore.setState({
      activePlayerName: "PAB",
      entries: [
        {
          id: "1",
          playerName: "PAB",
          finalScore: 95.5,
          roundScores: [90, 95, 100],
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          playerName: "PAB",
          finalScore: 82.3,
          roundScores: [80, 85, 82],
          createdAt: new Date().toISOString(),
        },
      ],
    });

    render(
      <HighScoresPhase onButtonClick={jest.fn()} />,
    );
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    expect(screen.getByText("95.5")).toBeInTheDocument();
    expect(screen.getByText("82.3")).toBeInTheDocument();
  });

  it("scores are sorted descending", () => {
    useHighScoresStore.setState({
      activePlayerName: "PAB",
      entries: [
        {
          id: "1",
          playerName: "PAB",
          finalScore: 82.3,
          roundScores: [80, 85, 82],
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          playerName: "PAB",
          finalScore: 95.5,
          roundScores: [90, 95, 100],
          createdAt: new Date().toISOString(),
        },
      ],
    });

    render(
      <HighScoresPhase onButtonClick={jest.fn()} />,
    );
    const scores = screen.getAllByText(/\d+\.\d/);
    expect(scores[0]).toHaveTextContent("95.5");
    expect(scores[1]).toHaveTextContent("82.3");
  });

  it("renders button with custom label", () => {
    render(
      <HighScoresPhase
        buttonLabel="Play Again"
        onButtonClick={jest.fn()}
      />,
    );
    expect(screen.getByText("Play Again")).toBeInTheDocument();
  });

  it("calls onButtonClick when button is clicked", () => {
    const onClick = jest.fn();
    render(
      <HighScoresPhase
        buttonLabel="Volver"
        onButtonClick={onClick}
      />,
    );
    fireEvent.click(screen.getByText("Volver"));
    expect(onClick).toHaveBeenCalled();
  });

  it("does not render button when no label or handler", () => {
    const { container } = render(
      <HighScoresPhase />,
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(0);
  });
});
