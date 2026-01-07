"use client"

import { useState } from 'react';
import Grid from "components/grid";
import { DrawingContext } from "types/canvas";
import { ListNode } from "types/list";

const nodePositions = new WeakMap<ListNode, number>()
const lerp = (a: number, b: number, t: number) => a + (b - a) * t


export default function LinkedListGrid() { // Rename Queue grid?
    const exampleList: ListNode = { value: 1, next: null }
    const [head, setHead] = useState<ListNode | null>(exampleList)
    const addNode = () => setHead(h => push(h))
    const deleteNode = () => setHead(h => pop(h))

    return (
        <Grid
            draw={drawQueue(head)}
            addNode={addNode}
            deleteNode={deleteNode}
        />
    );
}

function push(head: ListNode | null): ListNode {
    const newNode: ListNode = { value: nextValue(head), next: null }

    if (!head) return newNode

    return {
        ...head,
        next: head.next ? cloneAndAppend(head.next, newNode) : newNode,
    }
}

function pop(head: ListNode | null): ListNode | null {
    return head?.next ?? null
}

function cloneAndAppend(node: ListNode, newNode: ListNode): ListNode {
    if (!node.next) return { ...node, next: newNode }
    return { ...node, next: cloneAndAppend(node.next, newNode) }
}

function nextValue(head: ListNode | null): number {
    let current = head
    let value = 1
    while (current) {
        value = current.value + 1
        current = current.next
    }
    return value
}

function drawArrow(
    ctx: DrawingContext,
    x: number,
    y: number,
    spacing: number,
    r: number
) {
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + spacing - r, y)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x + spacing - r - 6, y - 6)
    ctx.lineTo(x + spacing - r, y)
    ctx.lineTo(x + spacing - r - 6, y + 6)
    ctx.stroke()
}

function drawQueue(head: ListNode | null) {
    return function draw(ctx: DrawingContext) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        const NODE_RADIUS = 20
        const SPACING = 100
        const Y = 120
        const START_X = 80
        const EASE = 0.15

        const nodes: ListNode[] = []
        let n = head
        while (n) {
            nodes.push(n)
            n = n.next
        }

        const totalWidth = (nodes.length - 1) * SPACING
        const maxWidth = ctx.canvas.width - START_X - NODE_RADIUS * 2
        const offsetX = Math.max(0, totalWidth - maxWidth)

        ctx.font = "14px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        nodes.forEach((node, index) => {
            const targetX = START_X + index * SPACING - offsetX

            const currentX =
                nodePositions.get(node) ?? ctx.canvas.width + NODE_RADIUS * 2 // enqueue spawn

            const x = lerp(currentX, targetX, EASE)
            nodePositions.set(node, x)

            if (x < -NODE_RADIUS || x > ctx.canvas.width + NODE_RADIUS) return

            // Node
            ctx.fillStyle = "#db1010ff"
            ctx.beginPath()
            ctx.arc(x, Y, NODE_RADIUS, 0, Math.PI * 2)
            ctx.fill()

            // Value
            ctx.fillStyle = "#fff"
            ctx.fillText(String(node.value), x, Y)

            // Arrow
            if (index < nodes.length - 1) {
                drawArrow(ctx, x, Y, SPACING, NODE_RADIUS)
            }

            // Labels
            ctx.fillStyle = "#000"
            if (index === 0) ctx.fillText("Front", x, Y - 35)
            if (index !== 0 && index === nodes.length - 1) ctx.fillText("Rear", x, Y - 35)
        })
    }
}

