//|| For making presets ========================

const drumOn = (drum_key, ...indexes) => {
  // console.log(drum_key,indexes)
  indexes.map(index => {
    drums[drum_key].pattern[index].on = true
  });
};

const drumOff = (drum_key, ...indexes) => {
  indexes.map(index => {
    drums[drum_key].pattern[index].on = false;
  });
};

const four_to_floor = (four_to_floor_time, four_to_floor_drum) => {
  const indexesForDrumOn = [];
  for (var i = 0; i < 8; i = i + 4) {
    console.log(i)
    indexesForDrumOn.push(i)
  }
  return indexesForDrumOn;
};

//|| Preset maker ========================

const patternFaker = (step, four_to_floor_time,four_to_floor_drum) => {
  const rand1 = timers.rand(step);
  const rand2 = timers.rand(step);
  const four_to_floor_indexes = four_to_floor(four_to_floor_time, four_to_floor_drum)
  console.log('faker', rand1,rand2)
  //  console.log('424 indexes', four_to_floor_indexes)
  for (let drum_key in drums) {
  //   // console.log('drum_key',drum_key);
    (drum_key === four_to_floor_drum)
      ? drumOn(four_to_floor_drum, ...four_to_floor_indexes)
      : drumOn(drum_key, rand1, rand2);
  }
  // console.log('success', drums)
};

const presetSaver = (preset) => {
  drum_keys.map(drum_key => {
    drums[drum_key].track[preset] = [].concat(drums[drum_key].pattern)
  })
}

const patternClear = (preset) => {
  drum_keys.map(drum_key => {
     const turn_off_on_indexes = []
     drums[drum_key].pattern.map( (value, index, array) => {
        if (value.on === true) {
          turn_off_on_indexes.push(index)
        }
      })
    drumOff(drum_key, ...turn_off_on_indexes);
  })
}

const makeMultiplePresets = async (step, four_to_floor_time, four_to_floor_drum, ...preset) => {
  // count = 0;
  console.log(step, four_to_floor_time, four_to_floor_drum, ...preset)
  // console.log(number_of_patternBounces)
  await patternFaker(step, four_to_floor_time, four_to_floor_drum);
  await preset.map((index) => {
    presetSaver(index)
  });
  // await preset.map(async (index) => {
  //   // const presetTest = await presetSaver(index);
  //   const presetTest2 = await patternClear(index)
  // });
  console.log(drums.hihat.track)
}

//|| Makes everything go ========================

let init = () => {
  const step = timers.step_time;
  initDOMDrumMachine(step);
  makeMultiplePresets(step, timers.four_to_floor_time, four_to_floor_drum, 'preset1','preset2','preset3');
}


if (!!(window.addEventListener))
  window.addEventListener("DOMContentLoaded", init)
else // MSIE to be safe
  window.attachEvent("onload", init);

