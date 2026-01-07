"use client"

import styles from "page.module.css"

import ControlPanel from "components/controlPanel";
import Canvas from "components/canvas";
import { Draw } from "types/canvas";

export default function Grid({ draw }: { draw: Draw }) {
    return (
        <div className={styles.grid}>
            <Canvas draw={draw} />
            <ControlPanel />
        </div>
    )
}