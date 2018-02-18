const bpm = 128
const steps = [8, 16, 32, 64]
const stepTime = steps[1] //stepAmount

const drums = {
  // { type: 'kick', pattern: [], steps: 8, mute: false, solo: false, volume: 10, velocity: 10 },
  kick: [],
  snare: [],
  hihat: [],
  // tom1: [],
  // tom2: [],
  // tom3: [], // the more toms the better
  // woodblock:[],
  combo: []
}

// const delayTimer = {
//   quarter: 1,
//   eighth: 2,
//   triplet: 3,
//   sixteenth: 4
// }

const stepTimer = (step) => {
  if (step === 8) return 2
  if (step === 16) return 4
  if (step === 32) return 8
  if (step === 64) return 16
}

const initDrumMachine = (drumType, steps) => {
  // console.log('steps',steps)
  // steps.map( index => drums[drumType].push('_'))
  for (let drumStep = 0; drumStep < steps; drumStep++) {
    drums[drumType].push('_')
  }
  console.log('drums',drums)
}

// incorporating splice seems only right considering splice.com.
const drumOn = (drumTypes, ...indexes) => {
  indexes.map(index =>
    drums[drumTypes].splice(index, 1, drumTypes))
}

//name it after real drum machine stuff
const drumOff = (drumTypes, ...indexes) => {
  indexes.map(index =>
    drums[drumTypes].splice(index, 1, '_'))
}


const tempoToBeatsPerMinute = (bpm, delay) => {
  const time = ((60 / bpm) * 1000) / delay
  return Math.ceil(time)
}
const bpmer = tempoToBeatsPerMinute(128, stepTimer(steps[0]))
console.log('stepTime',stepTime)
const rand = () => Math.floor((Math.random() * (stepTime - 1)) + 0);

const sequencerFaker = (on, off) => {
  for (let key in drums) {
    // if (key === 'kick') {
    //   kickArr.lenth = stepTime
    //   drumOn(key, stepTime/2, rand(), rand())
    // }
    // if (key !== 'combo' && key !== 'kick') {
    //   drumOn(key, rand(), rand(), rand())
    // }
    if (key !== 'combo' ) {
      drumOn(key, rand(), rand(), rand())
      // drumOn(key, 2, 4, 6)
    }
  }

}

const comboMaker = () => {
  for (let drumStep = 0; drumStep < stepTime -1; drumStep++) {

    let comboDrumString = ''

    for (const key in drums) {
      if (drums[key][drumStep] !== '_') {
        comboDrumString = comboDrumString + drums[key][drumStep] + ' '
      }
    }

    (drums.combo[drumStep] === '')
      ? drums.combo.splice(drumStep, 1, '_')
      : drums.combo.splice(drumStep, 1, comboDrumString)
  }
  // console.log('drums bam',drums)
}

const hearSee = (count) => {
  console.log('|_',drums.combo[count])
}

const countSetter = (timer, step) => {
  var count = 0
  var counter = setInterval(() => {
    console.log('|_',count,'__',drums.combo[count])
    count++
    if (count === step) {
      clearInterval(counter)
    }
  }, timer);
}

const sequencerPlay = async(step) => {
  console.log('Drum Machine Settings','\n', 'bars:', stepTimer(step),'\n','BPM in ms:', bpmer, '\n', 'step:', step)
  for (var key in drums) {
    initDrumMachine(key, stepTime)
  }
  // await initDrumMachine()
  await sequencerFaker()
  await comboMaker()
  await countSetter(bpmer, step, stepTimer(step))

}

sequencerPlay(stepTime)
// console.log(drums)

//bug with the 7