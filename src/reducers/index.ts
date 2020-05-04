import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { ActionTypes } from '../actions/ActionTypes';

function currentSoundSource(state = 'oscillator', action): string {
  switch (action.type) {
    case ActionTypes.CHANGE_CURRENT_SOUND_SOURCE:
      return action.payload;
    default:
      return state;
  }
}

function analyserState(state = false, action): boolean {
  switch (action.type) {
    case ActionTypes.CHANGE_ANALYSER_STATE:
      return action.payload;
    default:
      return state;
  }
}

function mmlState(state = false, action): boolean {
  switch (action.type) {
    case ActionTypes.CHANGE_MML_STATE:
      return action.payload;
    default:
      return state;
  }
}

export const rootReducer = (history: History) => combineReducers({
  currentSoundSource,
  analyserState,
  mmlState,
  router: connectRouter(history)
});
