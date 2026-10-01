import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import leftGateImg from '@/assets/pgate/left.png';
import rightGateImg from '@/assets/pgate/right.png';
import midTopGateImg from '@/assets/pgate/mid top.png';
import midBottomGateImg from '@/assets/pgate/mid bottom.png';
import { Shield, Wifi, Terminal, Volume2, VolumeX, FastForward } from 'lucide-react';

interface PubgLoadingGateProps {
  onComplete: () => void;
  playerName?: string;
}

// Procedural sound synthesizer using Web Audio API (Zero external assets needed)
class GateSoundSynthesizer {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        console.warn('AudioContext not supported', e);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Pneumatic hydraulic hiss as gates move
  playHydraulicHiss() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const bufferSize = ctx.sampleRate * 0.7;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.65);
      filter.Q.value = 3.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.68);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback silent
    }
  }

  // Heavy metallic impact thud when middle doors collide
  playHeavyMetalSlam() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.46);

      // Add high metallic click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sawtooth';
      clickOsc.frequency.setValueAtTime(600, ctx.currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
      clickGain.gain.setValueAtTime(0.25, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start();
      clickOsc.stop(ctx.currentTime + 0.13);
    } catch {
      // Silent catch
    }
  }

  // Tactical electronic beep
  playHudBeep(high: boolean = false) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(high ? 1100 : 750, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Silent catch
    }
  }

  // Final match found confirmation chime
  playMatchChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.36);
      });
    } catch {
      // Silent catch
    }
  }
}

export const PubgLoadingGate: React.FC<PubgLoadingGateProps> = ({
  onComplete,
  playerName = 'أماني ❤️',
}) => {
  // Animation Stages:
  // 1: 'side_closing' (Left & Right slide in to 28% each)
  // 2: 'mid_closing' (Middle Top & Bottom slam from top & bottom)
  // 3: 'locked_loading' (PUBG HUD appears, progress bar 0 -> 100%)
  // 4: 'opening' (Gate opens / breach effect)
  const [stage, setStage] = useState<'side_closing' | 'mid_closing' | 'locked_loading' | 'opening'>('side_closing');
  const [progress, setProgress] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [statusText, setStatusText] = useState('CONNECTING TO BATTLEGROUNDS...');
  const [subStatus, setSubStatus] = useState('INITIALIZING MILITARY BLAST GATE // LEVEL 3 SECURE');

  const soundRef = useRef<GateSoundSynthesizer | null>(null);

  useEffect(() => {
    soundRef.current = new GateSoundSynthesizer();
    return () => {
      soundRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    if (soundRef.current) {
      soundRef.current.enabled = !soundEnabled;
      setSoundEnabled(!soundEnabled);
    }
  };

  const handleSkip = useCallback(() => {
    soundRef.current?.playMatchChime();
    setStage('opening');
    setTimeout(() => {
      onComplete();
    }, 450);
  }, [onComplete]);

  // Orchestrate timeline
  useEffect(() => {
    // 0.0s: Start Side Closing
    soundRef.current?.playHydraulicHiss();

    // 0.8s: Middle elements slide from top & bottom
    const t1 = setTimeout(() => {
      setStage('mid_closing');
      soundRef.current?.playHydraulicHiss();
    }, 850);

    // 1.45s: Middle doors collide and lock shut!
    const t2 = setTimeout(() => {
      soundRef.current?.playHeavyMetalSlam();
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
      setStage('locked_loading');
    }, 1450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Loading progress bar ticker
  useEffect(() => {
    if (stage !== 'locked_loading') return;

    let current = 0;
    const interval = setInterval(() => {
      // Realistic game loading pacing
      const increment = current < 30 ? 4 : current < 70 ? 2 : current < 90 ? 5 : 3;
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current % 15 === 0) {
        soundRef.current?.playHudBeep(false);
      }

      if (current > 15 && current < 45) {
        setStatusText('AUTHENTICATING IDENTITY: أماني (AMANI) 💕');
        setSubStatus('RETRIEVING POETRY ARCHIVES // LEVEL 3 HELMET EQUIPPED');
      } else if (current >= 45 && current < 75) {
        setStatusText('SYNCING MEMORIES & BATTLEGROUND DATA...');
        setSubStatus('MAP: عوالم الحب الأبدية (AMANI\'S REALM) // SECURE LINK');
      } else if (current >= 75 && current < 98) {
        setStatusText('MATCH FOUND! PREPARING DROP ZONE...');
        setSubStatus('PING: 18ms | SQUAD: 2/2 | READY TO DEPLOY');
      } else if (current >= 100) {
        setStatusText('GATEWAY UNLOCKED! WELCOME HOME 👑');
        setSubStatus('ACCESS GRANTED // ENTERING AMANI\'S WORLDS');
        clearInterval(interval);
        soundRef.current?.playMatchChime();

        // Hold briefly at 100% then open gate
        setTimeout(() => {
          setStage('opening');
          soundRef.current?.playHydraulicHiss();
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 500);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [stage, onComplete]);

  // Gate positioning calculations
  // Left: 0 to 28vw
  // Mid: 28vw to 72vw (44vw wide)
  // Right: 72vw to 100vw (28vw wide)
  const isGateClosed = stage === 'locked_loading' || stage === 'mid_closing';
  const isOpening = stage === 'opening';

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-black select-none font-cairo ${
        shaking ? 'animate-[shake_0.25s_ease-in-out]' : ''
      }`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Dynamic Keyframe for screen shake */}
      <style>{`
        @keyframes shake {
          0% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-5px, 4px) rotate(-0.3deg); }
          40% { transform: translate(5px, -3px) rotate(0.3deg); }
          60% { transform: translate(-3px, -4px) rotate(-0.2deg); }
          80% { transform: translate(3px, 2px) rotate(0.1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes pubgStripeMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>

      {/* BACKGROUND CORRIDOR (Seen through opening before gates close or when they open) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f14] via-[#0d1620] to-[#060a0e] flex items-center justify-center">
        {/* Distant warning beacon light */}
        <div className="w-96 h-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="text-center opacity-40">
          <Shield className="w-20 h-20 mx-auto text-amber-500/40 mb-3" />
          <span className="text-xs tracking-widest text-slate-500 font-mono">
            BUNKER BLAST GATE DEPLOYMENT
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. LEFT SLIDING BLAST DOOR (Width: 28vw)                     */}
      {/* ============================================================ */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={
          isOpening
            ? { x: '-105%' }
            : { x: '0%' }
        }
        transition={
          isOpening
            ? { duration: 0.7, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
        className="absolute left-0 top-0 w-[28vw] h-full z-30 shadow-[10px_0_35px_rgba(0,0,0,0.85)] overflow-hidden flex"
      >
        {/* Steel Panel Extension Background (Fills from 0 to left of image) */}
        <div
          className="flex-1 h-full relative"
          style={{
            background:
              'linear-gradient(90deg, #131a22 0%, #1c2733 40%, #253443 85%, #2a3c4e 100%)',
          }}
        >
          {/* Industrial metal surface details */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Vertical armor plate reinforcement seams */}
          <div className="absolute inset-y-0 right-8 w-1 bg-gradient-to-r from-slate-900 via-slate-700/50 to-slate-900 border-r border-slate-600/40" />
          <div className="absolute inset-y-0 right-20 w-px bg-slate-700/30 hidden md:block" />

          {/* Heavy Rivets / Hex Bolts along left wing */}
          <div className="absolute left-3 top-6 bottom-6 flex flex-col justify-between items-center pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-slate-400 to-slate-800 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),0_1px_3px_rgba(0,0,0,0.8)] border border-slate-600"
              />
            ))}
          </div>

          {/* Top & Bottom Industrial Hazard stripes */}
          <div
            className="absolute top-0 left-0 right-0 h-4 border-b border-black/40"
            style={{
              background:
                'repeating-linear-gradient(-45deg, #dca827 0, #dca827 10px, #1a242f 10px, #1a242f 20px)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-4 border-t border-black/40"
            style={{
              background:
                'repeating-linear-gradient(45deg, #dca827 0, #dca827 10px, #1a242f 10px, #1a242f 20px)',
            }}
          />

          {/* Left Wing Stencil Markings */}
          <div className="absolute left-7 top-1/2 -translate-y-1/2 rotate-90 text-[10px] sm:text-xs font-mono tracking-widest text-slate-400/40 font-bold uppercase whitespace-nowrap">
            PUBG // WING-L // HYDRAULIC-01
          </div>
        </div>

        {/* The Exact Left Gate Asset Image (Anchored flush to right edge of left wing) */}
        <div className="h-full w-auto relative shrink-0">
          <img
            src={leftGateImg}
            alt="PUBG Gate Left"
            className="h-full w-auto max-w-none object-fill block select-none pointer-events-none"
            style={{
              filter: 'drop-shadow(2px 0 6px rgba(0,0,0,0.6))',
            }}
          />
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 2. RIGHT SLIDING BLAST DOOR (Width: 28vw)                    */}
      {/* ============================================================ */}
      <motion.div
        initial={{ x: '100%' }}
        animate={
          isOpening
            ? { x: '105%' }
            : { x: '0%' }
        }
        transition={
          isOpening
            ? { duration: 0.7, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
        className="absolute right-0 top-0 w-[28vw] h-full z-30 shadow-[-10px_0_35px_rgba(0,0,0,0.85)] overflow-hidden flex"
      >
        {/* The Exact Right Gate Asset Image (Anchored flush to left edge of right wing) */}
        <div className="h-full w-auto relative shrink-0">
          <img
            src={rightGateImg}
            alt="PUBG Gate Right"
            className="h-full w-auto max-w-none object-fill block select-none pointer-events-none"
            style={{
              filter: 'drop-shadow(-2px 0 6px rgba(0,0,0,0.6))',
            }}
          />
        </div>

        {/* Steel Panel Extension Background (Fills from right of image to 100vw) */}
        <div
          className="flex-1 h-full relative"
          style={{
            background:
              'linear-gradient(270deg, #131a22 0%, #1c2733 40%, #253443 85%, #2a3c4e 100%)',
          }}
        >
          {/* Industrial metal surface details */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Vertical armor plate reinforcement seams */}
          <div className="absolute inset-y-0 left-8 w-1 bg-gradient-to-r from-slate-900 via-slate-700/50 to-slate-900 border-l border-slate-600/40" />
          <div className="absolute inset-y-0 left-20 w-px bg-slate-700/30 hidden md:block" />

          {/* Heavy Rivets / Hex Bolts along right wing */}
          <div className="absolute right-3 top-6 bottom-6 flex flex-col justify-between items-center pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-slate-400 to-slate-800 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),0_1px_3px_rgba(0,0,0,0.8)] border border-slate-600"
              />
            ))}
          </div>

          {/* Top & Bottom Industrial Hazard stripes */}
          <div
            className="absolute top-0 left-0 right-0 h-4 border-b border-black/40"
            style={{
              background:
                'repeating-linear-gradient(45deg, #dca827 0, #dca827 10px, #1a242f 10px, #1a242f 20px)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-4 border-t border-black/40"
            style={{
              background:
                'repeating-linear-gradient(-45deg, #dca827 0, #dca827 10px, #1a242f 10px, #1a242f 20px)',
            }}
          />

          {/* Right Wing Stencil Markings */}
          <div className="absolute right-7 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] sm:text-xs font-mono tracking-widest text-slate-400/40 font-bold uppercase whitespace-nowrap">
            PUBG // WING-R // HYDRAULIC-02
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 3. MIDDLE TOP SHUTTER (Width: 44vw, Height: 52.6vh)          */}
      {/* ============================================================ */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={
          stage === 'side_closing'
            ? { y: '-100%' }
            : isOpening
            ? { y: '-105%' }
            : { y: '0%' }
        }
        transition={
          isOpening
            ? { duration: 0.65, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0.58, ease: [0.18, 0.89, 0.32, 1.1] }
        }
        className="absolute left-[28vw] top-0 w-[44vw] h-[52.6vh] z-20 overflow-hidden flex flex-col justify-end shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
        style={{
          background:
            'linear-gradient(180deg, #17212b 0%, #283747 45%, #42586b 85%, #697f91 100%)',
        }}
      >
        {/* Top Hydraulic Frame & Reinforcement Bar */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-[#141b23] border-b border-slate-600/50 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-mono text-emerald-400/80 tracking-widest">
              HYDRAULIC: LOCK-A
            </span>
          </div>
          <div className="text-[9px] font-mono text-amber-400/70 tracking-widest uppercase">
            SEC: AMANI-HQ
          </div>
        </div>

        {/* Hazard striping bar along top */}
        <div
          className="absolute top-7 left-0 right-0 h-3 border-b border-black/50"
          style={{
            background:
              'repeating-linear-gradient(45deg, #dca827 0, #dca827 8px, #1a242f 8px, #1a242f 16px)',
          }}
        />

        {/* Steel Plate Decorative Seams & Rivets */}
        <div className="absolute top-12 left-4 right-4 flex justify-between px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-slate-500 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.9)]"
            />
          ))}
        </div>

        {/* Center Top Gate Asset Image */}
        <div className="w-full relative flex items-end justify-center">
          <img
            src={midTopGateImg}
            alt="PUBG Gate Mid Top"
            className="w-full h-auto max-h-[52.6vh] object-contain object-bottom block select-none pointer-events-none"
            style={{
              filter: 'contrast(102%) brightness(98%) drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
            }}
          />
        </div>

        {/* Seam line highlight at bottom edge */}
        <div className="w-full h-[2px] bg-cyan-400/40 shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
      </motion.div>

      {/* ============================================================ */}
      {/* 4. MIDDLE BOTTOM SHUTTER (Width: 44vw, Height: 47.4vh)       */}
      {/* ============================================================ */}
      <motion.div
        initial={{ y: '100%' }}
        animate={
          stage === 'side_closing'
            ? { y: '100%' }
            : isOpening
            ? { y: '105%' }
            : { y: '0%' }
        }
        transition={
          isOpening
            ? { duration: 0.65, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0.58, ease: [0.18, 0.89, 0.32, 1.1] }
        }
        className="absolute left-[28vw] bottom-0 w-[44vw] h-[47.4vh] z-20 overflow-hidden flex flex-col justify-start shadow-[0_-12px_30px_rgba(0,0,0,0.8)]"
        style={{
          background:
            'linear-gradient(0deg, #131a22 0%, #202c38 45%, #3c5061 85%, #627788 100%)',
        }}
      >
        {/* Seam line highlight at top edge */}
        <div className="w-full h-[2px] bg-cyan-400/40 shadow-[0_0_8px_rgba(56,189,248,0.7)]" />

        {/* Center Bottom Gate Asset Image */}
        <div className="w-full relative flex items-start justify-center">
          <img
            src={midBottomGateImg}
            alt="PUBG Gate Mid Bottom"
            className="w-full h-auto max-h-[47.4vh] object-contain object-top block select-none pointer-events-none"
            style={{
              filter: 'contrast(102%) brightness(98%) drop-shadow(0 -4px 10px rgba(0,0,0,0.5))',
            }}
          />
        </div>

        {/* Industrial Ventilation Grate Texture */}
        <div className="flex-1 w-full relative px-6 py-3 flex flex-col justify-between">
          <div
            className="w-full h-8 rounded border border-slate-700/60 opacity-60"
            style={{
              background:
                'repeating-linear-gradient(to bottom, #10161d 0, #10161d 3px, #2a3b4c 3px, #2a3b4c 6px)',
            }}
          />

          {/* Bottom Hydraulic Status Footer */}
          <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-400/70 border-t border-slate-700/40 pt-1.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              PRESSURIZED: 4200 PSI
            </span>
            <span>AMANI BATTLEGROUNDS // V2.0</span>
          </div>
        </div>

        {/* Bottom Hazard Striping Bar */}
        <div
          className="w-full h-3 border-t border-black/50"
          style={{
            background:
              'repeating-linear-gradient(-45deg, #dca827 0, #dca827 8px, #1a242f 8px, #1a242f 16px)',
          }}
        />
      </motion.div>

      {/* ============================================================ */}
      {/* 5. CENTER IMPACT FLASH & RETICLE ENERGY PULSE                */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isGateClosed && !isOpening && (
          <motion.div
            initial={{ opacity: 0.9, scale: 1.3 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-cyan-400/30 blur-2xl z-35 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Reticle Lock Glow overlay (Around the Level 3 Helmet Center) */}
      {isGateClosed && !isOpening && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-400/30 shadow-[0_0_25px_rgba(56,189,248,0.35)] z-35 pointer-events-none"
        />
      )}

      {/* ============================================================ */}
      {/* 6. PUBG TACTICAL LOADING HUD OVERLAY                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {stage === 'locked_loading' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-40 flex flex-col justify-between p-4 sm:p-8 pointer-events-none"
          >
            {/* Top Bar: Telemetry & Controls */}
            <div className="w-full flex items-center justify-between pointer-events-auto">
              {/* Left Badge: PUBG Title & Version */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700/70 backdrop-blur-md">
                <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black text-[10px] font-black tracking-wider">
                  PUBG
                </span>
                <span className="text-[11px] font-mono text-slate-200 font-bold tracking-wider">
                  BATTLEGROUNDS
                </span>
                <span className="text-[10px] font-mono text-amber-400/80 border-l border-slate-700 pl-2">
                  V2.4.0
                </span>
              </div>

              {/* Right Badges: Controls & Telemetry */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700/70 backdrop-blur-md text-emerald-400">
                  <Wifi className="w-3.5 h-3.5" />
                  <span>18 ms</span>
                </div>

                {/* Sound Toggle Button */}
                <button
                  onClick={toggleSound}
                  className="px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-slate-800/80 border border-slate-700/70 text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  title="Toggle SFX"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>

                {/* Fast Forward / Skip Button */}
                <button
                  onClick={handleSkip}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 hover:text-amber-200 transition-all flex items-center gap-1 cursor-pointer font-cairo text-xs font-bold"
                >
                  <FastForward className="w-3 h-3" />
                  <span>تخطي</span>
                </button>
              </div>
            </div>

            {/* Bottom HUD: Status Ticker, Percentage, and Iconic PUBG Progress Bar */}
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center pointer-events-auto">
              {/* Tactical Status Ticker */}
              <div className="w-full flex items-center justify-between text-xs font-mono mb-2 px-1">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="text-amber-300 font-bold tracking-wide">
                    {statusText}
                  </span>
                </div>
                <div className="text-slate-300 font-bold">
                  {progress}%
                </div>
              </div>

              {/* PUBG Yellow Striped Loading Progress Bar */}
              <div className="w-full h-4 sm:h-5 bg-black/80 rounded-md border-2 border-[#2b3a4a] p-0.5 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(0,0,0,0.9)]">
                <div
                  className="h-full rounded-sm transition-all duration-75 relative overflow-hidden"
                  style={{
                    width: `${progress}%`,
                    background:
                      'repeating-linear-gradient(45deg, #eab308 0, #eab308 12px, #ca8a04 12px, #ca8a04 24px)',
                    animation: 'pubgStripeMove 1s linear infinite',
                    boxShadow: '0 0 12px rgba(234, 179, 8, 0.6)',
                  }}
                >
                  {/* Glossy top reflection */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/25 pointer-events-none" />
                </div>
              </div>

              {/* Sub-status & Romantic Easter Egg */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] font-mono text-slate-400 mt-2.5 px-1">
                <span className="text-slate-400 tracking-wider">
                  {subStatus}
                </span>
                <span className="text-amber-400/90 font-cairo font-bold flex items-center gap-1">
                  <span>المقاتلة الأولى:</span>
                  <span className="text-white bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">
                    {playerName}
                  </span>
                </span>
              </div>

              {/* PUBG Quote of the Day */}
              <div className="mt-3 text-[11px] font-cairo text-slate-300/80 text-center bg-black/50 px-4 py-1.5 rounded-full border border-slate-700/50 backdrop-blur-sm">
                💡 <span className="text-amber-300 font-bold">نصيحة المعركة:</span> الفائز الحقيقي ليس من يحصل على Chicken Dinner، بل من يملك قلب أماني 💕
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PubgLoadingGate;
