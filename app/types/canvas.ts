export type Draw = (ctx: DrawingContext, frameCount: number) => void;

export interface Canvas {
  getContext: (contextAttribute: "2d") => DrawingContext;
  width: number;
  height: number;
}

export interface DrawingContext {
  canvas: Canvas;
  clearRect: (x: number, y: number, w: number, h: number) => unknown;
  lineWidth: number;
  fillStyle: string;
  beginPath: () => unknown;
  arc: (x: number, y: number, z: number, w: number, h: number) => unknown;
  fill: () => unknown;
  font: string;
  textAlign: string;
  fillText: (a: string, b: number, c: number) => unknown;
  textBaseline: string;
  strokeStyle: string;
  moveTo: (x: number, y: number) => unknown;
  lineTo: (x: number, y: number) => unknown;
  stroke: () => unknown;
  strokeRect: (a: number, b: number, c: number, d: number) => null;
  setTransform: (
    scale: number,
    x: number,
    y: number,
    z: number,
    offsetX: number,
    offsetY: number
  ) => void;
}
