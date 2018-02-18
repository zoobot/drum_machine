

// //|| Initialize drum length array with all off pattern ========================
// const initDrumMachine = (steps) => {
//   drum_keys.map((drum_key, index) => {
//     for (let drumStep = 0; drumStep < drums[drum_key].steps; drumStep++) {
//       drums[drum_key].pattern.push({ 'drum': drum_key, velocity: 5, on: false })
//       // song.combo.push(false)
//       // console.log(drums[drum].pattern[drumStep])
//     }
//   })
//   // console.log(drums)
//   // console.log(song)
// };

//|| Individual Drum beats/steps on off with special timer four_to_floor ========================

const drumOn = (drum_key, ...indexes) => {
  indexes.map(index => {
    // console.log(index)s
    drums[drum_key].pattern[index].on = true
  });
};

const drumOff = (drum_key, ...indexes) => {
  indexes.map(index => {
    drums[drum_key].pattern[index].on = false;
  });
};

const four_to_floor = (drum_key, speed) => {
  const indexesForDrumOn = [];
  drums[drum_key].pattern.forEach((value, index) => {
    if (index % speed === 0) {
      indexesForDrumOn.push(index);
    }
  });
  // console.log(indexesForDrumOn)
  return indexesForDrumOn;
};

//|| Individual Drum pattern maker ========================

const patternFaker = (step, four_to_floor_time, four_to_floor_drum) => {
  const rand1 = timers.rand(step);
  const rand2 = timers.rand(step);
  // console.log('faker', rand1,rand2)
  drum_keys.forEach((drum_key, index) => {
    (drum_key === four_to_floor_drum)
      ? drumOn(four_to_floor_drum, ...four_to_floor(four_to_floor_drum, four_to_floor_time))
      : drumOn(drum_key, rand1, rand2);
  });
  console.log('success', drums)
};

//|| Drum pattern combiner ========================

// const patternBounce = async (step, four_to_floor_time, four_to_floor_drum) => {

//   timers.max_step = Math.max.apply(Math, drum_keys.map((drum_key) => drums[drum_key].steps));
//   let count = 0;
//   // console.log('filtered',timers.max_step)

//   while (count < timers.max_step) {
//     // console.log(count)
//         const filtered = drum_keys.filter( (drum_key, index, array)  => {
//           return drums[drum_key].pattern[count].on;
//         });
//         // console.log('filtered',filtered)
//         song.combo.combo_pattern.push(filtered);
//         count++;
//   }
//   console.log('song.combo.combo_pattern',song.combo.combo_pattern)
//   return song.combo.combo_pattern;
// }

// const patternRecorder = (step, four_to_floor_time, four_to_floor_drum) => {
//     const  bounce = patternBounce();
//     song.pattern.push(bounce);
//     // console.log(song.pattern)
//     return song.pattern;
// }

const patternRecorder = (preset) => {
    drum_keys.map(drum_key => {
      drums[drum_key].track[preset] = drums[drum_key].pattern
    })
}

const songRecorder = (step, four_to_floor_time, four_to_floor_drum, number_of_patternBounces, ...preset) => {
  // count = 0;
  console.log(preset)
  // console.log(number_of_patternBounces)
  preset.map(index => {
    patternFaker(step, four_to_floor_time, four_to_floor_drum);
    patternRecorder(index);
  });

  // while (count < number_of_patternBounces) {
  //   patternFaker(step, four_to_floor_time, four_to_floor_drum);
  //   patternRecorder(preset1);
  //   // console.log('bounce',bounce)
  //   // await patternBounce();
  //   song.song.push(song.combo.combo_pattern);
  //   count++;
  // }
  // console.log(song.song)
}

const hearSee = (count) => {
  // console.log('|_',drums.combo[count])
}

const countSetter = (timer, step, number_of_patternBounces) => {
  console.log(timer);
  var count = 0;
  var interval = setInterval(() => {
    // console.log('|_',count,'__',song.song[0])
    // console.log('|_',count,song.song[number_of_patternBounces][count]);
    number_of_patternBounces--
    count++;
    if (count === step) {
      clearInterval(interval);
    }
  }, timer);
}

const playSong = async() => {
  // console.log('Drum Machine Settings','\n', 'bars:', stepTimer(step),'\n','BPM in ms:', bpmer, '\n', 'step:', step)
  const four_to_floor_time = timers.four_to_floor_time
  const step = timers.stepTime
  initDrumMachine(step);

  // patternFaker(step, four_to_floor_time, four_to_floor_drum);
  // patternRecorder(preset1);


  // patternRecorder(step, four_to_floor_time, four_to_floor_drum);
  songRecorder(number_of_patternBounces, step, four_to_floor_time, four_to_floor_drum, 'preset1','preset2','preset3');
    console.log(drums.kick.track)
  // // console.log(song.song)
  // countSetter(bpm_ms, step, timers.stepTime, number_of_patternBounces -1);
}

playSong();

// export drums = drums
//bug with the 7