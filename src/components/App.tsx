import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SoundSource } from '../types/aliases';
import { Flexbox } from './atoms/Flexbox';
import { Header } from './standalones/Header';
import { OscillatorFieldset } from './standalones/OscillatorFieldset';
import { EnvelopeGeneratorFieldset } from './standalones/EnvelopeGeneratorFieldset';
import { RecorderFieldset } from './standalones/RecorderFieldset';
import { AudioFieldset } from './standalones/AudioFieldset';
import { Analyser } from './standalones/Analyser';
import { MML } from './standalones/MML';
import { BasicControllers } from './standalones/BasicControllers';
import { Piano } from './standalones/Piano';
import { Footer } from './standalones/Footer';
import { X } from 'xsound';

declare global {
  interface Window {
    C: any;
  }
}

interface Props {
  dispatch: Dispatch;
  currentSoundSource: SoundSource;
  analyserState: boolean;
  mmlState: boolean;
}

interface State {
  progress: boolean;
  rate: number;
}

interface OneshotSettings {
  buffer: number;
  rate: number;
  loop: boolean;
  start: number;
  end: number;
  volume: number;
}

interface RIRInfo {
  url: string;
  value: number;
  label: string;
  group: string;
}

const BASE_URL = '/assets';
const NUMBER_OF_ONESHOTS = 88;
const AJAX_TIMEOUT = 60000;

const sources = ['mixer', 'oscillator', 'oneshot', 'audio', 'stream', 'noise'];

const oneshots = [
  `${BASE_URL}/one-shot/piano-2/C.wav`,
  `${BASE_URL}/one-shot/piano-2/D.wav`,
  `${BASE_URL}/one-shot/piano-2/E.wav`,
  `${BASE_URL}/one-shot/piano-2/F.wav`,
  `${BASE_URL}/one-shot/piano-2/G.wav`,
  `${BASE_URL}/one-shot/piano-2/A.wav`,
  `${BASE_URL}/one-shot/piano-2/B.wav`,
  `${BASE_URL}/one-shot/guitar/C.mp3`,
  `${BASE_URL}/one-shot/e-guitar/C.mp3`
];

// for Revreb
const rirs: RIRInfo[] = [
  { url: `${BASE_URL}/impulse-responses/s1_r1_c.wav`, value:  1, label: '1 - 1', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s1_r2_c.wav`, value:  2, label: '1 - 2', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s1_r3_c.wav`, value:  3, label: '1 - 3', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s1_r4_c.wav`, value:  4, label: '1 - 4', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s2_r1_c.wav`, value:  5, label: '2 - 1', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s2_r2_c.wav`, value:  6, label: '2 - 2', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s2_r3_c.wav`, value:  7, label: '2 - 3', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s2_r4_c.wav`, value:  8, label: '2 - 4', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s3_r1_c.wav`, value:  9, label: '3 - 1', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s3_r2_c.wav`, value: 10, label: '3 - 2', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s3_r3_c.wav`, value: 11, label: '3 - 3', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s3_r4_c.wav`, value: 12, label: '3 - 4', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s1_r1_o.wav`, value: 13, label: '1 - 1', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s1_r2_o.wav`, value: 14, label: '1 - 2', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s1_r3_o.wav`, value: 15, label: '1 - 3', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s1_r4_o.wav`, value: 16, label: '1 - 4', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s2_r1_o.wav`, value: 17, label: '2 - 1', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s2_r2_o.wav`, value: 18, label: '2 - 2', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s2_r3_o.wav`, value: 19, label: '2 - 3', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s2_r4_o.wav`, value: 20, label: '2 - 4', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s3_r1_o.wav`, value: 21, label: '3 - 1', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s3_r2_o.wav`, value: 22, label: '3 - 2', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s3_r3_o.wav`, value: 23, label: '3 - 3', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s3_r4_o.wav`, value: 24, label: '3 - 4', group: 'Omnidirectional measurements in the audience area' },
  { url: `${BASE_URL}/impulse-responses/s1_p1_o.wav`, value: 25, label: '1 - 1', group: 'Omnidirectional measurements on the stage' },
  { url: `${BASE_URL}/impulse-responses/s1_p2_o.wav`, value: 26, label: '1 - 2', group: 'Omnidirectional measurements on the stage' },
  { url: `${BASE_URL}/impulse-responses/s1_p3_o.wav`, value: 27, label: '1 - 3', group: 'Omnidirectional measurements on the stage' },
  { url: `${BASE_URL}/impulse-responses/s2_p1_o.wav`, value: 28, label: '2 - 1', group: 'Omnidirectional measurements on the stage' },
  { url: `${BASE_URL}/impulse-responses/s2_p2_o.wav`, value: 29, label: '2 - 2', group: 'Omnidirectional measurements on the stage' },
  { url: `${BASE_URL}/impulse-responses/s2_p3_o.wav`, value: 30, label: '2 - 3', group: 'Omnidirectional measurements on the stage' },
  { url: `${BASE_URL}/impulse-responses/s3_p1_o.wav`, value: 31, label: '3 - 1', group: 'Omnidirectional measurements on the stage' },
  { url: `${BASE_URL}/impulse-responses/s3_p2_o.wav`, value: 32, label: '3 - 2', group: 'Omnidirectional measurements on the stage' },
  { url: `${BASE_URL}/impulse-responses/s3_p3_o.wav`, value: 33, label: '3 - 3', group: 'Omnidirectional measurements on the stage' }
  /*
  { url: `${BASE_URL}/impulse-responses/s1_r1_b.wav`, value: 34, label: '1 - 1', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s1_r2_b.wav`, value: 35, label: '1 - 2', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s1_r3_b.wav`, value: 36, label: '1 - 3', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s1_r4_b.wav`, value: 37, label: '1 - 4', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s2_r1_b.wav`, value: 38, label: '2 - 1', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s2_r2_b.wav`, value: 39, label: '2 - 2', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s2_r3_b.wav`, value: 40, label: '2 - 3', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s2_r4_b.wav`, value: 41, label: '2 - 4', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s3_r1_b.wav`, value: 42, label: '3 - 1', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s3_r2_b.wav`, value: 43, label: '3 - 2', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s3_r3_b.wav`, value: 44, label: '3 - 3', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s3_r4_b.wav`, value: 45, label: '3 - 4', group: 'Binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s1_r1_bd.wav`, value: 46, label: '1 - 1', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s1_r2_bd.wav`, value: 47, label: '1 - 2', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s1_r3_bd.wav`, value: 48, label: '1 - 3', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s1_r4_bd.wav`, value: 49, label: '1 - 4', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s2_r1_bd.wav`, value: 50, label: '2 - 1', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s2_r2_bd.wav`, value: 51, label: '2 - 2', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s2_r3_bd.wav`, value: 52, label: '2 - 3', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s2_r4_bd.wav`, value: 53, label: '2 - 4', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s3_r1_bd.wav`, value: 54, label: '3 - 1', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s3_r2_bd.wav`, value: 55, label: '3 - 2', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s3_r3_bd.wav`, value: 56, label: '3 - 3', group: 'Diffuse field compensated binaural measurements in the audience area'},
  { url: `${BASE_URL}/impulse-responses/s3_r4_bd.wav`, value: 57, label: '3 - 4', group: 'Diffuse field compensated binaural measurements in the audience area'}
  */
];

function getBufferIndex(pianoIndex: number): number {
  switch (parseInt(((pianoIndex + 9) % 12), 10)) {
    case  0 :
    case  1 :
      return 0;
    case  2 :
    case  3 :
      return 1;
    case  4 :
      return 2;
    case  5 :
    case  6 :
      return 3;
    case  7 :
    case  8 :
      return 4;
    case  9 :
    case 10 :
      return 5;
    case 11 :
      return 6;
    default :
      break;
  }
}

function calculatePianoRate(pianoIndex: number): number {
  const sharps  = [1, 4, 6, 9, 11, 13, 16, 18, 21, 23, 25, 28, 30, 33, 35, 37, 40, 42, 45, 47, 49, 52, 54, 57, 59, 61, 64, 66, 69, 71, 73, 76, 78, 81, 83, 85];
  const isSharp = (sharps.indexOf(pianoIndex) !== -1) ? true : false;

  let rate = 0;

  if ((pianoIndex >= 0) && (pianoIndex <= 2)) {
    rate = 0.0625;
  } else if ((pianoIndex >= 3) && (pianoIndex <= 14)) {
    rate = 0.125;
  } else if ((pianoIndex >= 15) && (pianoIndex <= 26)) {
    rate = 0.25;
  } else if ((pianoIndex >= 27) && (pianoIndex <= 38)) {
    rate = 0.5;
  } else if ((pianoIndex >= 39) && (pianoIndex <= 50)) {
    rate = 1;
  } else if ((pianoIndex >= 51) && (pianoIndex <= 62)) {
    rate = 2;
  } else if ((pianoIndex >= 63) && (pianoIndex <= 74)) {
    rate = 4;
  } else if ((pianoIndex >= 75) && (pianoIndex <= 86)) {
    rate = 8;
  } else if ((pianoIndex >= 87) && (pianoIndex <= 98)) {
    rate = 16;
  }

  if (isSharp) {
    rate *= Math.pow(2, (1 / 12));
  }

  return rate;
}

function calculateGuitarRate(guitarIndex: number): number {
  let rate = 0;

  switch (guitarIndex - NUMBER_OF_ONESHOTS) {
    case 0:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -39);
      break;
    case 1:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -38);
      break;
    case 2:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -37);
      break;
    case 3:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -36);
      break;
    case 4:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -35);
      break;
    case 5:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -34);
      break;
    case 6:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -33);
      break;
    case 7:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -32);
      break;
    case 8:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -31);
      break;
    case 9:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -30);
      break;
    case 10:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -29);
      break;
    case 11:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -28);
      break;
    case 12:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -27);
      break;
    case 13:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -26);
      break;
    case 14:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -25);
      break;
    case 15:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -24);
      break;
    case 16:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -23);
      break;
    case 17:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -22);
      break;
    case 18:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -21);
      break;
    case 19:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -20);
      break;
    case 20:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -19);
      break;
    case 21:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -18);
      break;
    case 22:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -17);
      break;
    case 23:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -16);
      break;
    case 24:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -15);
      break;
    case 25:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -14);
      break;
    case 26:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -13);
      break;
    case 27:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -12);
      break;
    case 28:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -11);
      break;
    case 29:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -10);
      break;
    case 30:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -9);
      break;
    case 31:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -8);
      break;
    case 32:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -7);
      break;
    case 33:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -6);
      break;
    case 34:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -5);
      break;
    case 35:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -4);
      break;
    case 36:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -3);
      break;
    case 37:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -2);
      break;
    case 38:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -1);
      break;
    case 39:
      rate = 1;
      break;
    case 40:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 1);
      break;
    case 41:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 2);
      break;
    case 42:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 3);
      break;
    case 43:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 4);
      break;
    case 44:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 5);
      break;
    case 45:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 6);
      break;
    case 46:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 7);
      break;
    case 47:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 8);
      break;
    case 48:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 9);
      break;
    case 49:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 10);
      break;
    case 50:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 11);
      break;
    case 51:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 12);
      break;
    case 52:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 13);
      break;
    case 53:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 14);
      break;
    case 54:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 15);
      break;
    case 55:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 16);
      break;
    case 56:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 17);
      break;
    case 57:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 18);
      break;
    case 58:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 19);
      break;
    case 59:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 20);
      break;
    case 60:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 21);
      break;
    case 61:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 22);
      break;
    case 62:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 23);
      break;
    case 63:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 24);
      break;
    case 64:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 25);
      break;
    case 65:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 26);
      break;
    case 66:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 27);
      break;
    case 67:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 28);
      break;
    case 68:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 29);
      break;
    case 69:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 30);
      break;
    case 70:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 31);
      break;
    case 71:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 33);
      break;
    case 77:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 34);
      break;
    case 78:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 35);
      break;
    case 79:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 36);
      break;
    case 80:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 37);
      break;
    case 81:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 38);
      break;
    case 82:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 39);
      break;
    case 83:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 40);
      break;
    case 84:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 41);
      break;
    case 85:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 42);
      break;
    case 86:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 43);
      break;
    case 87:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 44);
      break;
    case 88:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 45);
      break;
  }

  return rate;
}

function calculateElectricGuitarRate(guitarIndex: number): number {
  let rate = 0;

  switch (guitarIndex - NUMBER_OF_ONESHOTS - NUMBER_OF_ONESHOTS) {
    case 0:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -39);
      break;
    case 1:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -38);
      break;
    case 2:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -37);
      break;
    case 3:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -36);
      break;
    case 4:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -35);
      break;
    case 5:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -34);
      break;
    case 6:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -33);
      break;
    case 7:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -32);
      break;
    case 8:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -31);
      break;
    case 9:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -30);
      break;
    case 10:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -29);
      break;
    case 11:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -28);
      break;
    case 12:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -27);
      break;
    case 13:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -26);
      break;
    case 14:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -25);
      break;
    case 15:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -24);
      break;
    case 16:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -23);
      break;
    case 17:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -22);
      break;
    case 18:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -21);
      break;
    case 19:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -20);
      break;
    case 20:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -19);
      break;
    case 21:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -18);
      break;
    case 22:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -17);
      break;
    case 23:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -16);
      break;
    case 24:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -15);
      break;
    case 25:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -14);
      break;
    case 26:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -13);
      break;
    case 27:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -12);
      break;
    case 28:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -11);
      break;
    case 29:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -10);
      break;
    case 30:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -9);
      break;
    case 31:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -8);
      break;
    case 32:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -7);
      break;
    case 33:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -6);
      break;
    case 34:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -5);
      break;
    case 35:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -4);
      break;
    case 36:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -3);
      break;
    case 37:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -2);
      break;
    case 38:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), -1);
      break;
    case 39:
      rate = 1;
      break;
    case 40:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 1);
      break;
    case 41:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 2);
      break;
    case 42:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 3);
      break;
    case 43:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 4);
      break;
    case 44:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 5);
      break;
    case 45:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 6);
      break;
    case 46:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 7);
      break;
    case 47:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 8);
      break;
    case 48:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 9);
      break;
    case 49:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 10);
      break;
    case 50:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 11);
      break;
    case 51:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 12);
      break;
    case 52:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 13);
      break;
    case 53:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 14);
      break;
    case 54:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 15);
      break;
    case 55:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 16);
      break;
    case 56:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 17);
      break;
    case 57:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 18);
      break;
    case 58:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 19);
      break;
    case 59:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 20);
      break;
    case 60:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 21);
      break;
    case 61:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 22);
      break;
    case 62:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 23);
      break;
    case 63:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 24);
      break;
    case 64:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 25);
      break;
    case 65:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 26);
      break;
    case 66:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 27);
      break;
    case 67:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 28);
      break;
    case 68:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 29);
      break;
    case 69:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 30);
      break;
    case 70:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 31);
      break;
    case 71:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 33);
      break;
    case 77:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 34);
      break;
    case 78:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 35);
      break;
    case 79:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 36);
      break;
    case 80:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 37);
      break;
    case 81:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 38);
      break;
    case 82:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 39);
      break;
    case 83:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 40);
      break;
    case 84:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 41);
      break;
    case 85:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 42);
      break;
    case 86:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 43);
      break;
    case 87:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 44);
      break;
    case 88:
      rate = 1 * Math.pow(Math.pow(2, (1 / 12)), 45);
      break;
  }

  return rate;
}

function createOneshotSettings(): OneshotSettings[]  {
  const settings: OneshotSettings[] = new Array(NUMBER_OF_ONESHOTS);

  for (let i = 0; i < NUMBER_OF_ONESHOTS; i++) {
    const setting: OneshotSettings = {
      buffer: 0,
      rate  : 1,
      loop  : false,
      start : 0,
      end   : 0,
      volume: 1
    };

    setting.buffer = getBufferIndex(i);
    setting.rate   = calculatePianoRate(i);

    settings[i] = setting;
  }

  for (let i = NUMBER_OF_ONESHOTS; i < (NUMBER_OF_ONESHOTS + NUMBER_OF_ONESHOTS); i++) {
    const setting: OneshotSettings = {
      buffer: 7,
      rate  : 1,
      loop  : false,
      start : 0,
      end   : 0,
      volume: 1
    };

    setting.rate = calculateGuitarRate(i);

    settings[i] = setting;
  }

  for (let i = (NUMBER_OF_ONESHOTS + NUMBER_OF_ONESHOTS); i < (NUMBER_OF_ONESHOTS + NUMBER_OF_ONESHOTS + NUMBER_OF_ONESHOTS); i++) {
    const setting: OneshotSettings = {
      buffer: 8,
      rate  : 1,
      loop  : false,
      start : 0,
      end   : 0,
      volume: 1
    };

    setting.rate = calculateElectricGuitarRate(i);

    settings[i] = setting;
  }

  return settings;
}

class App extends React.Component<Props, State> {
  private pianoRef: RefObject<Piano> = React.createRef<Piano>();

  constructor(props: Props) {
    super(props);

    this.state = {
      currentSoundSource: 'oscillator',
      progress          : true,
      rate              : 0
    };

    this.setSoundStop   = this.setSoundStop.bind(this);
    this.clearKeyboards = this.clearKeyboards.bind(this);

    this.loadRIRs = this.loadRIRs.bind(this);
  }

  componentDidMount(): void {
    // Initialization for using XSound

    // Clone X object as global object
    window.C = X.clone();  // for MML of OscillatorModule

    // Not used
    X.free([X('media')]);

    window.C.free([
      window.C('oneshot'),
      window.C('audio'),
      window.C('media'),
      window.C('stream'),
      window.C('mixer'),
      window.C('midi')
    ]);

    // Resize buffer of ScriptProcessorNode
    X('mixer').resize(1024);
    X('oscillator').resize(1024);
    window.C('oscillator').resize(1024);
    X('oneshot').resize(1024);
    X('audio').resize(8192);
    X('stream').resize(512);

    X('oscillator').setup([true, true, true, true]);
    window.C('oscillator').setup([false, false, false, false]);

    X('audio').module('wah').param('auto', true);
    X('audio').module('pitchshifter').state(true);

    X('stream').module('pitchshifter').state(true);

    const constraints = {
      audio : {
        autoGainControl      : true,
        echoCancellation     : true,
        echoCancellationType : 'system',
        noiseSuppression     : false
      },
      video : false
    };

    X('stream').setup(constraints);

    sources.forEach((source: string) => {
      X(source).module('distortion').param('color', 2000);
      X(source).module('distortion').param('tone',  4000);
      X(source).module('chorus').param('tone', 4000);
      X(source).module('flanger').param('tone', 4000);
      X(source).module('delay').param('tone', 4000);
      X(source).module('reverb').param('tone', 4000);
      X(source).module('filter').param('frequency', 8000);
    });

    window.C('oscillator').module('distortion').param('color', 2000);
    window.C('oscillator').module('distortion').param('tone',  4000);
    window.C('oscillator').module('chorus').param('tone', 4000);
    window.C('oscillator').module('flanger').param('tone', 4000);
    window.C('oscillator').module('delay').param('tone', 4000);
    window.C('oscillator').module('reverb').param('tone', 4000);
    window.C('oscillator').module('filter').param('frequency', 8000);

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      X('oscillator', i).param('type', 'sawtooth');
      window.C('oscillator', i).param('type', 'sawtooth');
    }

    // Load one-shot audio files
    try {
      X('oneshot').setup({
        resources: oneshots,
        settings : createOneshotSettings(),
        timeout  : AJAX_TIMEOUT,
        success  : () => {
          // Next, Load RIRs
          if (rirs.length === 0) {
            this.setState({ progress: false });
          } else {
            this.loadRIRs();
          }
        },
        error : () => {
          // TODO: Open error dialog
        }
      });
    } catch (error: Error) {
      // TODO: Open error dialog
    }
  }

  render(): React.ReactNode {
    const { dispatch, currentSoundSource, analyserState, mmlState } = this.props;
    const { progress, rate } = this.state;

    return (
      <React.Fragment>
        <Header progress={progress} rate={rate} />
        <Flexbox>
          <OscillatorFieldset
            oscillatorNumber={0}
            label="Oscillator - 1"
            radioName="oscillator-type-0"
            defaultState={true}
            onChangeType={(event: React.SyntheticEvent) => {
              const type = event.currentTarget.value;

              for (let i = 0, len = X('oscillator').length(); i < len; i++) {
                X('oscillator').get(i).param('type', type);
              }
            }}
            onChangeState={(event: React.SyntheticEvent) => {
              const state = event.currentTarget.checked;

              for (let i = 0, len = X('oscillator').length(); i < len; i++) {
                X('oscillator').get(i).state(state);
              }
            }}
            onChangeVolume={(event: React.SyntheticEvent) => {
              const volume = event.currentTarget.valueAsNumber;

              for (let i = 0, len = X('oscillator').length(); i < len; i++) {
                X('oscillator').get(i).param('volume', volume);
              }
            }}
            onChangeOctave={(event: React.SyntheticEvent) => {
              const octave = event.currentTarget.valueAsNumber;

              for (let i = 0, len = X('oscillator').length(); i < len; i++) {
                X('oscillator').get(i).param('octave', octave);
              }
            }}
            onChangeFine={(event: React.SyntheticEvent) => {
              const fine = event.currentTarget.valueAsNumber;

              for (let i = 0, len = X('oscillator').length(); i < len; i++) {
                X('oscillator').get(i).param('fine', fine);
              }
            }}
          />
          <OscillatorFieldset
            oscillatorNumber={1}
            label="Oscillator - 2"
            radioName="oscillator-type-1"
            defaultState={false}
            onChangeType={(event: React.SyntheticEvent) => {
              const type = event.currentTarget.value;

              for (let i = 0, len = window.C('oscillator').length(); i < len; i++) {
                window.C('oscillator').get(i).param('type', type);
              }
            }}
            onChangeState={(event: React.SyntheticEvent) => {
              const state = event.currentTarget.checked;

              for (let i = 0, len = window.C('oscillator').length(); i < len; i++) {
                window.C('oscillator').get(i).state(state);
              }
            }}
            onChangeVolume={(event: React.SyntheticEvent) => {
              const volume = event.currentTarget.valueAsNumber;

              for (let i = 0, len = window.C('oscillator').length(); i < len; i++) {
                window.C('oscillator').get(i).param('volume', volume);
              }
            }}
            onChangeOctave={(event: React.SyntheticEvent) => {
              const octave = event.currentTarget.valueAsNumber;

              for (let i = 0, len = window.C('oscillator').length(); i < len; i++) {
                window.C('oscillator').get(i).param('octave', octave);
              }
            }}
            onChangeFine={(event: React.SyntheticEvent) => {
              const fine = event.currentTarget.valueAsNumber;

              for (let i = 0, len = window.C('oscillator').length(); i < len; i++) {
                window.C('oscillator').get(i).param('fine', fine);
              }
            }}
          />
          <EnvelopeGeneratorFieldset />
          <RecorderFieldset sources={sources} />
          <AudioFieldset />
        </Flexbox>
        <Analyser active={analyserState} sources={sources} />
        <MML
          active={mmlState}
          currentSoundSource={currentSoundSource}
          setSoundStop={this.setSoundStop}
          clear={this.clearKeyboards}
        />
        <BasicControllers dispatch={dispatch} sources={sources} />
        <Piano ref={this.pianoRef} currentSoundSource={currentSoundSource} />
        <Footer />
      </React.Fragment>
    );
  }

  private setSoundStop(index: number, isStop: boolean): void {
    if (this.pianoRef.current) {
      this.pianoRef.current.setSoundStop(index, isStop);
    }
  }

  private clearKeyboards(): void {
    if (this.pianoRef.current) {
      this.pianoRef.current.clear();
    }
  }

  private loadRIRs(): void {
    // Load impulse responses
    const reverbs: AudioBuffer[] = [];

    rirs.forEach((rir: RIRInfo, index: number) => {
      X.ajax(rir.url, 'arraybuffer', AJAX_TIMEOUT, (_, arrayBuffer: ArrayBuffer) => {
        X.decode(X.get(), arrayBuffer, (audioBuffer: AudioBuffer) => {
          reverbs.push(audioBuffer);

          const rate = Math.floor((reverbs.length / rirs.length) * 100);

          this.setState({ rate });

          if (reverbs.length === rirs.length) {
            sources.forEach((source: string) => {
              X(source).module('reverb').preset(reverbs);
            });

            window.C('oscillator').module('reverb').preset(reverbs);

            this.setState({
              progress: false,
              rate    : 100
            });
          }
        }, () => {
          // TODO: Open error dialog
        });
      }, () => {
        // TODO: Open error dialog
      });
    });
  }
}

function mapStateToProps(state) {
  const { currentSoundSource, analyserState, mmlState } = state;

  return { currentSoundSource, analyserState, mmlState };
}

export default connect(mapStateToProps)(App);
