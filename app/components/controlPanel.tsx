import { ControlPanelProps } from "types/controlPanel";
import styles from "./controlPanel.module.css";

export default function ControlPanel({
  addNode,
  deleteNode,
  reset,
}: ControlPanelProps) {
  return (
    <div className={styles.control}>
      <button onClick={addNode}>Add</button>
      <button onClick={deleteNode}>Delete</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
