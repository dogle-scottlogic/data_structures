"use client";

import { useState } from "react";
import Grid from "components/grid";
import { drawBST } from "utils/drawTree";
import {
  newRedBlackTreeNode,
  OptionalRedBlackTreeNode,
  RedBlackTreeNode,
} from "redblacktree/RedBlackTreeNode";

export default function RedBlackTreeGrid() {
  const generateValue = (range: number) => Math.floor(Math.random() * range);
  const initialNode: RedBlackTreeNode = newRedBlackTreeNode(20);
  const initialSet = () => new Set<number>([initialNode.value]);

  const [head, setHead] = useState<OptionalRedBlackTreeNode>(initialNode);
  const [nodeSet, setNodeSet] = useState<Set<number>>(initialSet());

  function newValue(): number {
    let newVal = generateValue(100);
    while (nodeSet.has(newVal)) newVal = generateValue(100);
    setNodeSet((prev) => {
      const newSet = new Set(prev);
      newSet.add(newVal);
      return newSet;
    });
    return newVal;
  }

  const addToTree = () => {
    const value = newValue();
    setHead((h) => insert(h, newRedBlackTreeNode(value)));
  };

  const reset = () => setHead(() => null);

  return (
    <Grid
      draw={drawBST(head)}
      addNode={addToTree}
      deleteNode={() => null}
      reset={reset}
    />
  );
}

export function insert(
  root: OptionalRedBlackTreeNode,
  node: RedBlackTreeNode
): RedBlackTreeNode {
  // new node should be RED by default
  const toInsert: RedBlackTreeNode = {
    ...node,
    colour: "RED",
    left: null,
    right: null,
    parent: null,
  };
  const inserted = insertRecursively(root, toInsert);

  // ensure root is black and set correct parent pointers immutably
  const blackRoot: OptionalRedBlackTreeNode = inserted
    ? { ...inserted, colour: "BLACK" }
    : null;
  return setParents(blackRoot, null) as RedBlackTreeNode;
}

const isRed = (node: OptionalRedBlackTreeNode) =>
  node !== null && node.colour === "RED";

function insertRecursively(
  head: OptionalRedBlackTreeNode,
  node: RedBlackTreeNode
): OptionalRedBlackTreeNode {
  if (!head) {
    return { ...node };
  }

  let updated: RedBlackTreeNode;
  if (node.value < head.value) {
    const newLeft = insertRecursively(head.left, node);
    updated = { ...head, left: newLeft ?? null };
  } else {
    const newRight = insertRecursively(head.right, node);
    updated = { ...head, right: newRight ?? null };
  }

  if (isRed(updated.right) && !isRed(updated.left)) {
    updated = rotateLeft(updated);
  }
  if (isRed(updated.left) && isRed(updated.left!.left)) {
    updated = rotateRight(updated);
  }
  if (isRed(updated.left) && isRed(updated.right)) {
    updated = flipColors(updated);
  }

  return updated;
}

/* ---------- Local transformations (pure, immutable) ---------- */

function rotateLeft(head: RedBlackTreeNode): RedBlackTreeNode {
  // assume head.right is non-null
  const pivotNode = head.right;
  if (!pivotNode) throw new Error("pivot node not found");
  // head' gets x.left as its right child, and becomes RED
  const headPrime: RedBlackTreeNode = {
    ...head,
    right: pivotNode.left ?? null,
    colour: "RED",
  };
  // x' becomes the new root of this subtree, takes hPrime as left, inherits h colour
  const xPrime: RedBlackTreeNode = {
    ...pivotNode,
    left: headPrime,
    colour: head.colour,
  };
  return xPrime;
}

function rotateRight(head: RedBlackTreeNode): RedBlackTreeNode {
  // assume h.left is non-null
  const pivotNode = head.left;
  if (!pivotNode) throw new Error("pivot node not found");
  const hPrime: RedBlackTreeNode = {
    ...head,
    left: pivotNode.right ?? null,
    colour: "RED",
  };
  const xPrime: RedBlackTreeNode = {
    ...pivotNode,
    right: hPrime,
    colour: head.colour,
  };
  return xPrime;
}

function flipColors(head: RedBlackTreeNode): RedBlackTreeNode {
  const left: OptionalRedBlackTreeNode = head.left
    ? { ...head.left, colour: "BLACK" }
    : null;
  const right: OptionalRedBlackTreeNode = head.right
    ? { ...head.right, colour: "BLACK" }
    : null;
  return { ...head, colour: "RED", left, right };
}

/* ---------- Parent-pointer fixer (run once after full rebuild) ---------- */

function setParents(
  node: OptionalRedBlackTreeNode,
  parent: OptionalRedBlackTreeNode
): OptionalRedBlackTreeNode {
  if (!node) return null;
  // Create shallow copy with parent pointer set to the immutable parent reference
  const copy: RedBlackTreeNode = {
    ...node,
    parent,
  };
  // Recurse using the *old* left/right (node.left / node.right) but attach
  // the newly created `copy` as parent for children.
  const leftFixed = setParents(node.left, copy);
  const rightFixed = setParents(node.right, copy);
  return { ...copy, left: leftFixed, right: rightFixed };
}
