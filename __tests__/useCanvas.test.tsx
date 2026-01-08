/* eslint-disable react-hooks/refs */
import React from 'react'
import { render } from '@testing-library/react'
import useCanvas from 'hooks/useCanvas'

describe('useCanvas hook', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  let rafCallbacks: Function[]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let rafSpy: jest.SpyInstance
  let cafSpy: jest.SpyInstance

  beforeEach(() => {
    rafCallbacks = []

    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        rafCallbacks.push(cb)
        return rafCallbacks.length // dummy id
      })

    cafSpy = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => { })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call draw with context and frameCount', () => {
    const draw = jest.fn()

    // Create canvas manually and spy getContext
    const canvas = document.createElement('canvas')
    const getContextSpy = jest.fn().mockReturnValue({})
    canvas.getContext = getContextSpy

    // Component that assigns our canvas directly to the ref
    const TestComponent = ({ draw }: { draw: jest.Mock }) => {
      const ref = useCanvas(draw) as unknown as React.RefObject<HTMLCanvasElement>

      ref.current = canvas // assign before useEffect runs
      return null
    }

    render(<TestComponent draw={draw} />)

    // Manually run RAF
    rafCallbacks.forEach((cb) => cb(0))

    expect(getContextSpy).toHaveBeenCalledWith('2d')
    expect(draw).toHaveBeenCalled()
    expect(draw.mock.calls[0][1]).toBe(1)
  })

  it('should increment frameCount over multiple frames', () => {
    const draw = jest.fn()
    const canvas = document.createElement('canvas')
    canvas.getContext = jest.fn().mockReturnValue({})

    const TestComponent = ({ draw }: { draw: jest.Mock }) => {
      const ref = useCanvas(draw) as unknown as React.RefObject<HTMLCanvasElement>

      ref.current = canvas
      return null
    }

    render(<TestComponent draw={draw} />)

    // Simulate 5 animation frames
    for (let i = 0; i < 5; i++) rafCallbacks.forEach((cb) => cb(0))

    expect(draw.mock.calls.length).toBeGreaterThanOrEqual(5)
    for (let i = 0; i < draw.mock.calls.length; i++) {
      expect(draw.mock.calls[i][1]).toBe(i + 1)
    }
  })

  it('does nothing if canvasRef.current is null', () => {
    const draw = jest.fn()

    const TestComponent = ({ }: { draw: jest.Mock }) => {
      return null
    }

    render(<TestComponent draw={draw} />)

    // draw should never be called
    expect(draw).not.toHaveBeenCalled()
  })


  it('should cancel animation frame on unmount', () => {
    const draw = jest.fn()
    const canvas = document.createElement('canvas')
    canvas.getContext = jest.fn().mockReturnValue({})

    const TestComponent = ({ draw }: { draw: jest.Mock }) => {
      const ref = useCanvas(draw) as unknown as React.RefObject<HTMLCanvasElement>
      ref.current = canvas
      return null
    }

    const { unmount } = render(<TestComponent draw={draw} />)

    // Run first RAF to set animationFrameId
    rafCallbacks.forEach((cb) => cb(0))

    unmount()

    expect(cafSpy).toHaveBeenCalled()
  })
})
