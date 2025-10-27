"use client"

import { useEffect, useRef, useState } from "react"
import type { GameConfig } from "@/lib/game-data"

interface Ball {
  x: number
  y: number
  number: number
  radius: number
  color: string
}

interface BilliardTableProps {
  game: GameConfig
  onRandomize: () => void
}

export function BilliardTable({ game, onRandomize }: BilliardTableProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [balls, setBalls] = useState<Ball[]>([])
  const [cueBall, setCueBall] = useState<Ball | null>(null)

  const TABLE_WIDTH = 800
  const TABLE_HEIGHT = 400
  const BALL_RADIUS = 8
  const POCKET_RADIUS = 12

  const getBallColor = (number: number): string => {
    if (number === 0) return "#FFFFFF"
    if (number <= 7) return "#FFEB3B"
    return "#000000"
  }

  const generateRandomPosition = (): { x: number; y: number } => {
    const padding = BALL_RADIUS + 20
    const x = Math.random() * (TABLE_WIDTH - padding * 2) + padding
    const y = Math.random() * (TABLE_HEIGHT - padding * 2) + padding
    return { x, y }
  }

  const initializeGame = () => {
    const newBalls: Ball[] = []

    if (game.id === "three-balls-runout") {
      for (let i = 1; i <= 3; i++) {
        const pos = generateRandomPosition()
        newBalls.push({
          x: pos.x,
          y: pos.y,
          number: i,
          radius: BALL_RADIUS,
          color: getBallColor(i),
        })
      }
    } else if (game.id === "cue-ball-control") {
      const pos = generateRandomPosition()
      newBalls.push({
        x: pos.x,
        y: pos.y,
        number: 1,
        radius: BALL_RADIUS,
        color: getBallColor(1),
      })
    } else if (game.id === "bank-shot") {
      const pos = generateRandomPosition()
      newBalls.push({
        x: pos.x,
        y: pos.y,
        number: 1,
        radius: BALL_RADIUS,
        color: getBallColor(1),
      })
    } else if (game.id === "cue-bank-shot") {
      const pos = generateRandomPosition()
      newBalls.push({
        x: pos.x,
        y: pos.y,
        number: 1,
        radius: BALL_RADIUS,
        color: getBallColor(1),
      })
    } else if (game.id === "straight-shot") {
      newBalls.push({
        x: TABLE_WIDTH / 2,
        y: TABLE_HEIGHT / 2,
        number: 1,
        radius: BALL_RADIUS,
        color: getBallColor(1),
      })
    } else if (game.id === "through-shot") {
      newBalls.push({
        x: TABLE_WIDTH / 2 - 15,
        y: TABLE_HEIGHT / 2,
        number: 1,
        radius: BALL_RADIUS,
        color: getBallColor(1),
      })
      newBalls.push({
        x: TABLE_WIDTH / 2 + 15,
        y: TABLE_HEIGHT / 2,
        number: 2,
        radius: BALL_RADIUS,
        color: getBallColor(2),
      })
    }

    setBalls(newBalls)

    // Set cue ball position
    let cueBallPos = { x: 100, y: TABLE_HEIGHT / 2 }
    if (game.id === "straight-shot") {
      cueBallPos = { x: TABLE_WIDTH / 4, y: TABLE_HEIGHT / 4 }
    } else if (game.id === "through-shot") {
      cueBallPos = { x: TABLE_WIDTH / 4, y: TABLE_HEIGHT / 2 }
    }

    setCueBall({
      x: cueBallPos.x,
      y: cueBallPos.y,
      number: 0,
      radius: BALL_RADIUS,
      color: "#FFFFFF",
    })
  }

  useEffect(() => {
    initializeGame()
  }, [game.id])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw table
    ctx.fillStyle = "#1a5c3a"
    ctx.fillRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT)

    // Draw rails
    ctx.strokeStyle = "#8B4513"
    ctx.lineWidth = 8
    ctx.strokeRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT)

    // Draw pockets
    ctx.fillStyle = "#000000"
    const pocketPositions = [
      { x: 0, y: 0 },
      { x: TABLE_WIDTH / 2, y: 0 },
      { x: TABLE_WIDTH, y: 0 },
      { x: 0, y: TABLE_HEIGHT },
      { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT },
      { x: TABLE_WIDTH, y: TABLE_HEIGHT },
    ]

    pocketPositions.forEach((pos) => {
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, POCKET_RADIUS, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw target zone if applicable
    if (game.id === "cue-ball-control") {
      ctx.fillStyle = "rgba(100, 200, 100, 0.2)"
      ctx.fillRect(TABLE_WIDTH - 150, TABLE_HEIGHT - 150, 140, 140)
      ctx.strokeStyle = "rgba(100, 200, 100, 0.5)"
      ctx.lineWidth = 2
      ctx.strokeRect(TABLE_WIDTH - 150, TABLE_HEIGHT - 150, 140, 140)
    }

    // Draw balls
    balls.forEach((ball) => {
      ctx.fillStyle = ball.color
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw ball number
      ctx.fillStyle = ball.number <= 7 ? "#000000" : "#FFFFFF"
      ctx.font = "bold 10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(ball.number.toString(), ball.x, ball.y)
    })

    // Draw cue ball
    if (cueBall) {
      ctx.fillStyle = cueBall.color
      ctx.beginPath()
      ctx.arc(cueBall.x, cueBall.y, cueBall.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#CCCCCC"
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }, [balls, cueBall])

  return (
    <div className="flex flex-col gap-4">
      <canvas ref={canvasRef} width={TABLE_WIDTH} height={TABLE_HEIGHT} className="border-2 border-foreground" />
      <button
        onClick={() => {
          initializeGame()
          onRandomize()
        }}
        className="px-4 py-2 bg-primary text-primary-foreground font-semibold transition-opacity hover:opacity-80"
      >
        Randomize Positions
      </button>
    </div>
  )
}
