// ===== WEB AUDIO API SOUND DESIGN SYSTEM =====

class SoundDesign {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.masterVolume = this.audioContext.createGain();
    this.masterVolume.gain.value = 0.3; // Subtle volume
    this.masterVolume.connect(this.audioContext.destination);
  }

  // ===== HOVER SOUND (Soft whoosh) =====
  playHoverSound() {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // ===== CLICK SOUND (Bright chime) =====
  playClickSound() {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // ===== SUCCESS SOUND (Rising chord) =====
  playSuccessSound() {
    const now = this.audioContext.currentTime;
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

    frequencies.forEach((freq, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.frequency.value = freq;
      osc.type = 'sine';

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.1 + index * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(this.masterVolume);

      osc.start(now + index * 0.05);
      osc.stop(now + 0.5);
    });
  }

  // ===== CONFETTI BURST SOUND =====
  playConfettiSound() {
    const now = this.audioContext.currentTime;
    const noise = this.audioContext.createBufferSource();
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.2, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    noise.buffer = buffer;

    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(5000, now);

    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterVolume);

    noise.start(now);
  }

  // ===== FLOWER BLOOM SOUND =====
  playFlowerBloomSound() {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.4);
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // ===== AMBIENT GARDEN HUM =====
  playAmbientSound() {
    const now = this.audioContext.currentTime;
    const baseFreq = 110; // A2
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.frequency.value = baseFreq;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.02, now);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start(now);
    return osc; // Return for later control
  }

  // ===== TRANSITION SOUND =====
  playTransitionSound() {
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.3);
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.start(now);
    osc.stop(now + 0.3);
  }
}

// ===== INITIALIZE SOUND SYSTEM =====
let soundDesign;
try {
  soundDesign = new SoundDesign();
} catch (e) {
  console.log('Web Audio API not available');
  soundDesign = null;
}

// ===== ATTACH SOUND EVENTS =====
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (soundDesign) soundDesign.playHoverSound();
    });

    button.addEventListener('click', () => {
      if (soundDesign) soundDesign.playClickSound();
    });
  });

  // Play success sound when Yes button is clicked
  const yesBtn = document.getElementById('yes');
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      if (soundDesign) {
        soundDesign.playSuccessSound();
        setTimeout(() => {
          if (soundDesign) soundDesign.playConfettiSound();
        }, 150);
      }
    });
  }

  // Flower bloom sounds on garden page
  const flowers = document.querySelectorAll('.flower');
  flowers.forEach((flower, index) => {
    flower.addEventListener('mouseenter', () => {
      if (soundDesign) {
        setTimeout(() => {
          soundDesign.playFlowerBloomSound();
        }, index * 50);
      }
    });
  });

  // Play ambient sound on load
  if (soundDesign && document.querySelector('.night')) {
    soundDesign.playAmbientSound();
  }
});
