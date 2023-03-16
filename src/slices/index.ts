import { createSlice } from '@reduxjs/toolkit';

import type { SoundSource } from '../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { XSound } from 'xsound';

export type State = {
  activeMIDIKeyboardIndexes: number[],
  analyserState: boolean,
  clonedXSound: () => null | typeof XSound,
  currentSoundSource: SoundSource,
  downBassKeyboardIndexes: number[],
  downMelodyKeyboardIndexes: number[],
  mmlState: boolean,
  oscillatorStates: [boolean, boolean],
  upBassKeyboardIndexes: number[],
  upMelodyKeyboardIndexes: number[]
};

export const initialState: State = {
  activeMIDIKeyboardIndexes: [],
  analyserState: false,
  clonedXSound: () => null,
  currentSoundSource: 'oscillator',
  downBassKeyboardIndexes: [],
  downMelodyKeyboardIndexes: [],
  mmlState: false,
  oscillatorStates: [true, false],
  upBassKeyboardIndexes: [],
  upMelodyKeyboardIndexes: []
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    activateMIDIKeyboards: (state: State, action: PayloadAction<number[]>) => {
      state.activeMIDIKeyboardIndexes = action.payload;
    },
    changeAnalyserState: (state: State, action: PayloadAction<boolean>) => {
      state.analyserState = action.payload;
    },
    changeCurrentSoundSource: (state: State, action: PayloadAction<SoundSource>) => {
      state.currentSoundSource = action.payload;
    },
    changeMMLState: (state: State, action: PayloadAction<boolean>) => {
      state.mmlState = action.payload;
    },
    changeOscillatorStates: (state: State, action: PayloadAction<[boolean, boolean]>) => {
      state.oscillatorStates = action.payload;
    },
    downBassKeyboards: (state: State, action: PayloadAction<number[]>) => {
      state.downBassKeyboardIndexes = action.payload;
    },
    downMelodyKeyboards: (state: State, action: PayloadAction<number[]>) => {
      state.downMelodyKeyboardIndexes = action.payload;
    },
    setClonedXSound: (state: State, action: PayloadAction<() => null | typeof XSound>) => {
      state.clonedXSound = action.payload;
    },
    upBassKeyboards: (state: State, action: PayloadAction<number[]>) => {
      state.upBassKeyboardIndexes = action.payload;
    },
    upMelodyKeyboards: (state: State, action: PayloadAction<number[]>) => {
      state.upMelodyKeyboardIndexes = action.payload;
    }
  }
});

export const {
  activateMIDIKeyboards,
  changeAnalyserState,
  changeCurrentSoundSource,
  changeMMLState,
  changeOscillatorStates,
  downBassKeyboards,
  downMelodyKeyboards,
  setClonedXSound,
  upBassKeyboards,
  upMelodyKeyboards
} = slice.actions;

export const reducer = slice.reducer;
