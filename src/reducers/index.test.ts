import { ActionTypes } from '../actions/ActionTypes';

import {
  activeMIDIKeyboardIndexes,
  analyserState,
  currentSoundSource,
  downBassKeyboardIndexes,
  downMelodyKeyboardIndexes,
  mmlState,
  oscillatorStates,
  upBassKeyboardIndexes,
  upMelodyKeyboardIndexes,
} from './';

import type {
  AnalyserStateAction,
  CurrentSoundSourceAction,
  KeyboardAction,
  MIDIAction,
  MMLStateAction,
  OscillatorStatesAction,
  SoundSource
} from '../types';

describe('Reducers', () => {
  /*
  test('should handle CLONE_XSOUND', async () => {
    const expectedState: Partial<typeof XSound> | Error = await XSound.clone();

    if (expectedState instanceof Error) {
      return;
    }

    const action = {
      type   : ActionTypes.CLONE_XSOUND,
      payload: expectedState
    };

    expect(clonedXSound(undefined, {} as CloneXSoundAction)).toBe(null);
    expect(clonedXSound(undefined, action)).toStrictEqual(expectedState);
    expect(clonedXSound(expectedState, action)).toStrictEqual(expectedState);
  });
  */

  test('should handle CHANGE_CURRENT_SOUND_SOURCE', () => {
    const expectedState: SoundSource = 'piano';

    const action = {
      type   : ActionTypes.CHANGE_CURRENT_SOUND_SOURCE,
      payload: expectedState
    };

    const soundSource: SoundSource = 'oscillator';

    expect(currentSoundSource(undefined, {} as CurrentSoundSourceAction)).toStrictEqual('oscillator');
    expect(currentSoundSource(undefined, action)).toStrictEqual(expectedState);
    expect(currentSoundSource(soundSource, action)).toStrictEqual(expectedState);
  });

  test('should handle CHANGE_OSCILLATOR_STATES', () => {
    const expectedState: [boolean, boolean] = [true, true];

    const action = {
      type   : ActionTypes.CHANGE_OSCILLATOR_STATES,
      payload: expectedState
    };

    expect(oscillatorStates(undefined, {} as OscillatorStatesAction)).toStrictEqual([true, false]);
    expect(oscillatorStates(undefined, action)).toStrictEqual(expectedState);
    expect(oscillatorStates([false, false], action)).toStrictEqual(expectedState);
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

    const emptyIndexes: number[] = [];

    expect(downMelodyKeyboardIndexes(undefined, {} as KeyboardAction)).toStrictEqual([] as number[]);
    expect(downMelodyKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(downMelodyKeyboardIndexes(emptyIndexes, action)).toStrictEqual(expectedState);
  });

  test('should handle DOWN_BASS_KEYBOARDS', () => {
    const expectedState = [28, 32, 35];

    const action = {
      type   : ActionTypes.DOWN_BASS_KEYBOARDS,
      payload: expectedState
    };

    const emptyIndexes: number[] = [];

    expect(downBassKeyboardIndexes(undefined, {} as KeyboardAction)).toStrictEqual([] as number[]);
    expect(downBassKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(downBassKeyboardIndexes(emptyIndexes, action)).toStrictEqual(expectedState);
  });

  test('should handle UP_MELODY_KEYBOARDS', () => {
    const expectedState = [40, 44, 47];

    const action = {
      type   : ActionTypes.UP_MELODY_KEYBOARDS,
      payload: expectedState
    };

    const emptyIndexes: number[] = [];

    expect(upMelodyKeyboardIndexes(undefined, {} as KeyboardAction)).toStrictEqual([] as number[]);
    expect(upMelodyKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(upMelodyKeyboardIndexes(emptyIndexes, action)).toStrictEqual(expectedState);
  });

  test('should handle UP_BASS_KEYBOARDS', () => {
    const expectedState = [28, 32, 35];

    const action = {
      type   : ActionTypes.UP_BASS_KEYBOARDS,
      payload: expectedState
    };

    const emptyIndexes: number[] = [];

    expect(upBassKeyboardIndexes(undefined, {} as KeyboardAction)).toStrictEqual([] as number[]);
    expect(upBassKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(upBassKeyboardIndexes(emptyIndexes, action)).toStrictEqual(expectedState);
  });

  test('should handle ACTIVATE_MIDI_KEYBOARDS', () => {
    const expectedState = [28, 32, 35];

    const action = {
      type   : ActionTypes.ACTIVATE_MIDI_KEYBOARDS,
      payload: expectedState
    };

    const emptyIndexes: number[] = [];

    expect(activeMIDIKeyboardIndexes(undefined, {} as MIDIAction)).toStrictEqual([] as number[]);
    expect(activeMIDIKeyboardIndexes(undefined, action)).toStrictEqual(expectedState);
    expect(activeMIDIKeyboardIndexes(emptyIndexes, action)).toStrictEqual(expectedState);
    expect(activeMIDIKeyboardIndexes(expectedState, action)).not.toBe(expectedState);
  });
});
