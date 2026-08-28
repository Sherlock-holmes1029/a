import React, { useEffect, useRef } from 'react';

interface FloatingFlowers3DProps {
  count?: number;
  className?: string;
}

interface FlowerParticle {
  el: HTMLDivElement;
  size: number;
  origX: number;
  origY: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  alpha: number;
  life: number;
  maxLife: number;
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export const FloatingFlowers3D: React.FC<FloatingFlowers3DProps> = ({
  count = 45,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    const width = window.innerWidth || 360;
    const height = window.innerHeight || 640;

    let targetX = width / 2;
    let targetY = height / 2;
    let currentCamX = targetX;
    let currentCamY = targetY;

    const particles: FlowerParticle[] = [];

    for (let i = 0; i < count; i++) {
      const size = rand(10, 32);
      const petals = Math.random() > 0.5 ? 5 : 6;
      const hue = rand(320, 390) % 360; // Soft pinks, roses, and gold highlights
      const petalColor = `hsl(${hue}, 65%, ${rand(65, 80)}%)`;
      const centerColor = 'rgb(140, 90, 45)';
      const isRight = Math.random() > 0.5;

      const flowerEl = document.createElement('div');
      flowerEl.style.position = 'absolute';
      flowerEl.style.width = `${size}px`;
      flowerEl.style.height = `${size}px`;
      flowerEl.style.borderRadius = '50%';
      flowerEl.style.backgroundColor = centerColor;
      flowerEl.style.left = `${rand(0, width - size)}px`;
      flowerEl.style.top = `${height + rand(50, 250)}px`;
      flowerEl.style.opacity = '0';
      flowerEl.style.pointerEvents = 'none';
      flowerEl.style.willChange = 'transform, opacity';
      flowerEl.style.transform = 'translate3d(0,0,-1000px)';

      for (let p = 0; p < petals; p++) {
        const rotate = (p + 1) * (360 / petals);
        const translateY = size * 0.8;

        const petal = document.createElement('div');
        petal.style.position = 'absolute';
        petal.style.width = '100%';
        petal.style.height = '100%';
        petal.style.backgroundColor = petalColor;
        petal.style.opacity = '0.9';
        petal.style.transform = `rotate(${rotate}deg) translateY(${translateY}px)`;
        if (isRight) {
          petal.style.borderBottomRightRadius = '50%';
          petal.style.borderTopRightRadius = '50%';
        } else {
          petal.style.borderBottomLeftRadius = '50%';
          petal.style.borderTopLeftRadius = '50%';
        }
        flowerEl.appendChild(petal);
      }

      container.appendChild(flowerEl);

      const vx = rand(-3, 3);
      const vy = rand(-4, -1.5);
      const maxLife = rand(110, 210);

      particles.push({
        el: flowerEl,
        size,
        origX: 0,
        origY: 0,
        x: 0,
        y: 0,
        z: rand(-1200, -200),
        vx,
        vy,
        alpha: 0,
        life: rand(0, maxLife),
        maxLife,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      // Smooth Camera lerp
      if (Math.abs(targetX - currentCamX) > 0.1 || Math.abs(targetY - currentCamY) > 0.1) {
        currentCamX += (targetX - currentCamX) * 0.05;
        currentCamY += (targetY - currentCamY) * 0.05;
        container.style.perspectiveOrigin = `${currentCamX}px ${currentCamY}px`;
      }

      // Update particle positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.life >= p.maxLife || p.z > 400) {
          // Reset
          p.x = 0;
          p.y = 0;
          p.z = rand(-1100, -900);
          p.alpha = 0;
          p.life = 0;
          p.vy = rand(-4, -1.5);
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.01; // subtle float gravity
          p.z += 9; // fly toward camera
          if (p.alpha < 0.85) p.alpha += 0.03;
          p.life++;
        }

        p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, ${p.z.toFixed(1)}px)`;
        p.el.style.opacity = p.alpha.toFixed(2);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = width / 2;
      let clientY = height / 2;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      targetX = (clientX - width / 2) * 1.5 + width / 2;
      targetY = (clientY - height / 2) * 1.5 + height / 2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      container.innerHTML = '';
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        perspective: '600px',
        perspectiveOrigin: '50% 50%',
      }}
    />
  );
};

export default FloatingFlowers3D;
