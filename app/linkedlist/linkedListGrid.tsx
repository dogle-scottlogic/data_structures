"use client"

import { Draw } from "types/canvas";
import Grid from "components/grid";

export default function LinkedListGrid() {
    const draw: Draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#db1010ff'
        ctx.beginPath()
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    return (
        <Grid draw={draw} />
    );
}