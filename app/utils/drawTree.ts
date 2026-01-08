import { OptionalTreeNode, TreeNode } from "@/types/node";
import { DrawingContext } from "types/canvas";

// Linear interpolation helper for smooth animation
const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor;

// Node class for drawing circles and numbers
class Node {
  x: number;
  y: number;
  radius: number;
  value: number;
  colour: string;
  left?: Node;
  right?: Node;

  constructor(x: number, y: number, radius: number, value: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.value = value;
    this.colour = "#db1010ff";
  }

  drawNode(ctx: DrawingContext) {
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillText(String(this.value), this.x, this.y);
  }
}

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
    if (!root) return;

    const NODE_RADIUS = 20;
    const LEVEL_HEIGHT = 100;
    const EASE = 0.15;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // ---------------- Compute node positions ----------------
    const nodes: Node[] = [];

    const computePositions = (
      node: OptionalTreeNode,
      depth: number,
      xMin: number,
      xMax: number
    ): Node | undefined => {
      if (!node) return undefined;

      const targetX = (xMin + xMax) / 2;
      const targetY = depth * LEVEL_HEIGHT + NODE_RADIUS + 20;

      const currentX = nodePositions.get(node) ?? targetX;
      const x = lerp(currentX, targetX, EASE);
      nodePositions.set(node, x);

      const newNode = new Node(x, targetY, NODE_RADIUS, node.value);

      // Recursively compute children
      if (node.left && newNode)
        newNode.left = computePositions(node.left, depth + 1, xMin, targetX);
      if (node.right && newNode)
        newNode.right = computePositions(node.right, depth + 1, targetX, xMax);

      nodes.push(newNode);
      return newNode;
    };

    computePositions(root, 0, NODE_RADIUS, ctx.canvas.width - NODE_RADIUS);

    // ---------------- Compute bounds for zoom ----------------
    const bounds = {
      left: Infinity,
      right: -Infinity,
      top: Infinity,
      bottom: -Infinity,
    };

    nodes.forEach((n) => {
      bounds.left = Math.min(bounds.left, n.x - n.radius);
      bounds.right = Math.max(bounds.right, n.x + n.radius);
      bounds.top = Math.min(bounds.top, n.y - n.radius);
      bounds.bottom = Math.max(bounds.bottom, n.y + n.radius);
    });

    // Add padding
    const PADDING = 20;
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

    // ---------------- Apply transform ----------------
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

    // Adjust line width and font size
    ctx.lineWidth = 2 / scale;
    const BASE_FONT = 14;
    const MIN_FONT = 10;
    const MAX_FONT = 18;

    const fontSize = Math.max(MIN_FONT, Math.min(MAX_FONT, BASE_FONT / scale));

    ctx.font = `${fontSize}px sans-serif`;
    ctx.strokeStyle = "#000";

    // ---------------- Draw connections ----------------
    nodes.forEach((n) => {
      if (n.left) drawLine(ctx, n.x, n.y, n.left.x, n.left.y);
      if (n.right) drawLine(ctx, n.x, n.y, n.right.x, n.right.y);
    });

    // ---------------- Draw nodes ----------------
    nodes.forEach((n) => n.drawNode(ctx));
  };
}
