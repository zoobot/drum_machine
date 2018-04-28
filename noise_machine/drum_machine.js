(function() {

  const timers = {
    bpm: 128,
    step_time: 8,
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

    rand: (step) => Math.floor((Math.random() * (step - 1)) + 1),

    bpm_ms: () => timers.tempoConversion(timers.bpm, timers.delay(timers.delay))
  }

  const drums = [
    { track: 'track0', drum_type: '', pattern: [], pattern_presets: [], url: 'assets/audio/808_BD01.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10, size: null, modifiedDate: null },
    { track: 'track1', drum_type: '', pattern: [], pattern_presets: [], url: 'assets/audio/808_HH_01.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10, size: null, modifiedDate: null },
    { track: 'track2', drum_type: '', pattern: [], pattern_presets: [], url: 'assets/audio/808_Snr03.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10, size: null, modifiedDate: null },
    { track: 'track3', drum_type: '', pattern: [], pattern_presets: [], url: 'assets/audio/808_Tom01.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10, size: null, modifiedDate: null },
    { track: 'track4', drum_type: '', pattern: [], pattern_presets: [], url: 'assets/audio/808_Tom02.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10, size: null, modifiedDate: null },
    { track: 'track5', drum_type: '', pattern: [], pattern_presets: [], url: 'assets/audio/808_Tom03.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10, size: null, modifiedDate: null },
    { track: 'track6', drum_type: '', pattern: [], pattern_presets: [], url: 'assets/audio/808_Rim_01.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10, size: null, modifiedDate: null },
    { track: 'track7', drum_type: '', pattern: [], pattern_presets: [], url: 'assets/audio/808_conga02.mp3', steps: 8, mute: false, solo: false, volume: 10, velocity: 10, size: null, modifiedDate: null },
  ]

  const song = {
    active_nav: 'dm__nav__controller__ul__li--active',
    active_drum_beat: 'dm__drum__ul__li--active',
    drum_beat_selected: 'dm__drum__ul__li--selected',
    playback: false,
    drum_keys: Object.keys(drums),
    indexes_for_onoff: [],
    preset_active: { preset1: false, preset2: false, preset3: false }
  };


  const drumOnOff = (drum_key, on_off, ...indexes) => {
    indexes.map(index => {
      drums[drum_key].pattern[index].on = on_off;
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

  const patternFaker = (step) => {
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

  const querySelectorMagic = (class_type, type_of_dom_call, return_name_element, id) => {
    return_name_element = document.type_of_dom_call(class_type);
    return return_name_element;
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

  const playAudio = (e, drum_key, id) => {
    if (!e) {
      const drum_audio_id = `${drum_key}_audio_${id}`;
      const drum_audio_target = document.getElementById(drum_audio_id);
      drum_audio_target.load();
      drum_audio_target.play();
    } else {
      const child = e.target.firstChild;
      child.load();
      child.play();
    }
  }

  const stopAudio = (drum_key, id, e) => {
    const child = e.target.firstChild
    child.pause();
    child.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';
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
          const drum_id = `${drum_key}_${counter}`
          const drum_target = document.getElementById(drum_id);

          addClass(drum_target, song.active_drum_beat)
          if (drums[drum_key].pattern[counter].on) {
            playAudio(null, drum_key, counter)
          }
        })

        counter++;
        if (counter === step) counter = 0;
        if (!song.playback) return;

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
    if (count >= 64) count = 8;

    const step_li = document.getElementById('step');
    timers.step_time = count;
    e.target.innerHTML = count;

    // funny looking if you don't remove children first!
    const dm = document.getElementById('dm');
    dm.innerHTML = '';

    initDrumMachineDOM();
  }

  const createDrumSteps = (steps, parent, drum_key) => {
    for (let drum_step = 0; drum_step < steps; drum_step++) {
      const step_drum_div = createDOMElement('li', 'dm__drum__ul__li', `${drum_key}_${drum_step}`, parent, undefined, undefined, undefined)
      createDOMElement('audio', 'dm__drum__ul__li__audio', `${drum_key}_audio_${drum_step}`, step_drum_div, undefined, drums[drum_key].url, undefined)

      createEmptyPattern(drum_key, 'pattern')
    }
  }

  const createDOMElement = (class_type, class_name, id_name, parent, event_listener, audio_src, innerHTML_description) => {
    const element = document.createElement(class_type);
    element.className = class_name;
    element.id = id_name;

    if (audio_src !== undefined) element.src = audio_src;
    if (event_listener !== undefined) element.addEventListener('click', event_listener.bind(this));
    if (innerHTML_description !== undefined) element.innerHTML += innerHTML_description;

    parent.appendChild(element);
    return element;
  }

  const initDrumMachineDOM = () => {
    song.drum_keys.map((drum_key, index) => {
      console.log('drum_key',drum_key)
      const drum_type_div = createDOMElement('div', 'dm__drum', drum_key, drum, toggleSelectedDrumBeat, undefined)
      const drum_title_div = createDOMElement('div', 'dm__drum__title', `dm__drum__title${drum_key}`, drum_type_div, undefined, undefined, drum_key)
      const drum_inner_ul = createDOMElement('ul', 'dm__drum__ul', `dm__drum__ul${drum_key}`, drum_type_div, undefined, undefined, undefined)

      createDrumSteps(timers.step_time, drum_inner_ul, drum_key);
    })
    patternFaker(timers.step_time);
  }

  const drum = document.querySelector('.dm');
  const audio = document.querySelector('.dm');

  // Event Listeners

  document.getElementById('onoff').addEventListener('click', selectOnOff.bind(this));

  document.getElementById('preset1').addEventListener('click', selectPresetOnOff.bind(this));
  document.getElementById('preset2').addEventListener('click', selectPresetOnOff.bind(this));
  document.getElementById('preset3').addEventListener('click', selectPresetOnOff.bind(this));

  document.getElementById('step').addEventListener('click', changeStep.bind(this));

  initDrumMachineDOM();
})();