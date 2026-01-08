import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "components/header";

describe("Header", () => {
  it("renders a heading", () => {
    const ComponentToMock = () => <div>header</div>;
    const jsx = Header({ children: ComponentToMock() });
    render(jsx);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("header");
  });
});
