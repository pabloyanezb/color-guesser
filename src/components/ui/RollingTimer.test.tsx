import { render } from "@testing-library/react";
import { RollingTimer } from "./RollingTimer";

describe("RollingTimer", () => {
  it("renders seconds from milliseconds", () => {
    const { container } = render(<RollingTimer milliseconds={5000} onComplete={jest.fn()} />);
    const wrappers = container.querySelectorAll(".w-\\[0\\.6em\\]");
    expect(wrappers.length).toBe(1);
  });

  it("rounds up partial seconds", () => {
    const { container } = render(<RollingTimer milliseconds={5100} onComplete={jest.fn()} />);
    const wrappers = container.querySelectorAll(".w-\\[0\\.6em\\]");
    expect(wrappers.length).toBe(1);
  });

  it("renders multi-second values with multiple digits", () => {
    const { container } = render(<RollingTimer milliseconds={12000} onComplete={jest.fn()} />);
    const wrappers = container.querySelectorAll(".w-\\[0\\.6em\\]");
    expect(wrappers.length).toBe(2);
  });

  it("calls onComplete when milliseconds is 0", () => {
    const onComplete = jest.fn();
    render(<RollingTimer milliseconds={0} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("calls onComplete when milliseconds is negative", () => {
    const onComplete = jest.fn();
    render(<RollingTimer milliseconds={-100} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("does not call onComplete when milliseconds is positive", () => {
    const onComplete = jest.fn();
    render(<RollingTimer milliseconds={5000} onComplete={onComplete} />);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
