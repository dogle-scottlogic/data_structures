import { generateRandomValue, newValue, valueToDelete } from "utils/tree";

describe("generateValue", () => {
  it("returns a function", () => {
    const result = generateRandomValue(10);
    expect(result).toBeLessThanOrEqual(10);
  });
});

describe("valueToDelete", () => {
  const mockRandom = () => 1; // Mock index 1
  it("returns a number in the set multiple numbers", () => {
    const testSet = new Set<number>();
    testSet.add(1);
    testSet.add(2);
    const result = valueToDelete(mockRandom)(testSet);
    expect(result).toEqual(2);
  });
  it("returns a number in the set single value", () => {
    const testSet = new Set<number>();
    testSet.add(2);
    const result = valueToDelete()(testSet);
    expect(result).toEqual(2);
  });
  it("handles empty set", () => {
    const testSet = new Set<number>();
    const result = valueToDelete()(testSet);
    expect(result).toEqual(0);
  });
});

describe("newValue", () => {
  it("uses default random", () => {
    const testSet = new Set<number>();
    const result = newValue()(testSet);
    expect(typeof result).toBe("number");
  });
  it("returns a new number", () => {
    const mockRandom = () => 6; // Mock index 1
    const testSet = new Set<number>();
    const result = newValue(mockRandom)(testSet);
    expect(typeof result).toBe("number");
    expect(result).toEqual(6);
  });
  it("returns a number not in the set", () => {
    const mockRandom = jest
      .fn()
      .mockReturnValueOnce(6)
      .mockReturnValueOnce(100);
    const testSet = new Set<number>();
    testSet.add(6);
    const result = newValue(mockRandom)(testSet);
    expect(typeof result).toBe("number");
    expect(result).toEqual(100);
  });
});
