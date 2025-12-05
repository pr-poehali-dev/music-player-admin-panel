import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
  barColor?: string;
  className?: string;
}

export default function AudioVisualizer({ 
  isPlaying, 
  barCount = 40, 
  barColor = 'hsl(var(--primary))',
  className = '' 
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const barsRef = useRef<number[]>([]);

  useEffect(() => {
    barsRef.current = Array(barCount).fill(0).map(() => Math.random() * 0.5 + 0.2);
  }, [barCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const barWidth = width / barCount;
      const gap = barWidth * 0.3;

      for (let i = 0; i < barCount; i++) {
        if (isPlaying) {
          const change = (Math.random() - 0.5) * 0.15;
          barsRef.current[i] = Math.max(0.1, Math.min(1, barsRef.current[i] + change));
        } else {
          barsRef.current[i] = Math.max(0.1, barsRef.current[i] * 0.95);
        }

        const barHeight = barsRef.current[i] * height * 0.8;
        const x = i * barWidth + gap / 2;
        const y = (height - barHeight) / 2;

        ctx.fillStyle = barColor;
        ctx.fillRect(x, y, barWidth - gap, barHeight);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, barCount, barColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full ${className}`}
    />
  );
}
