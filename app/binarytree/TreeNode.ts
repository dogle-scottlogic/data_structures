import { DrawingContext } from "types/canvas";

export class TreeNode {
  x: number;
  y: number;
  radius: number;
  value: number;
  colour: string;
  left: OptionalTreeNode;
  right: OptionalTreeNode;

  constructor(value: number) {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.value = value;
    this.colour = "#db1010ff";
    this.left = null;
    this.right = null;
  }

  clone() {
    const clone = new TreeNode(this.value);
    clone.x = this.x;
    clone.y = this.y;
    clone.radius = this.radius;
    clone.colour = this.colour;
    clone.left = this.left;
    clone.right = this.right;
    return clone;
  }

  setDrawParameters(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
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

export type OptionalTreeNode = TreeNode | null;
