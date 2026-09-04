import React, { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
  color: string;
}

function useParticles(count: number): Particle[] {
  return useMemo(() => {
    const colors = [
      "rgba(103,232,249,0.9)",
      "rgba(165,243,252,0.8)",
      "rgba(224,242,254,0.7)",
      "rgba(167,243,208,0.75)",
      "rgba(255,255,255,0.6)",
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 40 + Math.random() * 55,
      size: 1.5 + Math.random() * 3.5,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * 6,
      driftX: (Math.random() - 0.5) * 60,
      driftY: -(20 + Math.random() * 40),
      opacity: 0.4 + Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count]);
}

const LakeRippleCanvas: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const baseGrad = ctx.createLinearGradient(0, 0, 0, h);
      baseGrad.addColorStop(0, "rgba(2,120,160,0.18)");
      baseGrad.addColorStop(0.5, "rgba(14,165,233,0.22)");
      baseGrad.addColorStop(1, "rgba(186,230,253,0.38)");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, w, h);

      const lineCount = 12;
      for (let i = 0; i < lineCount; i++) {
        const progress = i / lineCount;
        const yBase = progress * h;
        const amp = 2.5 + progress * 4;
        const freq = 0.012 + progress * 0.008;
        const speed = 0.6 + progress * 0.4;
        const alpha = 0.06 + progress * 0.12;
        ctx.strokeStyle = `rgba(186,230,253,${alpha})`;
        ctx.lineWidth = 0.8 + progress;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y = yBase + Math.sin(x * freq + t * speed) * amp + Math.cos(x * freq * 0.7 - t * speed * 0.8) * amp * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const causticCount = 8;
      for (let i = 0; i < causticCount; i++) {
        const cx = (0.1 + i * 0.11 + Math.sin(t * 0.3 + i) * 0.04) * w;
        const cy = (0.2 + (i % 4) * 0.2 + Math.cos(t * 0.25 + i * 1.3) * 0.05) * h;
        const r = 10 + Math.sin(t * 0.8 + i) * 6;
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        cg.addColorStop(0, `rgba(224,242,254,${0.12 + Math.sin(t + i) * 0.05})`);
        cg.addColorStop(1, "rgba(224,242,254,0)");
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 1.8, r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      t += 0.018;
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
};

export const WaterfallEnvironment: React.FC = () => {
  const fireflies = useParticles(22);
  const mistParticles = useParticles(14);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Deep Background Mist Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(14,165,233,0.08) 0%, transparent 70%)," +
            "radial-gradient(ellipse 60% 80% at 20% 70%, rgba(6,182,212,0.06) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 50% at 80% 60%, rgba(52,211,153,0.05) 0%, transparent 55%)",
        }}
      />

      {/* Far Background Mountain & Pine Forest Silhouette */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="wfe-mtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(2,44,60,0.85)" />
            <stop offset="100%" stopColor="rgba(1,22,32,0.95)" />
          </linearGradient>
          <filter id="wfe-blur"><feGaussianBlur stdDeviation="3" /></filter>
          <linearGradient id="wfe-mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(103,232,249,0.0)" />
            <stop offset="60%" stopColor="rgba(103,232,249,0.07)" />
            <stop offset="100%" stopColor="rgba(186,230,253,0.15)" />
          </linearGradient>
        </defs>
        <path d="M0 450 L120 380 L280 430 L450 340 L620 410 L780 320 L940 390 L1120 310 L1280 380 L1440 330 L1440 900 L0 900 Z" fill="url(#wfe-mtn)" />
        {Array.from({ length: 28 }, (_, i) => {
          const x = i * 55 + 10;
          const h = 45 + Math.sin(i * 1.7) * 20;
          const yBase = 370 + Math.sin(i * 0.9) * 35;
          return (
            <path key={i} d={`M${x} ${yBase} L${x - 18} ${yBase + h * 0.6} L${x - 12} ${yBase + h * 0.6} L${x - 22} ${yBase + h} L${x + 22} ${yBase + h} L${x + 12} ${yBase + h * 0.6} L${x + 18} ${yBase + h * 0.6} Z`} fill="rgba(1,28,16,0.85)" />
          );
        })}
        <rect x="0" y="400" width="1440" height="200" fill="url(#wfe-mist)" filter="url(#wfe-blur)" />
      </svg>

      {/* Left Cliff - Rocky Mossy Wall */}
      <svg className="absolute left-0 top-0 h-full" style={{ width: "clamp(100px,16vw,240px)" }} viewBox="0 0 240 900" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
        <defs>
          <linearGradient id="wfe-cl" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(1,20,12,0)" />
            <stop offset="60%" stopColor="rgba(1,30,16,0.75)" />
            <stop offset="100%" stopColor="rgba(1,20,10,0.95)" />
          </linearGradient>
        </defs>
        <path d="M0 0 L190 0 L210 80 L180 160 L200 240 L170 320 L190 400 L165 480 L185 560 L160 640 L175 720 L150 800 L170 900 L0 900 Z" fill="url(#wfe-cl)" />
        {[120, 210, 305, 420, 535, 650, 760].map((y, i) => (
          <path key={i} d={`M0 ${y} Q${55 + i * 8} ${y - 10} ${115 + i * 5} ${y + 5} Q155 ${y + 12} ${175 + i * 3} ${y}`} stroke="rgba(6,120,60,0.25)" strokeWidth="1.5" fill="none" />
        ))}
        {[40, 110, 190, 280, 380, 490, 600, 710].map((y, i) => {
          const x = 155 + Math.sin(i * 1.4) * 18;
          return (
            <g key={i} opacity={0.65 + Math.sin(i) * 0.2}>
              {Array.from({ length: 5 }, (_, j) => (
                <path key={j} d={`M${x + j * 6 - 12} ${y} Q${x + j * 5 - 10 + Math.sin(j) * 4} ${y + 18} ${x + j * 6 - 14 + Math.cos(j) * 3} ${y + 35}`} stroke="rgba(22,163,74,0.55)" strokeWidth="1" fill="none" />
              ))}
              {Array.from({ length: 4 }, (_, j) => (
                <ellipse key={j} cx={x + j * 7 - 10} cy={y + 30 + j * 3} rx={4 + j} ry={2.5} fill="rgba(34,197,94,0.45)" transform={`rotate(${-20 + j * 15} ${x + j * 7 - 10} ${y + 30 + j * 3})`} />
              ))}
            </g>
          );
        })}
        {[160, 290, 450, 600, 750].map((y, i) => (
          <ellipse key={i} cx={75 + i * 10} cy={y} rx={28 + i * 4} ry={7} fill="rgba(52,211,153,0.08)" />
        ))}
      </svg>

      {/* Right Cliff - Rocky Mossy Wall */}
      <svg className="absolute right-0 top-0 h-full" style={{ width: "clamp(100px,16vw,240px)" }} viewBox="0 0 240 900" preserveAspectRatio="xMaxYMin meet" aria-hidden="true">
        <defs>
          <linearGradient id="wfe-cr" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(1,20,12,0)" />
            <stop offset="60%" stopColor="rgba(1,30,16,0.75)" />
            <stop offset="100%" stopColor="rgba(1,20,10,0.95)" />
          </linearGradient>
        </defs>
        <path d="M240 0 L50 0 L30 80 L60 160 L40 240 L70 320 L50 400 L75 480 L55 560 L80 640 L65 720 L90 800 L70 900 L240 900 Z" fill="url(#wfe-cr)" />
        {[100, 200, 310, 430, 540, 655, 770].map((y, i) => (
          <path key={i} d={`M240 ${y} Q${185 - i * 8} ${y - 10} ${125 - i * 5} ${y + 5} Q85 ${y + 12} ${65 - i * 3} ${y}`} stroke="rgba(6,120,60,0.25)" strokeWidth="1.5" fill="none" />
        ))}
        {[60, 140, 220, 310, 410, 520, 630, 740].map((y, i) => {
          const x = 85 - Math.sin(i * 1.4) * 18;
          return (
            <g key={i} opacity={0.65 + Math.sin(i + 1) * 0.2}>
              {Array.from({ length: 5 }, (_, j) => (
                <path key={j} d={`M${x + j * 6 - 12} ${y} Q${x + j * 5 - 10 + Math.sin(j) * 4} ${y + 18} ${x + j * 6 - 14 + Math.cos(j) * 3} ${y + 35}`} stroke="rgba(22,163,74,0.55)" strokeWidth="1" fill="none" />
              ))}
              {Array.from({ length: 4 }, (_, j) => (
                <ellipse key={j} cx={x + j * 7 - 10} cy={y + 30 + j * 3} rx={4 + j} ry={2.5} fill="rgba(34,197,94,0.45)" transform={`rotate(${-20 + j * 15} ${x + j * 7 - 10} ${y + 30 + j * 3})`} />
              ))}
            </g>
          );
        })}
      </svg>

      {/* Overhanging Canopy Trees */}
      <svg className="absolute top-0 left-0 w-full" style={{ height: "clamp(70px,13vh,150px)" }} viewBox="0 0 1440 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        {[{ cx: 60, cy: -10, rx: 90, ry: 70 }, { cx: 165, cy: -20, rx: 110, ry: 80 }, { cx: 85, cy: 28, rx: 70, ry: 55 }, { cx: 225, cy: 8, rx: 95, ry: 65 }, { cx: 305, cy: -5, rx: 80, ry: 60 }].map((e, i) => (
          <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={i % 2 === 0 ? "rgba(1,36,18,0.92)" : "rgba(2,48,24,0.85)"} />
        ))}
        {[{ cx: 1380, cy: -10, rx: 90, ry: 70 }, { cx: 1275, cy: -20, rx: 110, ry: 80 }, { cx: 1355, cy: 28, rx: 70, ry: 55 }, { cx: 1215, cy: 8, rx: 95, ry: 65 }, { cx: 1135, cy: -5, rx: 80, ry: 60 }].map((e, i) => (
          <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={i % 2 === 0 ? "rgba(1,36,18,0.92)" : "rgba(2,48,24,0.85)"} />
        ))}
        {Array.from({ length: 16 }, (_, i) => {
          const x = i < 8 ? 30 + i * 38 : 1440 - 30 - (i - 8) * 38;
          const len = 28 + Math.sin(i * 1.9) * 18;
          return (
            <g key={i}>
              <line x1={x} y1={0} x2={x + Math.sin(i) * 4} y2={len} stroke="rgba(22,163,74,0.5)" strokeWidth="1.2" />
              <ellipse cx={x + Math.sin(i) * 4} cy={len + 4} rx={5} ry={3} fill="rgba(34,197,94,0.4)" />
            </g>
          );
        })}
      </svg>

      {/* Foreground Rock Silhouettes */}
      <svg className="absolute bottom-0 left-0 w-full" style={{ height: "clamp(55px,11vh,120px)" }} viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="wfe-rock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(1,22,12,0.8)" />
            <stop offset="100%" stopColor="rgba(1,10,6,0.98)" />
          </linearGradient>
        </defs>
        <path d="M0 120 L0 75 Q30 55 70 70 Q100 50 140 65 Q170 40 200 60 Q220 45 240 65 L240 120 Z" fill="url(#wfe-rock)" />
        <path d="M20 120 L20 90 Q50 74 90 83 Q115 68 150 80 L155 120 Z" fill="rgba(1,28,14,0.6)" />
        <path d="M1440 120 L1440 70 Q1410 50 1370 65 Q1340 45 1300 60 Q1270 40 1240 60 Q1220 47 1200 65 L1200 120 Z" fill="url(#wfe-rock)" />
        <path d="M1420 120 L1420 85 Q1390 68 1350 79 Q1325 64 1285 76 L1280 120 Z" fill="rgba(1,28,14,0.6)" />
        {[{ x: 30, y: 76, rx: 24, ry: 6 }, { x: 90, y: 65, rx: 29, ry: 6 }, { x: 158, y: 62, rx: 21, ry: 5 }, { x: 1282, y: 66, rx: 24, ry: 6 }, { x: 1350, y: 60, rx: 29, ry: 6 }, { x: 1408, y: 77, rx: 21, ry: 5 }].map((m, i) => (
          <ellipse key={i} cx={m.x} cy={m.y} rx={m.rx} ry={m.ry} fill="rgba(22,101,52,0.5)" />
        ))}
      </svg>

      {/* Reflective Lake Surface */}
      <div className="absolute bottom-0 left-0 w-full" style={{ height: "clamp(50px,9vh,100px)" }}>
        <LakeRippleCanvas />
      </div>

      {/* Rising Mist Particles from Lake */}
      {mistParticles.map((p) => (
        <motion.div
          key={`mist-${p.id}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: `${4 + Math.random() * 8}%`,
            width: `${p.size * 8}px`,
            height: `${p.size * 4}px`,
            background: "radial-gradient(ellipse, rgba(186,230,253,0.25) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
          animate={{ y: [0, -(55 + Math.random() * 75)], opacity: [0, 0.5, 0], x: [0, p.driftX * 0.4], scale: [0.8, 1.6] }}
          transition={{ duration: p.duration * 1.5, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      {/* Bioluminescent Fireflies */}
      {fireflies.map((p) => (
        <motion.div
          key={`ff-${p.id}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}`,
          }}
          animate={{ x: [0, p.driftX, p.driftX * 0.5, 0], y: [0, p.driftY, p.driftY * 1.4, 0], opacity: [0, p.opacity, p.opacity * 0.5, p.opacity, 0], scale: [0.6, 1.2, 0.9, 1.1, 0.6] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Vignette Frame */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(1,10,6,0.55) 100%)" }}
      />
    </div>
  );
};
