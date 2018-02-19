// timers for drum machine
/*
__ drum timers __
_ bpm default 128 would be nice to have + - button attached
_ steps is array of most used steps, this should be extendable so recording of long sequence's easier.
_ step_time is used for rand
*/

const timers = {
  bpm: 128,
  step_time: 8, //default 8
  four_to_floor_time: 4,
  four_to_floor_drum: 'kick',

  delay: (step) => {
    if (step === 8) return 2;
    if (step === 16) return 4;
    if (step === 32) return 8;
    if (step === 64) return 16;
  },

  tempoConversion: (bpm, delay) => {
    const time = ((60 / bpm) * 1000) / delay;
    return Math.ceil(time);
  },

  rand: (step) => Math.floor((Math.random() * (step - 1 )) + 1),

  bpm_ms: () => timers.tempoConversion(timers.bpm, timers.delay(timers.step_time))
}