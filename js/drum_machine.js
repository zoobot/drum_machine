//|| For making presets ========================

const drumOnOff = (drum_key, onOff, ...indexes) => {
  // console.log(drum_key,indexes)
  indexes.map(index => {
    drums[drum_key].pattern[index].on = onOff;
    isOn(drum_key, index)
  });
  song.indexes_for_onoff.concat[indexes]
};

const four_to_floor = (step) => {
  const four_to_floor_time = timers.four_to_floor_time
  const indexesForDrumOn = [];
  for (var i = 0; i < step; i = i + four_to_floor_time) {
    indexesForDrumOn.push(i)
  }
  return indexesForDrumOn;
};

const createEmptyPattern = (drum_key, pattern, drum_step) => {
  drums[drum_key][pattern].push({ 'drum': drum_key, velocity: 5, on: false });

}

const patternFaker = (step, drum_keys) => {
  console.log('in patternfaker',step,drum_keys)
    const four_to_floor_indexes = four_to_floor(step)
    const four_to_floor_drum = timers.four_to_floor_drum;

    console.log(four_to_floor_indexes,four_to_floor_drum)
    for (var drum_key in drums) {
        const rand1 = timers.rand(step);
    const rand2 = timers.rand(step);
      console.log('for',drum_key)
      if (drum_key === timers.four_to_floor_drum) {
        // console.log('if',drum_key)
        drumOnOff(four_to_floor_drum, true, ...four_to_floor_indexes)
      } else {
        // console.log('else',drum_key)
        drumOnOff(drum_key, true, rand1, rand2);
      }
    }

};

// const makePreset = async (preset) => {
//   console.log('in makePreset',preset)
//     try {
//         await patternClear(song.drum_keys);
//         await song.drum_keys.map(drum_key => {
//           for (let drumStep = 0; drumStep < drums[drum_key].steps; drumStep++) {

//             createEmptyPattern(drum_key,'pattern', drumStep)

//             const remove_active_key = drum_key + '_' + drumStep
//             const temp_key = document.getElementById(remove_active_key)
//             console.log(temp_key)
//             removeClass(temp_key, drums.drum_beat_selected)
//           }

//         })
//         console.log('step, song.drum_keys',drums.hihat)
//         // patternFaker(timers.step_time, song.drum_keys);
//         // presetSaver(step, preset, drum_keys, drum_key)
//     } catch (error) {
//       console.log('makePattern error: ' + error.name)
//     }
// }

const presetSaver = (preset, drum_key) => {
  if (drums[drum_key].pattern_presets[preset]) {
    console.log('copying into active pattern')
      drums[drum_key].pattern = drums[drum_key].pattern_presets[preset].slice();
      console.log('preset',drums[drum_key].pattern_presets[preset],drums[drum_key].pattern)
    } else {
      console.log('copying from active pattern to preset')
      drums[drum_key].pattern_presets[preset] = drums[drum_key].pattern.slice();
      console.log('preset',drums[drum_key].pattern_presets[preset],drums[drum_key].pattern)
    }
    // console.log('before',drums[drum_key].pattern_presets[preset])
}

const savePreset = (step, preset, drum_keys, drum_key) => {
  presetSaver(preset, drum_keys, drum_key)
}

const patternClear = (drum_keys) => {
  drum_keys.map(drum_key => {
    // drums[drum_key].pattern = Object.assign([],[])
    drums[drum_key].pattern.length = 0
  })
  // console.log('drums',drums['snare'].pattern_presets)
}



//|| Init makes everything go ========================

let init = async () => {
  const step = timers.step_time;
  const four_to_floor_time = timers.four_to_floor_time;
  const four_to_floor_drum = timers.four_to_floor_drum;
  const drum_keys = Object.keys(drums);
  const drum_keys_length = Object.keys(drums).length;

  await initDOMDrumMachine(step,drum_keys);

  // makeMultiplePresets(step, timers.four_to_floor_time, four_to_floor_drum, 'preset1','preset2','preset3');
}




if (!!(window.addEventListener))
  window.addEventListener("DOMContentLoaded", init)
else // MSIE to be safe
  window.attachEvent("onload", init);