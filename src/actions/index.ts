import { Action } from 'redux';
import { ActionTypes } from './ActionTypes';

export interface CurrentSourceSourceAction extends Action {
  type: 'CHANGE_CURRENT_SOUND_SOURCE';
  payload: 'oscillator' | 'piano' | 'guitar' | 'electric-guitar' | 'whitenoise' | 'pinknoise' | 'browniannoise';
}

export interface AnalyserStateAction extends Action {
  type: 'CHANGE_ANALYSER_STATE';
  payload: boolean;
}

export interface MMLStateAction extends Action {
  type: 'CHANGE_MML_STATE';
  payload: boolean;
}

export function changeCurrentSourceSource(source): CurrentSourceSourceAction {
  return {
    type   : ActionTypes.CHANGE_CURRENT_SOUND_SOURCE,
    payload: source
  };
}

export function changeAnalyserState(state): AnalyserStateAction {
  return {
    type   : ActionTypes.CHANGE_ANALYSER_STATE,
    payload: state
  };
}

export function changeMMLState(state): MMLStateAction {
  return {
    type   : ActionTypes.CHANGE_MML_STATE,
    payload: state
  };
}
