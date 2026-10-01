import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import leftGateImg from '@/assets/pgate/left.png';
import rightGateImg from '@/assets/pgate/right.png';
import midTopGateImg from '@/assets/pgate/mid top.png';
import midBottomGateImg from '@/assets/pgate/mid bottom.png';
import { Shield, Wifi, Terminal, Volume2, VolumeX, FastForward, X } from 'lucide-react';

interface PubgLoadingGateProps {
  onComplete: () => void;
  onClose?: () => void;
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
      } catch {
        // Audio fallback
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Pneumatic hydraulic hiss
  playHydraulicHiss() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const bufferSize = Math.floor(ctx.sampleRate * 0.55);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.5);
      filter.Q.value = 2.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.52);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Silent catch
    }
  }

  // Metallic impact slam
  playHeavyMetalSlam() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(24, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);

      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sawtooth';
      clickOsc.frequency.setValueAtTime(550, ctx.currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.09);
      clickGain.gain.setValueAtTime(0.2, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start();
      clickOsc.stop(ctx.currentTime + 0.11);
    } catch {
      // Silent catch
    }
  }

  // HUD beep
  playHudBeep() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
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
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.31);
      });
    } catch {
      // Silent catch
    }
  }
}

export const PubgLoadingGate: React.FC<PubgLoadingGateProps> = ({
  onComplete,
  onClose,
  playerName = 'أماني 💕',
}) => {
  // Stages:
  // 1: 'side_closing' (Left & Right slide in to 24% each)
  // 2: 'mid_closing' (Middle Top & Bottom slam from top & bottom)
  // 3: 'locked_loading' (PUBG HUD appears, progress bar 0 -> 100%)
  // 4: 'opening' (Gate opens / breach effect)
  const [stage, setStage] = useState<'side_closing' | 'mid_closing' | 'locked_loading' | 'opening'>('side_closing');
  const [progress, setProgress] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [statusText, setStatusText] = useState('CONNECTING TO BATTLEGROUNDS...');
  const [subStatus, setSubStatus] = useState('LEVEL 3 BLAST GATE ENGAGED // LINK SECURE');

  const soundRef = useRef<GateSoundSynthesizer | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const hasCompletedRef = useRef(false);

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

  const finishSequence = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    soundRef.current?.playMatchChime();
    setStage('opening');
    setTimeout(() => {
      onCompleteRef.current();
    }, 600);
  }, []);

  const handleSkip = useCallback(() => {
    finishSequence();
  }, [finishSequence]);

  const handleClose = useCallback(() => {
    if (onCloseRef.current) {
      onCloseRef.current();
    } else {
      finishSequence();
    }
  }, [finishSequence]);

  // Orchestrate closing sequence
  useEffect(() => {
    // 0.0s: Side doors slide in
    soundRef.current?.playHydraulicHiss();

    // 0.75s: Middle top & bottom doors slide from top & bottom
    const t1 = setTimeout(() => {
      setStage('mid_closing');
      soundRef.current?.playHydraulicHiss();
    }, 750);

    // 1.35s: Middle doors collide and lock shut!
    const t2 = setTimeout(() => {
      soundRef.current?.playHeavyMetalSlam();
      setShaking(true);
      setTimeout(() => setShaking(false), 260);
      setStage('locked_loading');
    }, 1350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Loading progress bar ticker (Rock-solid requestAnimationFrame timer)
  useEffect(() => {
    if (stage !== 'locked_loading') return;

    const LOADING_DURATION_MS = 2200; // Fast and snappy loading (2.2 seconds)
    const startTime = performance.now();
    let animFrame: number;
    let lastBeep = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / LOADING_DURATION_MS) * 100));
      setProgress(pct);

      if (pct - lastBeep >= 20) {
        lastBeep = pct;
        soundRef.current?.playHudBeep();
      }

      if (pct < 35) {
        setStatusText('AUTHENTICATING IDENTITY: أماني 💕');
        setSubStatus('RETRIEVING POETRY ARCHIVES // LEVEL 3 HELMET EQUIPPED');
      } else if (pct < 70) {
        setStatusText('SYNCING MEMORIES & BATTLEGROUND DATA...');
        setSubStatus('MAP: عوالم الحب الأبدية (AMANI\'S REALM)');
      } else if (pct < 98) {
        setStatusText('MATCH FOUND! PREPARING DROP ZONE...');
        setSubStatus('PING: 18ms | SQUAD: 2/2 | READY TO DEPLOY');
      } else {
        setStatusText('GATEWAY UNLOCKED! WELCOME HOME 👑');
        setSubStatus('ACCESS GRANTED // ENTERING AMANI\'S WORLDS');
        // Finish sequence automatically
        finishSequence();
        return;
      }

      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);

    // Hard fallback timeout: ensure completion after 3.2s no matter what
    const hardTimeout = setTimeout(() => {
      finishSequence();
    }, 3200);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(hardTimeout);
    };
  }, [stage, finishSequence]);

  const isGateClosed = stage === 'locked_loading' || stage === 'mid_closing';
  const isOpening = stage === 'opening';

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#070b10] select-none font-cairo ${
        shaking ? 'animate-[shake_0.25s_ease-in-out]' : ''
      }`}
    >
      {/* Dynamic Keyframe for screen shake */}
      <style>{`
        @keyframes shake {
          0% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-4px, 3px) rotate(-0.3deg); }
          40% { transform: translate(4px, -3px) rotate(0.3deg); }
          60% { transform: translate(-3px, -2px) rotate(-0.2deg); }
          80% { transform: translate(2px, 2px) rotate(0.1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes pubgStripeMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>

      {/* BACKGROUND PORTAL (Revealed behind the gate when opening) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030d07] via-[#06180e] to-[#030a06] flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />
        <div className="text-center opacity-60">
          <Shield className="w-16 h-16 mx-auto text-emerald-400/50 mb-2" />
          <span className="text-xs tracking-widest text-emerald-300/60 font-mono">
            GATEWAY OPENING...
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. LEFT SLIDING BLAST DOOR (Width: 24vw, Height: 100vh)      */}
      {/* ============================================================ */}
      <motion.div
        initial={{ x: '-102%' }}
        animate={isOpening ? { x: '-105%' } : { x: '0%' }}
        transition={
          isOpening
            ? { duration: 0.6, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
        }
        className="absolute left-0 top-0 w-[24vw] h-full z-30 shadow-[8px_0_30px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: '#314056',
        }}
      >
        {/* Top Hazard Tape */}
        <div
          className="w-full h-3 sm:h-4 border-b border-black/40 shrink-0"
          style={{
            background:
              'repeating-linear-gradient(-45deg, #dca827 0, #dca827 8px, #314056 8px, #314056 16px)',
          }}
        />

        {/* Center Section: Embedded left.png image, anchored flush to the inner (right) edge */}
        <div className="relative flex-1 w-full flex items-center justify-end overflow-hidden bg-[#314056]">
          {/* Rivets column along left edge */}
          <div className="absolute left-1.5 sm:left-3 inset-y-4 flex flex-col justify-around items-center pointer-events-none z-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.8)] border border-slate-600"
              />
            ))}
          </div>

          {/* Left Door Image: Scaled naturally to fit height & anchored right with seamless color */}
          <img
            src={leftGateImg}
            alt="PUBG Gate Left"
            className="h-full max-h-[500px] w-auto object-contain object-right block select-none pointer-events-none"
          />
        </div>

        {/* Bottom Hazard Tape */}
        <div
          className="w-full h-3 sm:h-4 border-t border-black/40 shrink-0"
          style={{
            background:
              'repeating-linear-gradient(45deg, #dca827 0, #dca827 8px, #314056 8px, #314056 16px)',
          }}
        />
      </motion.div>

      {/* ============================================================ */}
      {/* 2. RIGHT SLIDING BLAST DOOR (Width: 24vw, Height: 100vh)     */}
      {/* ============================================================ */}
      <motion.div
        initial={{ x: '102%' }}
        animate={isOpening ? { x: '105%' } : { x: '0%' }}
        transition={
          isOpening
            ? { duration: 0.6, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
        }
        className="absolute right-0 top-0 w-[24vw] h-full z-30 shadow-[-8px_0_30px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: '#314056',
        }}
      >
        {/* Top Hazard Tape */}
        <div
          className="w-full h-3 sm:h-4 border-b border-black/40 shrink-0"
          style={{
            background:
              'repeating-linear-gradient(45deg, #dca827 0, #dca827 8px, #314056 8px, #314056 16px)',
          }}
        />

        {/* Center Section: Embedded right.png image, anchored flush to the inner (left) edge */}
        <div className="relative flex-1 w-full flex items-center justify-start overflow-hidden bg-[#314056]">
          {/* Rivets column along right edge */}
          <div className="absolute right-1.5 sm:right-3 inset-y-4 flex flex-col justify-around items-center pointer-events-none z-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.8)] border border-slate-600"
              />
            ))}
          </div>

          {/* Right Door Image: Scaled naturally to fit height & anchored left with seamless color */}
          <img
            src={rightGateImg}
            alt="PUBG Gate Right"
            className="h-full max-h-[500px] w-auto object-contain object-left block select-none pointer-events-none"
          />
        </div>

        {/* Bottom Hazard Tape */}
        <div
          className="w-full h-3 sm:h-4 border-t border-black/40 shrink-0"
          style={{
            background:
              'repeating-linear-gradient(-45deg, #dca827 0, #dca827 8px, #314056 8px, #314056 16px)',
          }}
        />
      </motion.div>

      {/* ============================================================ */}
      {/* 3. MIDDLE TOP SHUTTER (Width: 52vw, Left: 24vw, Height: 50vh)*/}
      {/* ============================================================ */}
      <motion.div
        initial={{ y: '-102%' }}
        animate={
          stage === 'side_closing'
            ? { y: '-102%' }
            : isOpening
            ? { y: '-105%' }
            : { y: '0%' }
        }
        transition={
          isOpening
            ? { duration: 0.55, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0.55, ease: [0.18, 0.89, 0.32, 1.08] }
        }
        className="absolute left-[24vw] top-0 w-[52vw] h-[50vh] z-20 overflow-hidden flex flex-col justify-end shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
        style={{
          background: 'linear-gradient(180deg, #131921 0%, #202b37 60%, #3a4d5e 100%)',
        }}
      >
        {/* Top Hydraulic Bulkhead & Hazard bar */}
        <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-[#0f141a] border-b border-slate-700/60 flex items-center justify-between px-2 sm:px-4 z-10">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[8px] sm:text-[10px] font-mono text-emerald-400 font-bold tracking-wider">
              HYDRAULIC-A
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono text-amber-400 font-bold uppercase">
            SEC: AMANI-GATE
          </span>
        </div>

        {/* Hazard striping below bulkhead */}
        <div
          className="absolute top-6 sm:top-8 left-0 right-0 h-2 sm:h-3 border-b border-black/40"
          style={{
            background:
              'repeating-linear-gradient(45deg, #dca827 0, #dca827 6px, #141c26 6px, #141c26 12px)',
          }}
        />

        {/* Center Mid-Top Image: Anchored flush to the bottom edge */}
        <div className="relative w-full flex items-end justify-center">
          <img
            src={midTopGateImg}
            alt="PUBG Gate Mid Top"
            className="w-full max-h-[300px] object-contain object-bottom block select-none pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Horizontal Seam Latch Highlight */}
        <div className="w-full h-[2px] bg-cyan-400/50 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
      </motion.div>

      {/* ============================================================ */}
      {/* 4. MIDDLE BOTTOM SHUTTER (Width: 52vw, Left: 24vw, Height: 50vh)*/}
      {/* ============================================================ */}
      <motion.div
        initial={{ y: '102%' }}
        animate={
          stage === 'side_closing'
            ? { y: '102%' }
            : isOpening
            ? { y: '105%' }
            : { y: '0%' }
        }
        transition={
          isOpening
            ? { duration: 0.55, ease: [0.32, 0, 0.67, 0] }
            : { duration: 0.55, ease: [0.18, 0.89, 0.32, 1.08] }
        }
        className="absolute left-[24vw] bottom-0 w-[52vw] h-[50vh] z-20 overflow-hidden flex flex-col justify-start shadow-[0_-10px_25px_rgba(0,0,0,0.85)]"
        style={{
          background: 'linear-gradient(0deg, #11171f 0%, #1c2734 60%, #344757 100%)',
        }}
      >
        {/* Horizontal Seam Latch Highlight */}
        <div className="w-full h-[2px] bg-cyan-400/50 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

        {/* Center Mid-Bottom Image: Anchored flush to the top edge */}
        <div className="relative w-full flex items-start justify-center">
          <img
            src={midBottomGateImg}
            alt="PUBG Gate Mid Bottom"
            className="w-full max-h-[300px] object-contain object-top block select-none pointer-events-none drop-shadow-[0_-4px_8px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Ventilation Grate styling under image */}
        <div className="flex-1 w-full px-3 py-2 flex flex-col justify-between">
          <div
            className="w-full h-4 sm:h-6 rounded border border-slate-700/50 opacity-40"
            style={{
              background:
                'repeating-linear-gradient(to bottom, #0e141a 0, #0e141a 3px, #263544 3px, #263544 6px)',
            }}
          />

          {/* Bottom Pressure Status */}
          <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-400/70 border-t border-slate-700/40 pt-1">
            <span>PRESSURIZED: 4200 PSI</span>
            <span>AMANI BATTLEGROUNDS</span>
          </div>
        </div>

        {/* Bottom Hazard Tape */}
        <div
          className="w-full h-2 sm:h-3 border-t border-black/40 shrink-0"
          style={{
            background:
              'repeating-linear-gradient(-45deg, #dca827 0, #dca827 6px, #141c26 6px, #141c26 12px)',
          }}
        />
      </motion.div>

      {/* ============================================================ */}
      {/* 5. CENTER IMPACT FLASH & PULSE                               */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isGateClosed && !isOpening && (
          <motion.div
            initial={{ opacity: 0.9, scale: 1.2 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-cyan-400/35 blur-2xl z-35 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 6. PUBG TACTICAL LOADING HUD (Responsive for Phones & Desktop)*/}
      {/* ============================================================ */}
      <AnimatePresence>
        {stage === 'locked_loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-40 flex flex-col justify-between p-3 sm:p-6 pointer-events-none"
          >
            {/* Top Bar: Telemetry & Controls */}
            <div className="w-full flex items-center justify-between pointer-events-auto">
              {/* PUBG Title Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 border border-slate-700/80 backdrop-blur-md">
                <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] sm:text-[10px] font-black tracking-wider">
                  PUBG
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-200 font-bold tracking-wider">
                  BATTLEGROUNDS
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 border border-slate-700/80 text-emerald-400 text-[10px]">
                  <Wifi className="w-3 h-3" />
                  <span>18 ms</span>
                </div>

                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={toggleSound}
                  className="p-1.5 rounded-lg bg-black/70 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all cursor-pointer"
                  title="Toggle SFX"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>

                {/* Skip Button */}
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-cairo text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <FastForward className="w-3 h-3" />
                  <span>تخطي</span>
                </button>

                {/* Close/Exit Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 transition-all cursor-pointer"
                  title="إغلاق"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom HUD: Status Ticker, Percentage, and Iconic PUBG Progress Bar */}
            <div className="w-full max-w-xl mx-auto flex flex-col items-center pointer-events-auto bg-black/60 p-3 sm:p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
              {/* Tactical Status Ticker */}
              <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono mb-1.5 px-1">
                <div className="flex items-center gap-1.5 truncate">
                  <Terminal className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
                  <span className="text-amber-300 font-bold truncate">
                    {statusText}
                  </span>
                </div>
                <div className="text-slate-200 font-bold ml-2 shrink-0">
                  {progress}%
                </div>
              </div>

              {/* PUBG Yellow Striped Loading Progress Bar */}
              <div className="w-full h-3.5 sm:h-4 bg-black/90 rounded-md border border-[#304052] p-0.5 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-sm transition-all duration-75 relative overflow-hidden"
                  style={{
                    width: `${progress}%`,
                    background:
                      'repeating-linear-gradient(45deg, #eab308 0, #eab308 10px, #ca8a04 10px, #ca8a04 20px)',
                    animation: 'pubgStripeMove 1s linear infinite',
                    boxShadow: '0 0 10px rgba(234, 179, 8, 0.7)',
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 pointer-events-none" />
                </div>
              </div>

              {/* Sub-status & Player Info */}
              <div className="w-full flex items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2 px-1">
                <span className="truncate">{subStatus}</span>
                <span className="text-amber-400 font-cairo font-bold shrink-0">
                  {playerName}
                </span>
              </div>

              {/* PUBG Quote */}
              <div className="mt-2 text-[10px] sm:text-[11px] font-cairo text-slate-300/80 text-center">
                💡 <span className="text-amber-300 font-bold">نصيحة:</span> الفائز الحقيقي هو من يملك قلب أماني 💕
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PubgLoadingGate;
