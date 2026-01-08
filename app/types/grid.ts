import { Draw } from "./canvas";
import { ControlPanelProps } from "./controlPanel";

export interface GridProps extends ControlPanelProps {
  draw: Draw;
}
