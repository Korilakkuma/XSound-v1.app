XSound.app
=========
  
[![Node.js CI](https://github.com/Korilakkuma/XSound.app/workflows/Node.js%20CI/badge.svg)](https://github.com/Korilakkuma/XSound.app/actions?query=workflow%3A%22Node.js+CI%22)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
  
**[XSound.app](https://xsound.app)** is Multifunctional Synthesizer by [XSound](https://github.com/Korilakkuma/XSound) (Web Audio API Library).
  
# Features

You can use the following features.

- Create Sound (2 Oscillators)
- Play the One-Shot Audio (Piano, Acoustic Guitar, Electric Guitar, Noises)
- Play the Audio
- Streaming (by WebRTC)
- MIDI (by Web MIDI API)
- Multi-Track Recording (Create WAVE file)
- Visualization (Overview in Time Domain / Time Domain / Spectrum)
- Visual Audio Sprite
- MML (Music Macro Language)
- Effectors (Compressor / Wah / Equalizer / Tremolo / Phaser / Chorus / Delay / Reverb ... etc)

# Setup

## Start App

```bash
$ git clone git@github.com:Korilakkuma/XSound.app.git
$ cd XSound
$ npm install
$ npm run dev
$ open http://localhost:8080/
```

## Test

```bash
$ npm test
```

## Storybook

```
$ npm run storybook
```

# Technologies

- [XSound](https://github.com/Korilakkuma/XSound)
- TypeScript
- React Hooks / Redux (Flux Architecture)
- Atomic Design
- BEM
- Service Worker (Cache)
- Modern Build
  - ESLint
  - webpack
  - npm scripts
- Jest
- Storybook

## License
  
Released under the [MIT](https://github.com/Korilakkuma/XSound.app/blob/master/LICENSE) license
  
