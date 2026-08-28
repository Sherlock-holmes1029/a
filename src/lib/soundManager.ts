import { Howl } from 'howler';

class SoundManager {
  private ambientHowl: Howl | null = null;
  private isMuted: boolean = true;

  constructor() {
    // Ambient sound loader — loads user's ambient.mp3 if present in public/audio/
    // Drop your audio file at public/audio/ambient.mp3
    try {
      this.ambientHowl = new Howl({
        src: ['/audio/ambient.mp3', '/audio/ambient.ogg'],
        html5: true,
        loop: true,
        volume: 0.45,
        autoplay: false,
        onloaderror: () => {
          // File not provided yet, fallback gracefully without error
        },
      });
    } catch {
      // Safe fallback
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      if (this.ambientHowl && this.ambientHowl.playing()) {
        this.ambientHowl.pause();
      }
    } else {
      if (this.ambientHowl) {
        try {
          if (!this.ambientHowl.playing()) {
            this.ambientHowl.play();
          }
        } catch {
          // audio load fallback
        }
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setSection(_section: string) {
    // Can adjust volume or crossfade if multi-track provided in the future
  }

  public playChime() {
    if (this.isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + idx * 0.07 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.7);
        });
      }
    } catch {
      // safe fallback
    }
  }

  public playTap() {
    if (this.isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {
      // safe fallback
    }
  }
}

export const soundManager = new SoundManager();
