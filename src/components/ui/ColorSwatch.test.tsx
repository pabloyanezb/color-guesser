import { render, screen } from "@testing-library/react";
import { ColorSwatch } from "./ColorSwatch";

describe("ColorSwatch", () => {
  it("renders with default size (md)", () => {
    const { container } = render(<ColorSwatch color="#ff0000" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("w-48");
    expect(div.className).toContain("h-32");
  });

  it("renders with sm size", () => {
    const { container } = render(<ColorSwatch color="#ff0000" size="sm" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("w-24");
    expect(div.className).toContain("h-16");
  });

  it("renders with lg size", () => {
    const { container } = render(<ColorSwatch color="#ff0000" size="lg" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("w-80");
    expect(div.className).toContain("h-48");
  });

  it("applies custom color via style", () => {
    const { container } = render(<ColorSwatch color="#ff0000" />);
    const div = container.querySelector("div")!;
    expect(div.style.backgroundColor).toBe("rgb(255, 0, 0)");
  });

  it("renders bordered variant", () => {
    const { container } = render(<ColorSwatch color="#ff0000" bordered />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("border-4");
    expect(div.className).toContain("border-black");
  });

  it("does not render border when not provided", () => {
    const { container } = render(<ColorSwatch color="#ff0000" />);
    const div = container.querySelector("div")!;
    expect(div.className).not.toContain("border-4");
    expect(div.className).not.toContain("border-black");
  });

  it("renders children when provided", () => {
    render(
      <ColorSwatch color="#ff0000">
        <span>Child Content</span>
      </ColorSwatch>,
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("does not render children when not provided", () => {
    const { container } = render(<ColorSwatch color="#ff0000" />);
    expect(container.querySelector("span")).not.toBeInTheDocument();
  });

  it("applies shadow class", () => {
    const { container } = render(<ColorSwatch color="#ff0000" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]");
  });

  it("applies flex and centering classes", () => {
    const { container } = render(<ColorSwatch color="#ff0000" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("flex");
    expect(div.className).toContain("items-center");
    expect(div.className).toContain("justify-center");
  });

  it("applies text-white for dark backgrounds", () => {
    const { container } = render(<ColorSwatch color="#000000" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("text-white");
  });

  it("applies text-black for light backgrounds", () => {
    const { container } = render(<ColorSwatch color="#ffffff" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("text-black");
  });

  it("applies text-white when contrastText is set to white", () => {
    const { container } = render(<ColorSwatch color="#ffffff" contrastText="white" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("text-white");
  });

  it("applies text-black when contrastText is set to black", () => {
    const { container } = render(<ColorSwatch color="#000000" contrastText="black" />);
    const div = container.querySelector("div")!;
    expect(div.className).toContain("text-black");
  });
});
