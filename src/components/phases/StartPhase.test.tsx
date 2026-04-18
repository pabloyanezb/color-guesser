import { render, screen, fireEvent } from "@testing-library/react";
import { StartPhase } from "./StartPhase";

describe("StartPhase", () => {
  it("renders title", () => {
    render(<StartPhase onStart={jest.fn()} />);
    expect(screen.getByText("COLOR GUESSER")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<StartPhase onStart={jest.fn()} />);
    expect(screen.getByText(/How well can you remember colors/)).toBeInTheDocument();
  });

  it("renders play button", () => {
    render(<StartPhase onStart={jest.fn()} />);
    expect(screen.getByText("PLAY")).toBeInTheDocument();
  });

  it("calls onStart when play button is clicked", () => {
    const mockOnStart = jest.fn();
    render(<StartPhase onStart={mockOnStart} />);

    fireEvent.click(screen.getByText("PLAY"));
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });

  it("applies fade-in class to main container", () => {
    const { container } = render(<StartPhase onStart={jest.fn()} />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("flex");
    expect(div.className).toContain("flex-col");
    expect(div.className).toContain("gap-8");
  });
});
