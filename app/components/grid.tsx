"use client"

import styles from "page.module.css"

import ControlPanel from "components/controlPanel";
import Canvas from "components/canvas";
import { GridProps } from "types/grid";

export default function Grid({ draw, addNode, deleteNode }: GridProps) {
    return (
        <div className={styles.grid}>
            <Canvas draw={draw} />
            <ControlPanel
                addNode={addNode}
                deleteNode={deleteNode}
            />
        </div>
    )
}