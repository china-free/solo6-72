let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3): void {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error('Failed to play tone:', e);
  }
}

export function playFlipSound(enabled: boolean): void {
  if (!enabled) return;
  playTone(800, 0.1, 'sine', 0.2);
}

export function playMatchSound(enabled: boolean): void {
  if (!enabled) return;
  playTone(523, 0.1, 'sine', 0.3);
  setTimeout(() => playTone(659, 0.1, 'sine', 0.3), 100);
  setTimeout(() => playTone(784, 0.15, 'sine', 0.3), 200);
}

export function playMismatchSound(enabled: boolean): void {
  if (!enabled) return;
  playTone(200, 0.15, 'sawtooth', 0.2);
  setTimeout(() => playTone(150, 0.2, 'sawtooth', 0.2), 100);
}

export function playWinSound(enabled: boolean): void {
  if (!enabled) return;
  const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'sine', 0.3), i * 100);
  });
}
