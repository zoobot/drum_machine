# Drum Machine

A Visual drum machine with Pure Javascript HTML and CSS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

These files maybe viewed locally by opening index.html or by placing them on a webserver. No webserver required.

### Installing
<br> Clone the repo and open the index files in a browser.
<br> Open Terminal
<br> git clone https://github.com/zoobot/drum_machine.git
<br> cd drum_machine/drum_machine
<br> or
<br> cd drum_machine/noise_machine
<br> or
<br> cd drum_machine/onedrum
<br> open index.html

For Testing run
npm install on command line

### Details

All code runs in latest Chrome, and FireFox

### Function Summaries

_____________________

drum_machine.js

<br> @drumOnOff toggles drum beat calls patternFakerIsOn for DOM manipulation
<br> @fourToFloor Returns indexes of 4/4 depending on step
<br> @createEmptyPattern Creates array of beats in drums[preset].pattern
<br> @patternFaker Creates random drum pattern
<br> @presetSaver saves and loads presets

_____________________

drum_dom.js

<br> @initDOMDrumMachine Creates DOM elements for each drum, calls createEmptyPattern and patternFaker
<br> @addClass adds class to DOM element
<br> @addClass removes class from DOM element

<br> @toggleOnOff toggles drum beat bools
<br> @isOn calls toggleOnOff and calls add/removeClass
<br> @patternFakerIsOn DOM manipulation after drumOnOff
<br> @toggleSelectedDrumBeat onclick calls isOn

<br> @selectPresetOnOff toggles DOM element classes for Presets, calls patternFaker and presetSaver

<br> @removeAllActive removes all DOM element classes
<br> @playback plays the beats with setTimeOut
<br> @selectOnOff toggles playback
<br> @changeStep changes step and calls initDOMDrumMachine to rebuild drum DOM

_____________________

timers.js

<br> @delay returns step divisor for bpm
<br> @tempoConversion bpm to ms for setTimeOut
<br> @rand plays the beats with setTimeOut
<br> @bpm_ms tempoConversion call


