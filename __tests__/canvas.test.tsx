import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Canvas from "components/canvas";

jest.mock("../app/hooks/useCanvas");

describe("Canvas", () => {
  it("renders two buttons", () => {
    const jsx = Canvas({ draw: () => null });
    render(jsx);
    const canvas = screen.getAllByTitle("canvas")[0];
    expect(canvas).toBeInTheDocument();
  });
});
