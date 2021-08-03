import {
  currentSoundSource,
  analyserState,
  mmlState,
  downMelodyKeyboardIndexes,
  downBassKeyboardIndexes,
  upMelodyKeyboardIndexes,
  upBassKeyboardIndexes,
  activeMIDIKeyboardIndexes
} from './';
import { ActionTypes } from '../actions/ActionTypes';
import {
  SoundSource,
  CurrentSoundSourceAction,
  AnalyserStateAction,
  MMLStateAction,
  KeyboardAction,
  MIDIAction
} from '../types';

describe('Reducers', () => {
  test('should handle CHANGE_CURRENT_SOUND_SOURCE', () => {
    const expectedState: SoundSource = 'piano';

    const action = {
      type   : ActionTypes.CHANGE_CURRENT_SOUND_SOURCE,
      payload: expectedState
    };

    expect(currentSoundSource(undefined, {} as CurrentSoundSourceAction)).toStrictEqual('oscillator');
    expect(currentSoundSource(undefined, action)).toStrictEqual(expectedState);
    expect(currentSoundSource('oscillator' as SoundSource, action)).toStrictEqual(expectedState);
  });

  test('should handle CHANGE_ANALYSER_STATE', () => {
    const expectedState = true;

    const action = {
      type   : ActionTypes.CHANGE_ANALYSER_STATE,
      payload: expectedState
    };

    expect(analyserState(undefined, {} as AnalyserStateAction)).toStrictEqual(false);
    expect(analyserState(undefined, action)).toStrictEqual(expectedState);
    expect(analyserState(false, action)).toStrictEqual(expectedState);
  });

  test('should handle CHANGE_MML_STATE', () => {
    const expectedState = true;

    const action = {
      type   : ActionTypes.CHANGE_MML_STATE,
      payload: expectedState
    };

    expect(mmlState(undefined, {} as MMLStateAction)).toStrictEqual(false);
    expect(mmlState(undefined, action)).toStrictEqual(expectedState);
    expect(mmlState(false, action)).toStrictEqual(expectedState);
  });

  test('should handle DOWN_MELODY_KEYBOARDS', () => {
    const expectedState = [40, 44, 47];

    const action = {
      type   : ActionTypes.DOWN_MELODY_KEYBOARDS,
      payload: expectedState
    };

    expect(downMelodyKeyboardIndexes(undefined, {} as KeyboardAction)).toStrictEqual([] as number[]);
    expect(downMelodyKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(downMelodyKeyboardIndexes([] as number[], action)).toStrictEqual(expectedState);
  });

  test('should handle DOWN_BASS_KEYBOARDS', () => {
    const expectedState = [28, 32, 35];

    const action = {
      type   : ActionTypes.DOWN_BASS_KEYBOARDS,
      payload: expectedState
    };

    expect(downBassKeyboardIndexes(undefined, {} as KeyboardAction)).toStrictEqual([] as number[]);
    expect(downBassKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(downBassKeyboardIndexes([] as number[], action)).toStrictEqual(expectedState);
  });

  test('should handle UP_MELODY_KEYBOARDS', () => {
    const expectedState = [40, 44, 47];

    const action = {
      type   : ActionTypes.UP_MELODY_KEYBOARDS,
      payload: expectedState
    };

    expect(upMelodyKeyboardIndexes(undefined, {} as KeyboardAction)).toStrictEqual([] as number[]);
    expect(upMelodyKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(upMelodyKeyboardIndexes([] as number[], action)).toStrictEqual(expectedState);
  });

  test('should handle UP_BASS_KEYBOARDS', () => {
    const expectedState = [28, 32, 35];

    const action = {
      type   : ActionTypes.UP_BASS_KEYBOARDS,
      payload: expectedState
    };

    expect(upBassKeyboardIndexes(undefined, {} as KeyboardAction)).toStrictEqual([] as number[]);
    expect(upBassKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(upBassKeyboardIndexes([] as number[], action)).toStrictEqual(expectedState);
  });

  test('should handle ACTIVATE_MIDI_KEYBOARDS', () => {
    const expectedState = [28, 32, 35];

    const action = {
      type   : ActionTypes.ACTIVATE_MIDI_KEYBOARDS,
      payload: expectedState
    };

    expect(activeMIDIKeyboardIndexes(undefined, {} as MIDIAction)).toStrictEqual([] as number[]);
    expect(activeMIDIKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(activeMIDIKeyboardIndexes([] as number[], action)).toStrictEqual(expectedState);
    expect(activeMIDIKeyboardIndexes(expectedState, action)).not.toBe(expectedState);
  });
});
