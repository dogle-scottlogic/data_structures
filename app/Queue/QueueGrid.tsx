"use client"

import { useState } from "react"
import Grid from "components/grid"
import { ListNode } from "types/list"
import { drawList } from "utils/drawList"

export default function QueueGrid() {
    const initialNode: ListNode = { value: 1, next: null }
    const [head, setHead] = useState<ListNode | null>(initialNode)

    const drawFunctions = drawList(head);
    const updateExitingNode = drawFunctions.updateExitingNode

    const enqueue = () => setHead(h => enqueueNode(h))
    const dequeue = () => setHead(h => dequeueNode(h, updateExitingNode))
    const reset = () => setHead(null)

    return (
        <Grid draw={drawFunctions.draw} addNode={enqueue} deleteNode={dequeue} reset={reset} />
    )
}

function enqueueNode(front: ListNode | null): ListNode {
    const newNode: ListNode = { value: nextValue(front), next: null }
    if (!front) return newNode
    return { ...front, next: front.next ? appendNode(front.next, newNode) : newNode }
}

function dequeueNode(front: ListNode | null, updateExitingNode: (exitingNode: ListNode, x: number) => void): ListNode | null {
    if (!front) return null
    updateExitingNode(front, 80)
    return front.next
}

// Recursively clone nodes and append the new node at the end
function appendNode(node: ListNode, newNode: ListNode): ListNode {
    if (!node.next) return { ...node, next: newNode }
    return { ...node, next: appendNode(node.next, newNode) }
}

// Determine the next value for a new node
function nextValue(front: ListNode | null): number {
    let current = front
    let value = 1
    while (current) {
        value = current.value + 1
        current = current.next
    }
    return value
}
