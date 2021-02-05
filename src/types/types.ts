import { X } from 'xsound';
import { Action } from 'redux';
import { ActionTypes } from '../actions/ActionTypes';

declare global {
  interface Window {
    C: typeof X;
  }
}

export type SoundSource = 'oscillator'
                        | 'piano'
                        | 'guitar'
                        | 'electric-guitar'
                        | 'whitenoise'
                        | 'pinknoise'
                        | 'browniannoise'
                        | 'stream'
                        | 'midi';

export type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface OneshotSettings {
  buffer: number;
  rate: number;
  loop: boolean;
  start: number;
  end: number;
  volume: number;
}

export type RIRInfo = {
  url: string;
  value: number;
  label: string;
  group: string;
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
