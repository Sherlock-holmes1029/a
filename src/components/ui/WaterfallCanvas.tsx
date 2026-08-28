import React, { useEffect, useRef } from 'react';
import { useInViewport } from '@/hooks/useInViewport';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface WaterfallCanvasProps {
  className?: string;
}

export const WaterfallCanvas: React.FC<WaterfallCanvasProps> = ({ className = '' }) => {
  const [containerRef, isInView] = useInViewport<HTMLDivElement>({ threshold: 0.05 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS target for mobile performance

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle streams
    const streamCount = 28;
    const streams = Array.from({ length: streamCount }, () => ({
      x: 0.15 + Math.random() * 0.7,
      y: Math.random(),
      speed: 0.012 + Math.random() * 0.018,
      length: 0.08 + Math.random() * 0.14,
      width: 1 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.5,
    }));

    // Foam particles at the pool
    const foamParticles = Array.from({ length: 18 }, () => ({
      x: 0.1 + Math.random() * 0.8,
      y: 0.92 + Math.random() * 0.08,
      radius: 1 + Math.random() * 3,
      alpha: 0.2 + Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 0.002,
      vy: -Math.random() * 0.002,
    }));

    const render = (currentTime: number) => {
      if (!isInView || isReducedMotion) {
        // Render one static frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Static waterfall gradient
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
        grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.4)');
        grad.addColorStop(1, 'rgba(224, 242, 254, 0.7)');
        
        const w = canvas.width;
        const h = canvas.height;
        ctx.fillStyle = grad;
        ctx.fillRect(w * 0.25, 0, w * 0.5, h);
        return;
      }

      animationFrameId = requestAnimationFrame(render);

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft glowing background column
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      bgGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.3)');
      bgGrad.addColorStop(1, 'rgba(224, 242, 254, 0.5)');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(width * 0.2, 0, width * 0.6, height);

      // 2. Cascading waterfall streams
      streams.forEach((s) => {
        s.y += s.speed;
        if (s.y > 1) {
          s.y = -s.length;
          s.x = 0.2 + Math.random() * 0.6;
        }

        const startX = width * s.x;
        const startY = height * s.y;
        const endY = height * (s.y + s.length);

        const streamGrad = ctx.createLinearGradient(startX, startY, startX, endY);
        streamGrad.addColorStop(0, `rgba(224, 242, 254, 0)`);
        streamGrad.addColorStop(0.5, `rgba(255, 255, 255, ${s.alpha})`);
        streamGrad.addColorStop(1, `rgba(56, 189, 248, ${s.alpha * 0.6})`);

        ctx.strokeStyle = streamGrad;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(startX, Math.max(0, startY));
        ctx.lineTo(startX, Math.min(height, endY));
        ctx.stroke();
      });

      // 3. Pool ripples & mist bubbles at bottom
      foamParticles.forEach((f) => {
        f.x += f.vx;
        f.y += f.vy;
        f.alpha -= 0.008;

        if (f.alpha <= 0 || f.y < 0.88) {
          f.x = 0.2 + Math.random() * 0.6;
          f.y = 0.94 + Math.random() * 0.06;
          f.alpha = 0.3 + Math.random() * 0.6;
        }

        ctx.fillStyle = `rgba(240, 253, 250, ${f.alpha})`;
        ctx.beginPath();
        ctx.arc(width * f.x, height * f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, isReducedMotion]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
