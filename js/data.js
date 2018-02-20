const four_to_floor_drum = 'kick';
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

  kick: { drumType: ['808 kick', '909 kick'], pattern: [], pattern_presets: [], url: 'assets/audio/808_BD01.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
  hihat: { drumType: ['open hihat', 'closed hihat'], pattern: [], pattern_presets: [], url: 'assets/audio/808_HH_01.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
  snare: { drumType: ['vistolite', 'wood marching band'], pattern: [], pattern_presets: [], url: 'assets/audio/808_Snr03.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
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

