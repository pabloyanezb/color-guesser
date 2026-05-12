import { render } from "@testing-library/react";
import { RollingDigit } from "./RollingDigit";

describe("RollingDigit", () => {
  it("renders all digits 0 through 9", () => {
    const { container } = render(<RollingDigit value={5} />);
    for (let i = 0; i <= 9; i++) {
      expect(container.textContent).toContain(i.toString());
    }
  });

  it("sets translateY offset based on value", () => {
    const { container } = render(<RollingDigit value={3} />);
    const inner = container.querySelector("[style*='translateY']");
    expect(inner).toHaveStyle("transform: translateY(-300%)");
  });

  it("handles value 0", () => {
    const { container } = render(<RollingDigit value={0} />);
    const inner = container.querySelector("[style*='translateY']");
    expect(inner).toHaveStyle("transform: translateY(0%)");
  });

  it("handles value 9", () => {
    const { container } = render(<RollingDigit value={9} />);
    const inner = container.querySelector("[style*='translateY']");
    expect(inner).toHaveStyle("transform: translateY(-900%)");
  });

  it("accepts custom duration", () => {
    const { container } = render(<RollingDigit value={5} duration={1200} />);
    expect(container.textContent).toContain("5");
  });
});
