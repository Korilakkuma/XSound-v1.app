import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { SoundSource } from '../../../types';
import {
  changeCurrentSoundSource,
  changeAnalyserState,
  changeMMLState,
  activateMIDIKeyboards
} from '../../../actions';
import { Switch } from '../../atoms/Switch';
import { Select } from '../../atoms/Select';
import { Modal } from '../../atoms/Modal';
import { ParameterController } from '../../helpers/ParameterController';
import { NUMBER_OF_ONESHOTS } from '../../../config';
import { X } from 'xsound';

export interface Props {
  currentSoundSource: SoundSource;
}

const MIN_NOTE_NUMBER = 21;
const MAX_NOTE_NUMBER = 108;
const MAX_VELOCITY    = 127;

export const BasicControllers: React.FC<Props> = (props: Props) => {
  const [analyserState, setAnalyserState] = useState<boolean>(false);
  const [mmlState, setMMLState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShowModalForMIDIError, setIsShowModalForMIDIError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const indexes: number[] = useMemo(() => [], []);

  const midiSource = useMemo(() => {
    switch (props.currentSoundSource) {
      case 'oscillator':
        return 'oscillator';
      case 'piano':
        return 'oneshot';
      case 'guitar':
        return 'oneshot';
      case 'electric-guitar':
        return 'oneshot';
      default:
        return 'noise';
    }
  }, [props.currentSoundSource]);

  const offset = useMemo(() => {
    switch (props.currentSoundSource) {
      case 'oscillator':
        return 0;
      case 'piano':
        return 0;
      case 'guitar':
        return NUMBER_OF_ONESHOTS;
      case 'electric-guitar':
        return NUMBER_OF_ONESHOTS + NUMBER_OF_ONESHOTS;
      default:
        return 0;
    }
  }, [props.currentSoundSource]);

  const noteOn = useCallback((noteNumber: number, velocity: number) => {
    if ((noteNumber < MIN_NOTE_NUMBER) || (noteNumber > MAX_NOTE_NUMBER)) {
      return;
    }

    if ((velocity < 0) || (velocity > MAX_VELOCITY)) {
      return;
    }

    const targetIndex = noteNumber - MIN_NOTE_NUMBER;
    const volume      = velocity / MAX_VELOCITY;

    indexes.push(targetIndex);

    if (midiSource === 'noise') {
      X('noise').start();

      X('noise').module('recorder').start();
    } else if (midiSource === 'oscillator') {
      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (i !== 0) {
          X('oscillator').get(i).activate();
          window.C('oscillator').get(i).activate();
        }

        X('oscillator').get(i).param({ volume });
        window.C('oscillator').get(i).param({ volume });
      }

      X('oscillator').ready(0, 0).start(X.toFrequencies(indexes));
      window.C('oscillator').ready(0, 0).start(X.toFrequencies(indexes));

      X('mixer').start([X('oscillator'), window.C('oscillator')], [volume, volume]);

      X('mixer').module('recorder').start();
    } else {
      X('oneshot').reset(targetIndex, 'volume', volume).ready(0, 0).start(indexes.map((index: number) => index + offset));

      X('oneshot').module('recorder').start();
    }

    dispatch(activateMIDIKeyboards(indexes));
  }, [dispatch, midiSource, indexes, offset]);

  const noteOff = useCallback((noteNumber: number, velocity: number) => {
    if ((noteNumber < MIN_NOTE_NUMBER) || (noteNumber > MAX_NOTE_NUMBER)) {
      return;
    }

    if ((velocity < 0) || (velocity > MAX_VELOCITY)) {
      return;
    }

    const targetIndex = noteNumber - MIN_NOTE_NUMBER;

    const index = indexes.indexOf(targetIndex);

    if (index !== -1) {
      indexes.splice(index, 1);
    }

    if (midiSource === 'noise') {
      X('noise').stop();

      X('noise').module('recorder').start();
    } else if (midiSource === 'oscillator') {
      X('oscillator').stop();
      window.C('oscillator').stop();

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (i !== 0) {
          X('oscillator').get(i).deactivate();
          window.C('oscillator').get(i).deactivate();
        }
      }
    } else {
      X('oneshot').stop(indexes.map((index: number) => index + offset)).reset(targetIndex, 'volume', 1);
    }

    dispatch(activateMIDIKeyboards(indexes));
  }, [dispatch, midiSource, indexes, offset]);

  const successCallback = useCallback((midiAccess: MIDIAccess, inputs: MIDIInput[], outputs: MIDIOutput[]) => {
    if (inputs[0]) {
      // @ts-ignore
      inputs[0].onmidimessage = (event: MIDIMessageEvent) => {
        switch (event.data[0] & 0xf0) {
          case 0x90:
            noteOn(event.data[1], event.data[2]);
            break;
          case 0x80:
            noteOff(event.data[1], event.data[2]);
            break;
          default :
            break;
        }
      };
    }

    if (outputs.length > 0) {
      // TODO: do something ...
    }
  }, [noteOn, noteOff]);

  const onChangeMasterVolumeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mastervolume = event.currentTarget.valueAsNumber;

    X('mixer').param({ mastervolume });
    X('oneshot').param({ mastervolume });
    X('audio').param({ mastervolume });
    X('stream').param({ mastervolume });
    X('noise').param({ mastervolume });
  }, []);

  const onChangeGlideCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.currentTarget.valueAsNumber;

    X('oscillator').module('glide').param({ time });
    window.C('oscillator').module('glide').param({ time });
  }, []);

  const onChangeTransposeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('oneshot').param({ transpose: event.currentTarget.valueAsNumber });
  }, []);

  const onChangeSoundSourceCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    X('mixer').module('analyser').stop('time').domain('time').clear();
    X('mixer').module('analyser').stop('fft').domain('fft').clear();
    X('oneshot').module('analyser').stop('time').domain('time').clear();
    X('oneshot').module('analyser').stop('fft').domain('fft').clear();
    X('audio').module('analyser').stop('time').domain('time').clear();
    X('audio').module('analyser').stop('fft').domain('fft').clear();
    X('stream').module('analyser').stop('time').domain('time').clear();
    X('stream').module('analyser').stop('fft').domain('fft').clear();

    const source = event.currentTarget.value;

    switch (source) {
      case 'oscillator':
      case 'piano':
      case 'guitar':
      case 'electric-guitar':
      case 'whitenoise':
      case 'pinknoise':
      case 'browniannoise':
      case 'stream':
      case 'midi':
        break;
      default:
        return;
    }

    if (!source.endsWith('noise')) {
      X('noise').module('analyser').stop('time').domain('time').clear();
      X('noise').module('analyser').stop('fft').domain('fft').clear();
    }

    dispatch(changeCurrentSoundSource(source));

    X('stream').clear();

    switch (source) {
      case 'stream':
        X('stream').ready()
          .then(() => {
            X('stream').start();
          })
          .catch((error: Error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          });

        break;
      case 'midi':
        try {
          X('midi').setup({
            options        : {
              sysex: true
            },
            successCallback: (midiAccess: MIDIAccess, inputs: MIDIInput[], outputs: MIDIOutput[]) => {
              successCallback(midiAccess, inputs, outputs);
            },
            errorCallback  : () => {
              setErrorMessage('Cannot use Web MIDI API.');
              setIsShowModalForMIDIError(true);
            }
          });
        } catch (error) {
          if (error instanceof Error) {
            setErrorMessage(error.message);
          }

          setIsShowModalForMIDIError(true);
        }

        break;
      default:
        break;
    }
  }, [dispatch, successCallback]);

  const onChangeAnalyserStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeAnalyserState(event.currentTarget.checked));
    setAnalyserState(!analyserState);
  }, [dispatch, analyserState]);

  const onChangeMMLStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMMLState(event.currentTarget.checked));
    setMMLState(!mmlState);
  }, [dispatch, mmlState]);

  const onCloseModalCallback = useCallback(() => {
    setErrorMessage('');
    setIsShowModalForMIDIError(false);
  }, []);

  return (
    <div className="BasicControllers">
      <ParameterController
        label="Master Volume"
        id="master-volume"
        defaultValue={1}
        min={0}
        max={1}
        step={0.05}
        width="20%"
        onChange={onChangeMasterVolumeCallback}
      />
      <ParameterController
        label="Glide"
        id="glide"
        defaultValue={0}
        min={0}
        max={1}
        step={0.05}
        width="20%"
        onChange={onChangeGlideCallback}
      />
      <ParameterController
        label="Transpose"
        id="transpose"
        defaultValue={0}
        min={-6}
        max={6}
        step={1}
        width="20%"
        onChange={onChangeTransposeCallback}
      />
      <Select
        id="select-sound-source"
        label="Select Sound Source"
        values={[
          'oscillator',
          'piano',
          'guitar',
          'electric-guitar',
          'whitenoise',
          'pinknoise',
          'browniannoise',
          'stream',
          'midi'
        ]}
        texts={[
          'oscillator',
          'piano',
          'A. guitar',
          'E. guitar',
          'white noise',
          'pink noise',
          'brownian noise',
          'microphone',
          'MIDI'
        ]}
        disabled={false}
        width="20%"
        onChange={onChangeSoundSourceCallback}
      />
      <Switch
        id="analyser"
        label="Analyser"
        checked={analyserState}
        labelAsText={true}
        controls="analyser-fieldset"
        onChange={onChangeAnalyserStateCallback}
      />
      <Switch
        id="mml"
        label="MML"
        checked={mmlState}
        labelAsText={true}
        controls="mml-fieldset"
        onChange={onChangeMMLStateCallback}
      />
      <Modal
        hasOverlay
        id="modal-basic-midi-error"
        isShow={isShowModalForMIDIError}
        title="Error"
        asAlert={true}
        onClose={onCloseModalCallback}
      >
        {errorMessage}
      </Modal>
    </div>
  );
};
