

const drumOnOff = (drum_key, onOff, ...indexes) => {
  console.log('why', drum_key, onOff, indexes)
  indexes.map(index => {
    drums[drum_key].pattern[index].on = onOff;
    patternFakerIsOn(drum_key, index)
  });
};

const fourToFloor = (step) => {
  const four_to_floor_time = timers.four_to_floor_time
  const indexes_for_drum_on = [];
  for (var i = 0; i < step; i = i + four_to_floor_time) {
    indexes_for_drum_on.push(i)
  }
  return indexes_for_drum_on;
};

const createEmptyPattern = (drum_key, pattern) => {
  drums[drum_key][pattern].push({ 'drum': drum_key, velocity: 5, on: false });
}

const patternFaker = (step, drum_keys) => {
  console.log(step)
  const four_to_floor_indexes = fourToFloor(step)
  const four_to_floor_drum = timers.four_to_floor_drum;

  song.drum_keys.map(drum_key => {
    const rand1 = timers.rand(step);
    const rand2 = timers.rand(step);
    if (drum_key === four_to_floor_drum) {
      drumOnOff(four_to_floor_drum, true, ...four_to_floor_indexes);
    } else {
      drumOnOff(drum_key, true, rand1, rand2);
    }
  });
};


//|| Init makes everything go ========================

let init = () => {
  initDOMDrumMachine();
}

if (!!(window.addEventListener))
  window.addEventListener("DOMContentLoaded", init)
else // MSIE to be safe
  window.attachEvent("onload", init);