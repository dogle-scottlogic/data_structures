import { ListNode } from "types/node";
import { DrawingContext } from "types/canvas";

// Linear interpolation helper
const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor;

// ---------------------- Drawing Helpers ----------------------
export function drawArrow(
  ctx: DrawingContext,
  x: number,
  y: number,
  spacing: number,
  r: number
) {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + spacing - r, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + spacing - r - 6, y - 6);
  ctx.lineTo(x + spacing - r, y);
  ctx.lineTo(x + spacing - r - 6, y + 6);
  ctx.stroke();
}

export function drawNode(
  ctx: DrawingContext,
  x: number,
  y: number,
  radius: number,
  value: number,
  color = "#db1010ff"
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.fillText(String(value), x, y);
}

export function drawLabel(
  ctx: DrawingContext,
  text: string,
  x: number,
  y: number,
  offsetY: number
) {
  ctx.fillStyle = "#000";
  ctx.fillText(text, x, y + offsetY);
}

export function drawList(frontNode: ListNode | null) {
  const nodePositions = new WeakMap<ListNode, number>();
  let exitingNode: ListNode | null = null;
  let exitingX = 0;
  return {
    draw: function draw(ctx: DrawingContext) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const NODE_RADIUS = 20;
      const SPACING = 100;
      const Y = 120;
      const START_X = 80;
      const EASE = 0.15;

      // -------- Draw exiting node (if any) --------
      if (exitingNode) {
        // Slide left smoothly
        exitingX = lerp(exitingX, -NODE_RADIUS * 2, 0.2);

        drawNode(ctx, exitingX, Y, NODE_RADIUS, exitingNode.value, "#ff9900");
        drawLabel(ctx, "Dequeued", exitingX, Y, -35);

        // Remove when fully offscreen
        if (exitingX < -NODE_RADIUS * 2) exitingNode = null;
      }

      // -------- Collect nodes --------
      const nodes: ListNode[] = [];
      let n = frontNode;
      while (n) {
        nodes.push(n);
        n = n.next;
      }

      const totalWidth = (nodes.length - 1) * SPACING;
      const maxVisibleWidth = ctx.canvas.width - START_X - NODE_RADIUS * 2;
      const offsetX = Math.max(0, totalWidth - maxVisibleWidth);

      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // -------- Draw each node --------
      nodes.forEach((node, index) => {
        const targetX = START_X + index * SPACING - offsetX;
        const currentX =
          nodePositions.get(node) ?? ctx.canvas.width + NODE_RADIUS * 2;
        const x = lerp(currentX, targetX, EASE);
        nodePositions.set(node, x);

        if (x < -NODE_RADIUS || x > ctx.canvas.width + NODE_RADIUS) return;

        drawNode(ctx, x, Y, NODE_RADIUS, node.value);
        if (index < nodes.length - 1)
          drawArrow(ctx, x, Y, SPACING, NODE_RADIUS);

        if (index === 0) drawLabel(ctx, "Front", x, Y, -35);
        if (index === nodes.length - 1 && index > 0)
          drawLabel(ctx, "Rear", x, Y, -35);
      });
    },
    updateExitingNode: (en: ListNode, x: number) => {
      exitingNode = en;
      exitingX = x;
    },
  };
}
