var obj = [{ person: "Bob Smith"},{ person: "BobaSmith"}];
var obj2 = [{ person: "Bob"},{ person: "aSmith"}];
var clone = Object.assign([], obj);
console.log(clone)



const test = drums.map(e => {
  console.log('efirstmap',e)
  return e !== 'kick'
  })
.filter(e => {
  console.log('eeeefilter',e.pattern)
  return e.pattern === true
})
.map(e => {
  console.log('eeeemap',e.pattern.on)
  return e.on
})
console.log('test!@',test)


    // console.log(drum_key, drums[drum_key].pattern_presets)
    // drums[drum_key].pattern_presets[preset] = [].concat(drums[drum_key].pattern)
    // drums[drum_key].pattern_presets[preset] = Object.assign([],drums[drum_key].pattern)
    // drums[drum_key].pattern_presets[preset] = [...drums[drum_key].pattern];