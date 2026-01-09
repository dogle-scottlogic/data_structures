export const generateValue = (range: number) =>
  Math.floor(Math.random() * range);

// Random delete a value for now
export function valueToDelete(nodeSet: Set<number>): number {
  const randomIndexNumber = generateValue(nodeSet.size);
  const setValues = nodeSet.values();
  const valueToDelete = setValues.find((v, i) => i == randomIndexNumber) || 0;
  return valueToDelete;
}

export function newValue(nodeSet: Set<number>): number {
  const randomGenerator = () => generateValue(100);
  let newValue = randomGenerator();
  while (nodeSet.has(newValue)) {
    newValue = randomGenerator();
  }
  return newValue;
}
