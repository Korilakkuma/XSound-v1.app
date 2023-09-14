import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { X } from 'xsound';

import { NUMBER_OF_PIANO_KEYBOARDS } from '/src/config';

import type { RootState } from '/src/store';
import type { SoundSource } from '/src/types';

export type Props = {
  loadedApp: boolean;
  currentSoundSource: SoundSource;
};

export const Piano: React.FC<Props> = ({ loadedApp, currentSoundSource }) => {
  const [downKeyboards, setDownKeyboards] = useState<boolean[]>(new Array(NUMBER_OF_PIANO_KEYBOARDS).fill(false));
  const [isDown, setIsDown] = useState<boolean>(false); // for `mouseover` or `touchmove` event

  const downMelodyIndexes = useSelector((state: RootState) => state.downMelodyKeyboardIndexes);
  const downBassIndexes = useSelector((state: RootState) => state.downBassKeyboardIndexes);
  const upMelodyIndexes = useSelector((state: RootState) => state.upMelodyKeyboardIndexes);
  const upBassIndexes = useSelector((state: RootState) => state.upBassKeyboardIndexes);
  const activeMIDIIndexes = useSelector((state: RootState) => state.activeMIDIKeyboardIndexes);

  const startSoundCallback = useCallback(
    (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
        | React.FocusEvent<HTMLButtonElement>
    ) => {
      if (event.currentTarget.classList.contains('skip')) {
        return; // skip
      }

      if ('code' in event.nativeEvent && event.nativeEvent.code === 'Enter') {
        return;
      }

      if ('keyCode' in event.nativeEvent && event.nativeEvent.keyCode === 13) {
        return;
      }

      const dataIndex = event.currentTarget.getAttribute('data-index');

      if (dataIndex === null) {
        return;
      }

      const index = Number(dataIndex);

      if ((event.type === 'mouseover' || event.type === 'touchmove') && !isDown) {
        return;
      }

      switch (currentSoundSource) {
        case 'oscillator':
          X('oscillator')
            .ready(0, 0)
            .start(X.toFrequencies([index, -1, -1, -1]));
          window
            .clonedXSound('oscillator')
            .ready(0, 0)
            .start(X.toFrequencies([index, -1, -1, -1]));

          X('mixer').start([X('oscillator'), window.clonedXSound('oscillator')], [1, 1]);
          X('mixer').module('recorder').start();
          break;
        case 'piano':
          X('oneshot').ready(0, 0).start([index]);
          X('oneshot').module('recorder').start();
          break;
        case 'guitar':
          X('oneshot')
            .ready(0, 0)
            .start([index + NUMBER_OF_PIANO_KEYBOARDS]);
          X('oneshot').module('recorder').start();
          break;
        case 'electric-guitar':
          X('oneshot')
            .ready(0, 0)
            .start([index + NUMBER_OF_PIANO_KEYBOARDS + NUMBER_OF_PIANO_KEYBOARDS]);
          X('oneshot').module('recorder').start();
          break;
        case 'orgel':
          X('oneshot')
            .ready(0, 0)
            .start([index + NUMBER_OF_PIANO_KEYBOARDS + NUMBER_OF_PIANO_KEYBOARDS + NUMBER_OF_PIANO_KEYBOARDS]);
          X('oneshot').module('recorder').start();
          break;
        case 'whitenoise':
          X('noise').param({ type: 'whitenoise' }).start();
          X('noise').module('recorder').start();
          break;
        case 'pinknoise':
          X('noise').param({ type: 'pinknoise' }).start();
          X('noise').module('recorder').start();
          break;
        case 'browniannoise':
          X('noise').param({ type: 'browniannoise' }).start();
          X('noise').module('recorder').start();
          break;
        default:
          // eslint-disable-next-line no-console
          console.assert(`Error: currentSoundSource = ${currentSoundSource}`);
          break;
      }

      downKeyboards[index] = true;

      setDownKeyboards([...downKeyboards]);
      setIsDown(true);
    },
    [currentSoundSource, downKeyboards, isDown]
  );

  const stopSoundCallback = useCallback(
    (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
        | React.FocusEvent<HTMLButtonElement>
    ) => {
      if (event.currentTarget.classList.contains('skip')) {
        return; // skip
      }

      if ('code' in event.nativeEvent && event.nativeEvent.code === 'Enter') {
        return;
      }

      if ('keyCode' in event.nativeEvent && event.nativeEvent.keyCode === 13) {
        return;
      }

      event.stopPropagation();

      const dataIndex = event.currentTarget.getAttribute('data-index');

      if (dataIndex === null) {
        return;
      }

      const index = Number(dataIndex);

      switch (currentSoundSource) {
        case 'oscillator':
          X('oscillator').stop();
          window.clonedXSound('oscillator').stop();

          break;
        case 'piano':
          // X('oneshot').stop([index]);
          break;
        case 'guitar':
          X('oneshot').stop([index + NUMBER_OF_PIANO_KEYBOARDS]);
          break;
        case 'electric-guitar':
          X('oneshot').stop([index + NUMBER_OF_PIANO_KEYBOARDS + NUMBER_OF_PIANO_KEYBOARDS]);
          break;
        case 'orgel':
          X('oneshot').stop([index + NUMBER_OF_PIANO_KEYBOARDS + NUMBER_OF_PIANO_KEYBOARDS + NUMBER_OF_PIANO_KEYBOARDS]);
          break;
        default:
          X('noise').stop();
          break;
      }

      downKeyboards[index] = false;

      setDownKeyboards([...downKeyboards]);

      if (event.type === 'mouseup' || event.type === 'touchend') {
        setIsDown(false);
      }
    },
    [currentSoundSource, downKeyboards]
  );

  const stopSoundOnOutsideOfKeyboardCallback = useCallback(() => {
    switch (currentSoundSource) {
      case 'oscillator':
        X('oscillator').stop();
        window.clonedXSound('oscillator').stop();
        break;
      default:
        X('noise').stop();
        break;
    }

    setDownKeyboards([...downKeyboards.map(() => false)]);
    setIsDown(false);
  }, [currentSoundSource, downKeyboards]);

  const indexMap: { [pitch: string]: number } = useMemo(
    () => ({
      'A-4': 0,
      'A-4h': 1,
      'B-4': 2,
      'C-3': 3,
      'C-3h': 4,
      'D-3': 5,
      'D-3h': 6,
      'E-3': 7,
      'F-3': 8,
      'F-3h': 9,
      'G-3': 10,
      'G-3h': 11,
      'A-3': 12,
      'A-3h': 13,
      'B-3': 14,
      'C-2': 15,
      'C-2h': 16,
      'D-2': 17,
      'D-2h': 18,
      'E-2': 19,
      'F-2': 20,
      'F-2h': 21,
      'G-2': 22,
      'G-2h': 23,
      'A-2': 24,
      'A-2h': 25,
      'B-2': 26,
      'C-1': 27,
      'C-1h': 28,
      'D-1': 29,
      'D-1h': 30,
      'E-1': 31,
      'F-1': 32,
      'F-1h': 33,
      'G-1': 34,
      'G-1h': 35,
      'A-1': 36,
      'A-1h': 37,
      'B-1': 38,
      C: 39,
      Ch: 40,
      D: 41,
      Dh: 42,
      E: 43,
      F: 44,
      Fh: 45,
      G: 46,
      Gh: 47,
      A: 48,
      Ah: 49,
      B: 50,
      C1: 51,
      C1h: 52,
      D1: 53,
      D1h: 54,
      E1: 55,
      F1: 56,
      F1h: 57,
      G1: 58,
      G1h: 59,
      A1: 60,
      A1h: 61,
      B1: 62,
      C2: 63,
      C2h: 64,
      D2: 65,
      D2h: 66,
      E2: 67,
      F2: 68,
      F2h: 69,
      G2: 70,
      G2h: 71,
      A2: 72,
      A2h: 73,
      B2: 74,
      C3: 75,
      C3h: 76,
      D3: 77,
      D3h: 78,
      E3: 79,
      F3: 80,
      F3h: 81,
      G3: 82,
      G3h: 83,
      A3: 84,
      A3h: 85,
      B3: 86,
      C4: 87
    }),
    []
  );

  const whites = useMemo(
    () => [
      'A-4',
      'B-4',
      'C-3',
      'D-3',
      'E-3',
      'F-3',
      'G-3',
      'A-3',
      'B-3',
      'C-2',
      'D-2',
      'E-2',
      'F-2',
      'G-2',
      'A-2',
      'B-2',
      'C-1',
      'D-1',
      'E-1',
      'F-1',
      'G-1',
      'A-1',
      'B-1',
      'C',
      'D',
      'E',
      'F',
      'G',
      'A',
      'B',
      'C1',
      'D1',
      'E1',
      'F1',
      'G1',
      'A1',
      'B1',
      'C2',
      'D2',
      'E2',
      'F2',
      'G2',
      'A2',
      'B2',
      'C3',
      'D3',
      'E3',
      'F3',
      'G3',
      'A3',
      'B3',
      'C4'
    ],
    []
  );

  const blacks = useMemo(
    () => [
      'A-4h',
      'skip0',
      'C-3h',
      'D-3h',
      'skip1',
      'F-3h',
      'G-3h',
      'A-3h',
      'skip2',
      'C-2h',
      'D-2h',
      'skip3',
      'F-2h',
      'G-2h',
      'A-2h',
      'skip4',
      'C-1h',
      'D-1h',
      'skip5',
      'F-1h',
      'G-1h',
      'A-1h',
      'skip6',
      'Ch',
      'Dh',
      'skip7',
      'Fh',
      'Gh',
      'Ah',
      'skip8',
      'C1h',
      'D1h',
      'skip9',
      'F1h',
      'G1h',
      'A1h',
      'skip10',
      'C2h',
      'D2h',
      'skip11',
      'F2h',
      'G2h',
      'A2h',
      'skip12',
      'C3h',
      'D3h',
      'skip13',
      'F3h',
      'G3h',
      'A3h'
    ],
    []
  );

  useEffect(() => {
    if (!loadedApp) {
      return;
    }

    window.addEventListener('mouseup', stopSoundOnOutsideOfKeyboardCallback, false);
    window.addEventListener('touchend', stopSoundOnOutsideOfKeyboardCallback, false);

    return () => {
      window.removeEventListener('mouseup', stopSoundOnOutsideOfKeyboardCallback, false);
      window.removeEventListener('touchend', stopSoundOnOutsideOfKeyboardCallback, false);
    };
  }, [loadedApp, stopSoundOnOutsideOfKeyboardCallback]);

  return (
    <div className='Piano'>
      <ul className='Piano__whites'>
        {whites.map((pitch: string) => {
          const index = indexMap[pitch];
          const hasMelody = downMelodyIndexes.includes(index) && !upMelodyIndexes.includes(index);
          const hasBass = downBassIndexes.includes(index) && !upBassIndexes.includes(index);
          const isAutoActive = hasMelody || hasBass;
          const isActive = isAutoActive || activeMIDIIndexes.includes(index);

          return (
            <li key={pitch} className={`Piano__keyboard${downKeyboards[index] || isActive ? ' -active' : ''}`}>
              <button
                type='button'
                aria-pressed={downKeyboards[index] || isAutoActive}
                data-pitch={pitch}
                data-index={indexMap[pitch]}
                onMouseDown={startSoundCallback}
                onTouchStart={startSoundCallback}
                onKeyDown={startSoundCallback}
                onMouseUp={stopSoundCallback}
                onTouchEnd={stopSoundCallback}
                onMouseOver={startSoundCallback}
                onTouchMove={startSoundCallback}
                onMouseOut={stopSoundCallback}
                onKeyUp={stopSoundCallback}
                onFocus={startSoundCallback}
                onBlur={stopSoundCallback}
              >
                {pitch}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className='Piano__blacks'>
        {blacks.map((pitch: string) => {
          if (pitch.includes('skip')) {
            return <li key={pitch} className='Piano__keyboard -skip' aria-label='skip' />;
          }

          const index = indexMap[pitch];
          const hasMelody = downMelodyIndexes.includes(index) && !upMelodyIndexes.includes(index);
          const hasBass = downBassIndexes.includes(index) && !upBassIndexes.includes(index);
          const isAutoActive = hasMelody || hasBass;
          const isActive = isAutoActive || activeMIDIIndexes.includes(index);

          return (
            <li key={pitch} className={`Piano__keyboard${downKeyboards[index] || isActive ? ' -active' : ''}`}>
              <button
                type='button'
                aria-pressed={downKeyboards[index] || isAutoActive}
                data-pitch={pitch}
                data-index={indexMap[pitch]}
                onMouseDown={startSoundCallback}
                onTouchStart={startSoundCallback}
                onKeyDown={startSoundCallback}
                onMouseUp={stopSoundCallback}
                onTouchEnd={stopSoundCallback}
                onMouseOver={startSoundCallback}
                onTouchMove={startSoundCallback}
                onMouseOut={stopSoundCallback}
                onKeyUp={stopSoundCallback}
                onFocus={startSoundCallback}
                onBlur={stopSoundCallback}
              >
                {pitch}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
