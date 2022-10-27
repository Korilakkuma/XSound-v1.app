import { ActionTypes } from './ActionTypes';
import {
  changeCurrentSoundSource,
  changeOscillatorStates,
  changeAnalyserState,
  changeMMLState,
  downMelodyKeyboards,
  downBassKeyboards,
  upMelodyKeyboards,
  upBassKeyboards,
  activateMIDIKeyboards
} from './';
import { SoundSource } from '../types';

describe('Actions', () => {
  test('should create an action to change current sound source', () => {
    const payload: SoundSource = 'oscillator';

    const expectedAction = {
      type: ActionTypes.CHANGE_CURRENT_SOUND_SOURCE,
      payload
    };

    expect(changeCurrentSoundSource(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to change oscillator states', () => {
    const payload: [boolean, boolean] = [true, false];

    const expectedAction = {
      type: ActionTypes.CHANGE_OSCILLATOR_STATES,
      payload
    };

    expect(changeOscillatorStates(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to change analyser state', () => {
    const payload = true;

    const expectedAction = {
      type: ActionTypes.CHANGE_ANALYSER_STATE,
      payload
    };

    expect(changeAnalyserState(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to change MML state', () => {
    const payload = true;

    const expectedAction = {
      type: ActionTypes.CHANGE_MML_STATE,
      payload
    };

    expect(changeMMLState(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to down keyboards for melody', () => {
    const payload = [40, 44, 47];

    const expectedAction = {
      type: ActionTypes.DOWN_MELODY_KEYBOARDS,
      payload
    };

    expect(downMelodyKeyboards(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to down keyboards for bass', () => {
    const payload = [28, 32, 35];

    const expectedAction = {
      type: ActionTypes.DOWN_BASS_KEYBOARDS,
      payload
    };

    expect(downBassKeyboards(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to up keyboards for melody', () => {
    const payload = [40, 44, 47];

    const expectedAction = {
      type: ActionTypes.UP_MELODY_KEYBOARDS,
      payload
    };

    expect(upMelodyKeyboards(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to up keyboards for bass', () => {
    const payload = [28, 32, 35];

    const expectedAction = {
      type: ActionTypes.UP_BASS_KEYBOARDS,
      payload
    };

    expect(upBassKeyboards(payload)).toStrictEqual(expectedAction);
  });

  test('should create an action to activate MIDI keyboards', () => {
    const payload = [40, 44, 47];

    const expectedAction = {
      type: ActionTypes.ACTIVATE_MIDI_KEYBOARDS,
      payload
    };

    expect(activateMIDIKeyboards(payload)).toStrictEqual(expectedAction);
  });
});
