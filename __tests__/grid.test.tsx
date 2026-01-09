import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Grid from "components/grid";

jest.mock("../app/hooks/useCanvas", () => ({
  __esModule: true,
  default: jest.fn(() => ({ current: null })),
}));

describe("Grid", () => {
  it("renders the grid", () => {
    const jsx = Grid({
      addNode: () => null,
      deleteNode: () => null,
      reset: () => null,
      draw: () => null,
    });
    render(jsx);
    const grid = screen.getByTestId("grid");
    expect(grid).toBeInTheDocument();
  });
});
