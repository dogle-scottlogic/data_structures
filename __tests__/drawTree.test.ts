import { drawBST } from "utils/drawTree";
import { newTreeNode, TreeNode } from "BinaryTree/treeNode";
import { DrawingContext } from "@/types/canvas";

// Mock DrawingContext
const createMockContext: () => DrawingContext = () =>
  ({
    canvas: { width: 500, height: 500 },
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
    arc: jest.fn(),
    fillText: jest.fn(),
    setTransform: jest.fn(),
    clearRect: jest.fn(),
    textAlign: "",
    textBaseline: "",
    fillStyle: "",
    font: "",
    lineWidth: 0,
    strokeStyle: "",
  }) as unknown as DrawingContext;

describe("drawBST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a draw function that handles null root", () => {
    const draw = drawBST(null);
    const ctx = createMockContext();
    draw(ctx);
    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.setTransform).toHaveBeenCalled();
  });

  it("draws a single node correctly", () => {
    const node = newTreeNode(10);
    node.getFillColour = jest.fn(() => "#123456");

    const draw = drawBST(node);
    const ctx = createMockContext();
    draw(ctx);

    // Node circle and text should be drawn
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalled();
    expect(ctx.fillText).toHaveBeenCalledWith(
      "10",
      expect.any(Number),
      expect.any(Number)
    );
    expect(node.getFillColour).toHaveBeenCalled();
  });

  it("draws a tree with left and right children", () => {
    const root: TreeNode = newTreeNode(1);
    const left = newTreeNode(2);
    const right = newTreeNode(3);
    root.left = left;
    root.right = right;

    [root, left, right].forEach(
      (n) => (n.getFillColour = jest.fn(() => "#000"))
    );

    const draw = drawBST(root);
    const ctx = createMockContext();
    draw(ctx);

    // drawLine should have been called twice for connections
    expect(ctx.moveTo).toHaveBeenCalled();
    expect(ctx.lineTo).toHaveBeenCalled();

    // All nodes drawn
    expect(ctx.arc).toHaveBeenCalledTimes(3);
    expect(ctx.fillText).toHaveBeenCalledTimes(3);
  });

  it("draws a tree with only left child", () => {
    const root: TreeNode = newTreeNode(1);
    const left = newTreeNode(2);
    root.left = left;
    [root, left].forEach((n) => (n.getFillColour = jest.fn(() => "#000")));

    const draw = drawBST(root);
    const ctx = createMockContext();
    draw(ctx);

    // Only one connection
    expect(ctx.lineTo).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalledTimes(2);
  });

  it("draws a tree with only right child", () => {
    const root: TreeNode = newTreeNode(1);
    const right: TreeNode = newTreeNode(2);
    root.right = right;
    [root, right].forEach((n) => (n.getFillColour = jest.fn(() => "#000")));

    const draw = drawBST(root);
    const ctx = createMockContext();
    draw(ctx);

    // Only one connection
    expect(ctx.lineTo).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalledTimes(2);
  });
});
