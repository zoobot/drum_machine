const drums = {
  /* example data

  kick: {
  drum_type: ['808 kick', '909 kick'],
  pattern: [{ drum: 'kick', velocity: 5, on: false, preset_active: ''}, { drum: 'kick', velocity: 10, on: true }],
  pattern_presets: [
    { preset1: [{ drum: 'kick', velocity: 5, on: false }, { drum: 'kick', velocity: 3, on: true }] },
    { preset2: [{ drum: 'kick', velocity: 10, on: true }, { drum: 'kick', velocity: 1, on: true }] },
    { preset3: [{ drum: 'kick', velocity: 5, on: false }, { drum: 'kick', velocity: 3, on: true }] }
  ],
  url: '/assets/audio/kick.mp3',
  steps: 8,
  mute: false,
  solo: false,
  volume: 5,
  velocity: 5
  },
  */

  kick: { drum_type: ['808 kick', '909 kick'], pattern: [], pattern_presets: [], url: 'assets/audio/808_BD01.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
  hihat: { drum_type: ['open hihat', 'closed hihat'], pattern: [], pattern_presets: [], url: 'assets/audio/808_HH_01.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
  snare: { drum_type: ['vistolite', 'wood marching band'], pattern: [], pattern_presets: [], url: 'assets/audio/808_Snr03.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
}

const song = {
  active_nav: 'dm__nav__controller__ul__li--active',
  active_drum_beat: 'dm__drum__ul__li--active',
  drum_beat_selected: 'dm__drum__ul__li--selected',
  playback: false,
  drum_keys: Object.keys(drums),
  indexes_for_onoff: [],
  preset_active: {preset1: false, preset2: false, preset3: false}
};

