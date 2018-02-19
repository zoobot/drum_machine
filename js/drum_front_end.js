const initDOMDrumMachine = (steps) => {

  drum_keys.map((drum_key, index) => {
    // Drums
    const drumTypeDiv = document.createElement('div');
    drumTypeDiv.className = 'dm__drum';
    drumTypeDiv.id = drum_key;
    drumTypeDiv.addEventListener('click', changeDrum.bind(this))

    const drumTitleDiv = document.createElement('div');
    drumTitleDiv.className = 'dm__drum__title';
    drumTitleDiv.innerHTML += drum_key;

    const drumInnerUl = document.createElement('ul');
    drumInnerUl.className = 'dm__drum__ul';

    // Add player drums to DOM
    drum.appendChild(drumTypeDiv);

    drumTypeDiv.appendChild(drumTitleDiv);
    drumTypeDiv.appendChild(drumInnerUl);

    // Add steps to DOM
    for (let drumStep = 0; drumStep < drums[drum_key].steps; drumStep++) {
      const stepDrumDiv = document.createElement('li');
      stepDrumDiv.className = 'dm__drum__ul__li';
      stepDrumDiv.id = drum_key + '_' + drumStep;
      drumInnerUl.appendChild(stepDrumDiv);

      drums[drum_key].pattern.push({ 'drum': drum_key, velocity: 5, on: false });
    }
  })

}

const playback = (counter, step) => {
      console.log(counter, step)
  if (counter < step) {
    setTimeout(() => {
      const remover_drum = document.querySelectorAll('.dm__drum__ul__li');
      for (var i = 0; i < remover_drum.length; i++) {
        remover_drum[i].className = 'dm__drum__ul__li';
      }

      drum_keys.map((drum_key, index) => {
        const drum_id = drum_key + '_' + counter
        const drum_target = document.getElementById(drum_id);
        if (drums[drum_key].pattern[counter].on === true) {
          drum_target.className = 'dm__drum__ul__li' + ' dm__drum__ul__li--active--blackout';
        } else {
          drum_target.className = 'dm__drum__ul__li' + ' dm__drum__ul__li--active';
        }
      })

      counter++;
      if (counter === step) {
        counter = 0;
      }
      if (!song.playback) {
        return;
      }

      playback(counter, step);
    }, 500);
  }
}



const changeDrum = (e) => {
  const id = parseInt(e.target.id.split('_').pop());
  const drum_key = e.target.id.split('_').shift();
  if (drums[drum_key].pattern[id].on === false && e.target.id) {
    e.target.style.backgroundColor = "white";
    // e.target.className = 'dm__drum__ul__li' + ' dm__drum__ul__li--active--white';
    // console.log('turn on', e.target.id, drums[drum_key].pattern[e.target.id].on);
    drums[drum_key].pattern[id].on = true;
  } else {

    e.target.removeAttribute('style');
    // e.target.className = 'dm__drum__ul__li';
    // console.log('turn off', e.target.id, drums[drum_key].pattern[e.target.id].on);
    drums[drum_key].pattern[id].on = false;
  }
}

const selectOnOff = (e) => {
  console.log(e.target.id)
  song.playback = !song.playback;
  if (song.playback === true) {
    e.target.className = 'dm__nav__controller__ul__li' + ' dm__nav__controller__ul__li--on';
    playback(0, timers.step_time);
  } else {
    e.target.className = 'dm__nav__controller__ul__li'
  }
}

document.getElementById('onoff').addEventListener('click', selectOnOff.bind(this));

//preset should dump into active pattern
console.log(drums.kick.pattern)
console.log(drums.kick.track)
document.getElementById('preset1').addEventListener('click', selectOnOff.bind(this));
document.getElementById('preset2').addEventListener('click', selectOnOff.bind(this));
document.getElementById('preset3').addEventListener('click', selectOnOff.bind(this));
const drum = document.querySelector('.dm');