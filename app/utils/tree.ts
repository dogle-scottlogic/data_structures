export const generateRandomValue = (range: number) =>
  Math.floor(Math.random() * range);

// Random delete a value for now
export const valueToDelete =
  (generateValue: (range: number) => number = generateRandomValue) =>
  (nodeSet: Set<number>): number => {
    const randomIndexNumber = generateValue(nodeSet.size);
    const setValues = nodeSet.values();
    const valueToDelete = setValues.find((_, i) => i == randomIndexNumber) || 0;
    return valueToDelete;
  };

export const newValue =
  (generateValue: (range: number) => number = generateRandomValue) =>
  (nodeSet: Set<number>): number => {
    const randomGenerator = () => generateValue(100);
    let newValue = randomGenerator();
    while (nodeSet.has(newValue)) {
      newValue = randomGenerator();
    }
    return newValue;
  };
