import React, { useEffect, useRef } from 'react';
import { useInViewport } from '@/hooks/useInViewport';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const OceanCanvas: React.FC = () => {
  const [containerRef, isInView] = useInViewport<HTMLDivElement>({ threshold: 0.05 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isReduced = useReducedMotion();
  const ripplesRef = useRef<Ripple[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripplesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 70 + Math.random() * 30,
      alpha: 0.7,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS target for A13

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (currentTime: number) => {
      if (!isInView || isReduced) {
        // Draw static peaceful gradient frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#032030');
        grad.addColorStop(0.4, '#0369a1');
        grad.addColorStop(0.8, '#0284c7');
        grad.addColorStop(1, '#38bdf8');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      animationFrameId = requestAnimationFrame(render);

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      const width = canvas.width;
      const height = canvas.height;
      step += 0.04;

      ctx.clearRect(0, 0, width, height);

      // Deep ocean sky background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
      skyGrad.addColorStop(0, '#031926');
      skyGrad.addColorStop(1, '#073b4c');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height * 0.45);

      // Distant Horizon Glow
      const horizonGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        10,
        width * 0.5,
        height * 0.42,
        width * 0.6
      );
      horizonGrad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      horizonGrad.addColorStop(1, 'rgba(3, 25, 38, 0)');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, 0, width, height * 0.45);

      // Multi-layer Sine Waves
      const waveLayers = [
        { yBase: height * 0.42, amp: 8, freq: 0.012, speed: 0.8, color: '#034c6e', alpha: 0.95 },
        { yBase: height * 0.54, amp: 12, freq: 0.015, speed: 1.2, color: '#0284c7', alpha: 0.85 },
        { yBase: height * 0.68, amp: 16, freq: 0.018, speed: 1.6, color: '#0ea5e9', alpha: 0.75 },
        { yBase: height * 0.84, amp: 20, freq: 0.022, speed: 2.0, color: '#38bdf8', alpha: 0.65 },
      ];

      waveLayers.forEach((wave, idx) => {
        ctx.fillStyle = wave.color;
        ctx.globalAlpha = wave.alpha;
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 6) {
          const y =
            wave.yBase +
            Math.sin(x * wave.freq + step * wave.speed) * wave.amp +
            Math.cos(x * wave.freq * 0.5 - step * 0.5) * (wave.amp * 0.4);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        // Wave crest white foam line
        if (idx >= 2) {
          ctx.strokeStyle = 'rgba(240, 249, 255, 0.7)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let x = 0; x <= width; x += 6) {
            const y =
              wave.yBase +
              Math.sin(x * wave.freq + step * wave.speed) * wave.amp +
              Math.cos(x * wave.freq * 0.5 - step * 0.5) * (wave.amp * 0.4);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1.0;

      // Draw & update touch ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 2.2;
        r.alpha -= 0.02;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(224, 242, 254, ${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 8), 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, isReduced]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className="absolute inset-0 w-full h-full cursor-pointer touch-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
