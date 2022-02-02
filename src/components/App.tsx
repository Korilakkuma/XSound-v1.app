import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IState, RIRInfo } from '../types';
import { Modal } from './atoms/Modal';
import { Flexbox } from './atoms/Flexbox';
import { VerticalBox } from './atoms/VerticalBox';
import { Header } from './standalones/Header';
import { OscillatorFieldset } from './standalones/OscillatorFieldset';
import { EnvelopeGeneratorFieldset } from './standalones/EnvelopeGeneratorFieldset';
import { RecorderFieldset } from './standalones/RecorderFieldset';
import { AudioFieldset } from './standalones/AudioFieldset';
import { Analyser } from './standalones/Analyser';
import { MML } from './standalones/MML';
import { BasicControllers } from './standalones/BasicControllers';
import { Piano } from './standalones/Piano';
import { CompressorFieldset } from './standalones/CompressorFieldset';
import { DistortionFieldset } from './standalones/DistortionFieldset';
import { WahFieldset } from './standalones/WahFieldset';
import { EqualizerFieldset } from './standalones/EqualizerFieldset';
import { FilterFieldset } from './standalones/FilterFieldset';
import { AutopanFieldset } from './standalones/AutopanFieldset';
import { TremoloFieldset } from './standalones/TremoloFieldset';
import { RingModulatorFieldset } from './standalones/RingModulatorFieldset';
import { PhaserFieldset } from './standalones/PhaserFieldset';
import { ChorusFieldset } from './standalones/ChorusFieldset';
import { FlangerFieldset } from './standalones/FlangerFieldset';
import { DelayFieldset } from './standalones/DelayFieldset';
import { ReverbFieldset } from './standalones/ReverbFieldset';
import { Footer } from './standalones/Footer';
import { BASE_URL, NUMBER_OF_ONESHOTS, NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS, AJAX_TIMEOUT } from '../config';
import { X, OneshotSetting, OneshotSettings } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

export const App: React.FC<Props> = () => {
  const [loadedApp, setLoadedApp] = useState<boolean>(false);
  const [progress, setProgress] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShowModalForAjax, setIsShowModalForAjax] = useState<boolean>(false);
  const [isShowModalForDecoding, setIsShowModalForDecoding] = useState<boolean>(false);

  const currentSoundSource = useSelector((state: IState) => state.currentSoundSource);

  const oneshots = useMemo(() => [
    `${BASE_URL}/one-shots/piano-2/C.mp3`,
    `${BASE_URL}/one-shots/piano-2/D.mp3`,
    `${BASE_URL}/one-shots/piano-2/E.mp3`,
    `${BASE_URL}/one-shots/piano-2/F.mp3`,
    `${BASE_URL}/one-shots/piano-2/G.mp3`,
    `${BASE_URL}/one-shots/piano-2/A.mp3`,
    `${BASE_URL}/one-shots/piano-2/B.mp3`,
    `${BASE_URL}/one-shots/guitar/C.mp3`,
    `${BASE_URL}/one-shots/e-guitar/C.mp3`
  ], []);

  // for Revreb
  const rirInfos: RIRInfo[] = useMemo(() => [
    { url: `${BASE_URL}/impulse-responses/s1_r1_c.mp3`, value:  1, label: '1 - 1', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s1_r2_c.mp3`, value:  2, label: '1 - 2', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s1_r3_c.mp3`, value:  3, label: '1 - 3', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s1_r4_c.mp3`, value:  4, label: '1 - 4', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s2_r1_c.mp3`, value:  5, label: '2 - 1', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s2_r2_c.mp3`, value:  6, label: '2 - 2', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s2_r3_c.mp3`, value:  7, label: '2 - 3', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s2_r4_c.mp3`, value:  8, label: '2 - 4', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s3_r1_c.mp3`, value:  9, label: '3 - 1', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s3_r2_c.mp3`, value: 10, label: '3 - 2', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s3_r3_c.mp3`, value: 11, label: '3 - 3', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s3_r4_c.mp3`, value: 12, label: '3 - 4', group: 'Sideways pointed cardioid measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s1_r1_o.mp3`, value: 13, label: '1 - 1', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s1_r2_o.mp3`, value: 14, label: '1 - 2', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s1_r3_o.mp3`, value: 15, label: '1 - 3', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s1_r4_o.mp3`, value: 16, label: '1 - 4', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s2_r1_o.mp3`, value: 17, label: '2 - 1', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s2_r2_o.mp3`, value: 18, label: '2 - 2', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s2_r3_o.mp3`, value: 19, label: '2 - 3', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s2_r4_o.mp3`, value: 20, label: '2 - 4', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s3_r1_o.mp3`, value: 21, label: '3 - 1', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s3_r2_o.mp3`, value: 22, label: '3 - 2', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s3_r3_o.mp3`, value: 23, label: '3 - 3', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s3_r4_o.mp3`, value: 24, label: '3 - 4', group: 'Omnidirectional measurements in the audience area' },
    { url: `${BASE_URL}/impulse-responses/s1_p1_o.mp3`, value: 25, label: '1 - 1', group: 'Omnidirectional measurements on the stage' },
    { url: `${BASE_URL}/impulse-responses/s1_p2_o.mp3`, value: 26, label: '1 - 2', group: 'Omnidirectional measurements on the stage' },
    { url: `${BASE_URL}/impulse-responses/s1_p3_o.mp3`, value: 27, label: '1 - 3', group: 'Omnidirectional measurements on the stage' },
    { url: `${BASE_URL}/impulse-responses/s2_p1_o.mp3`, value: 28, label: '2 - 1', group: 'Omnidirectional measurements on the stage' },
    { url: `${BASE_URL}/impulse-responses/s2_p2_o.mp3`, value: 29, label: '2 - 2', group: 'Omnidirectional measurements on the stage' },
    { url: `${BASE_URL}/impulse-responses/s2_p3_o.mp3`, value: 30, label: '2 - 3', group: 'Omnidirectional measurements on the stage' },
    { url: `${BASE_URL}/impulse-responses/s3_p1_o.mp3`, value: 31, label: '3 - 1', group: 'Omnidirectional measurements on the stage' },
    { url: `${BASE_URL}/impulse-responses/s3_p2_o.mp3`, value: 32, label: '3 - 2', group: 'Omnidirectional measurements on the stage' },
    { url: `${BASE_URL}/impulse-responses/s3_p3_o.mp3`, value: 33, label: '3 - 3', group: 'Omnidirectional measurements on the stage' }
    /*
    { url: `${BASE_URL}/impulse-responses/s1_r1_b.mp3`, value: 34, label: '1 - 1', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s1_r2_b.mp3`, value: 35, label: '1 - 2', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s1_r3_b.mp3`, value: 36, label: '1 - 3', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s1_r4_b.mp3`, value: 37, label: '1 - 4', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s2_r1_b.mp3`, value: 38, label: '2 - 1', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s2_r2_b.mp3`, value: 39, label: '2 - 2', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s2_r3_b.mp3`, value: 40, label: '2 - 3', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s2_r4_b.mp3`, value: 41, label: '2 - 4', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s3_r1_b.mp3`, value: 42, label: '3 - 1', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s3_r2_b.mp3`, value: 43, label: '3 - 2', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s3_r3_b.mp3`, value: 44, label: '3 - 3', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s3_r4_b.mp3`, value: 45, label: '3 - 4', group: 'Binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s1_r1_bd.mp3`, value: 46, label: '1 - 1', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s1_r2_bd.mp3`, value: 47, label: '1 - 2', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s1_r3_bd.mp3`, value: 48, label: '1 - 3', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s1_r4_bd.mp3`, value: 49, label: '1 - 4', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s2_r1_bd.mp3`, value: 50, label: '2 - 1', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s2_r2_bd.mp3`, value: 51, label: '2 - 2', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s2_r3_bd.mp3`, value: 52, label: '2 - 3', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s2_r4_bd.mp3`, value: 53, label: '2 - 4', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s3_r1_bd.mp3`, value: 54, label: '3 - 1', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s3_r2_bd.mp3`, value: 55, label: '3 - 2', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s3_r3_bd.mp3`, value: 56, label: '3 - 3', group: 'Diffuse field compensated binaural measurements in the audience area'},
    { url: `${BASE_URL}/impulse-responses/s3_r4_bd.mp3`, value: 57, label: '3 - 4', group: 'Diffuse field compensated binaural measurements in the audience area'}
    */
  ], []);

  const getBufferIndexCallback = useCallback((pianoIndex: number) => {
    switch (Math.floor((pianoIndex + 9) % 12)) {
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
        return -1;
    }
  }, []);

  const calculatePianoRateCallback = useCallback((pianoIndex: number) => {
    const sharps  = [1, 4, 6, 9, 11, 13, 16, 18, 21, 23, 25, 28, 30, 33, 35, 37, 40, 42, 45, 47, 49, 52, 54, 57, 59, 61, 64, 66, 69, 71, 73, 76, 78, 81, 83, 85];
    const isSharp = sharps.includes(pianoIndex);

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
  }, []);

  const calculateGuitarRateCallback = useCallback((guitarIndex: number) => {
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
  }, []);

  const calculateElectricGuitarRateCallback = useCallback((guitarIndex: number) => {
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
  }, []);

  const createOneshotSettingsCallback = useCallback(() => {
    const settings: OneshotSettings = [];

    for (let i = 0; i < NUMBER_OF_ONESHOTS; i++) {
      const setting: OneshotSetting = {
        bufferIndex : 0,
        playbackRate: 1,
        loop        : false,
        loopStart   : 0,
        loopEnd     : 0,
        volume      : 1
      };

      setting.bufferIndex  = getBufferIndexCallback(i);
      setting.playbackRate = calculatePianoRateCallback(i);

      settings[i] = setting;
    }

    for (let i = NUMBER_OF_ONESHOTS; i < (2 * NUMBER_OF_ONESHOTS); i++) {
      const setting: OneshotSetting = {
        bufferIndex : 7,
        playbackRate: 1,
        loop        : false,
        loopStart   : 0,
        loopEnd     : 0,
        volume      : 1
      };

      setting.playbackRate = calculateGuitarRateCallback(i);

      settings[i] = setting;
    }

    for (let i = (2 * NUMBER_OF_ONESHOTS); i < (3 * NUMBER_OF_ONESHOTS); i++) {
      const setting: OneshotSetting = {
        bufferIndex : 8,
        playbackRate: 1,
        loop        : false,
        loopStart   : 0,
        loopEnd     : 0,
        volume      : 1
      };

      setting.playbackRate = calculateElectricGuitarRateCallback(i);

      settings[i] = setting;
    }

    return settings;
  }, [getBufferIndexCallback, calculatePianoRateCallback, calculateGuitarRateCallback, calculateElectricGuitarRateCallback]);

  // Load impulse responses
  const loadRIRsCallback = useCallback((unmounted: boolean) => {
    if (unmounted) {
      return;
    }

    const rirs: AudioBuffer[] = [];

    rirInfos.forEach((rirInfo: RIRInfo) => {
      X.ajax({
        url            : rirInfo.url,
        type           : 'arraybuffer',
        timeout        : AJAX_TIMEOUT,
        successCallback: (event: ProgressEvent, arrayBuffer: ArrayBuffer) => {
          X.decode(X.get(), arrayBuffer, (audioBuffer: AudioBuffer) => {
            rirs.push(audioBuffer);

            const rate = Math.floor((rirs.length / rirInfos.length) * 100);

            if (rirs.length === rirInfos.length) {
              X('mixer').module('reverb').preset({ rirs });
              X('oneshot').module('reverb').preset({ rirs });
              X('audio').module('reverb').preset({ rirs });
              X('stream').module('reverb').preset({ rirs });
              X('noise').module('reverb').preset({ rirs });
              X('oscillator').module('reverb').preset({ rirs });
              window.C('oscillator').module('reverb').preset({ rirs });

              setProgress(false);
              setRate(100);

              return;
            }

            setRate(rate);
          }, () => {
            setErrorMessage('Decode error.');
            setIsShowModalForAjax(true);
          });
        },
        errorCallback  : () => {
          setErrorMessage('The loading of RIRs failed.');
          setIsShowModalForAjax(true);
        }
      });
    });
  }, [rirInfos]);

  const onCloseModalForAjaxCallback = useCallback(() => {
    setErrorMessage('');
    setIsShowModalForAjax(false);
  }, []);

  const onCloseModalForDecodingCallback = useCallback(() => {
    setErrorMessage('');
    setIsShowModalForDecoding(false);
  }, []);

  // Initialization for using XSound
  useEffect(() => {
    let unmounted = false;

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
    X('oneshot').resize(1024);
    X('audio').resize(8192);
    X('stream').resize(512);
    X('oscillator').resize(1024);
    window.C('oscillator').resize(1024);

    X('oscillator').setup([true, true, true, true]);
    window.C('oscillator').setup([false, false, false, false]);

    X('audio').module('wah').param({ auto: true });
    X('audio').module('pitchshifter').activate();

    X('stream').module('pitchshifter').activate();

    const constraints: MediaStreamConstraints = {
      audio: {
        echoCancellation: true
      },
      video: false
    };

    X('stream').setup(constraints);

    X('mixer').module('distortion').param({ pre: { state: true, gain: 0.5, lead: 0.5 }, post: { state: true } });
    X('mixer').module('chorus').param({ tone: 4000 });
    X('mixer').module('flanger').param({ tone: 4000 });
    X('mixer').module('delay').param({ tone: 4000 });
    X('mixer').module('reverb').param({ tone: 4000 });
    X('mixer').module('filter').param({ frequency: 8000 });

    X('oneshot').module('distortion').param({ pre: { state: true, gain: 0.5, lead: 0.5 }, post: { state: true } });
    X('oneshot').module('chorus').param({ tone: 4000 });
    X('oneshot').module('flanger').param({ tone: 4000 });
    X('oneshot').module('delay').param({ tone: 4000 });
    X('oneshot').module('reverb').param({ tone: 4000 });
    X('oneshot').module('filter').param({ frequency: 8000 });

    X('audio').module('distortion').param({ pre: { state: true, gain: 0.5, lead: 0.5 }, post: { state: true } });
    X('audio').module('chorus').param({ tone: 4000 });
    X('audio').module('flanger').param({ tone: 4000 });
    X('audio').module('delay').param({ tone: 4000 });
    X('audio').module('reverb').param({ tone: 4000 });
    X('audio').module('filter').param({ frequency: 8000 });

    X('stream').module('distortion').param({ pre: { state: true, gain: 0.5, lead: 0.5 }, post: { state: true } });
    X('stream').module('chorus').param({ tone: 4000 });
    X('stream').module('flanger').param({ tone: 4000 });
    X('stream').module('delay').param({ tone: 4000 });
    X('stream').module('reverb').param({ tone: 4000 });
    X('stream').module('filter').param({ frequency: 8000 });

    X('noise').module('distortion').param({ pre: { state: true, gain: 0.5, lead: 0.5 }, post: { state: true } });
    X('noise').module('chorus').param({ tone: 4000 });
    X('noise').module('flanger').param({ tone: 4000 });
    X('noise').module('delay').param({ tone: 4000 });
    X('noise').module('reverb').param({ tone: 4000 });
    X('noise').module('filter').param({ frequency: 8000 });

    X('oscillator').module('distortion').param({ pre: { state: true, gain: 0.5, lead: 0.5 }, post: { state: true } });
    X('oscillator').module('chorus').param({ tone: 4000 });
    X('oscillator').module('flanger').param({ tone: 4000 });
    X('oscillator').module('delay').param({ tone: 4000 });
    X('oscillator').module('reverb').param({ tone: 4000 });
    X('oscillator').module('filter').param({ frequency: 8000 });

    window.C('oscillator').module('distortion').param({ pre: { state: true, gain: 0.5, lead: 0.5 }, post: { state: true } });
    window.C('oscillator').module('chorus').param({ tone: 4000 });
    window.C('oscillator').module('flanger').param({ tone: 4000 });
    window.C('oscillator').module('delay').param({ tone: 4000 });
    window.C('oscillator').module('reverb').param({ tone: 4000 });
    window.C('oscillator').module('filter').param({ frequency: 8000 });

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      X('oscillator').get(i).param({ type: 'sawtooth' });
      window.C('oscillator').get(i).param({ type: 'sawtooth' });
    }

    X('stream').clearAudioDevices();

    // Load one-shot audio files
    try {
      X('oneshot').setup({
        resources      : oneshots,
        settings       : createOneshotSettingsCallback(),
        timeout        : AJAX_TIMEOUT,
        successCallback: () => {
          if (unmounted) {
            return;
          }

          // Next, Load RIRs
          if (rirInfos.length === 0) {
            setProgress(false);
          } else {
            loadRIRsCallback(unmounted);
          }
        },
        errorCallback  : () => {
          if (unmounted) {
            return;
          }

          setErrorMessage('The loading of audio files failed.');
          setIsShowModalForAjax(true);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }

      setIsShowModalForAjax(true);
    }

    X('mixer').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);
    X('oneshot').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);
    X('audio').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);
    X('stream').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);
    X('noise').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);

    setLoadedApp(true);

    return () => {
      unmounted = true;
    };
  }, [oneshots, rirInfos.length, createOneshotSettingsCallback, loadRIRsCallback]);

  return (
    <React.Fragment>
      <Header progress={progress} rate={rate} />
      <main>
        <Flexbox>
          <OscillatorFieldset oscillatorNumber={0} label="Oscillator - 1" radioName="oscillator-type-0" />
          <OscillatorFieldset oscillatorNumber={1} label="Oscillator - 2" radioName="oscillator-type-1" />
          <EnvelopeGeneratorFieldset />
          <RecorderFieldset loadedApp={loadedApp} />
          <AudioFieldset loadedApp={loadedApp} />
        </Flexbox>
        <Analyser loadedApp={loadedApp} />
        <MML loadedApp={loadedApp} currentSoundSource={currentSoundSource} />
        <BasicControllers currentSoundSource={currentSoundSource} />
        <Piano currentSoundSource={currentSoundSource} />
        <Flexbox>
          <VerticalBox>
            <CompressorFieldset />
            <DistortionFieldset />
          </VerticalBox>
          <VerticalBox>
            <WahFieldset />
            <EqualizerFieldset />
          </VerticalBox>
          <VerticalBox>
            <FilterFieldset />
            <AutopanFieldset />
          </VerticalBox>
          <VerticalBox>
            <TremoloFieldset />
            <RingModulatorFieldset />
            <PhaserFieldset />
          </VerticalBox>
          <VerticalBox>
            <ChorusFieldset />
            <FlangerFieldset />
          </VerticalBox>
          <VerticalBox>
            <DelayFieldset />
            <ReverbFieldset rirInfos={rirInfos} />
          </VerticalBox>
        </Flexbox>
      </main>
      <Footer />
      <Modal
        hasOverlay
        id="modal-app-ajax"
        isShow={isShowModalForAjax}
        title="Error"
        asAlert={true}
        onClose={onCloseModalForAjaxCallback}
      >
        {errorMessage}
      </Modal>
      <Modal
        hasOverlay
        id="modal-app-decoding"
        isShow={isShowModalForDecoding}
        title="Error"
        asAlert={true}
        onClose={onCloseModalForDecodingCallback}
      >
        {errorMessage}
      </Modal>
    </React.Fragment>
  );
};
