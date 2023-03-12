import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { ActionTypes } from '../actions/ActionTypes';

import type {
  AnalyserStateAction,
  CloneXSoundAction,
  CurrentSoundSourceAction,
  KeyboardAction,
  MIDIAction,
  MMLStateAction,
  OscillatorStatesAction
} from '../types';
import type { Reducer} from 'redux';

export function clonedXSound(state = () => {}, action: CloneXSoundAction) {
  switch (action.type) {
    case ActionTypes.CLONE_XSOUND:
      return action.payload;
    default:
      return state;
  }
}

export function currentSoundSource(state = 'oscillator', action: CurrentSoundSourceAction): string {

  switch (action.type) {
    case ActionTypes.CHANGE_CURRENT_SOUND_SOURCE:
      return action.payload;
    default:
      return state;
  }
}

export function oscillatorStates(state: [boolean, boolean] = [true, false], action: OscillatorStatesAction): [boolean, boolean] {
  switch (action.type) {
    case ActionTypes.CHANGE_OSCILLATOR_STATES:
      return action.payload;
    default:
      return state;
  }
}

export function analyserState(state = false, action: AnalyserStateAction): boolean {
  switch (action.type) {
    case ActionTypes.CHANGE_ANALYSER_STATE:
      return action.payload;
    default:
      return state;
  }
}

export function mmlState(state = false, action: MMLStateAction): boolean {
  switch (action.type) {
    case ActionTypes.CHANGE_MML_STATE:
      return action.payload;
    default:
      return state;
  }
}

export function downMelodyKeyboardIndexes(state: number[] = [], action: KeyboardAction): number[] {
  switch (action.type) {
    case ActionTypes.DOWN_MELODY_KEYBOARDS:
      return action.payload;
    default:
      return state;
  }
}

export function downBassKeyboardIndexes(state: number[] = [], action: KeyboardAction): number[] {
  switch (action.type) {
    case ActionTypes.DOWN_BASS_KEYBOARDS:
      return action.payload;
    default:
      return state;
  }
}

export function upMelodyKeyboardIndexes(state: number[] = [], action: KeyboardAction): number[] {
  switch (action.type) {
    case ActionTypes.UP_MELODY_KEYBOARDS:
      return action.payload;
    default:
      return state;
  }
}

export function upBassKeyboardIndexes(state: number[] = [], action: KeyboardAction): number[] {
  switch (action.type) {
    case ActionTypes.UP_BASS_KEYBOARDS:
      return action.payload.slice(0);  // Return new state by shallow copy
    default:
      return state;
  }
}

export function activeMIDIKeyboardIndexes(state: number[] = [], action: MIDIAction): number[] {
  switch (action.type) {
    case ActionTypes.ACTIVATE_MIDI_KEYBOARDS:
      return action.payload.slice(0);  // Return new state by shallow copy
    default:
      return state;
  }
}

export const rootReducer = (): Reducer => combineReducers({
  clonedXSound,
  currentSoundSource,
  oscillatorStates,
  analyserState,
  mmlState,
  downMelodyKeyboardIndexes,
  downBassKeyboardIndexes,
  upMelodyKeyboardIndexes,
  upBassKeyboardIndexes,
  activeMIDIKeyboardIndexes,
  router: routerReducer
});
