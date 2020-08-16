import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { ActionTypes } from '../actions/ActionTypes';
import {
  CurrentSourceSourceAction,
  AnalyserStateAction,
  MMLStateAction
} from './types/types';

function currentSoundSource(state = 'oscillator', action: CurrentSourceSourceAction): string {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rootReducer = (history: History) => combineReducers({
  currentSoundSource,
  analyserState,
  mmlState,
  router: connectRouter(history)
});
