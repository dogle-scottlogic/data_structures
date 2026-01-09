import { insert } from "@/redblacktree/redBlackTreeGrid";
import {
  newRedBlackTreeNode,
  RedBlackTreeNode,
} from "@/redblacktree/RedBlackTreeNode";

describe("Red-Black Tree Insert", () => {
  let tree: RedBlackTreeNode | null;

  beforeEach(() => {
    tree = newRedBlackTreeNode(10); // start with single black root
    tree.colour = "BLACK";
  });

  // Helper: check BST invariant
  function isBST(
    node: RedBlackTreeNode | null,
    min = -Infinity,
    max = Infinity
  ): boolean {
    if (!node) return true;
    if (node.value <= min || node.value >= max) return false;
    return (
      isBST(node.left, min, node.value) && isBST(node.right, node.value, max)
    );
  }

  // Helper: check red-black properties recursively
  function noConsecutiveReds(node: RedBlackTreeNode | null): boolean {
    if (!node) return true;
    if (node.colour === "RED") {
      if (
        (node.left && node.left.colour === "RED") ||
        (node.right && node.right.colour === "RED")
      ) {
        return false;
      }
    }
    return noConsecutiveReds(node.left) && noConsecutiveReds(node.right);
  }

  test("insert nodes and maintain BST property", () => {
    const values = [5, 15, 3, 7, 12, 17];
    values.forEach((v) => {
      tree = insert(tree, newRedBlackTreeNode(v));
    });

    expect(tree).not.toBeNull();
    expect(isBST(tree)).toBe(true);
  });

  test("root is always black", () => {
    const values = [1, 2, 3, 4, 5];
    values.forEach((v) => {
      tree = insert(tree, newRedBlackTreeNode(v));
    });

    expect(tree!.colour).toBe("BLACK");
  });

  test("no consecutive red nodes", () => {
    const values = [20, 15, 25, 10, 18, 22, 30];
    values.forEach((v) => {
      tree = insert(tree, newRedBlackTreeNode(v));
    });

    expect(noConsecutiveReds(tree)).toBe(true);
  });

  test("insert single node works", () => {
    const node = newRedBlackTreeNode(100);
    tree = insert(tree, node);
    expect(tree).not.toBeNull();
    expect(isBST(tree)).toBe(true);
    expect(tree!.colour).toBe("BLACK");
  });
});
