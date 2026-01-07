
import { useRef, useEffect } from 'react'
import { Canvas, Draw } from "types/canvas"

const useCanvas = (draw: Draw) => {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas: Canvas | null = canvasRef.current
    if (canvas !== null) {
      const context = (canvas as Canvas).getContext('2d')

      let frameCount = 0
      let animationFrameId: number

      const render = () => {
        frameCount++
        draw(context, frameCount)
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [draw])
  return canvasRef
}

export default useCanvas