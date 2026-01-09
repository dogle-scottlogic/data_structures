import { TreeNode } from "BinaryTree/treeNode";

type Colour = "BLACK" | "RED";
export type Direction = "LEFT" | "RIGHT";
export type OptionalRedBlackTreeNode = RedBlackTreeNode | null;

export interface RedBlackTreeNode extends TreeNode {
  colour: Colour;
  left: OptionalRedBlackTreeNode;
  right: OptionalRedBlackTreeNode;
  parent: OptionalRedBlackTreeNode;
}

export const newRedBlackTreeNode = (
  value: number,
  colour: Colour = "RED"
): RedBlackTreeNode => {
  const node: RedBlackTreeNode & { getFillColour: () => string } = {
    colour,
    x: 0,
    y: 0,
    radius: 0,
    value,
    left: null,
    right: null,
    parent: null,
    getFillColour() {
      return this.colour === "RED" ? "#db1010ff" : "#000";
    },
  };
  return node;
};
