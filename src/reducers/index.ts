import { Reducer, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { ActionTypes } from '../actions/ActionTypes';
import {
  CurrentSoundSourceAction,
  AnalyserStateAction,
  MMLStateAction,
  KeyboardAction,
  MIDIAction
} from '../types';

export function currentSoundSource(state = 'oscillator', action: CurrentSoundSourceAction): string {
  switch (action.type) {
    case ActionTypes.CHANGE_CURRENT_SOUND_SOURCE:
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

export const rootReducer = (history: History): Reducer => combineReducers({
  currentSoundSource,
  analyserState,
  mmlState,
  downMelodyKeyboardIndexes,
  downBassKeyboardIndexes,
  upMelodyKeyboardIndexes,
  upBassKeyboardIndexes,
  activeMIDIKeyboardIndexes,
  router: connectRouter(history)
});
