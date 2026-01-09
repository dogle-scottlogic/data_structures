"use client";

import { useState } from "react";
import Grid from "components/grid";
import { drawBST } from "utils/drawTree";
import { newTreeNode, OptionalTreeNode, TreeNode } from "binarytree/TreeNode";

export default function TreeGrid() {
  const generateValue = (range: number) => Math.floor(Math.random() * range);
  const initialNode: TreeNode = newTreeNode(20);
  const initialSet = () => {
    const set = new Set<number>();
    set.add(initialNode.value);
    return set;
  };
  const [head, setHead] = useState<OptionalTreeNode>(initialNode);
  const [nodeSet, setNodeSet] = useState<Set<number>>(initialSet());

  function newValue(): number {
    const randomGenerator = () => generateValue(100);
    let newValue = randomGenerator();
    while (nodeSet.has(newValue)) {
      newValue = randomGenerator();
    }
    nodeSet.add(newValue);
    setNodeSet(nodeSet);
    return newValue;
  }

  // Random delete a value for now
  function valueToDelete(): number {
    const randomIndexNumber = generateValue(nodeSet.size);
    const setValues = nodeSet.values();
    const valueToDelete = setValues.find((v, i) => i == randomIndexNumber) || 0;
    nodeSet.delete(valueToDelete);
    setNodeSet(nodeSet);
    return valueToDelete;
  }

  const addToTree = () => {
    const value = newValue();
    setHead((h) => addNode(h, value));
  };

  const removeFromTree = () => {
    const value = valueToDelete();
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

function addNode(current: OptionalTreeNode, value: number): TreeNode {
  if (current == null) {
    return newTreeNode(value);
  }
  const newNode = { ...current };
  if (value <= current.value) {
    newNode.left = addNode(current.left, value);
    return newNode;
  } else {
    newNode.right = addNode(current.right, value);
    return newNode;
  }
}

function deleteNode(
  current: OptionalTreeNode,
  value: number
): OptionalTreeNode {
  if (current == null) {
    return current;
  }

  if (value < current.value) {
    current.left = deleteNode(current.left, value);
    return current;
  }

  if (value > current.value) {
    current.right = deleteNode(current.right, value);
    return current;
  }

  // One child or leaf node
  if (current.left == null || current.right == null) {
    return current.left == null ? current.right : current.left;
  }

  // Node with two children: Get the inorder successor (smallest in the right subtree)
  let successorParent = current;
  let successor = current.right;
  while (successor.left !== null) {
    successorParent = successor;
    successor = successor.left;
  }

  // Copy the inorder successor's content to this node
  current.value = successor.value;

  // Delete the inorder successor
  if (successorParent.left === successor) {
    successorParent.left = successor.right;
  } else {
    successorParent.right = successor.right;
  }

  return current;
}
