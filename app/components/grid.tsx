"use client";

import styles from "page.module.css";

import ControlPanel from "components/controlPanel";
import Canvas from "components/canvas";
import { GridProps } from "types/grid";

export default function Grid({ draw, addNode, deleteNode, reset }: GridProps) {
  return (
    <div className={styles.grid} data-testid="grid">
      <Canvas draw={draw} />
      <ControlPanel addNode={addNode} deleteNode={deleteNode} reset={reset} />
    </div>
  );
}
