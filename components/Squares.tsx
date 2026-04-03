"use client";

import React, { useEffect, useRef } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface SquaresProps {
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  lineWidth?: number;
  vignetteColor?: string;
}

const Squares: React.FC<SquaresProps> = ({
  borderColor = "rgba(255,255,255,0.08)",
  squareSize = 48,
  hoverFillColor = "transparent",
  lineWidth = 0.6,
  vignetteColor = "rgba(12, 14, 18, 0.62)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawGrid = () => {
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const cols = Math.ceil(cssWidth / squareSize);
      const rows = Math.ceil(cssHeight / squareSize);

      if (hoverFillColor !== "transparent") {
        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(0, 0, cssWidth, cssHeight);
      }

      ctx.beginPath();
      for (let col = 0; col <= cols; col += 1) {
        const x = col * squareSize + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cssHeight);
      }
      for (let row = 0; row <= rows; row += 1) {
        const y = row * squareSize + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(cssWidth, y);
      }
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      const gradient = ctx.createRadialGradient(
        cssWidth / 2,
        cssHeight / 2,
        0,
        cssWidth / 2,
        cssHeight / 2,
        Math.sqrt(cssWidth ** 2 + cssHeight ** 2) / 1.4,
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, vignetteColor);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cssWidth, cssHeight);
    };

    const requestDraw = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        drawGrid();
      });
    };

    const observer = new ResizeObserver(requestDraw);
    observer.observe(canvas);
    window.addEventListener("resize", requestDraw);
    requestDraw();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", requestDraw);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [borderColor, hoverFillColor, lineWidth, squareSize, vignetteColor]);

  return (
    <canvas
      ref={canvasRef}
      className="squares-canvas w-full h-full absolute top-0 left-0"
    />
  );
};

export default Squares;
