import { render } from "@testing-library/react";
import { RollingNumber } from "./RollingNumber";

describe("RollingNumber", () => {
  it("renders a single digit wrapper", () => {
    const { container } = render(<RollingNumber value="5" />);
    const wrappers = container.querySelectorAll(".w-\\[0\\.6em\\]");
    expect(wrappers.length).toBe(1);
  });

  it("renders multiple digit wrappers", () => {
    const { container } = render(<RollingNumber value="123" />);
    const wrappers = container.querySelectorAll(".w-\\[0\\.6em\\]");
    expect(wrappers.length).toBe(3);
  });

  it("renders a decimal point between digits", () => {
    const { container } = render(<RollingNumber value="3.14" />);
    expect(container.textContent).toContain(".");
  });

  it("renders correct number of wrappers for decimal number", () => {
    const { container } = render(<RollingNumber value="3.14" />);
    const wrappers = container.querySelectorAll(".w-\\[0\\.6em\\]");
    expect(wrappers.length).toBe(3);
  });

  it("applies custom className to container", () => {
    const { container } = render(<RollingNumber value="5" className="text-red-500" />);
    expect(container.firstChild).toHaveClass("text-red-500");
  });
});
