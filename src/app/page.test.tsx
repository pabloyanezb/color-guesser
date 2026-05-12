import { render, screen, fireEvent, act } from "@testing-library/react";
import { useEffect } from "react";
import Home from "./page";

jest.mock("../components/phases/MemorizePhase", () => ({
  MemorizePhase: ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
      const timer = setTimeout(onComplete, 50);
      return () => clearTimeout(timer);
    }, [onComplete]);
    return <div data-testid="memorize-phase">Memorize</div>;
  },
}));

beforeEach(() => {
  jest.useFakeTimers();
  localStorage.clear();
});

afterEach(() => {
  jest.useRealTimers();
});

function advance(ms: number) {
  act(() => { jest.advanceTimersByTime(ms); });
}

describe("Home page", () => {
  it("renders start phase initially", () => {
    render(<Home />);
    expect(screen.getByText("COLOR GUESSER")).toBeInTheDocument();
    expect(screen.getByText("PLAY")).toBeInTheDocument();
  });

  it("transitions to memorize phase on PLAY", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("PLAY"));
    expect(screen.getByTestId("memorize-phase")).toBeInTheDocument();
  });

  it("completes one full round cycle", () => {
    render(<Home />);

    fireEvent.click(screen.getByText("PLAY"));
    advance(200);
    expect(screen.getByText("1/3")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Result")).toBeInTheDocument();

    advance(2000);
    expect(screen.getByText("Continue")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Continue"));
    advance(200);
    expect(screen.getByText("2/3")).toBeInTheDocument();
  });

  it("reaches final results after 3 rounds", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("PLAY"));

    for (let i = 0; i < 3; i++) {
      advance(200);
      fireEvent.click(screen.getByText("Submit"));
      advance(2000);
      fireEvent.click(screen.getByText("Continue"));
    }

    expect(screen.getByText("Final Results")).toBeInTheDocument();
  });

  it("saves score and transitions to highscores", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("PLAY"));

    for (let i = 0; i < 3; i++) {
      advance(200);
      fireEvent.click(screen.getByText("Submit"));
      advance(2000);
      fireEvent.click(screen.getByText("Continue"));
    }

    advance(2000);
    expect(screen.getByText("Save your score?")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "PAB" } });
    fireEvent.click(screen.getByText("✓"));
    expect(screen.getByText("High Scores")).toBeInTheDocument();
  });

  it("shows Play Again after skipping save", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("PLAY"));

    for (let i = 0; i < 3; i++) {
      advance(200);
      fireEvent.click(screen.getByText("Submit"));
      advance(2000);
      fireEvent.click(screen.getByText("Continue"));
    }

    advance(2000);
    fireEvent.click(screen.getByText("✕"));
    expect(screen.getByText("Play Again")).toBeInTheDocument();
  });
});
