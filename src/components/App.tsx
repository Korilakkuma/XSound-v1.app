import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { X } from 'xsound';

import { AJAX_TIMEOUT, BASE_URL, NUMBER_OF_CHANNELS, NUMBER_OF_ONESHOTS, NUMBER_OF_TRACKS } from '/src/config';
import { Flexbox } from '/src/components/atoms/Flexbox';
import { Modal } from '/src/components/atoms/Modal';
import { VerticalBox } from '/src/components/atoms/VerticalBox';
import { Analyser } from '/src/components/standalones/Analyser';
import { AudioFieldset } from '/src/components/standalones/AudioFieldset';
import { BasicControllers } from '/src/components/standalones/BasicControllers';
import { BoosterFieldset } from '/src/components/standalones/BoosterFieldset';
import { ChorusFieldset } from '/src/components/standalones/ChorusFieldset';
import { CompressorFieldset } from '/src/components/standalones/CompressorFieldset';
import { DelayFieldset } from '/src/components/standalones/DelayFieldset';
import { EnvelopeGeneratorFieldset } from '/src/components/standalones/EnvelopeGeneratorFieldset';
import { FilterFieldset } from '/src/components/standalones/FilterFieldset';
import { FlangerFieldset } from '/src/components/standalones/FlangerFieldset';
import { Footer } from '/src/components/standalones/Footer';
import { Header } from '/src/components/standalones/Header';
import { MML } from '/src/components/standalones/MML';
import { NoiseSuppressorFieldset } from '/src/components/standalones/NoiseSuppressorFieldset';
import { OscillatorFieldset } from '/src/components/standalones/OscillatorFieldset';
import { PhaserFieldset } from '/src/components/standalones/PhaserFieldset';
import { Piano } from '/src/components/standalones/Piano';
import { PreampFieldset } from '/src/components/standalones/PreampFieldset';
import { RecorderFieldset } from '/src/components/standalones/RecorderFieldset';
import { ReverbFieldset } from '/src/components/standalones/ReverbFieldset';
import { RingModulatorFieldset } from '/src/components/standalones/RingModulatorFieldset';
import { TremoloFieldset } from '/src/components/standalones/TremoloFieldset';
import { WahFieldset } from '/src/components/standalones/WahFieldset';

import type { RootState } from '/src/store';
import type { RIRDescriptor } from '/src/types';
import type { OneshotSetting, OneshotSettings, PreampParams } from 'xsound';

export const App: React.FC = () => {
  const [loadedApp, setLoadedApp] = useState<boolean>(false);
  const [progress, setProgress] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShowModalForAjax, setIsShowModalForAjax] = useState<boolean>(false);
  const [isShowModalForDecoding, setIsShowModalForDecoding] = useState<boolean>(false);

  const currentSoundSource = useSelector((state: RootState) => state.currentSoundSource);

  const oneshots = useMemo(
    () => [
      `${BASE_URL}/one-shots/piano-2/C.mp3`,
      `${BASE_URL}/one-shots/piano-2/D.mp3`,
      `${BASE_URL}/one-shots/piano-2/E.mp3`,
      `${BASE_URL}/one-shots/piano-2/F.mp3`,
      `${BASE_URL}/one-shots/piano-2/G.mp3`,
      `${BASE_URL}/one-shots/piano-2/A.mp3`,
      `${BASE_URL}/one-shots/piano-2/B.mp3`,
      `${BASE_URL}/one-shots/guitar/C.mp3`,
      `${BASE_URL}/one-shots/e-guitar/C.mp3`,
      `${BASE_URL}/one-shots/orgel/C.mp3`
    ],
    []
  );

  // for Reverb
  const rirDescriptors: RIRDescriptor[] = useMemo(
    () => [
      {
        url: `${BASE_URL}/impulse-responses/s1_r1_c.mp3`,
        value: 1,
        label: '1 - 1',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_r2_c.mp3`,
        value: 2,
        label: '1 - 2',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_r3_c.mp3`,
        value: 3,
        label: '1 - 3',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_r4_c.mp3`,
        value: 4,
        label: '1 - 4',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_r1_c.mp3`,
        value: 5,
        label: '2 - 1',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_r2_c.mp3`,
        value: 6,
        label: '2 - 2',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_r3_c.mp3`,
        value: 7,
        label: '2 - 3',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_r4_c.mp3`,
        value: 8,
        label: '2 - 4',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_r1_c.mp3`,
        value: 9,
        label: '3 - 1',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_r2_c.mp3`,
        value: 10,
        label: '3 - 2',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_r3_c.mp3`,
        value: 11,
        label: '3 - 3',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_r4_c.mp3`,
        value: 12,
        label: '3 - 4',
        group: 'Sideways pointed cardioid measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_r1_o.mp3`,
        value: 13,
        label: '1 - 1',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_r2_o.mp3`,
        value: 14,
        label: '1 - 2',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_r3_o.mp3`,
        value: 15,
        label: '1 - 3',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_r4_o.mp3`,
        value: 16,
        label: '1 - 4',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_r1_o.mp3`,
        value: 17,
        label: '2 - 1',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_r2_o.mp3`,
        value: 18,
        label: '2 - 2',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_r3_o.mp3`,
        value: 19,
        label: '2 - 3',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_r4_o.mp3`,
        value: 20,
        label: '2 - 4',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_r1_o.mp3`,
        value: 21,
        label: '3 - 1',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_r2_o.mp3`,
        value: 22,
        label: '3 - 2',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_r3_o.mp3`,
        value: 23,
        label: '3 - 3',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_r4_o.mp3`,
        value: 24,
        label: '3 - 4',
        group: 'Omnidirectional measurements in the audience area'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_p1_o.mp3`,
        value: 25,
        label: '1 - 1',
        group: 'Omnidirectional measurements on the stage'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_p2_o.mp3`,
        value: 26,
        label: '1 - 2',
        group: 'Omnidirectional measurements on the stage'
      },
      {
        url: `${BASE_URL}/impulse-responses/s1_p3_o.mp3`,
        value: 27,
        label: '1 - 3',
        group: 'Omnidirectional measurements on the stage'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_p1_o.mp3`,
        value: 28,
        label: '2 - 1',
        group: 'Omnidirectional measurements on the stage'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_p2_o.mp3`,
        value: 29,
        label: '2 - 2',
        group: 'Omnidirectional measurements on the stage'
      },
      {
        url: `${BASE_URL}/impulse-responses/s2_p3_o.mp3`,
        value: 30,
        label: '2 - 3',
        group: 'Omnidirectional measurements on the stage'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_p1_o.mp3`,
        value: 31,
        label: '3 - 1',
        group: 'Omnidirectional measurements on the stage'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_p2_o.mp3`,
        value: 32,
        label: '3 - 2',
        group: 'Omnidirectional measurements on the stage'
      },
      {
        url: `${BASE_URL}/impulse-responses/s3_p3_o.mp3`,
        value: 33,
        label: '3 - 3',
        group: 'Omnidirectional measurements on the stage'
      }
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
    ],
    []
  );

  const getBufferIndexCallback = useCallback((pianoIndex: number) => {
    switch (Math.trunc((pianoIndex + 9) % 12)) {
      case 0:
      case 1:
        return 0;
      case 2:
      case 3:
        return 1;
      case 4:
        return 2;
      case 5:
      case 6:
        return 3;
      case 7:
      case 8:
        return 4;
      case 9:
      case 10:
        return 5;
      case 11:
        return 6;
      default:
        return -1;
    }
  }, []);

  const calculatePianoRateCallback = useCallback((pianoIndex: number) => {
    const sharps = [1, 4, 6, 9, 11, 13, 16, 18, 21, 23, 25, 28, 30, 33, 35, 37, 40, 42, 45, 47, 49, 52, 54, 57, 59, 61, 64, 66, 69, 71, 73, 76, 78, 81, 83, 85];
    const isSharp = sharps.includes(pianoIndex);

    let rate = 0;

    if (pianoIndex >= 0 && pianoIndex <= 2) {
      rate = 0.0625;
    } else if (pianoIndex >= 3 && pianoIndex <= 14) {
      rate = 0.125;
    } else if (pianoIndex >= 15 && pianoIndex <= 26) {
      rate = 0.25;
    } else if (pianoIndex >= 27 && pianoIndex <= 38) {
      rate = 0.5;
    } else if (pianoIndex >= 39 && pianoIndex <= 50) {
      rate = 1;
    } else if (pianoIndex >= 51 && pianoIndex <= 62) {
      rate = 2;
    } else if (pianoIndex >= 63 && pianoIndex <= 74) {
      rate = 4;
    } else if (pianoIndex >= 75 && pianoIndex <= 86) {
      rate = 8;
    } else if (pianoIndex >= 87 && pianoIndex <= 98) {
      rate = 16;
    }

    if (isSharp) {
      rate *= X.FREQUENCY_RATIO;
    }

    return rate;
  }, []);

  const calculateGuitarRateCallback = useCallback((guitarIndex: number) => {
    let rate = 0;

    switch (guitarIndex - NUMBER_OF_ONESHOTS) {
      case 0:
        rate = 1 * X.FREQUENCY_RATIO ** -39;
        break;
      case 1:
        rate = 1 * X.FREQUENCY_RATIO ** -38;
        break;
      case 2:
        rate = 1 * X.FREQUENCY_RATIO ** -37;
        break;
      case 3:
        rate = 1 * X.FREQUENCY_RATIO ** -36;
        break;
      case 4:
        rate = 1 * X.FREQUENCY_RATIO ** -35;
        break;
      case 5:
        rate = 1 * X.FREQUENCY_RATIO ** -34;
        break;
      case 6:
        rate = 1 * X.FREQUENCY_RATIO ** -33;
        break;
      case 7:
        rate = 1 * X.FREQUENCY_RATIO ** -32;
        break;
      case 8:
        rate = 1 * X.FREQUENCY_RATIO ** -31;
        break;
      case 9:
        rate = 1 * X.FREQUENCY_RATIO ** -30;
        break;
      case 10:
        rate = 1 * X.FREQUENCY_RATIO ** -29;
        break;
      case 11:
        rate = 1 * X.FREQUENCY_RATIO ** -28;
        break;
      case 12:
        rate = 1 * X.FREQUENCY_RATIO ** -27;
        break;
      case 13:
        rate = 1 * X.FREQUENCY_RATIO ** -26;
        break;
      case 14:
        rate = 1 * X.FREQUENCY_RATIO ** -25;
        break;
      case 15:
        rate = 1 * X.FREQUENCY_RATIO ** -24;
        break;
      case 16:
        rate = 1 * X.FREQUENCY_RATIO ** -23;
        break;
      case 17:
        rate = 1 * X.FREQUENCY_RATIO ** -22;
        break;
      case 18:
        rate = 1 * X.FREQUENCY_RATIO ** -21;
        break;
      case 19:
        rate = 1 * X.FREQUENCY_RATIO ** -20;
        break;
      case 20:
        rate = 1 * X.FREQUENCY_RATIO ** -19;
        break;
      case 21:
        rate = 1 * X.FREQUENCY_RATIO ** -18;
        break;
      case 22:
        rate = 1 * X.FREQUENCY_RATIO ** -17;
        break;
      case 23:
        rate = 1 * X.FREQUENCY_RATIO ** -16;
        break;
      case 24:
        rate = 1 * X.FREQUENCY_RATIO ** -15;
        break;
      case 25:
        rate = 1 * X.FREQUENCY_RATIO ** -14;
        break;
      case 26:
        rate = 1 * X.FREQUENCY_RATIO ** -13;
        break;
      case 27:
        rate = 1 * X.FREQUENCY_RATIO ** -12;
        break;
      case 28:
        rate = 1 * X.FREQUENCY_RATIO ** -11;
        break;
      case 29:
        rate = 1 * X.FREQUENCY_RATIO ** -10;
        break;
      case 30:
        rate = 1 * X.FREQUENCY_RATIO ** -9;
        break;
      case 31:
        rate = 1 * X.FREQUENCY_RATIO ** -8;
        break;
      case 32:
        rate = 1 * X.FREQUENCY_RATIO ** -7;
        break;
      case 33:
        rate = 1 * X.FREQUENCY_RATIO ** -6;
        break;
      case 34:
        rate = 1 * X.FREQUENCY_RATIO ** -5;
        break;
      case 35:
        rate = 1 * X.FREQUENCY_RATIO ** -4;
        break;
      case 36:
        rate = 1 * X.FREQUENCY_RATIO ** -3;
        break;
      case 37:
        rate = 1 * X.FREQUENCY_RATIO ** -2;
        break;
      case 38:
        rate = 1 * X.FREQUENCY_RATIO ** -1;
        break;
      case 39:
        rate = 1;
        break;
      case 40:
        rate = 1 * X.FREQUENCY_RATIO ** 1;
        break;
      case 41:
        rate = 1 * X.FREQUENCY_RATIO ** 2;
        break;
      case 42:
        rate = 1 * X.FREQUENCY_RATIO ** 3;
        break;
      case 43:
        rate = 1 * X.FREQUENCY_RATIO ** 4;
        break;
      case 44:
        rate = 1 * X.FREQUENCY_RATIO ** 5;
        break;
      case 45:
        rate = 1 * X.FREQUENCY_RATIO ** 6;
        break;
      case 46:
        rate = 1 * X.FREQUENCY_RATIO ** 7;
        break;
      case 47:
        rate = 1 * X.FREQUENCY_RATIO ** 8;
        break;
      case 48:
        rate = 1 * X.FREQUENCY_RATIO ** 9;
        break;
      case 49:
        rate = 1 * X.FREQUENCY_RATIO ** 10;
        break;
      case 50:
        rate = 1 * X.FREQUENCY_RATIO ** 11;
        break;
      case 51:
        rate = 1 * X.FREQUENCY_RATIO ** 12;
        break;
      case 52:
        rate = 1 * X.FREQUENCY_RATIO ** 13;
        break;
      case 53:
        rate = 1 * X.FREQUENCY_RATIO ** 14;
        break;
      case 54:
        rate = 1 * X.FREQUENCY_RATIO ** 15;
        break;
      case 55:
        rate = 1 * X.FREQUENCY_RATIO ** 16;
        break;
      case 56:
        rate = 1 * X.FREQUENCY_RATIO ** 17;
        break;
      case 57:
        rate = 1 * X.FREQUENCY_RATIO ** 18;
        break;
      case 58:
        rate = 1 * X.FREQUENCY_RATIO ** 19;
        break;
      case 59:
        rate = 1 * X.FREQUENCY_RATIO ** 20;
        break;
      case 60:
        rate = 1 * X.FREQUENCY_RATIO ** 21;
        break;
      case 61:
        rate = 1 * X.FREQUENCY_RATIO ** 22;
        break;
      case 62:
        rate = 1 * X.FREQUENCY_RATIO ** 23;
        break;
      case 63:
        rate = 1 * X.FREQUENCY_RATIO ** 24;
        break;
      case 64:
        rate = 1 * X.FREQUENCY_RATIO ** 25;
        break;
      case 65:
        rate = 1 * X.FREQUENCY_RATIO ** 26;
        break;
      case 66:
        rate = 1 * X.FREQUENCY_RATIO ** 27;
        break;
      case 67:
        rate = 1 * X.FREQUENCY_RATIO ** 28;
        break;
      case 68:
        rate = 1 * X.FREQUENCY_RATIO ** 29;
        break;
      case 69:
        rate = 1 * X.FREQUENCY_RATIO ** 30;
        break;
      case 70:
        rate = 1 * X.FREQUENCY_RATIO ** 31;
        break;
      case 71:
        rate = 1 * X.FREQUENCY_RATIO ** 33;
        break;
      case 77:
        rate = 1 * X.FREQUENCY_RATIO ** 34;
        break;
      case 78:
        rate = 1 * X.FREQUENCY_RATIO ** 35;
        break;
      case 79:
        rate = 1 * X.FREQUENCY_RATIO ** 36;
        break;
      case 80:
        rate = 1 * X.FREQUENCY_RATIO ** 37;
        break;
      case 81:
        rate = 1 * X.FREQUENCY_RATIO ** 38;
        break;
      case 82:
        rate = 1 * X.FREQUENCY_RATIO ** 39;
        break;
      case 83:
        rate = 1 * X.FREQUENCY_RATIO ** 40;
        break;
      case 84:
        rate = 1 * X.FREQUENCY_RATIO ** 41;
        break;
      case 85:
        rate = 1 * X.FREQUENCY_RATIO ** 42;
        break;
      case 86:
        rate = 1 * X.FREQUENCY_RATIO ** 43;
        break;
      case 87:
        rate = 1 * X.FREQUENCY_RATIO ** 44;
        break;
      case 88:
        rate = 1 * X.FREQUENCY_RATIO ** 45;
        break;
    }

    return rate;
  }, []);

  const calculateElectricGuitarRateCallback = useCallback((guitarIndex: number) => {
    let rate = 0;

    switch (guitarIndex - NUMBER_OF_ONESHOTS - NUMBER_OF_ONESHOTS) {
      case 0:
        rate = 1 * X.FREQUENCY_RATIO ** -39;
        break;
      case 1:
        rate = 1 * X.FREQUENCY_RATIO ** -38;
        break;
      case 2:
        rate = 1 * X.FREQUENCY_RATIO ** -37;
        break;
      case 3:
        rate = 1 * X.FREQUENCY_RATIO ** -36;
        break;
      case 4:
        rate = 1 * X.FREQUENCY_RATIO ** -35;
        break;
      case 5:
        rate = 1 * X.FREQUENCY_RATIO ** -34;
        break;
      case 6:
        rate = 1 * X.FREQUENCY_RATIO ** -33;
        break;
      case 7:
        rate = 1 * X.FREQUENCY_RATIO ** -32;
        break;
      case 8:
        rate = 1 * X.FREQUENCY_RATIO ** -31;
        break;
      case 9:
        rate = 1 * X.FREQUENCY_RATIO ** -30;
        break;
      case 10:
        rate = 1 * X.FREQUENCY_RATIO ** -29;
        break;
      case 11:
        rate = 1 * X.FREQUENCY_RATIO ** -28;
        break;
      case 12:
        rate = 1 * X.FREQUENCY_RATIO ** -27;
        break;
      case 13:
        rate = 1 * X.FREQUENCY_RATIO ** -26;
        break;
      case 14:
        rate = 1 * X.FREQUENCY_RATIO ** -25;
        break;
      case 15:
        rate = 1 * X.FREQUENCY_RATIO ** -24;
        break;
      case 16:
        rate = 1 * X.FREQUENCY_RATIO ** -23;
        break;
      case 17:
        rate = 1 * X.FREQUENCY_RATIO ** -22;
        break;
      case 18:
        rate = 1 * X.FREQUENCY_RATIO ** -21;
        break;
      case 19:
        rate = 1 * X.FREQUENCY_RATIO ** -20;
        break;
      case 20:
        rate = 1 * X.FREQUENCY_RATIO ** -19;
        break;
      case 21:
        rate = 1 * X.FREQUENCY_RATIO ** -18;
        break;
      case 22:
        rate = 1 * X.FREQUENCY_RATIO ** -17;
        break;
      case 23:
        rate = 1 * X.FREQUENCY_RATIO ** -16;
        break;
      case 24:
        rate = 1 * X.FREQUENCY_RATIO ** -15;
        break;
      case 25:
        rate = 1 * X.FREQUENCY_RATIO ** -14;
        break;
      case 26:
        rate = 1 * X.FREQUENCY_RATIO ** -13;
        break;
      case 27:
        rate = 1 * X.FREQUENCY_RATIO ** -12;
        break;
      case 28:
        rate = 1 * X.FREQUENCY_RATIO ** -11;
        break;
      case 29:
        rate = 1 * X.FREQUENCY_RATIO ** -10;
        break;
      case 30:
        rate = 1 * X.FREQUENCY_RATIO ** -9;
        break;
      case 31:
        rate = 1 * X.FREQUENCY_RATIO ** -8;
        break;
      case 32:
        rate = 1 * X.FREQUENCY_RATIO ** -7;
        break;
      case 33:
        rate = 1 * X.FREQUENCY_RATIO ** -6;
        break;
      case 34:
        rate = 1 * X.FREQUENCY_RATIO ** -5;
        break;
      case 35:
        rate = 1 * X.FREQUENCY_RATIO ** -4;
        break;
      case 36:
        rate = 1 * X.FREQUENCY_RATIO ** -3;
        break;
      case 37:
        rate = 1 * X.FREQUENCY_RATIO ** -2;
        break;
      case 38:
        rate = 1 * X.FREQUENCY_RATIO ** -1;
        break;
      case 39:
        rate = 1;
        break;
      case 40:
        rate = 1 * X.FREQUENCY_RATIO ** 1;
        break;
      case 41:
        rate = 1 * X.FREQUENCY_RATIO ** 2;
        break;
      case 42:
        rate = 1 * X.FREQUENCY_RATIO ** 3;
        break;
      case 43:
        rate = 1 * X.FREQUENCY_RATIO ** 4;
        break;
      case 44:
        rate = 1 * X.FREQUENCY_RATIO ** 5;
        break;
      case 45:
        rate = 1 * X.FREQUENCY_RATIO ** 6;
        break;
      case 46:
        rate = 1 * X.FREQUENCY_RATIO ** 7;
        break;
      case 47:
        rate = 1 * X.FREQUENCY_RATIO ** 8;
        break;
      case 48:
        rate = 1 * X.FREQUENCY_RATIO ** 9;
        break;
      case 49:
        rate = 1 * X.FREQUENCY_RATIO ** 10;
        break;
      case 50:
        rate = 1 * X.FREQUENCY_RATIO ** 11;
        break;
      case 51:
        rate = 1 * X.FREQUENCY_RATIO ** 12;
        break;
      case 52:
        rate = 1 * X.FREQUENCY_RATIO ** 13;
        break;
      case 53:
        rate = 1 * X.FREQUENCY_RATIO ** 14;
        break;
      case 54:
        rate = 1 * X.FREQUENCY_RATIO ** 15;
        break;
      case 55:
        rate = 1 * X.FREQUENCY_RATIO ** 16;
        break;
      case 56:
        rate = 1 * X.FREQUENCY_RATIO ** 17;
        break;
      case 57:
        rate = 1 * X.FREQUENCY_RATIO ** 18;
        break;
      case 58:
        rate = 1 * X.FREQUENCY_RATIO ** 19;
        break;
      case 59:
        rate = 1 * X.FREQUENCY_RATIO ** 20;
        break;
      case 60:
        rate = 1 * X.FREQUENCY_RATIO ** 21;
        break;
      case 61:
        rate = 1 * X.FREQUENCY_RATIO ** 22;
        break;
      case 62:
        rate = 1 * X.FREQUENCY_RATIO ** 23;
        break;
      case 63:
        rate = 1 * X.FREQUENCY_RATIO ** 24;
        break;
      case 64:
        rate = 1 * X.FREQUENCY_RATIO ** 25;
        break;
      case 65:
        rate = 1 * X.FREQUENCY_RATIO ** 26;
        break;
      case 66:
        rate = 1 * X.FREQUENCY_RATIO ** 27;
        break;
      case 67:
        rate = 1 * X.FREQUENCY_RATIO ** 28;
        break;
      case 68:
        rate = 1 * X.FREQUENCY_RATIO ** 29;
        break;
      case 69:
        rate = 1 * X.FREQUENCY_RATIO ** 30;
        break;
      case 70:
        rate = 1 * X.FREQUENCY_RATIO ** 31;
        break;
      case 71:
        rate = 1 * X.FREQUENCY_RATIO ** 33;
        break;
      case 77:
        rate = 1 * X.FREQUENCY_RATIO ** 34;
        break;
      case 78:
        rate = 1 * X.FREQUENCY_RATIO ** 35;
        break;
      case 79:
        rate = 1 * X.FREQUENCY_RATIO ** 36;
        break;
      case 80:
        rate = 1 * X.FREQUENCY_RATIO ** 37;
        break;
      case 81:
        rate = 1 * X.FREQUENCY_RATIO ** 38;
        break;
      case 82:
        rate = 1 * X.FREQUENCY_RATIO ** 39;
        break;
      case 83:
        rate = 1 * X.FREQUENCY_RATIO ** 40;
        break;
      case 84:
        rate = 1 * X.FREQUENCY_RATIO ** 41;
        break;
      case 85:
        rate = 1 * X.FREQUENCY_RATIO ** 42;
        break;
      case 86:
        rate = 1 * X.FREQUENCY_RATIO ** 43;
        break;
      case 87:
        rate = 1 * X.FREQUENCY_RATIO ** 44;
        break;
      case 88:
        rate = 1 * X.FREQUENCY_RATIO ** 45;
        break;
    }

    return rate;
  }, []);

  const calculateOrgelRateCallback = useCallback((orgelIndex: number) => {
    let rate = 0;

    switch (orgelIndex - NUMBER_OF_ONESHOTS - NUMBER_OF_ONESHOTS - NUMBER_OF_ONESHOTS) {
      case 0:
        rate = 1 * X.FREQUENCY_RATIO ** -39;
        break;
      case 1:
        rate = 1 * X.FREQUENCY_RATIO ** -38;
        break;
      case 2:
        rate = 1 * X.FREQUENCY_RATIO ** -37;
        break;
      case 3:
        rate = 1 * X.FREQUENCY_RATIO ** -36;
        break;
      case 4:
        rate = 1 * X.FREQUENCY_RATIO ** -35;
        break;
      case 5:
        rate = 1 * X.FREQUENCY_RATIO ** -34;
        break;
      case 6:
        rate = 1 * X.FREQUENCY_RATIO ** -33;
        break;
      case 7:
        rate = 1 * X.FREQUENCY_RATIO ** -32;
        break;
      case 8:
        rate = 1 * X.FREQUENCY_RATIO ** -31;
        break;
      case 9:
        rate = 1 * X.FREQUENCY_RATIO ** -30;
        break;
      case 10:
        rate = 1 * X.FREQUENCY_RATIO ** -29;
        break;
      case 11:
        rate = 1 * X.FREQUENCY_RATIO ** -28;
        break;
      case 12:
        rate = 1 * X.FREQUENCY_RATIO ** -27;
        break;
      case 13:
        rate = 1 * X.FREQUENCY_RATIO ** -26;
        break;
      case 14:
        rate = 1 * X.FREQUENCY_RATIO ** -25;
        break;
      case 15:
        rate = 1 * X.FREQUENCY_RATIO ** -24;
        break;
      case 16:
        rate = 1 * X.FREQUENCY_RATIO ** -23;
        break;
      case 17:
        rate = 1 * X.FREQUENCY_RATIO ** -22;
        break;
      case 18:
        rate = 1 * X.FREQUENCY_RATIO ** -21;
        break;
      case 19:
        rate = 1 * X.FREQUENCY_RATIO ** -20;
        break;
      case 20:
        rate = 1 * X.FREQUENCY_RATIO ** -19;
        break;
      case 21:
        rate = 1 * X.FREQUENCY_RATIO ** -18;
        break;
      case 22:
        rate = 1 * X.FREQUENCY_RATIO ** -17;
        break;
      case 23:
        rate = 1 * X.FREQUENCY_RATIO ** -16;
        break;
      case 24:
        rate = 1 * X.FREQUENCY_RATIO ** -15;
        break;
      case 25:
        rate = 1 * X.FREQUENCY_RATIO ** -14;
        break;
      case 26:
        rate = 1 * X.FREQUENCY_RATIO ** -13;
        break;
      case 27:
        rate = 1 * X.FREQUENCY_RATIO ** -12;
        break;
      case 28:
        rate = 1 * X.FREQUENCY_RATIO ** -11;
        break;
      case 29:
        rate = 1 * X.FREQUENCY_RATIO ** -10;
        break;
      case 30:
        rate = 1 * X.FREQUENCY_RATIO ** -9;
        break;
      case 31:
        rate = 1 * X.FREQUENCY_RATIO ** -8;
        break;
      case 32:
        rate = 1 * X.FREQUENCY_RATIO ** -7;
        break;
      case 33:
        rate = 1 * X.FREQUENCY_RATIO ** -6;
        break;
      case 34:
        rate = 1 * X.FREQUENCY_RATIO ** -5;
        break;
      case 35:
        rate = 1 * X.FREQUENCY_RATIO ** -4;
        break;
      case 36:
        rate = 1 * X.FREQUENCY_RATIO ** -3;
        break;
      case 37:
        rate = 1 * X.FREQUENCY_RATIO ** -2;
        break;
      case 38:
        rate = 1 * X.FREQUENCY_RATIO ** -1;
        break;
      case 39:
        rate = 1;
        break;
      case 40:
        rate = 1 * X.FREQUENCY_RATIO ** 1;
        break;
      case 41:
        rate = 1 * X.FREQUENCY_RATIO ** 2;
        break;
      case 42:
        rate = 1 * X.FREQUENCY_RATIO ** 3;
        break;
      case 43:
        rate = 1 * X.FREQUENCY_RATIO ** 4;
        break;
      case 44:
        rate = 1 * X.FREQUENCY_RATIO ** 5;
        break;
      case 45:
        rate = 1 * X.FREQUENCY_RATIO ** 6;
        break;
      case 46:
        rate = 1 * X.FREQUENCY_RATIO ** 7;
        break;
      case 47:
        rate = 1 * X.FREQUENCY_RATIO ** 8;
        break;
      case 48:
        rate = 1 * X.FREQUENCY_RATIO ** 9;
        break;
      case 49:
        rate = 1 * X.FREQUENCY_RATIO ** 10;
        break;
      case 50:
        rate = 1 * X.FREQUENCY_RATIO ** 11;
        break;
      case 51:
        rate = 1 * X.FREQUENCY_RATIO ** 12;
        break;
      case 52:
        rate = 1 * X.FREQUENCY_RATIO ** 13;
        break;
      case 53:
        rate = 1 * X.FREQUENCY_RATIO ** 14;
        break;
      case 54:
        rate = 1 * X.FREQUENCY_RATIO ** 15;
        break;
      case 55:
        rate = 1 * X.FREQUENCY_RATIO ** 16;
        break;
      case 56:
        rate = 1 * X.FREQUENCY_RATIO ** 17;
        break;
      case 57:
        rate = 1 * X.FREQUENCY_RATIO ** 18;
        break;
      case 58:
        rate = 1 * X.FREQUENCY_RATIO ** 19;
        break;
      case 59:
        rate = 1 * X.FREQUENCY_RATIO ** 20;
        break;
      case 60:
        rate = 1 * X.FREQUENCY_RATIO ** 21;
        break;
      case 61:
        rate = 1 * X.FREQUENCY_RATIO ** 22;
        break;
      case 62:
        rate = 1 * X.FREQUENCY_RATIO ** 23;
        break;
      case 63:
        rate = 1 * X.FREQUENCY_RATIO ** 24;
        break;
      case 64:
        rate = 1 * X.FREQUENCY_RATIO ** 25;
        break;
      case 65:
        rate = 1 * X.FREQUENCY_RATIO ** 26;
        break;
      case 66:
        rate = 1 * X.FREQUENCY_RATIO ** 27;
        break;
      case 67:
        rate = 1 * X.FREQUENCY_RATIO ** 28;
        break;
      case 68:
        rate = 1 * X.FREQUENCY_RATIO ** 29;
        break;
      case 69:
        rate = 1 * X.FREQUENCY_RATIO ** 30;
        break;
      case 70:
        rate = 1 * X.FREQUENCY_RATIO ** 31;
        break;
      case 71:
        rate = 1 * X.FREQUENCY_RATIO ** 33;
        break;
      case 77:
        rate = 1 * X.FREQUENCY_RATIO ** 34;
        break;
      case 78:
        rate = 1 * X.FREQUENCY_RATIO ** 35;
        break;
      case 79:
        rate = 1 * X.FREQUENCY_RATIO ** 36;
        break;
      case 80:
        rate = 1 * X.FREQUENCY_RATIO ** 37;
        break;
      case 81:
        rate = 1 * X.FREQUENCY_RATIO ** 38;
        break;
      case 82:
        rate = 1 * X.FREQUENCY_RATIO ** 39;
        break;
      case 83:
        rate = 1 * X.FREQUENCY_RATIO ** 40;
        break;
      case 84:
        rate = 1 * X.FREQUENCY_RATIO ** 41;
        break;
      case 85:
        rate = 1 * X.FREQUENCY_RATIO ** 42;
        break;
      case 86:
        rate = 1 * X.FREQUENCY_RATIO ** 43;
        break;
      case 87:
        rate = 1 * X.FREQUENCY_RATIO ** 44;
        break;
      case 88:
        rate = 1 * X.FREQUENCY_RATIO ** 45;
        break;
    }

    return rate;
  }, []);

  const createOneshotSettingsCallback = useCallback(() => {
    const settings: OneshotSettings = [];

    for (let i = 0; i < NUMBER_OF_ONESHOTS; i++) {
      const setting: OneshotSetting = {
        bufferIndex: 0,
        playbackRate: 1,
        loop: false,
        loopStart: 0,
        loopEnd: 0,
        volume: 1
      };

      setting.bufferIndex = getBufferIndexCallback(i);
      setting.playbackRate = calculatePianoRateCallback(i);

      settings[i] = setting;
    }

    for (let i = NUMBER_OF_ONESHOTS; i < 2 * NUMBER_OF_ONESHOTS; i++) {
      const setting: OneshotSetting = {
        bufferIndex: 7,
        playbackRate: 1,
        loop: false,
        loopStart: 0,
        loopEnd: 0,
        volume: 1
      };

      setting.playbackRate = calculateGuitarRateCallback(i);

      settings[i] = setting;
    }

    for (let i = 2 * NUMBER_OF_ONESHOTS; i < 3 * NUMBER_OF_ONESHOTS; i++) {
      const setting: OneshotSetting = {
        bufferIndex: 8,
        playbackRate: 1,
        loop: false,
        loopStart: 0,
        loopEnd: 0,
        volume: 1
      };

      setting.playbackRate = calculateElectricGuitarRateCallback(i);

      settings[i] = setting;
    }

    for (let i = 3 * NUMBER_OF_ONESHOTS; i < 4 * NUMBER_OF_ONESHOTS; i++) {
      const setting: OneshotSetting = {
        bufferIndex: 9,
        playbackRate: 1,
        loop: false,
        loopStart: 0,
        loopEnd: 0,
        volume: 1
      };

      setting.playbackRate = calculateOrgelRateCallback(i);

      settings[i] = setting;
    }

    return settings;
  }, [getBufferIndexCallback, calculatePianoRateCallback, calculateGuitarRateCallback, calculateElectricGuitarRateCallback, calculateOrgelRateCallback]);

  const onCloseModalForAjaxCallback = useCallback(() => {
    setErrorMessage('');
    setIsShowModalForAjax(false);
  }, []);

  const onCloseModalForDecodingCallback = useCallback(() => {
    setErrorMessage('');
    setIsShowModalForDecoding(false);
  }, []);

  const onClickSetupCallback = useCallback(() => {
    const clonedX = X.clone();

    // Not used
    X.free([X('media')]);

    clonedX.free([clonedX('oneshot'), clonedX('audio'), clonedX('media'), clonedX('stream'), clonedX('mixer'), clonedX('midi')]);

    // If use noise suppressor by `AudioWorkletProcessor`, cannot play one-shot audio on the way
    X('oneshot').edit([
      X('oneshot').module('compressor'),
      X('oneshot').module('wah'),
      X('oneshot').module('overdrive'),
      X('oneshot').module('fuzz'),
      X('oneshot').module('preamp'),
      X('oneshot').module('equalizer'),
      X('oneshot').module('filter'),
      X('oneshot').module('tremolo'),
      X('oneshot').module('ringmodulator'),
      X('oneshot').module('phaser'),
      X('oneshot').module('chorus'),
      X('oneshot').module('flanger'),
      X('oneshot').module('delay'),
      X('oneshot').module('reverb')
    ]);

    X('mixer').edit([
      X('mixer').module('compressor'),
      X('mixer').module('wah'),
      X('mixer').module('overdrive'),
      X('mixer').module('fuzz'),
      X('mixer').module('preamp'),
      X('mixer').module('equalizer'),
      X('mixer').module('filter'),
      X('mixer').module('noisesuppressor'),
      X('mixer').module('tremolo'),
      X('mixer').module('ringmodulator'),
      X('mixer').module('phaser'),
      X('mixer').module('chorus'),
      X('mixer').module('flanger'),
      X('mixer').module('delay'),
      X('mixer').module('reverb')
    ]);

    X('audio').edit([
      X('audio').module('pitchshifter'),
      X('audio').module('compressor'),
      X('audio').module('wah'),
      X('audio').module('overdrive'),
      X('audio').module('fuzz'),
      X('audio').module('preamp'),
      X('audio').module('filter'),
      X('audio').module('noisesuppressor'),
      X('audio').module('tremolo'),
      X('audio').module('ringmodulator'),
      X('audio').module('phaser'),
      X('audio').module('chorus'),
      X('audio').module('flanger'),
      X('audio').module('delay'),
      X('audio').module('reverb'),
      X('audio').module('vocalcanceler')
    ]);

    X('stream').edit([
      X('stream').module('pitchshifter'),
      X('stream').module('compressor'),
      X('stream').module('wah'),
      X('stream').module('overdrive'),
      X('stream').module('fuzz'),
      X('stream').module('preamp'),
      X('stream').module('equalizer'),
      X('stream').module('filter'),
      X('stream').module('noisesuppressor'),
      X('stream').module('tremolo'),
      X('stream').module('ringmodulator'),
      X('stream').module('phaser'),
      X('stream').module('chorus'),
      X('stream').module('flanger'),
      X('stream').module('delay'),
      X('stream').module('reverb')
    ]);

    X('noise').edit([
      X('noise').module('compressor'),
      X('noise').module('wah'),
      X('noise').module('overdrive'),
      X('noise').module('fuzz'),
      X('noise').module('preamp'),
      X('noise').module('equalizer'),
      X('noise').module('filter'),
      X('noise').module('noisesuppressor'),
      X('noise').module('tremolo'),
      X('noise').module('ringmodulator'),
      X('noise').module('phaser'),
      X('noise').module('chorus'),
      X('noise').module('flanger'),
      X('noise').module('delay'),
      X('noise').module('reverb')
    ]);

    X('oscillator').edit([
      X('oscillator').module('compressor'),
      X('oscillator').module('wah'),
      X('oscillator').module('overdrive'),
      X('oscillator').module('fuzz'),
      X('oscillator').module('preamp'),
      X('oscillator').module('equalizer'),
      X('oscillator').module('filter'),
      X('oscillator').module('noisesuppressor'),
      X('oscillator').module('tremolo'),
      X('oscillator').module('ringmodulator'),
      X('oscillator').module('phaser'),
      X('oscillator').module('chorus'),
      X('oscillator').module('flanger'),
      X('oscillator').module('delay'),
      X('oscillator').module('reverb')
    ]);

    clonedX('oscillator').edit([
      X('oscillator').module('compressor'),
      X('oscillator').module('wah'),
      X('oscillator').module('overdrive'),
      X('oscillator').module('fuzz'),
      X('oscillator').module('preamp'),
      X('oscillator').module('equalizer'),
      X('oscillator').module('filter'),
      X('oscillator').module('noisesuppressor'),
      X('oscillator').module('tremolo'),
      X('oscillator').module('ringmodulator'),
      X('oscillator').module('phaser'),
      X('oscillator').module('chorus'),
      X('oscillator').module('flanger'),
      X('oscillator').module('delay'),
      X('oscillator').module('reverb')
    ]);

    X('oscillator').setup([true, false, false, false]);
    clonedX('oscillator').setup([false, false, false, false]);

    X('audio').module('wah').param({ auto: true });
    X('audio').module('pitchshifter').activate();

    X('stream').module('pitchshifter').activate();

    const constraints: MediaStreamConstraints = {
      audio: {
        echoCancellation: true
      },
      video: false
    };

    const preampParams: PreampParams = {
      samples: 2048,
      pre: { state: true, gain: 0.5, lead: 0.5 },
      post: { state: true }
    };

    X('stream').setup(constraints);

    X('mixer').module('preamp').param(preampParams);
    X('mixer').module('chorus').param({ tone: 4000 });
    X('mixer').module('flanger').param({ tone: 4000 });
    X('mixer').module('delay').param({ tone: 4000 });
    X('mixer').module('reverb').param({ tone: 4000 });
    X('mixer').module('filter').param({ frequency: 8000 });
    X('mixer').module('noisesuppressor').deactivate();

    X('oneshot').module('preamp').param(preampParams);
    X('oneshot').module('chorus').param({ tone: 4000 });
    X('oneshot').module('flanger').param({ tone: 4000 });
    X('oneshot').module('delay').param({ tone: 4000 });
    X('oneshot').module('reverb').param({ tone: 4000 });
    X('oneshot').module('filter').param({ frequency: 8000 });

    X('audio').module('preamp').param(preampParams);
    X('audio').module('chorus').param({ tone: 4000 });
    X('audio').module('flanger').param({ tone: 4000 });
    X('audio').module('delay').param({ tone: 4000 });
    X('audio').module('reverb').param({ tone: 4000 });
    X('audio').module('filter').param({ frequency: 8000 });
    X('audio').module('noisesuppressor').deactivate();

    X('stream').module('preamp').param(preampParams);
    X('stream').module('chorus').param({ tone: 4000 });
    X('stream').module('flanger').param({ tone: 4000 });
    X('stream').module('delay').param({ tone: 4000 });
    X('stream').module('reverb').param({ tone: 4000 });
    X('stream').module('filter').param({ frequency: 8000 });
    X('stream').module('noisesuppressor').deactivate();

    X('noise').module('preamp').param(preampParams);
    X('noise').module('chorus').param({ tone: 4000 });
    X('noise').module('flanger').param({ tone: 4000 });
    X('noise').module('delay').param({ tone: 4000 });
    X('noise').module('reverb').param({ tone: 4000 });
    X('noise').module('filter').param({ frequency: 8000 });
    X('noise').module('noisesuppressor').deactivate();

    X('oscillator').module('preamp').param(preampParams);
    X('oscillator').module('chorus').param({ tone: 4000 });
    X('oscillator').module('flanger').param({ tone: 4000 });
    X('oscillator').module('delay').param({ tone: 4000 });
    X('oscillator').module('reverb').param({ tone: 4000 });
    X('oscillator').module('filter').param({ frequency: 8000 });
    X('oscillator').module('noisesuppressor').deactivate();

    clonedX('oscillator').module('preamp').param(preampParams);
    clonedX('oscillator').module('chorus').param({ tone: 4000 });
    clonedX('oscillator').module('flanger').param({ tone: 4000 });
    clonedX('oscillator').module('delay').param({ tone: 4000 });
    clonedX('oscillator').module('reverb').param({ tone: 4000 });
    clonedX('oscillator').module('filter').param({ frequency: 8000 });
    clonedX('oscillator').module('noisesuppressor').deactivate();

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      X('oscillator').get(i).param({ type: 'sawtooth' });
      clonedX('oscillator').get(i).param({ type: 'sawtooth' });
    }

    X('stream').clearAudioDevices();

    // Load one-shot audio files
    X('oneshot').setup({
      resources: oneshots,
      settings: createOneshotSettingsCallback(),
      timeout: AJAX_TIMEOUT,
      successCallback: () => {
        // Next, Load RIRs
        if (rirDescriptors.length !== 0) {
          // Load impulse responses
          const rirs: AudioBuffer[] = [];

          rirDescriptors.forEach((rirDescriptor: RIRDescriptor) => {
            X.ajax({
              url: rirDescriptor.url,
              type: 'arraybuffer',
              timeout: AJAX_TIMEOUT,
              successCallback: (_: ProgressEvent, arrayBuffer: ArrayBuffer) => {
                X.decode(
                  X.get(),
                  arrayBuffer,
                  (audioBuffer: AudioBuffer) => {
                    rirs.push(audioBuffer);

                    const rate = Math.trunc((rirs.length / rirDescriptors.length) * 100);

                    if (rirs.length === rirDescriptors.length) {
                      setRate(100);
                      setProgress(false);
                      setLoadedApp(true);
                    } else {
                      X('mixer').module('reverb').preset({ rirs });
                      X('oneshot').module('reverb').preset({ rirs });
                      X('audio').module('reverb').preset({ rirs });
                      X('stream').module('reverb').preset({ rirs });
                      X('noise').module('reverb').preset({ rirs });
                      X('oscillator').module('reverb').preset({ rirs });
                      clonedX('oscillator').module('reverb').preset({ rirs });

                      setRate(rate);
                      setProgress(true);
                    }
                  },
                  () => {
                    setErrorMessage('Decode error.');
                    setIsShowModalForAjax(true);
                  }
                );
              },
              errorCallback: () => {
                setErrorMessage('The loading of RIRs failed.');
                setIsShowModalForAjax(true);
              }
            });
          });
        }
      },
      errorCallback: () => {
        setErrorMessage('The loading of audio files failed.');
        setIsShowModalForAjax(true);
      }
    });

    X('mixer').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);
    X('oneshot').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);
    X('audio').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);
    X('stream').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);
    X('noise').module('recorder').setup(NUMBER_OF_CHANNELS, NUMBER_OF_TRACKS);

    window.X = X;
    window.clonedXSound = clonedX;
  }, [oneshots, rirDescriptors, createOneshotSettingsCallback]);

  return (
    <React.Fragment>
      <Header loadedApp={loadedApp} progress={progress} rate={rate} onClickSetupCallback={onClickSetupCallback} />
      <main>
        <Flexbox>
          <VerticalBox numberOfDivisions={5}>
            <OscillatorFieldset oscillatorNumber={0} label='Oscillator - 1' radioName='oscillator-type-0' />
          </VerticalBox>
          <VerticalBox numberOfDivisions={5}>
            <OscillatorFieldset oscillatorNumber={1} label='Oscillator - 2' radioName='oscillator-type-1' />
          </VerticalBox>
          <VerticalBox numberOfDivisions={5}>
            <EnvelopeGeneratorFieldset />
          </VerticalBox>
          <VerticalBox numberOfDivisions={5}>
            <RecorderFieldset loadedApp={loadedApp} />
          </VerticalBox>
          <VerticalBox numberOfDivisions={5}>
            <AudioFieldset loadedApp={loadedApp} />
          </VerticalBox>
        </Flexbox>
        <Analyser loadedApp={loadedApp} />
        <MML loadedApp={loadedApp} currentSoundSource={currentSoundSource} />
        <BasicControllers currentSoundSource={currentSoundSource} />
        <Piano loadedApp={loadedApp} currentSoundSource={currentSoundSource} />
        <Flexbox>
          <VerticalBox numberOfDivisions={6}>
            <CompressorFieldset />
            <WahFieldset />
          </VerticalBox>
          <VerticalBox numberOfDivisions={6}>
            <BoosterFieldset />
            <PreampFieldset />
          </VerticalBox>
          <VerticalBox numberOfDivisions={6}>
            <FilterFieldset />
            <NoiseSuppressorFieldset />
          </VerticalBox>
          <VerticalBox numberOfDivisions={6}>
            <TremoloFieldset />
            <RingModulatorFieldset />
            <PhaserFieldset />
          </VerticalBox>
          <VerticalBox numberOfDivisions={6}>
            <ChorusFieldset />
            <FlangerFieldset />
          </VerticalBox>
          <VerticalBox numberOfDivisions={6}>
            <DelayFieldset />
            <ReverbFieldset rirDescriptors={rirDescriptors} />
          </VerticalBox>
        </Flexbox>
      </main>
      <Footer />
      <Modal isShow={isShowModalForAjax} title='Error' hasOverlay={true} asAlert={true} onClose={onCloseModalForAjaxCallback}>
        {errorMessage}
      </Modal>
      <Modal isShow={isShowModalForDecoding} title='Error' hasOverlay={true} asAlert={true} onClose={onCloseModalForDecodingCallback}>
        {errorMessage}
      </Modal>
    </React.Fragment>
  );
};
