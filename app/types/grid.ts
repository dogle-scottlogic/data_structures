import { Draw } from './canvas';

export interface GridProps {
  draw: Draw;
  addNode: () => void;
  deleteNode: () => void;
}
