// const timers = require('./timers.js');
const four_to_floor_drum = 'kick';
const rand_min = 0;
const bpm_ms = timers.tempoConversion(timers.bpm, timers.delay(timers.stepTime));
const number_of_patternBounces = 3

/*
__drum object__
drumType can contain different drum sounds from various libraries, could become
pattern has drum, velocity with default 5 and range 0-10, and on/off using booleans
steps can be 8, 16, 32, 64 should have a upper limit with default 8
mute is per drum with default false
solo is per drum with default false
volume is per drum with default 5
overall velocity with default 5
*/

const drums = {
  /* example data

  kick: {
  drumType: ['808 kick', '909 kick'],
  pattern: [{ drum: 'kick', velocity: 5, on: false }, { drum: 'kick', velocity: 10, on: true }],
  track: [
    { preset1: [{ drum: 'kick', velocity: 5, on: false }, { drum: 'kick', velocity: 3, on: true }] },
    { preset2: [{ drum: 'kick', velocity: 10, on: true }, { drum: 'kick', velocity: 1, on: true }] },
    { preset3: [{ drum: 'kick', velocity: 5, on: false }, { drum: 'kick', velocity: 3, on: true }] }
  ],
  combo of patterns
  steps: 8,
  mute: false,
  solo: false,
  volume: 5,
  velocity: 5
  },

  */

  kick: { drumType: ['808 kick', '909 kick'], pattern: [], track: [], steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
  hihat: { drumType: ['open hihat', 'closed hihat'], pattern: [], track: [], steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
  snare: { drumType: ['vistolite', 'wood marching band'], pattern: [], track: [], steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
}
const drum_keys = Object.keys(drums);
const drum_keys_length = Object.keys(drums).length;

const song = {
  combo: { combo_pattern: [], steps: 8},
  pattern: [],
  song: [],
  playback: false
};