let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (audioContext && audioContext.state !== "closed") {
    return audioContext;
  }

  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContextClass) {
    throw new Error("Web Audio API is not supported in this browser.");
  }

  audioContext = new AudioContextClass();
  return audioContext;
}

function playTone({
  frequency,
  volume,
  duration,
}: {
  frequency: number;
  volume: number;
  duration: number;
}) {
  try {
    const ctx = getAudioContext();
    void ctx.resume().catch(() => undefined);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  } catch {}
}

export function playKeyClick() {
  playTone({
    frequency: 600,
    volume: 0.3,
    duration: 0.04,
  });
}

export function playCommandExecute() {
  playTone({
    frequency: 440,
    volume: 0.25,
    duration: 0.08,
  });
}