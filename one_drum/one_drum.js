(function() {

  const drums = [
    { url: 'assets/audio/808_BD01.mp3' }
  ]

  const song = {
    active_nav: 'dm__nav__controller__ul__li--active',
    playback: false,
  };

  const playAudio = () => {
      const drum_audio_target = document.getElementById('one__drum');
      drum_audio_target.load();
      drum_audio_target.play();
  }

  const stopAudio = () => {
    const drum_audio_target = document.getElementById('one__drum');
    drum_audio_target.pause();
    drum_audio_target.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';
  }

  const player = (counter) => {

    const color = ['blue','red','green', 'yellow', 'gray', 'purple', 'pink','tan'];
    document.body.style.backgroundColor = color[counter];

    if (counter < 8) {
      setTimeout(() => {
        playAudio();

        counter++;
        if (counter === 8) counter = 0;
        if (!song.playback) return;
        player(counter);
      }, 500);
    }
  }

  const selectOnOff = (e) => {
    song.playback = !song.playback;
    if (song.playback) {
      addClass(e.target, song.active_nav);
      player(0);
    } else {
      song.playback = false
      removeClass(e.target, song.active_nav);
    }
  }

  const addClass = (target, class_name) => {
    target.classList.add(class_name);
  }

  const removeClass = (target, class_name) => {
    target.classList.remove(class_name);
  }

  const createDOMElement = (class_type, class_name, id_name, parent, event_listener, audio_src) => {
    const element = document.createElement(class_type);
    element.className = class_name;
    element.id = id_name;

    console.log(audio_src )
    if (audio_src !== undefined) {
      element.src = audio_src;
    }

    if (event_listener !== undefined) element.addEventListener('click', event_listener.bind(this));

    parent.appendChild(element);
    console.log(element)
    return element;
  }

  const initDrumMachineDOM = () => {
    document.getElementById('onoff').addEventListener('click', selectOnOff.bind(this));
    const drum = document.querySelector('.dm');
    const one_drum = createDOMElement('audio', 'one__drum', 'one__drum', dm, undefined, drums[0].url)
  }

  initDrumMachineDOM();
})();
