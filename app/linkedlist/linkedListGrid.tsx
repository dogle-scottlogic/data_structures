"use client"

import { DrawingContext } from "types/canvas";
import { ListNode } from "types/list";
import Grid from "components/grid";
import { useState } from 'react';

export default function LinkedListGrid() {
    const exampleList: ListNode = { value: 1, next: null }
    const [head, setHead] = useState<ListNode | null>(exampleList)
    const addNode = () => setHead(push(head))
    const deleteNode = () => setHead(pop(head))
    return (
        <Grid
            draw={draw(head)}
            addNode={addNode}
            deleteNode={deleteNode}
        />
    );
}

function push(head: ListNode | null): ListNode {
    if (!head) {
        head = { value: 1, next: null }
        return head
    }
    let current = head
    while (current.next) {
        current = current.next
    }
    current.next = { value: current.value + 1, next: null }
    return head
}

function pop(head: ListNode | null): ListNode | null {
    if (!head || !head.next) {
        return null
    }
    head = head.next
    return head
}

function draw(head: ListNode | null) {
    return function drawList(ctx: DrawingContext) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        let node = head
        let x = 80
        const y = 120
        const nodeRadius = 20
        const spacing = 100

        ctx.font = '14px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        while (node) {
            // Draw node
            ctx.fillStyle = '#db1010ff'
            ctx.beginPath()
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)
            ctx.fill()

            // Value
            ctx.fillStyle = '#ffffff'
            ctx.fillText(node.value.toString(), x, y)

            // Link to next
            if (node.next) {
                ctx.strokeStyle = '#000000'
                ctx.lineWidth = 2

                ctx.beginPath()
                ctx.moveTo(x + nodeRadius, y)
                ctx.lineTo(x + spacing - nodeRadius, y)
                ctx.stroke()

                // Arrowhead
                ctx.beginPath()
                ctx.moveTo(x + spacing - nodeRadius - 6, y - 6)
                ctx.lineTo(x + spacing - nodeRadius, y)
                ctx.lineTo(x + spacing - nodeRadius - 6, y + 6)
                ctx.stroke()
            } else if (node !== head) {
                ctx.fillStyle = '#000'
                ctx.fillText('Rear', x, y + -35)
            }

            // Front label
            if (node === head) {
                ctx.fillStyle = '#000'
                ctx.fillText('Front', x, y - 35)
            }

            node = node.next
            x += spacing
        }
    }
}