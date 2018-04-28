# Drum Machine

A Visual drum machine with Javascript HTML and CSS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

These files maybe viewed locally by opening index.html or by placing them on a webserver. No webserver required.


### Details

All code runs in latest Chrome, and FireFox

### Function Summaries

_____________________

drum_machine.js

@drumOnOff toggles drum beat calls patternFakerIsOn for DOM manipulation
@fourToFloor Returns indexes of 4/4 depending on step
@createEmptyPattern Creates array of beats in drums[preset].pattern
@patternFaker Creates random drum pattern
@presetSaver saves and loads presets

_____________________

drum_dom.js

@initDOMDrumMachine Creates DOM elements for each drum, calls createEmptyPattern and patternFaker
@addClass adds class to DOM element
@addClass removes class from DOM element

@toggleOnOff toggles drum beat bools
@isOn calls toggleOnOff and calls add/removeClass
@playAudio loads and plays the audio beats
@stopAudio pauses the audio beats
@patternFakerIsOn DOM manipulation after drumOnOff
@toggleSelectedDrumBeat onclick calls isOn

@selectPresetOnOff toggles DOM element classes for Presets, calls patternFaker and presetSaver

@removeAllActive removes all DOM element classes
@playback plays the beats with setTimeOut
@selectOnOff toggles playback
@changeStep changes step and calls initDOMDrumMachine to rebuild drum DOM

@querySelectorMagic function to do querySelects, not in use yet but will be useful

_____________________

timers.js

@delay returns step divisor for bpm
@tempoConversion bpm to ms for setTimeOut
@rand plays the beats with setTimeOut
@bpm_ms tempoConversion call


