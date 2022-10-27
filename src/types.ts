import { X } from 'xsound';
import { Action } from 'redux';
import { store } from './store';
import { ActionTypes } from './actions/ActionTypes';

declare global {
  interface Window {
    C: ReturnType<typeof X.clone>;
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

export interface RIRDescriptor {
  url: string;
  value: number;
  label: string;
  group: string;
}

export interface MMLDescriptor {
  title: string;
  artist: string;
  description: string;
  melody: string;
  bass: string;
}

export interface CurrentSoundSourceAction extends Action {
  type: typeof ActionTypes.CHANGE_CURRENT_SOUND_SOURCE;
  payload: SoundSource;
}

export interface OscillatorStatesAction extends Action {
  type: typeof ActionTypes.CHANGE_OSCILLATOR_STATES,
  payload: [boolean, boolean];
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
