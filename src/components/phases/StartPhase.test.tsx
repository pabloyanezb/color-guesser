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

  it("shows current player tag when provided", () => {
    render(<StartPhase onStart={jest.fn()} activePlayerName="PAB" />);
    expect(screen.getByText("Player:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PAB" })).toBeInTheDocument();
  });

  it("allows editing and saving player tag", () => {
    const onChangePlayerName = jest.fn();
    render(
      <StartPhase
        onStart={jest.fn()}
        activePlayerName="PAB"
        onChangePlayerName={onChangePlayerName}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "PAB" }));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "xyz1" } });
    fireEvent.click(screen.getByText("✓"));

    expect(onChangePlayerName).toHaveBeenCalledWith("XYZ1");
  });

  it("shows error when saving short tag", () => {
    render(
      <StartPhase
        onStart={jest.fn()}
        activePlayerName="PAB"
        onChangePlayerName={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "PAB" }));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "AB" } });
    expect(screen.getByText("✓")).toBeInTheDocument();
    fireEvent.submit(screen.getByRole("textbox").closest("form") as HTMLFormElement);

    expect(screen.getByText("Name required (3-4 letters or numbers)")).toBeInTheDocument();
  });

  it("prefills input with current player name", () => {
    render(
      <StartPhase
        onStart={jest.fn()}
        activePlayerName="PAB"
        onChangePlayerName={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "PAB" }));
    expect(screen.getByRole("textbox")).toHaveValue("PAB");
  });
});
