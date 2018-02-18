const initDrumMachine = (steps) => {
  const drum = document.querySelector('.dm');
  // Player top row

  // const playerDiv = document.createElement('div');
  // playerDiv.className = 'dm__player';

  // const playerTitleDiv = document.createElement('div');
  // playerTitleDiv.className = 'dm__player__title';
  // // playerTitleDiv.innerHTML = 'PLAYER';

  // const playerInnerUl = document.createElement('ul');
  // playerInnerUl.className = 'dm__player__ul';

  // drum.appendChild(playerDiv);

  // playerDiv.appendChild(playerTitleDiv);
  // playerDiv.appendChild(playerInnerUl);

  drum_keys.map((drum_key, index) => {

    // Drums

    const drumTypeDiv = document.createElement('div');
    drumTypeDiv.className = 'dm__drum';
    drumTypeDiv.id = drum_key;

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

      if (index === 0) {
        const stepPlayerDiv = document.createElement('li');
        stepPlayerDiv.className = 'dm__player__ul__li';
        stepPlayerDiv.id = 'player_' + drumStep;
        // stepPlayerDiv.innerHTML = drumStep + 1;
        // playerInnerUl.appendChild(stepPlayerDiv);
      }



      const stepDrumDiv = document.createElement('li');
      stepDrumDiv.className = 'dm__drum__ul__li';
      stepDrumDiv.id = drum_key + '_' + drumStep;
      drumInnerUl.appendChild(stepDrumDiv);

      drums[drum_key].pattern.push({ 'drum': drum_key, velocity: 5, on: false });
    }


    // event listener

    drumTypeDiv.addEventListener('click', (e) => {
      const id = parseInt(e.target.id.split('_').pop());
      console.log(id)
      if (drums[drum_key].pattern[id].on === false && e.target.id) {
        drums[drum_key].pattern[id].on = true;
        e.target.style.backgroundColor = "white";
        // e.target.className = 'dm__drum__ul__li' + ' dm__drum__ul__li--active--white';
        // console.log('turn on', e.target.id, drums[drum_key].pattern[e.target.id].on);
      } else {
        drums[drum_key].pattern[id].on = false;
        e.target.removeAttribute('style');
        // e.target.className = 'dm__drum__ul__li';
        // console.log('turn off', e.target.id, drums[drum_key].pattern[e.target.id].on);
      }
    });
  })

}

function playback(counter,step, number_of_patternBounces){
  // const player_id = 'player_' + counter
  // const player_target = document.getElementById(player_id);
  // console.log(counter,step)

  if(counter < step){

    setTimeout(function(){

      const remover_drum = document.querySelectorAll('.dm__drum__ul__li');
      for (var i=0; i< remover_drum.length; i++) {
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

      playback(counter,8, number_of_patternBounces -1);
    }, 500);
  }
  // else  {
  //   playback(0,8, number_of_patternBounces -1);
  // }
}
// start(0);

// const playback = (timer, step, number_of_patternBounces) => {

//   for (let drumStep = 0; drumStep < timers.stepTime; drumStep++) {
//     // const temp = 'player_' + drumStep
//     // const target2 = document.getElementById(temp);
//     // console.log(target2)

//     // var count = 0;
//     window.setInterval(() => {
//       drum_keys.map((drum_key, index) => {
//             const temp = drum_key + '_' + drumStep
//             const target2 = document.getElementById(temp);
//             if (drums[drum_key].pattern[drumStep].on === true) {
//               target2.style.backgroundColor = "white";
//             } else {
//               target2.style.opacity = '.5';
//             }
//       })
//     // }
//       // count++;
//       // if (count === step) {
//       //   clearInterval(interval);
//       // }
//     }, 1000);

//   }
// }
// countSetter(bpm_ms, step, timers.stepTime, number_of_patternBounces -1);
// const countSetter = (timer, step, number_of_patternBounces) => {
//   console.log(timer);
//   var count = 0;
//   var interval = setInterval(() => {
//     // console.log('|_',count,'__',song.song[0])
//     // console.log('|_',count,song.song[number_of_patternBounces][count]);
//     number_of_patternBounces--
//     count++;
//     if (count === step) {
//       clearInterval(interval);
//     }
//   }, timer);
// }

const select_on = document.querySelector('.dm__nav__controller__ul__li--on');
const select_off = document.querySelector('.dm__nav__controller__ul__li--off');
const select_1 = document.querySelector('.dm__nav__controller__ul__li--1');
const select_2 = document.querySelector('.dm__nav__controller__ul__li--2');
const select_3 = document.querySelector('.dm__nav__controller__ul__li--3');

// const eventListeners = ((selector,...cb) => {
//   selector.addEventListener('click', cb);
// }()

select_off.addEventListener('click', (e) => {
   song.playback = !song.playback;
});

select_on.addEventListener('click', (e) => {
  song.playback = !song.playback;
   // playback(0,bpm_ms, timers.stepTime, number_of_patternBounces -1);
 playback(0,8, number_of_patternBounces -1);
});