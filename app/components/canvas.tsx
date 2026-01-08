
import styles from './canvas.module.css'

import useCanvas from 'hooks/useCanvas'
import { Draw } from 'types/canvas'

const Canvas = (props: { draw: Draw }) => {
    const canvasRef = useCanvas(props.draw)
    return <canvas title="canvas" className={styles.canvas} ref={canvasRef} />
}

export default Canvas