declare module 'canvas-confetti' {
  export interface ConfettiOptions {
    particleCount?: number
    angle?: number
    spread?: number
    startVelocity?: number
    decay?: number
    gravity?: number
    drift?: number
    ticks?: number
    origin?: {
      x?: number
      y?: number
    }
    colors?: string[]
    shapes?: string[]
    scalar?: number
    zIndex?: number
    disableForReducedMotion?: boolean
    useWorker?: boolean
    resize?: boolean
  }

  export default function confetti(options?: ConfettiOptions): Promise<any>
} 