import React, { useEffect, useId } from 'react';

interface BloomingFlowerProps {
  size?: number;
  speedMs?: number;
  className?: string;
}

const KEYFRAMES = `
@keyframes bf-bloom {
  to { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
}
@keyframes bf-leaf1 {
  to { transform: translate(-50%, -50%) scale(1) rotate(0deg) rotate(80deg) skewX(6deg) skewY(-30deg); }
}
@keyframes bf-leaf2 {
  to { transform: translate(-50%, -50%) scale(1) rotate(0deg) rotate(-44deg) skewY(-30deg); }
}
@keyframes bf-leaf3 {
  to { transform: translate(-50%, -50%) scale(1) rotate(0deg) skewX(-15deg) skewY(-18deg); }
}
`;

function petalBg(fill: string, rotStart: string, angle: number, sizePx: string): string {
  const x = (50 + 50 * Math.sin(angle)).toFixed(2);
  const y = (50 + 50 * Math.cos(angle)).toFixed(2);
  const enc = [
    "%3Csvg viewBox='0 0 100 100' width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E",
    "%3CforeignObject width='100%25' height='100%25'%3E",
    "%3Cdiv xmlns='http://www.w3.org/1999/xhtml'%3E%3Cdiv class='A'%3E%3C/div%3E%3C/div%3E",
    "%3Cstyle%3E",
    ".A{position:absolute;left:50px;top:50px;width:70px;height:70px;border-radius:8%25;",
    `transform:translate(-50%25,-50%25) rotate(${rotStart}) rotate(${angle.toFixed(4)}rad);`,
    `background:${fill};}`,
    "%3C/style%3E%3C/foreignObject%3E%3C/svg%3E",
  ].join('');
  return `url("data:image/svg+xml,${enc}") no-repeat scroll ${x}% ${y}% / ${sizePx} ${sizePx}`;
}

function petalLayers(n: number, fill: string, rotStart: string, sizePx: string, startFrac = 0.5): string {
  const tau = 2 * Math.PI;
  const theta = tau / n;
  const shift = theta * startFrac;
  return Array.from({ length: n }, (_, i) => petalBg(fill, rotStart, (i + 1) * theta + shift, sizePx)).join(', ');
}

export const BloomingFlower: React.FC<BloomingFlowerProps> = ({
  size = 280,
  speedMs = 1800,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const styleId = `bf-${uid}`;

  const lg = 'rgb(180,30,60)';
  const mid1 = 'rgb(210,40,80)';
  const mid2 = 'rgb(160,20,50)';
  const sm = 'rgb(230,60,90)';
  const root = 'rgb(90,10,25)';
  const leaf = 'hsl(330,30%,22%)';

  const d = speedMs;
  const dl = 300;
  const u = size / 300;
  const pxU = (n: number) => `${(n * u).toFixed(1)}px`;

  useEffect(() => {
    if (document.getElementById(styleId)) return;
    const s = document.createElement('style');
    s.id = styleId;
    s.textContent = KEYFRAMES;
    document.head.appendChild(s);
    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, [styleId]);

  const base: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(0)',
  };

  const large: React.CSSProperties = {
    ...base,
    padding: pxU(55),
    transform: 'translate(-50%,-50%) rotate(50deg) scale(0)',
    background: [
      `radial-gradient(circle at center,rgba(255,255,255,.2) 50%,transparent 72%) no-repeat 50% 50% / ${pxU(90)} ${pxU(90)}`,
      `linear-gradient(${lg} 0 0) no-repeat 50% 50% / ${pxU(73)} ${pxU(73)}`,
      petalLayers(12, lg, '0deg', pxU(104), 0.5),
      petalLayers(12, lg, '45deg', pxU(73), 0),
    ].join(', '),
    animation: `bf-bloom cubic-bezier(0.68,-0.55,0.27,1.55) ${d}ms ${dl}ms forwards`,
  };

  const mid: React.CSSProperties = {
    ...base,
    padding: pxU(37),
    transform: 'translate(-50%,-50%) rotate(50deg) scale(0)',
    background: [
      `linear-gradient(${mid2} 0 0) no-repeat 50% 50% / ${pxU(36)} ${pxU(36)}`,
      petalLayers(12, mid1, '45deg', pxU(56), 0),
      petalLayers(12, mid2, '0deg', pxU(77), 0),
    ].join(', '),
    animation: `bf-bloom cubic-bezier(0.68,-0.55,0.27,1.55) ${d}ms ${dl + 100}ms forwards`,
  };

  const small: React.CSSProperties = {
    ...base,
    padding: pxU(22),
    transform: 'translate(-50%,-50%) rotate(50deg) scale(0)',
    background: [
      `radial-gradient(circle at center,${root} 42%,transparent 72%) no-repeat 50% 50% / ${pxU(23)} ${pxU(23)}`,
      `radial-gradient(circle at center,${sm} 48%,transparent 50%) no-repeat 50% 50% / ${pxU(34)} ${pxU(34)}`,
      `linear-gradient(${mid2} 0 0) no-repeat 50% 50% / ${pxU(16)} ${pxU(16)}`,
      petalLayers(8, sm, '0deg', pxU(54), 0),
      petalLayers(8, sm, '45deg', pxU(39), 0),
    ].join(', '),
    animation: `bf-bloom cubic-bezier(0.68,-0.55,0.27,1.55) ${d}ms ${dl + 200}ms forwards`,
  };

  const leafBase: React.CSSProperties = {
    ...base,
    transformOrigin: 'right top',
    backgroundSize: '100% 100%',
    backgroundColor: leaf,
    boxShadow: `inset 0 0 ${pxU(12)} ${pxU(10)} ${leaf}`,
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        filter: `drop-shadow(${pxU(11)} ${pxU(17)} ${pxU(27)} rgba(0,0,0,.37))`,
      }}
    >
      <div style={large} />
      <div style={mid} />
      <div style={small} />
      <div
        style={{
          ...leafBase,
          left: `calc(50% - ${pxU(65)})`,
          top: `calc(50% + ${pxU(109)})`,
          width: pxU(83),
          height: pxU(128),
          borderRadius: '50% 9% 32% 4%',
          transform: 'translate(-50%,-50%) scale(0) rotate(100deg) rotate(80deg) skewX(6deg) skewY(-30deg)',
          animation: `bf-leaf1 cubic-bezier(0.18,0.89,0.32,1.28) ${d}ms ${dl + 500}ms forwards`,
        }}
      />
      <div
        style={{
          ...leafBase,
          left: `calc(50% - ${pxU(94)})`,
          top: `calc(50% + ${pxU(98)})`,
          width: pxU(83),
          height: pxU(96),
          borderRadius: '25% 9% 32% 4%',
          transform: 'translate(-50%,-50%) scale(0) rotate(100deg) rotate(-44deg) skewY(-30deg)',
          animation: `bf-leaf2 cubic-bezier(0.18,0.89,0.32,1.28) ${d}ms ${dl + 580}ms forwards`,
        }}
      />
      <div
        style={{
          ...leafBase,
          left: `calc(50% - ${pxU(120)})`,
          top: `calc(50% + ${pxU(123)})`,
          width: pxU(113),
          height: pxU(121),
          borderRadius: '24% 9% 27% 7%',
          transform: 'translate(-50%,-50%) scale(0) rotate(100deg) skewX(-15deg) skewY(-18deg)',
          animation: `bf-leaf3 cubic-bezier(0.18,0.89,0.32,1.28) ${d}ms ${dl + 600}ms forwards`,
        }}
      />
    </div>
  );
};

export default BloomingFlower;
