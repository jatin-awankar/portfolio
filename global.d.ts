// global.d.ts
declare module '*.mp3';
declare module '*.wav';

interface Window {
  webkitAudioContext?: typeof AudioContext;
}
