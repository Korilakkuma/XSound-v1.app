import { ActionTypes } from './ActionTypes';
import {
  SoundSource,
  CurrentSoundSourceAction,
  AnalyserStateAction,
  MMLStateAction,
  KeyboardAction,
  MIDIAction
} from '../types';

export function changeCurrentSoundSource(source: SoundSource): CurrentSoundSourceAction {
  return {
    type   : ActionTypes.CHANGE_CURRENT_SOUND_SOURCE,
    payload: source
  };
}

export function changeAnalyserState(state: boolean): AnalyserStateAction {
  return {
    type   : ActionTypes.CHANGE_ANALYSER_STATE,
    payload: state
  };
}

export function changeMMLState(state: boolean): MMLStateAction {
  return {
    type   : ActionTypes.CHANGE_MML_STATE,
    payload: state
  };
}

export function downMelodyKeyboards(indexes: number[]): KeyboardAction {
  return {
    type   : ActionTypes.DOWN_MELODY_KEYBOARDS,
    payload: indexes
  };
}

export function downBassKeyboards(indexes: number[]): KeyboardAction {
  return {
    type   : ActionTypes.DOWN_BASS_KEYBOARDS,
    payload: indexes
  };
}

export function upMelodyKeyboards(indexes: number[]): KeyboardAction {
  return {
    type   : ActionTypes.UP_MELODY_KEYBOARDS,
    payload: indexes
  };
}

export function upBassKeyboards(indexes: number[]): KeyboardAction {
  return {
    type   : ActionTypes.UP_BASS_KEYBOARDS,
    payload: indexes
  };
}

export function activateMIDIKeyboards(indexes: number[]): MIDIAction {
  return {
    type   : ActionTypes.ACTIVATE_MIDI_KEYBOARDS,
    payload: indexes
  };
}
