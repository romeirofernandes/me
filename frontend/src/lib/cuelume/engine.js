import { RECIPES, isSoundName } from "./recipes.js";

const SOURCE_STOP_PADDING = 0.05;
const CLEANUP_MARGIN = 0.05;
const INAUDIBLE_GAIN = 0.001;

function renderTone(context, destination, layer, startTime) {
  const oscillator = context.createOscillator();
  oscillator.type = layer.waveform;
  oscillator.frequency.setValueAtTime(layer.frequency, startTime);
  if (layer.detune) oscillator.detune.value = layer.detune;
  if (layer.glideTo !== undefined) {
    const glideTime = layer.glideTime ?? layer.attack + layer.decay;
    oscillator.frequency.exponentialRampToValueAtTime(layer.glideTo, startTime + glideTime);
  }
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(layer.peak, startTime + layer.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + layer.attack + layer.decay);
  oscillator.connect(gain).connect(destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + layer.attack + layer.decay + SOURCE_STOP_PADDING);
}

function renderNoise(context, destination, layer, startTime) {
  const duration = layer.attack + layer.decay + SOURCE_STOP_PADDING;
  const length = Math.max(1, Math.floor(duration * context.sampleRate));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = 2 * Math.random() - 1;
  const source = context.createBufferSource();
  source.buffer = buffer;
  const filter = context.createBiquadFilter();
  filter.type = layer.filterType;
  filter.frequency.value = layer.filterFrequency;
  if (layer.filterQ !== undefined) filter.Q.value = layer.filterQ;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(layer.peak, startTime + layer.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + layer.attack + layer.decay);
  source.connect(filter).connect(gain).connect(destination);
  source.start(startTime);
  source.stop(startTime + duration);
}

function attachShimmer(context, source, destination, shimmer) {
  const delay = context.createDelay(1);
  delay.delayTime.value = shimmer.delay;
  const feedbackFilter = context.createBiquadFilter();
  feedbackFilter.type = "lowpass";
  feedbackFilter.frequency.value = shimmer.lowpass;
  const feedbackGain = context.createGain();
  feedbackGain.gain.value = shimmer.feedback;
  const wetGain = context.createGain();
  wetGain.gain.value = shimmer.wet;
  source.connect(delay);
  delay.connect(feedbackFilter);
  feedbackFilter.connect(feedbackGain);
  feedbackGain.connect(delay);
  feedbackFilter.connect(wetGain);
  wetGain.connect(destination);
  return [delay, feedbackFilter, feedbackGain, wetGain];
}

function sourceEnd(recipe) {
  return Math.max(...recipe.layers.map((layer) => (layer.offset ?? 0) + layer.attack + layer.decay + SOURCE_STOP_PADDING));
}

function shimmerTail(shimmer) {
  if (!shimmer || shimmer.feedback <= 0) return 0;
  if (shimmer.feedback >= 1) return shimmer.delay;
  return shimmer.delay * (1 + Math.ceil(Math.log(INAUDIBLE_GAIN) / Math.log(shimmer.feedback)));
}

function renderRecipe(context, recipe) {
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.value = recipe.masterGain;
  master.connect(context.destination);
  const shimmerNodes = recipe.shimmer
    ? attachShimmer(context, master, context.destination, recipe.shimmer)
    : [];
  for (const layer of recipe.layers) {
    const startTime = now + (layer.offset ?? 0);
    if (layer.kind === "tone") renderTone(context, master, layer, startTime);
    else renderNoise(context, master, layer, startTime);
  }
  const cleanupAfterMs = (sourceEnd(recipe) + shimmerTail(recipe.shimmer) + CLEANUP_MARGIN) * 1000;
  setTimeout(() => {
    master.disconnect();
    for (const node of shimmerNodes) node.disconnect();
  }, cleanupAfterMs);
}

let sharedContext = null;
let enabled = true;
let globalGain = 1.6;
let bufferCache = null;
let prewarmPromise = null;

export function setVolume(gain) {
  globalGain = Math.max(0, Math.min(2, gain));
}

export function setEnabled(value) {
  if (typeof value === "boolean") enabled = value;
}

function getAudioContext() {
  if (sharedContext) return sharedContext;
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? window.webkitAudioContext;
  if (!Ctor) return null;
  try { sharedContext = new Ctor(); } catch { return null; }
  return sharedContext;
}

function buildCacheEntry(context, recipe) {
  const duration = sourceEnd(recipe) + shimmerTail(recipe.shimmer) + CLEANUP_MARGIN;
  const length = Math.max(1, Math.ceil(duration * context.sampleRate));
  const offline = new OfflineAudioContext(1, length, context.sampleRate);
  renderRecipe(offline, recipe);
  return offline.startRendering();
}

export function prewarm() {
  if (prewarmPromise) return prewarmPromise;
  if (typeof window === "undefined") return Promise.resolve();
  try {
    new (window.OfflineAudioContext ?? window.webkitOfflineAudioContext)(1, 1, 44100);
  } catch {
    return Promise.resolve();
  }
  prewarmPromise = (async () => {
    const sampleRate = 44100;
    bufferCache = {};
    const entries = Object.entries(RECIPES);
    await Promise.all(entries.map(async ([name, recipe]) => {
      bufferCache[name] = await buildCacheEntry({ sampleRate }, recipe);
    }));
  })();
  return prewarmPromise;
}

export function prime() {
  const context = getAudioContext();
  if (context && context.state !== "running") {
    try { void context.resume(); } catch {}
  }
}

export function play(sound = "chime") {
  if (!enabled || !isSoundName(sound)) return;
  if (typeof navigator !== "undefined" && navigator.userActivation?.hasBeenActive === false) return;
  const context = getAudioContext();
  if (!context) return;
  if (bufferCache?.[sound]) {
    playBuffer(context, sound);
    if (context.state !== "running") {
      try { void context.resume(); } catch {}
    }
  } else {
    const recipe = RECIPES[sound];
    if (context.state === "running") {
      renderRecipe(context, { ...recipe, masterGain: recipe.masterGain * globalGain });
    } else {
      try {
        void context.resume().then(() => {
          if (enabled && context.state === "running")
            renderRecipe(context, { ...recipe, masterGain: recipe.masterGain * globalGain });
        }, () => {});
      } catch {}
    }
  }
}

function playBuffer(context, sound) {
  const buffer = bufferCache[sound];
  if (!buffer) return;
  const source = context.createBufferSource();
  source.buffer = buffer;
  if (globalGain !== 1) {
    const gain = context.createGain();
    gain.gain.value = globalGain;
    source.connect(gain).connect(context.destination);
  } else {
    source.connect(context.destination);
  }
  source.start();
}
