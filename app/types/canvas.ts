export type Draw = (ctx: DrawingContext, frameCount: number) => void;

export interface Canvas {
  getContext: (contextAttribute: '2d') => DrawingContext;
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
}
