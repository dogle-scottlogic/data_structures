"use client";

import { useState } from "react";
import Grid from "components/grid";
import { drawBST } from "utils/drawTree";
import {
  newRedBlackTreeNode,
  OptionalRedBlackTreeNode,
  RedBlackTreeNode,
} from "RedBlackTree/redBlackTreeNode";
import { newValue, valueToDelete } from "utils/tree";

export default function RedBlackTreeGrid() {
  const initialNode: RedBlackTreeNode = newRedBlackTreeNode(20);
  const initialSet = () => new Set<number>([initialNode.value]);

  const [head, setHead] = useState<OptionalRedBlackTreeNode>(initialNode);
  const [seenNumbers, setSeenNumbers] = useState<Set<number>>(initialSet());

  const addToTree = () => {
    const value = newValue()(seenNumbers);
    seenNumbers.add(value);
    setSeenNumbers(new Set(seenNumbers));
    setHead((h) => insert(h, newRedBlackTreeNode(value)));
  };

  const removeFromTree = () => {
    const value = valueToDelete()(seenNumbers);
    seenNumbers.delete(value);
    setSeenNumbers(new Set(seenNumbers));
    setHead((h) => deleteNode(h, value));
  };

  const reset = () => setHead(() => null);

  return (
    <Grid
      draw={drawBST(head)}
      addNode={addToTree}
      deleteNode={removeFromTree}
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

/* ------------------- Deletion ------------------- */

function minNode(head: RedBlackTreeNode): RedBlackTreeNode {
  let current: RedBlackTreeNode = head;
  while (current.left) current = current.left;
  return current;
}

/**
 * deleteMin: remove minimum node from subtree h (assumes h non-null)
 * returns new subtree root (possibly null)
 */
function deleteMinNode(head: RedBlackTreeNode): OptionalRedBlackTreeNode {
  if (!head.left) {
    return null;
  }

  let node = head;
  if (!isRed(node.left) && !(node.left && isRed(node.left.left))) {
    node = moveRedLeft(node);
  }

  const leftAfter = node.left ? deleteMinNode(node.left) : null;
  node = { ...node, left: leftAfter ?? null };

  return fixUp(node);
}

/**
 * moveRedLeft: assumes head is red and both head.left and head.left.left are black.
 * Makes left or left-left red.
 */
function moveRedLeft(head: RedBlackTreeNode): RedBlackTreeNode {
  // flip colours to push a red down
  let node = flipColors(head);
  if (node.right && isRed(node.right.left)) {
    const newRight = rotateRight(node.right);
    node = { ...node, right: newRight };
    node = rotateLeft(node);
    node = flipColors(node);
  }
  return node;
}

/**
 * moveRedRight: symmetric to moveRedLeft
 */
function moveRedRight(head: RedBlackTreeNode): RedBlackTreeNode {
  let node = flipColors(head);
  if (node.left && isRed(node.left.left)) {
    node = rotateRight(node);
    node = flipColors(node);
  }
  return node;
}

/**
 * fixUp: restores left-leaning and balancing properties locally
 */
function fixUp(head: RedBlackTreeNode): RedBlackTreeNode {
  let node = head;
  if (isRed(node.right)) node = rotateLeft(node);
  if (node.left && isRed(node.left) && isRed(node.left.left))
    node = rotateRight(node);
  if (isRed(node.left) && isRed(node.right)) node = flipColors(node);
  return node;
}

function deleteRecursively(
  optionalHead: OptionalRedBlackTreeNode,
  value: number
): OptionalRedBlackTreeNode {
  if (!optionalHead) return null;

  let head = optionalHead;

  if (value < head.value) {
    if (head.left) {
      if (!isRed(head.left) && !(head.left.left && isRed(head.left.left))) {
        head = moveRedLeft(head);
      }
      const newLeft = deleteRecursively(head.left, value);
      head = { ...head, left: newLeft ?? null };
    }
  } else {
    // If left is red, rotate right to make deletion easier
    if (isRed(head.left)) {
      head = rotateRight(head);
    }

    if (value === head.value && !head.right) {
      // delete node with no right child
      return null;
    }

    if (head.right) {
      if (!isRed(head.right) && !(head.right.left && isRed(head.right.left))) {
        head = moveRedRight(head);
      }

      if (value === head.value) {
        // replace head with min from right subtree
        const minimumNode = minNode(head.right!);
        const rightAfter = deleteMinNode(head.right!);
        head = { ...head, value: minimumNode.value, right: rightAfter ?? null };
      } else {
        const newRight = deleteRecursively(head.right, value);
        head = { ...head, right: newRight ?? null };
      }
    }
  }

  return fixUp(head);
}

/**
 * Wraps deleteRecursively, ensures root is black and sets parents
 */
export function deleteNode(
  root: OptionalRedBlackTreeNode,
  value: number
): OptionalRedBlackTreeNode {
  if (!root) return null;

  const newRoot = deleteRecursively(root, value);
  if (!newRoot) return null;
  const blackRoot: RedBlackTreeNode = { ...newRoot, colour: "BLACK" };
  return setParents(blackRoot, null);
}
