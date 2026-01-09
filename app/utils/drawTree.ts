import { OptionalTreeNode, TreeNode } from "binarytree/TreeNode";
import { DrawingContext } from "types/canvas";

// Linear interpolation helper for smooth animation
const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor;

// Draw a line between two points
function drawLine(
  ctx: DrawingContext,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Main BST drawing function
export function drawBST(root: OptionalTreeNode) {
  const nodePositions = new WeakMap<TreeNode, number>();

  return function draw(ctx: DrawingContext) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!root) return;

    const NODE_RADIUS = 20;
    const LEVEL_HEIGHT = 100;
    const EASE = 0.15;
    const PADDING = 20;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const bounds = {
      left: Infinity,
      right: -Infinity,
      top: Infinity,
      bottom: -Infinity,
    };

    type DrawInfo = {
      x: number;
      y: number;
    };

    // ---------- PASS 1: compute positions + bounds ----------
    const computeLayout = (
      node: OptionalTreeNode,
      depth: number,
      xMin: number,
      xMax: number
    ): DrawInfo | null => {
      if (!node) return null;

      const targetX = (xMin + xMax) / 2;
      const targetY = depth * LEVEL_HEIGHT + NODE_RADIUS + 20;

      const currentX = nodePositions.get(node) ?? targetX;
      const x = lerp(currentX, targetX, EASE);
      nodePositions.set(node, x);

      const y = targetY;

      bounds.left = Math.min(bounds.left, x - NODE_RADIUS);
      bounds.right = Math.max(bounds.right, x + NODE_RADIUS);
      bounds.top = Math.min(bounds.top, y - NODE_RADIUS);
      bounds.bottom = Math.max(bounds.bottom, y + NODE_RADIUS);

      computeLayout(node.left, depth + 1, xMin, targetX);
      computeLayout(node.right, depth + 1, targetX, xMax);

      return { x, y };
    };

    computeLayout(root, 0, NODE_RADIUS, ctx.canvas.width - NODE_RADIUS);

    // Pad bounds
    bounds.left -= PADDING;
    bounds.right += PADDING;
    bounds.top -= PADDING;
    bounds.bottom += PADDING;

    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    const shapesWidth = bounds.right - bounds.left;
    const shapesHeight = bounds.bottom - bounds.top;

    const scale = Math.min(
      canvasWidth / shapesWidth,
      canvasHeight / shapesHeight
    );

    const offsetX =
      (canvasWidth - shapesWidth * scale) / 2 - bounds.left * scale;
    const offsetY =
      (canvasHeight - shapesHeight * scale) / 2 - bounds.top * scale;

    // ---------- APPLY TRANSFORM ----------
    ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
    ctx.lineWidth = 2 / scale;

    const BASE_FONT = 14;
    const fontSize = Math.max(10, Math.min(18, BASE_FONT / scale));
    ctx.font = `${fontSize}px sans-serif`;
    ctx.strokeStyle = "#000";

    // ---------- PASS 2: draw ----------
    const drawTree = (
      node: OptionalTreeNode,
      depth: number,
      xMin: number,
      xMax: number
    ) => {
      if (!node) return;

      const targetX = (xMin + xMax) / 2;
      const targetY = depth * LEVEL_HEIGHT + NODE_RADIUS + 20;

      const x = nodePositions.get(node)!;
      const y = targetY;

      // Draw connections first
      if (node.left) {
        const childX = nodePositions.get(node.left)!;
        const childY = (depth + 1) * LEVEL_HEIGHT + NODE_RADIUS + 20;

        drawLine(ctx, x, y, childX, childY);
        drawTree(node.left, depth + 1, xMin, targetX);
      }

      if (node.right) {
        const childX = nodePositions.get(node.right)!;
        const childY = (depth + 1) * LEVEL_HEIGHT + NODE_RADIUS + 20;

        drawLine(ctx, x, y, childX, childY);
        drawTree(node.right, depth + 1, targetX, xMax);
      }

      // Draw node last (on top)
      console.log(node.getFillColour());
      ctx.fillStyle = node.getFillColour();
      ctx.beginPath();
      ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillText(String(node.value), x, y);
    };

    drawTree(root, 0, NODE_RADIUS, ctx.canvas.width - NODE_RADIUS);
  };
}
