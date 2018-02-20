const initDOMDrumMachine = () => {

  const steps = timers.step_time;
  const drum_keys = Object.keys(drums);


  drum_keys.map((drum_key, index) => {

    // Create Drums Types
    const drum_type_div = document.createElement('div');
    drum_type_div.className = 'dm__drum';
    drum_type_div.id = drum_key;
    drum_type_div.addEventListener('click', toggleSelectedDrumBeat.bind(this))

    const drum_title_div = document.createElement('div');
    drum_title_div.className = 'dm__drum__title';
    drum_title_div.innerHTML += drum_key;

    const drum_inner_ul = document.createElement('ul');
    drum_inner_ul.className = 'dm__drum__ul';

    // Add Drums to DOM
    drum.appendChild(drum_type_div);

    drum_type_div.appendChild(drum_title_div);
    drum_type_div.appendChild(drum_inner_ul);

    // Add Drum Steps to DOM
    for (let drum_step = 0; drum_step < steps; drum_step++) {
      const step_drum_div = document.createElement('li');
      step_drum_div.className = 'dm__drum__ul__li';
      step_drum_div.id = drum_key + '_' + drum_step;
      drum_inner_ul.appendChild(step_drum_div);

      // Initialize pattern data
      createEmptyPattern(drum_key,'pattern')
    }

  })

  // Create initial random pattern
  patternFaker(steps, drum_keys);

}

const toggleOnOff = (drum_key, id) => {
  drums[drum_key].pattern[id].on = !drums[drum_key].pattern[id].on;
}

const addClass = (target, class_name) => {
  target.classList.add(class_name);
}

const removeClass = (target, class_name) => {
  target.classList.remove(class_name);
}

const isOn = (drum_key, id, e) => {
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

const toggleSelectedDrumBeat = (e) => {
  const id = parseInt(e.target.id.split('_').pop());
  const drum_key = e.target.id.split('_').shift();
  isOn(drum_key, id, e)
}

const presetBeatIsOn = (drum_key, id) => {
  const drum_id = document.getElementById(drum_key + '_' + id)
  console.log('presetBeatIsOn',drum_key, id)
  if (drums[drum_key].pattern[id].on === true ) {
      addClass(drum_id, song.drum_beat_selected)
    } else {
      removeClass(drum_id, song.drum_beat_selected)
    }
}

const selectPresetOnOff = (e) => {
  song.preset_active[e.target.id] = !song.preset_active[e.target.id]
  const presets = Object.keys(song.preset_active)
  presets.map(preset => {
    if (preset !== e.target.id) {
      song.preset_active[preset] = false
      const target = document.getElementById(preset)
      removeClass(target, song.active_nav);
    } else {
      if (song.preset_active[e.target.id]) {
        addClass(e.target, song.active_nav)
        presetSaver(e)
    } else {
        removeClass(e.target, song.active_nav);
      }
    }
  })
}

const presetSaver = (e) => {
  const preset = e.target.id
  song.drum_keys.map((drum_key) => {
    if (drums[drum_key].pattern_presets[preset]) {
      drums[drum_key].pattern = drums[drum_key].pattern_presets[preset].slice();
      drums[drum_key].pattern.map((value, index) => presetBeatIsOn(drum_key, index))
    } else {
      drums[drum_key].pattern_presets[preset] = drums[drum_key].pattern.slice();
    }
  })
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
    addClass(e.target, song.active_nav);
    playback(0, timers.step_time, time_for_setTimeout, song.drum_keys);
  } else {
    removeClass(e.target, song.active_nav);
  }
}

const patternFakerIsOn = (drum_key, id) => {
    const drum_id = drum_key +'_' + id
    const e_temp = document.getElementById(drum_id)
    addClass(e_temp, song.drum_beat_selected)
}

const drum = document.querySelector('.dm');
const audio = document.querySelector('.dm');
// Event Listeners

document.getElementById('onoff').addEventListener('click', selectOnOff.bind(this));

document.getElementById('preset1').addEventListener('click', selectPresetOnOff.bind(this));
document.getElementById('preset2').addEventListener('click', selectPresetOnOff.bind(this));
document.getElementById('preset3').addEventListener('click', selectPresetOnOff.bind(this));