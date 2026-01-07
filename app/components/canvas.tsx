
import styles from './canvas.module.css'

import useCanvas from 'hooks/useCanvas'
import { Draw } from 'types/canvas'

const Canvas = ({ draw }: { draw: Draw }) => {
    const canvasRef = useCanvas(draw)
    return <canvas className={styles.canvas} ref={canvasRef} />
}

export default Canvas