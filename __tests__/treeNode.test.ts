import { newTreeNode } from "@/BinaryTree/treeNode";
import { newRedBlackTreeNode } from "@/RedBlackTree/redBlackTreeNode";

describe("TreeNode", () => {
  it("creates a node", () => {
    const node = newTreeNode(12);
    expect(node.value).toBe(12);
  });
  it("gets the fill colour", () => {
    const node = newTreeNode(12);
    expect(node.getFillColour()).toBe("#db1010ff");
  });
});

describe("RedBlackTreeNode", () => {
  it("creates a node", () => {
    const node = newRedBlackTreeNode(12);
    expect(node.value).toBe(12);
  });
  it("gets the fill colour", () => {
    const node = newRedBlackTreeNode(12);
    expect(node.getFillColour()).toBe("#db1010ff");
    node.colour = "BLACK";
    expect(node.getFillColour()).toBe("#000");
  });
});
