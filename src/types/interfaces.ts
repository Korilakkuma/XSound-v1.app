import { Action } from 'redux';

export interface RIRInfo {
  url: string;
  value: number;
  label: string;
  group: string;
}

export interface CurrentSourceSourceAction extends Action {
  type: 'CHANGE_CURRENT_SOUND_SOURCE';
  payload: SoundSource;
}

export interface AnalyserStateAction extends Action {
  type: 'CHANGE_ANALYSER_STATE';
  payload: boolean;
}

export interface MMLStateAction extends Action {
  type: 'CHANGE_MML_STATE';
  payload: boolean;
}
