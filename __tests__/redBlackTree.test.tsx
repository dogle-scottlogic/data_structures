import { deleteNode, insert } from "RedBlackTree/redBlackTreeGrid";
import {
  newRedBlackTreeNode,
  RedBlackTreeNode,
} from "RedBlackTree/redBlackTreeNode";

describe("Red-Black Tree", () => {
  let tree: RedBlackTreeNode | null;

  beforeEach(() => {
    tree = newRedBlackTreeNode(10);
    tree.colour = "BLACK"; // start with black root
  });

  /** ------------------ Helpers ------------------ **/

  // Check BST invariant
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

  // Check no consecutive red nodes
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

  // Check parent pointers
  function parentsCorrect(
    node: RedBlackTreeNode | null,
    parent: RedBlackTreeNode | null = null
  ): boolean {
    if (!node) return true;
    if (node.parent !== parent) return false;
    return parentsCorrect(node.left, node) && parentsCorrect(node.right, node);
  }

  /** ------------------ Insert Tests ------------------ **/

  test("insert nodes maintain BST property", () => {
    const values = [5, 15, 3, 7, 12, 17];
    values.forEach((v) => (tree = insert(tree, newRedBlackTreeNode(v))));

    expect(tree).not.toBeNull();
    expect(isBST(tree)).toBe(true);
    expect(tree!.colour).toBe("BLACK");
    expect(noConsecutiveReds(tree)).toBe(true);
  });

  test("insert single node works", () => {
    const node = newRedBlackTreeNode(100);
    tree = insert(tree, node);
    expect(tree).not.toBeNull();
    expect(isBST(tree)).toBe(true);
    expect(tree!.colour).toBe("BLACK");
    expect(noConsecutiveReds(tree)).toBe(true);
  });

  /** ------------------ Deletion Tests ------------------ **/

  test("delete a leaf node", () => {
    const values = [10, 5, 15];
    values.forEach((v) => (tree = insert(tree, newRedBlackTreeNode(v))));
    tree = deleteNode(tree, 5);
    expect(isBST(tree)).toBe(true);
    expect(noConsecutiveReds(tree)).toBe(true);
    expect(parentsCorrect(tree)).toBe(true);
  });

  test("delete node with one child", () => {
    const values = [10, 5, 15, 12];
    values.forEach((v) => (tree = insert(tree, newRedBlackTreeNode(v))));
    tree = deleteNode(tree, 15);
    expect(isBST(tree)).toBe(true);
    expect(noConsecutiveReds(tree)).toBe(true);
    expect(parentsCorrect(tree)).toBe(true);
  });

  test("delete node with two children", () => {
    const values = [10, 5, 15, 12, 18];
    values.forEach((v) => (tree = insert(tree, newRedBlackTreeNode(v))));
    tree = deleteNode(tree, 15);
    expect(isBST(tree)).toBe(true);
    expect(noConsecutiveReds(tree)).toBe(true);
    expect(parentsCorrect(tree)).toBe(true);
  });

  test("delete root node", () => {
    const values = [10, 5, 15];
    values.forEach((v) => (tree = insert(tree, newRedBlackTreeNode(v))));
    tree = deleteNode(tree, 10);
    expect(isBST(tree)).toBe(true);
    expect(noConsecutiveReds(tree)).toBe(true);
    expect(tree!.colour).toBe("BLACK");
    expect(parentsCorrect(tree)).toBe(true);
  });

  test("delete multiple nodes in sequence", () => {
    const values = [20, 10, 30, 5, 15, 25, 35];
    values.forEach((v) => (tree = insert(tree, newRedBlackTreeNode(v))));
    const toDelete = [5, 15, 25, 20];
    toDelete.forEach((v) => {
      tree = deleteNode(tree, v);
      expect(isBST(tree)).toBe(true);
      expect(noConsecutiveReds(tree)).toBe(true);
      expect(parentsCorrect(tree)).toBe(true);
    });
  });

  test("delete non-existent node does not break tree", () => {
    const values = [10, 5, 15];
    values.forEach((v) => (tree = insert(tree, newRedBlackTreeNode(v))));
    tree = deleteNode(tree, 999); // node not in tree
    expect(isBST(tree)).toBe(true);
    expect(noConsecutiveReds(tree)).toBe(true);
    expect(parentsCorrect(tree)).toBe(true);
  });
});
