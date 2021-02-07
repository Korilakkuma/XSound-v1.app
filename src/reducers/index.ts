import { Reducer, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { ActionTypes } from '../actions/ActionTypes';
import {
  CurrentSoundSourceAction,
  AnalyserStateAction,
  MMLStateAction,
  KeyboardAction
} from '../types';

function currentSoundSource(state = 'oscillator', action: CurrentSoundSourceAction): string {
  switch (action.type) {
    case ActionTypes.CHANGE_CURRENT_SOUND_SOURCE:
      return action.payload;
    default:
      return state;
  }
}

function analyserState(state = false, action: AnalyserStateAction): boolean {
  switch (action.type) {
    case ActionTypes.CHANGE_ANALYSER_STATE:
      return action.payload;
    default:
      return state;
  }
}

function mmlState(state = false, action: MMLStateAction): boolean {
  switch (action.type) {
    case ActionTypes.CHANGE_MML_STATE:
      return action.payload;
    default:
      return state;
  }
}

function downKeyboardIndexes(state = [] as number[], action: KeyboardAction): number[] {
  switch (action.type) {
    case ActionTypes.DOWN_KEYBOARDS:
      return action.payload;
    default:
      return state;
  }
}

function upKeyboardIndexes(state = [] as number[], action: KeyboardAction): number[] {
  switch (action.type) {
    case ActionTypes.UP_KEYBOARDS:
      return action.payload;
    default:
      return state;
  }
}

export const rootReducer = (history: History): Reducer => combineReducers({
  currentSoundSource,
  analyserState,
  mmlState,
  downKeyboardIndexes,
  upKeyboardIndexes,
  router: connectRouter(history)
});
