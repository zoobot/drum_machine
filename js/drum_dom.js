//|| DOM Manipulation Functions ========================

const initDOMDrumMachine = () => {

  const steps = timers.step_time;
  const drum_keys = Object.keys(drums);

  drum_keys.map((drum_key, index) => {

    const drum_type_div = document.createElement('div');
    drum_type_div.className = 'dm__drum';
    drum_type_div.id = drum_key;
    drum_type_div.addEventListener('click', toggleSelectedDrumBeat.bind(this));

    const drum_title_div = document.createElement('div');
    drum_title_div.className = 'dm__drum__title';
    drum_title_div.innerHTML += drum_key;

    const drum_inner_ul = document.createElement('ul');
    drum_inner_ul.className = 'dm__drum__ul';

    drum.appendChild(drum_type_div);

    drum_type_div.appendChild(drum_title_div);
    drum_type_div.appendChild(drum_inner_ul);

    for (let drum_step = 0; drum_step < steps; drum_step++) {
      const step_drum_div = document.createElement('li');
      step_drum_div.className = 'dm__drum__ul__li';
      step_drum_div.id = drum_key + '_' + drum_step;
      drum_inner_ul.appendChild(step_drum_div);

      const step_audio_div = document.createElement('audio');
      step_audio_div.className = 'dm__drum__ul__li__audio';
      step_audio_div.id = drum_key + '_audio_' + drum_step;
      step_audio_div.src = drums[drum_key].url;
      step_drum_div.appendChild(step_audio_div);

      createEmptyPattern(drum_key, 'pattern')
    }

  })

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
    if (e_temp.id && drums[drum_key].pattern[id].on === false) {
      toggleOnOff(drum_key, id)
      addClass(e_temp, song.drum_beat_selected)
      playAudio(e)
    } else {
      toggleOnOff(drum_key, id)
      removeClass(e_temp, song.drum_beat_selected)
      stopAudio(e)
    }
  }
}

const playAudio = (e,drum_key,id) => {
  if (!e) {
    console.log('if',e)
    const drum_audio_id = drum_key + '_audio_' + id
    const drum_audio_target = document.getElementById(drum_audio_id);
    drum_audio_target.load();
    drum_audio_target.play();
    console.log('else',drum_audio_id)


  } else {
    console.log('else',drum_audio_id)
    const child = e.target.firstChild
    child.load();
    child.play();
  }

}

const stopAudio = (drum_key, id,e) => {
  const child = e.target.firstChild
  child.pause();
}

const patternFakerIsOn = (drum_key, id) => {
  const drum_id = drum_key + '_' + id
  const e_temp = document.getElementById(drum_id)
  addClass(e_temp, song.drum_beat_selected)
}

const toggleSelectedDrumBeat = (e) => {
  const id = parseInt(e.target.id.split('_').pop());
  const drum_key = e.target.id.split('_').shift();
  isOn(drum_key, id, e)
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
        patternFaker(timers.step_time, song.drum_keys)
        presetSaver(e)
      } else {
        removeAllActive(song.drum_beat_selected)
      }
    }
  })
}

const presetSaver = (e) => {
  const preset = e.target.id
  song.drum_keys.map((drum_key) => {
    if (drums[drum_key].pattern_presets[preset]) {
      drums[drum_key].pattern = JSON.parse(JSON.stringify(drums[drum_key].pattern_presets[preset]));
    } else {
      drums[drum_key].pattern = JSON.parse(JSON.stringify(drums[drum_key].pattern));
    }
  })
}


const removeAllActive = (active) => {
  const active_parent = document.querySelectorAll('.dm__drum__ul__li');
  for (let i = 0; i < active_parent.length; i++) {
    if (active_parent[i].classList.contains(active)) {
      removeClass(active_parent[i], active)
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
        if (drums[drum_key].pattern[counter].on) {
          playAudio(null,drum_key,counter)
        }

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

const changeStep = (e) => {

  let count = timers.step_time;
  count = timers.step_time + 8;
  if (count >= 64) {
    count = 8;
  }
  const step_li = document.getElementById('step');
  timers.step_time = count;
  e.target.innerHTML = count;

  // funny looking if you don't remove children first!
  const dm = document.getElementById('dm');
  dm.innerHTML = '';

  initDOMDrumMachine();
}

const querySelectorMagic = (class_name, return_name_element, id) => {
  return_name_element =  document.querySelector(class_name);
  return return_name_element;
}

const drum = document.querySelector('.dm');
const audio = document.querySelector('.dm');

// Event Listeners

document.getElementById('onoff').addEventListener('click', selectOnOff.bind(this));

document.getElementById('preset1').addEventListener('click', selectPresetOnOff.bind(this));
document.getElementById('preset2').addEventListener('click', selectPresetOnOff.bind(this));
document.getElementById('preset3').addEventListener('click', selectPresetOnOff.bind(this));

document.getElementById('step').addEventListener('click', changeStep.bind(this));