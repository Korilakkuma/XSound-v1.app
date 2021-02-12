import {
  currentSoundSource,
  analyserState,
  mmlState,
  downMelodyKeyboardIndexes,
  downBassKeyboardIndexes,
  upMelodyKeyboardIndexes,
  upBassKeyboardIndexes
} from '../';
import { ActionTypes } from '../../actions/ActionTypes';
import {
  SoundSource,
  CurrentSoundSourceAction,
  AnalyserStateAction,
  MMLStateAction,
  KeyboardAction
} from '../../types';

describe('Reducers', () => {
  it('should handle CHANGE_CURRENT_SOUND_SOURCE', () => {
    const expectedState = 'piano' as SoundSource;
    const action        = {
      type   : ActionTypes.CHANGE_CURRENT_SOUND_SOURCE,
      payload: expectedState
    } as CurrentSoundSourceAction;

    expect(currentSoundSource(undefined, {} as CurrentSoundSourceAction)).toEqual('oscillator');
    expect(currentSoundSource(undefined, action)).toEqual(expectedState);
    expect(currentSoundSource('oscillator' as SoundSource, action)).toEqual(expectedState);
  });

  it('should handle CHANGE_ANALYSER_STATE', () => {
    const expectedState = true;
    const action        = {
      type   : ActionTypes.CHANGE_ANALYSER_STATE,
      payload: expectedState
    } as AnalyserStateAction;

    expect(analyserState(undefined, {} as AnalyserStateAction)).toEqual(false);
    expect(analyserState(undefined, action)).toEqual(expectedState);
    expect(analyserState(false, action)).toEqual(expectedState);
  });

  it('should handle CHANGE_MML_STATE', () => {
    const expectedState = true;
    const action        = {
      type   : ActionTypes.CHANGE_MML_STATE,
      payload: expectedState
    } as MMLStateAction;

    expect(mmlState(undefined, {} as MMLStateAction)).toEqual(false);
    expect(mmlState(undefined, action)).toEqual(expectedState);
    expect(mmlState(false, action)).toEqual(expectedState);
  });

  it('should handle DOWN_MELODY_KEYBOARDS', () => {
    const expectedState = [40, 44, 47];
    const action        = {
      type   : ActionTypes.DOWN_MELODY_KEYBOARDS,
      payload: expectedState
    } as KeyboardAction;

    expect(downMelodyKeyboardIndexes(undefined, {} as KeyboardAction)).toEqual([] as number[]);
    expect(downMelodyKeyboardIndexes(undefined, action)).toEqual(expectedState);
    expect(downMelodyKeyboardIndexes([] as number[], action)).toEqual(expectedState);
  });

  it('should handle DOWN_BASS_KEYBOARDS', () => {
    const expectedState = [28, 32, 35];
    const action        = {
      type   : ActionTypes.DOWN_BASS_KEYBOARDS,
      payload: expectedState
    } as KeyboardAction;

    expect(downBassKeyboardIndexes(undefined, {} as KeyboardAction)).toEqual([] as number[]);
    expect(downBassKeyboardIndexes(undefined, action)).toEqual(expectedState);
    expect(downBassKeyboardIndexes([] as number[], action)).toEqual(expectedState);
  });

  it('should handle UP_MELODY_KEYBOARDS', () => {
    const expectedState = [40, 44, 47];
    const action        = {
      type   : ActionTypes.UP_MELODY_KEYBOARDS,
      payload: expectedState
    } as KeyboardAction;

    expect(upMelodyKeyboardIndexes(undefined, {} as KeyboardAction)).toEqual([] as number[]);
    expect(upMelodyKeyboardIndexes(undefined, action)).toEqual(expectedState);
    expect(upMelodyKeyboardIndexes([] as number[], action)).toEqual(expectedState);
  });

  it('should handle UP_BASS_KEYBOARDS', () => {
    const expectedState = [28, 32, 35];
    const action        = {
      type   : ActionTypes.UP_BASS_KEYBOARDS,
      payload: expectedState
    } as KeyboardAction;

    expect(upBassKeyboardIndexes(undefined, {} as KeyboardAction)).toEqual([] as number[]);
    expect(upBassKeyboardIndexes(undefined, action)).toEqual(expectedState);
    expect(upBassKeyboardIndexes([] as number[], action)).toEqual(expectedState);
  });
});
