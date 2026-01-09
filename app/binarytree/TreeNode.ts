export const newTreeNode = (value: number) => ({
  x: 0,
  y: 0,
  radius: 0,
  value,
  getFillColour: () => "#db1010ff",
  left: null,
  right: null,
});

export interface TreeNode {
  x: number;
  y: number;
  radius: number;
  value: number;
  getFillColour: () => string;
  left: OptionalTreeNode;
  right: OptionalTreeNode;
}

export type OptionalTreeNode = TreeNode | null;
