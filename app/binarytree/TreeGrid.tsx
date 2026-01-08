"use client"

import { useState } from "react"
import Grid from "components/grid"
import { OptionalTreeNode, TreeNode } from "types/node"
import { drawBST } from "utils/drawTree"

const seen = new Set();

export default function TreeGrid() {
    const initialNode: TreeNode = { value: 20, left: null, right: null }
    seen.add(20);
    const [head, setHead] = useState<OptionalTreeNode>(initialNode)

    // const drawFunctions = drawBST(head);
    // const updateExitingNode = drawFunctions.updateExitingNode

    const addToTree = () => {
        const value = newValue();
        setHead(h => addNode(h, value));
    }
    const removeFromTree = () => null
    // const dequeue = () => setHead(h => dequeueNode(h, updateExitingNode))
    const reset = () => setHead(null)

    return (
        <Grid draw={drawBST(head)} addNode={addToTree} deleteNode={removeFromTree} reset={reset} />
    )
}

function addNode(current: OptionalTreeNode, value: number): TreeNode {
    if (current == null) {
        return newNode(value);
    }

    if (isLeft(current, value)) {
        current.left = addNode(current.left, value)
    } else {
        current.right = addNode(current.right, value)
    }
    return current

    // const newNode: ListNode = { value: nextValue(front), next: null }
    // if (!front) return newNode
    // return { ...front, next: front.next ? appendNode(front.next, newNode) : newNode }
}

function deleteNode(current: OptionalTreeNode, value: number): OptionalTreeNode {
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

// Recursively clone nodes and append the new node at the end
// function appendNode(node: ListNode, newNode: ListNode): ListNode {
//     if (!node.next) return { ...node, next: newNode }
//     return { ...node, next: appendNode(node.next, newNode) }
// }

function newValue(): number {
    const generateValue = () => Math.floor(Math.random() * 100)
    let newValue = generateValue();
    while (seen.has(newValue)) {
        newValue = generateValue();
    }
    seen.add(newValue)
    return newValue;
}

function newNode(value: number): TreeNode {
    return {
        value,
        left: null,
        right: null
    }
}

function isLeft(node: TreeNode, value: number): boolean {
    return node.value <= value
}
