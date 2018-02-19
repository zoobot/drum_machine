const initDOMDrumMachine = (steps, drum_keys,step) => {
  drum_keys.map((drum_key, index) => {

    // Create Drums Types
    const drumTypeDiv = document.createElement('div');
    drumTypeDiv.className = 'dm__drum';
    drumTypeDiv.id = drum_key;
    drumTypeDiv.addEventListener('click', toggleSelectedDrumBeat.bind(this))

    const drumTitleDiv = document.createElement('div');
    drumTitleDiv.className = 'dm__drum__title';
    drumTitleDiv.innerHTML += drum_key;

    const drumInnerUl = document.createElement('ul');
    drumInnerUl.className = 'dm__drum__ul';

    // Add Drums to DOM
    drum.appendChild(drumTypeDiv);

    drumTypeDiv.appendChild(drumTitleDiv);
    drumTypeDiv.appendChild(drumInnerUl);

    // Add Drum Steps to DOM
    for (let drumStep = 0; drumStep < drums[drum_key].steps; drumStep++) {
      const stepDrumDiv = document.createElement('li');
      stepDrumDiv.className = 'dm__drum__ul__li';
      stepDrumDiv.id = drum_key + '_' + drumStep;
      drumInnerUl.appendChild(stepDrumDiv);

      // console.log('drum_key',drum_key)
      createEmptyPattern(drum_key,'pattern')
    }

  })
  console.log(steps,'whatiwant')
  patternFaker(steps, drum_keys);

}




const toggleSelectedDrumBeat = (e) => {
  // console.log('beat select', e.target.id)
  const id = parseInt(e.target.id.split('_').pop());
  const drum_key = e.target.id.split('_').shift();
  isOn(drum_key, id, e)
}

const toggleOnOff = (drum_key, id) => {
  drums[drum_key].pattern[id].on = !drums[drum_key].pattern[id].on;
}

const isOn = (drum_key, id, e) => {
  if (!e) {
    const drum_id = drum_key +'_' + id
    const e_temp = document.getElementById(drum_id)
    addClass(e_temp, song.drum_beat_selected)
  }
  if (e) {
    const e_temp = e.target;
    if (e_temp.id && drums[drum_key].pattern[id].on === false ) {
      toggleOnOff(drum_key, id)
      addClass(e_temp, song.drum_beat_selected)
    } else {
      toggleOnOff(drum_key, id)
      removeClass(e_temp, song.drum_beat_selected)
    }
  }

}


const addClass = (drum_target, drum_class_name) => {
  drum_target.classList.add(drum_class_name);
}

const removeClass = (drum_target, drum_class_name) => {
  drum_target.classList.remove(drum_class_name);
}

const presetOnOff = (e) => {
  const preset_id = e.target.id
  // console.log(preset_id)
  // drum_keys.filter(drum_key => {
    // console.log('changeDrumPattern drum_keys',drum_keys)
    // makePreset(preset_id)
    song.drum_keys.map((drum_key) => {
      presetSaver(e.target.id, drum_key)
    })

  // })
}


const selectPresetOnOff = (e) => {
  console.log(e.target.id)
  presetOnOff(e)
}

const removeAllActive = (active ) => {
  const activeParent = document.querySelectorAll('.dm__drum__ul__li');
  for (let i = 0; i < activeParent.length; i++) {
    if (activeParent[i].classList.contains(active)) {
      removeClass(activeParent[i], active)
    }
  }
}

const playback = (counter, step, time_for_setTimeout, drum_keys) => {
  if (counter < step) {
    setTimeout(() => {
      removeAllActive(song.active_drum_beat)

      drum_keys.map((drum_key) => {
        const drum_id = drum_key + '_' + counter
        const drum_target = document.getElementById(drum_id);
        addClass(drum_target, song.active_drum_beat)
      })

      counter++;

      if (counter === step) {
        counter = 0;
      }

      if (!song.playback) {
        return;
      }

      playback(counter, step, time_for_setTimeout, drum_keys);
    }, time_for_setTimeout);
  }
}

const selectOnOff = (e) => {
  song.playback = !song.playback;
  let time_for_setTimeout = timers.bpm_ms()
  if (song.playback) {
    e.target.classList.add(song.navActive);
    playback(0, timers.step_time, time_for_setTimeout, song.drum_keys);
  } else {
    e.target.classList.remove(song.nav_active);
  }
}

const drum = document.querySelector('.dm');
const audio = document.querySelector('.dm');
// Event Listeners

document.getElementById('onoff').addEventListener('click', selectOnOff.bind(this));

//preset should dump into active pattern
document.getElementById('preset1').addEventListener('click', selectPresetOnOff.bind(this));
document.getElementById('preset2').addEventListener('click', selectPresetOnOff.bind(this));
document.getElementById('preset3').addEventListener('click', selectPresetOnOff.bind(this));


