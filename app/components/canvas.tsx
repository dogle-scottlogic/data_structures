import useCanvas from 'hooks/useCanvas'
import { Draw } from 'types/canvas'

const Canvas = ({ draw }: { draw: Draw }) => {
    const canvasRef = useCanvas(draw)
    return <canvas ref={canvasRef} />
}

export default Canvas