import { createSlice } from '@reduxjs/toolkit';

import type { SoundSource } from '/src/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type State = {
  activeMIDIKeyboardIndexes: number[];
  analyserState: boolean;
  currentSoundSource: SoundSource;
  downBassKeyboardIndexes: number[];
  downMelodyKeyboardIndexes: number[];
  mmlState: boolean;
  oscillatorStates: [boolean, boolean];
  upBassKeyboardIndexes: number[];
  upMelodyKeyboardIndexes: number[];
};

export const initialState: State = {
  activeMIDIKeyboardIndexes: [],
  analyserState: false,
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
  upBassKeyboards,
  upMelodyKeyboards
} = slice.actions;

export const reducer = slice.reducer;
