import { ActionTypes } from './ActionTypes';
import {
  SoundSource,
  CurrentSoundSourceAction,
  AnalyserStateAction,
  MMLStateAction,
  KeyboardAction
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

export function downKeyboards(indexes: number[]): KeyboardAction {
  return {
    type   : ActionTypes.DOWN_KEYBOARDS,
    payload: indexes
  };
}

export function upKeyboards(indexes: number[]): KeyboardAction {
  return {
    type   : ActionTypes.UP_KEYBOARDS,
    payload: indexes
  };
}
