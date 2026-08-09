import { useEffect, useRef } from 'react'

/**
 * Tracks the pointer as normalized coordinates in the range -1..1, where
 * (0, 0) is the centre of the viewport. Returns a ref rather than state so
 * that moving the mouse never triggers a React re-render — animation loops
 * read `.current` directly on each frame.
 */
export function usePointer() {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return pointer
}
