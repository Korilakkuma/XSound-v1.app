import { X } from 'xsound';
import { Action } from 'redux';
import { store } from './store';
import { ActionTypes } from './actions/ActionTypes';

declare global {
  interface Window {
    C: typeof X;
  }
}

export type IState = ReturnType<typeof store.getState>;

export type SoundSource = 'oscillator'
                        | 'piano'
                        | 'guitar'
                        | 'electric-guitar'
                        | 'whitenoise'
                        | 'pinknoise'
                        | 'browniannoise'
                        | 'stream'
                        | 'midi';

export type XSoundSource = 'mixer'
                         | 'oscillator'
                         | 'oneshot'
                         | 'audio'
                         | 'stream'
                         | 'noise';

export type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export type MMLErrors = 'tempo' | 'octave' | 'note' | 'rest' | 'tie' | 'unknown';

export interface OneshotSettings {
  buffer: number;
  rate: number;
  loop: boolean;
  start: number;
  end: number;
  volume: number;
}

export interface RIRInfo {
  url: string;
  value: number;
  label: string;
  group: string;
}

export interface ConvertedTime {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface MMLInfo {
  title: string;
  artist: string;
  description: string;
  melody: string;
  bass: string;
}

export interface Sequence {
  indexes: number[];
  frequencies: number[];
  start: number;
  duration: number;
  stop: number;
  note: string;
}

// HACK:
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MIDIAccess {
}

// HACK:
export interface MIDIInput {
  onmidimessage(event: MIDIMessageEvent): void;
}

// HACK:
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MIDIOutput {
}

// HACK:
export interface MIDIMessageEvent {
  data: Uint8Array;
}

export interface CurrentSoundSourceAction extends Action {
  type: typeof ActionTypes.CHANGE_CURRENT_SOUND_SOURCE;
  payload: SoundSource;
}

export interface AnalyserStateAction extends Action {
  type: typeof ActionTypes.CHANGE_ANALYSER_STATE;
  payload: boolean;
}

export interface MMLStateAction extends Action {
  type: typeof ActionTypes.CHANGE_MML_STATE;
  payload: boolean;
}

export interface KeyboardAction extends Action {
  type: typeof ActionTypes.DOWN_MELODY_KEYBOARDS
      | typeof ActionTypes.DOWN_BASS_KEYBOARDS
      | typeof ActionTypes.UP_MELODY_KEYBOARDS
      | typeof ActionTypes.UP_BASS_KEYBOARDS;
  payload: number[];
}

export interface MIDIAction extends Action {
  type: typeof ActionTypes.ACTIVATE_MIDI_KEYBOARDS;
  payload: number[];
}
