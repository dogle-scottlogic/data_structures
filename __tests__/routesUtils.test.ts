import { normaliseUrl } from "utils/routes";

describe("normaliseUrl", () => {
  it("handles multi-word", () => {
    const pathString = "Red Black Tree";
    const result = normaliseUrl(pathString);
    expect(result).toBe("RedBlackTree");
  });
  it("handles multi-word uppercase", () => {
    const pathString = "red black tree";
    const result = normaliseUrl(pathString);
    expect(result).toBe("RedBlackTree");
  });
  it("handles single word", () => {
    const pathString = "stack";
    const result = normaliseUrl(pathString);
    expect(result).toBe("Stack");
  });
  it("handles empty string", () => {
    const pathString = "";
    const result = normaliseUrl(pathString);
    expect(result).toBe("");
  });
});
