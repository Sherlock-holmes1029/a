import React, { useEffect, useId } from 'react';

export interface BloomingFlowerProps {
  /** Size in pixels (width/height of the container bounding box). Default 400 */
  size?: number;
  /** Palette variant: 'gold' (original sunflower) or 'rose' (romantic crimson). Default 'gold' */
  palette?: 'gold' | 'rose';
  /** Animation speed multiplier. Default 100 (1-200) */
  animationSpeed?: number;
  /** Delay before animation starts (ms). Default 300 */
  delayMs?: number;
  className?: string;
}

// Generates the n-gon polygon clip-path for the camera shutter aperture
function generatePolygon(n: number): string {
  const theta = (2 * Math.PI) / n;
  const points: string[] = [];
  for (let i = 1; i <= n; i++) {
    const a = theta * i;
    const x = (50 + 50 * Math.sin(a)).toFixed(3);
    const y = (50 + 50 * Math.cos(a)).toFixed(3);
    points.push(`${x}%25 ${y}%25`);
  }
  return `polygon(${points.join(', ')})`;
}

// Generates indexed divs string for the camera shutter blades
function generateIdivs(n: number): string {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += `%3Cdiv style='--i:${i}'%3E%3C/div%3E`;
  }
  return str;
}

// Camera shutter aperture (the iconic geometric sunflower center)
function createShutterSvg(
  n = 10,
  size = 20,
  thickness = 1,
  color = 'rgb(208,101,0)',
  areaEm = '70em'
): string {
  const grid = 1000;
  const multiplier = grid * 0.01;
  const shift = n % 2 === 0 ? 0.5 : 0.25;
  const rotate = (360 / n) * shift;
  let match = rotate * -1;
  if (n % 4 === 0) match = 0;
  if (n === 3) match = 90;

  const clipPathStr = generatePolygon(n);
  const idivs = generateIdivs(n);

  const svgContent = [
    `%3Csvg viewBox='0 0 ${grid} ${grid}' width='${grid}' height='${grid}' xmlns='http://www.w3.org/2000/svg'%3E`,
    `%3CforeignObject width='100%25' height='100%25'%3E`,
    `%3Cdiv xmlns='http://www.w3.org/1999/xhtml'%3E`,
    `%3Cdiv class='c' style='--n:${n}'%3E${idivs}%3C/div%3E`,
    `%3C/div%3E`,
    `%3Cstyle%3E`,
    `.c{%20--r:${size * multiplier}px;%20--j:calc(360 / var(--n));%20--b:calc((var(--j) * 0.5 + 90) * 1deg);%20--s:${rotate}deg;%20--c:translate(-50%25,-50%25);%20transform:var(--c) rotate(var(--s));%20width:100%25;height:100%25;%20border-radius:50%25;%20overflow:hidden;%20}`,
    `.c, .c::before, .c div{%20position:absolute;left:50%25;top:50%25;%20}`,
    `.c::before{%20content:'';padding:var(--r);transform:var(--c) rotate(${match}deg);%20clip-path:${clipPathStr};%20}`,
    `.c div{%20--a:calc(var(--j) * var(--i) * 1deg);%20width:${grid}px;height:${thickness * multiplier}px;%20transform:var(--c) rotate(var(--a)) translate(calc(var(--r) * -1)) rotate(var(--b)) var(--c);%20}`,
    `.c::before, .c div{%20background:${color};%20}`,
    `%3C/style%3E`,
    `%3C/foreignObject%3E`,
    `%3C/svg%3E`,
  ].join('');

  return `url("data:image/svg+xml,${svgContent}") no-repeat scroll center center / ${areaEm} ${areaEm}`;
}

// Places square petals rotated along a circle path (matches SCSS place-petals exactly)
function placePetals(
  n: number,
  sizeEm: string,
  ratioPct: number,
  fillColor: string,
  rotateStart = '45deg',
  startFraction = 0.5
): string {
  const theta = (2 * Math.PI) / n;
  const shift = theta * startFraction;
  const layers: string[] = [];

  for (let i = 1; i <= n; i++) {
    const angle = i * theta + shift;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // calc(50% + ratio% * cos(angle))
    const x = `calc(50% + ${ratioPct}% * ${cos.toFixed(5)})`;
    const y = `calc(50% + ${ratioPct}% * ${sin.toFixed(5)})`;

    const svgPetal = [
      "%3Csvg viewBox='0 0 100 100' width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E",
      "%3CforeignObject width='100%25' height='100%25'%3E",
      "%3Cdiv xmlns='http://www.w3.org/1999/xhtml'%3E%3Cdiv class='A'%3E%3C/div%3E%3C/div%3E",
      "%3Cstyle%3E",
      `.A{position:absolute;left:50px;top:50px;width:70px;height:70px;border-radius:8%25;transform:translate(-50%25,-50%25) rotate(${rotateStart}) rotate(${angle.toFixed(5)}rad);background:${fillColor};}`,
      "%3C/style%3E%3C/foreignObject%3E%3C/svg%3E",
    ].join('');

    layers.push(`url("data:image/svg+xml,${svgPetal}") no-repeat scroll ${x} ${y} / ${sizeEm} ${sizeEm}`);
  }

  return layers.join(', ');
}

// Generates leaf root / vein linear gradient
function leafRootGradient(angle = '130deg', rootColor = 'hsl(113, 21%, 51%)'): string {
  return `linear-gradient(${angle}, rgba(255,255,255,0) 0, rgba(255,255,255,0) calc(50% - 3em), ${rootColor} 50%, rgba(255,255,255,0) calc(50% + 1em), rgba(255,255,255,0) 100%)`;
}

export const BloomingFlower: React.FC<BloomingFlowerProps> = ({
  size = 360,
  palette = 'rose',
  animationSpeed = 100,
  delayMs = 300,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const styleId = `bf-keyframes-${uid}`;

  // Speed multiplier from CodePen
  const ams = 100 / animationSpeed;
  const durMs = 1000 * ams;

  // Colors: Default to the romantic crimson/rose palette
  const colors =
    palette === 'gold'
      ? {
          largePetal: 'rgb(255, 204, 59)',
          midPetal1: 'rgb(255, 181, 52)',
          midPetal2: 'rgb(255, 143, 44)',
          smallPetal: 'rgb(255, 210, 52)',
          petalRoot: 'rgb(208, 101, 0)',
          leaf: 'hsl(175, 30%, 31%)',
          leafRoot: 'hsl(113, 21%, 51%)',
        }
      : {
          largePetal: 'rgb(180, 30, 60)',
          midPetal1: 'rgb(210, 40, 80)',
          midPetal2: 'rgb(160, 20, 50)',
          smallPetal: 'rgb(230, 60, 90)',
          petalRoot: 'rgb(90, 10, 25)',
          leaf: 'hsl(330, 30%, 22%)',
          leafRoot: 'hsl(340, 21%, 40%)',
        };

  // Base font size scaling: 1em = (size / 560)px
  const emPx = size / 560;

  useEffect(() => {
    if (document.getElementById(styleId)) return;
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      @keyframes bf-bloom-${uid} {
        to { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
      }
      @keyframes bf-leaf1-${uid} {
        to { transform: translate(-50%, -50%) scale(1) rotate(0deg) rotate(80deg) skewX(6deg) skewY(-30deg); }
      }
      @keyframes bf-leaf2-${uid} {
        to { transform: translate(-50%, -50%) scale(1) rotate(0deg) rotate(-44deg) skewY(-30deg); }
      }
      @keyframes bf-leaf3-${uid} {
        to { transform: translate(-50%, -50%) scale(1) rotate(0deg) skewX(-15deg) skewY(-18deg); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, [styleId, uid]);

  // Precomputed background strings
  const largeLayerBg = [
    'radial-gradient(circle at center, rgba(255, 255, 255, 0.29) 50%, transparent 72%) no-repeat 50% 50% / 325em 325em',
    `linear-gradient(${colors.largePetal} 0 0) no-repeat scroll 50% 50% / 220em 220em`,
    placePetals(12, '104em', 39.3, colors.largePetal, '0deg', 0.5),
    placePetals(12, '73em', 46, colors.largePetal, '45deg', 0.5),
  ].join(', ');

  const midLayerBg = [
    `linear-gradient(${colors.midPetal2} 0 0) no-repeat 50% 50% / 107em 107em`,
    placePetals(12, '56em', 49, colors.midPetal1, '45deg', 0),
    placePetals(12, '77em', 40.3, colors.midPetal2, '0deg', 0),
  ].join(', ');

  const shutterBg = createShutterSvg(10, 20, 1, colors.petalRoot, '70em');
  const smallLayerBg = [
    shutterBg,
    `radial-gradient(circle at center, ${colors.smallPetal} 48%, transparent 50%) no-repeat 50% 50% / 100em 100em`,
    `radial-gradient(circle at center, ${colors.midPetal2} 42%, transparent 72%) no-repeat 50% 50% / 130em 130em`,
    `linear-gradient(${colors.midPetal2} 0 0) no-repeat 50% 50% / 49em 49em`,
    placePetals(8, '54em', 39.4, colors.smallPetal, '0deg', 0),
    placePetals(8, '39em', 48.2, colors.smallPetal, '45deg', 0),
  ].join(', ');

  // Common styles
  const basePetalStyle: React.CSSProperties = {
    position: 'absolute',
    left: 'calc(50% + 36em)',
    top: 'calc(50% - 36em)',
    transform: 'translate(-50%, -50%) rotate(50deg) scale(0)',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(0)',
    pointerEvents: 'none',
  };

  const baseLeafStyle: React.CSSProperties = {
    position: 'absolute',
    transformOrigin: 'right top',
    backgroundSize: '100% 100%',
    backgroundColor: colors.leaf,
    boxShadow: `inset 0 0 12em 10em ${colors.leaf}`,
    backgroundRepeat: 'no-repeat',
    filter: 'blur(0)',
    pointerEvents: 'none',
  };

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: `${emPx}px`,
        filter: 'drop-shadow(11em 17em 27em rgba(0, 0, 0, 0.37))',
      }}
    >
      {/* ============= LEAF 1 (head::before) ============= */}
      <div
        style={{
          ...baseLeafStyle,
          left: 'calc(50% - 65em)',
          top: 'calc(50% + 109em)',
          width: '83em',
          height: '128em',
          borderRadius: '50% 9% 32% 4%',
          transform: 'translate(-50%, -50%) scale(0) rotate(100deg) rotate(80deg) skewX(6deg) skewY(-30deg)',
          backgroundImage: [
            leafRootGradient('2deg', colors.leafRoot),
            leafRootGradient('2deg', colors.leafRoot),
            leafRootGradient('2deg', colors.leafRoot),
            leafRootGradient('92deg', colors.leafRoot),
            leafRootGradient('92deg', colors.leafRoot),
            leafRootGradient('92deg', colors.leafRoot),
            leafRootGradient('130deg', colors.leafRoot),
          ].join(', '),
          backgroundPosition: '-56em 30em, -34em 3em, -14em -22em, -16em 96em, 6em 68em, 27em 43em, 0 15em',
          animation: `bf-leaf1-${uid} cubic-bezier(0.18, 0.89, 0.32, 1.28) ${durMs}ms forwards`,
          animationDelay: `${delayMs + 500 * ams}ms`,
        }}
      />

      {/* ============= LEAF 2 (head::after) ============= */}
      <div
        style={{
          ...baseLeafStyle,
          left: 'calc(50% - 94em)',
          top: 'calc(50% + 98em)',
          width: '83em',
          height: '96em',
          borderRadius: '25% 9% 32% 4%',
          transform: 'translate(-50%, -50%) scale(0) rotate(100deg) rotate(-44deg) skewY(-30deg)',
          backgroundImage: [
            leafRootGradient('-93deg', colors.leafRoot),
            leafRootGradient('-93deg', colors.leafRoot),
            leafRootGradient('-93deg', colors.leafRoot),
            leafRootGradient('-1deg', colors.leafRoot),
            leafRootGradient('-1deg', colors.leafRoot),
            leafRootGradient('-1deg', colors.leafRoot),
            leafRootGradient('130deg', colors.leafRoot),
          ].join(', '),
          backgroundPosition: '-12em 64em, 7em 41em, 28em 16em, -56em 16em, -36em -8em, -15em -32em, 0 0',
          animation: `bf-leaf2-${uid} cubic-bezier(0.18, 0.89, 0.32, 1.28) ${durMs}ms forwards`,
          animationDelay: `${delayMs + 580 * ams}ms`,
        }}
      />

      {/* ============= LEAF 3 (html::before) ============= */}
      <div
        style={{
          ...baseLeafStyle,
          left: 'calc(50% - 120em)',
          top: 'calc(50% + 123em)',
          width: '113em',
          height: '121em',
          borderRadius: '24% 9% 27% 7%',
          transform: 'translate(-50%, -50%) scale(0) rotate(100deg) skewX(-15deg) skewY(-18deg)',
          backgroundImage: [
            leafRootGradient('-90deg', colors.leafRoot),
            leafRootGradient('-90deg', colors.leafRoot),
            leafRootGradient('-90deg', colors.leafRoot),
            leafRootGradient('2deg', colors.leafRoot),
            leafRootGradient('1deg', colors.leafRoot),
            leafRootGradient('0deg', colors.leafRoot),
            leafRootGradient('133deg', colors.leafRoot),
          ].join(', '),
          backgroundPosition: '-19em 79em, 9em 50.4em, 35em 21.4em, -21em -41.6em, -49em -11em, -74em 18em, 0 0',
          animation: `bf-leaf3-${uid} cubic-bezier(0.18, 0.89, 0.32, 1.28) ${durMs}ms forwards`,
          animationDelay: `${delayMs + 600 * ams}ms`,
        }}
      />

      {/* ============= PETAL LAYER 1 (body::before) ============= */}
      <div
        style={{
          ...basePetalStyle,
          padding: '204em',
          filter: 'drop-shadow(-25em 10em 7em rgba(254, 136, 10, 0.1))',
          background: largeLayerBg,
          animation: `bf-bloom-${uid} cubic-bezier(0.68, -0.55, 0.27, 1.55) ${durMs}ms forwards`,
          animationDelay: `${delayMs}ms`,
        }}
      />

      {/* ============= PETAL LAYER 2 (body::after) ============= */}
      <div
        style={{
          ...basePetalStyle,
          padding: '136em',
          background: midLayerBg,
          animation: `bf-bloom-${uid} cubic-bezier(0.68, -0.55, 0.27, 1.55) ${durMs}ms forwards`,
          animationDelay: `${delayMs + 100 * ams}ms`,
        }}
      />

      {/* ============= PETAL LAYER 3 & SHUTTER CENTER (html::after) ============= */}
      <div
        style={{
          ...basePetalStyle,
          padding: '82em',
          background: smallLayerBg,
          animation: `bf-bloom-${uid} cubic-bezier(0.68, -0.55, 0.27, 1.55) ${durMs}ms forwards`,
          animationDelay: `${delayMs + 200 * ams}ms`,
        }}
      />
    </div>
  );
};

export default BloomingFlower;
