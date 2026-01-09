import { normaliseUrl } from "utils/routes";

describe("normaliseUrl", () => {
  it("normalises a url", () => {
    const pathString = "Red Black Tree";
    const result = normaliseUrl(pathString);
    expect(result).toBe("redblacktree");
  });
});
