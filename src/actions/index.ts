import { ActionTypes } from './ActionTypes';
import { SoundSource } from './types/aliases';
import {
  CurrentSourceSourceAction,
  AnalyserStateAction,
  MMLStateAction
} from './types/interfaces';

export function changeCurrentSourceSource(source: SoundSource): CurrentSourceSourceAction {
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
