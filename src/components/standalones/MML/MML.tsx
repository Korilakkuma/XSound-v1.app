import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'xsound';

import { NUMBER_OF_PIANO_KEYBOARDS } from '/src/config';
import { changeOscillatorStates, downBassKeyboards, downMelodyKeyboards, upBassKeyboards, upMelodyKeyboards } from '/src/slices';
import { createFilename } from '/src/utils';
import { FileUploader } from '/src/components/atoms/FileUploader';
import { Modal } from '/src/components/atoms/Modal';
import { ProgressBar } from '/src/components/atoms/ProgressBar';
import { Select } from '/src/components/atoms/Select';
import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { SelectableModal } from '/src/components/helpers/SelectableModal';

import type { RootState } from '/src/store';
import type { MMLDescriptor, SoundSource } from '/src/types';
import type { FileEvent, FileReaderErrorText, MMLSyntaxError, Sequence } from 'xsound';

export type Props = {
  loadedApp: boolean;
  currentSoundSource: SoundSource;
};

const CLEAR_HIGHLIGHT_REGEXP = /<span class="x-highlight">(.+?)<\/span>/g;

// HACK: Prevent from updating local state on confirm
const savedMMLs = ['', ''];

export const MML: React.FC<Props> = ({ loadedApp, currentSoundSource }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [highlight, setHighlight] = useState<boolean>(false);
  const [melody, setMelody] = useState<string>('');
  const [bass, setBass] = useState<string>('');
  const [melodyIndex, setMelodyIndex] = useState<number>(0);
  const [bassIndex, setBassIndex] = useState<number>(0);
  const [dataURL, setDataURL] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [drag, setDrag] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [loadedByte, setLoadedByte] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [values, setValues] = useState<string[]>(['{"melody":"","bass":""}']);
  const [texts, setTexts] = useState<string[]>(['SAMPLE MML']);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessageForMMLMelody, setErrorMessageForMMLMelody] = useState<string>('');
  const [errorMessageForMMLBass, setErrorMessageForMMLBass] = useState<string>('');
  const [isShowModalForFileUploadError, setIsShowModalForFileUploadError] = useState<boolean>(false);
  const [isShowModalForProgress, setIsShowModalForProgress] = useState<boolean>(false);
  const [isShowModalConfirmation, setIsShowModalConfirmation] = useState<boolean>(false);

  const dispatch = useDispatch();

  const active = useSelector((state: RootState) => state.mmlState);

  const readyMMLCallback = useCallback(
    (currentMelody: string, currentBass: string) => {
      const melody = currentMelody.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');
      const bass = currentBass.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');

      switch (currentSoundSource) {
        case 'oscillator':
          X('mml').ready({ source: X('oscillator'), mmls: [melody] });
          window.clonedXSound('mml').ready({ source: window.clonedXSound('oscillator'), mmls: [bass] });
          break;
        case 'piano':
          X('mml').ready({ source: X('oneshot'), mmls: [melody, bass], offset: 0 });
          break;
        case 'guitar':
          X('mml').ready({ source: X('oneshot'), mmls: [melody, bass], offset: NUMBER_OF_PIANO_KEYBOARDS });
          break;
        case 'electric-guitar':
          X('mml').ready({ source: X('oneshot'), mmls: [melody, bass], offset: 2 * NUMBER_OF_PIANO_KEYBOARDS });
          break;
        case 'orgel':
          X('mml').ready({ source: X('oneshot'), mmls: [melody, bass], offset: 3 * NUMBER_OF_PIANO_KEYBOARDS });
          break;
        case 'whitenoise':
        case 'pinknoise':
        case 'browniannoise':
          X('mml').ready({ source: X('noise'), mmls: [melody] });
          window.clonedXSound('mml').ready({ source: X('noise'), mmls: [bass] });
          break;
        default:
          break;
      }
    },
    [currentSoundSource]
  );

  const startMelodyCallback = useCallback(
    (sequence: Sequence) => {
      dispatch(downMelodyKeyboards(sequence.indexes));
      setMelody(X('mml').getMML(0) ?? '');

      const bass = X('mml').getMML(1);

      if (bass) {
        setBass(bass);
      }
    },
    [dispatch]
  );

  const startBassCallback = useCallback(
    (sequence: Sequence) => {
      dispatch(downBassKeyboards(sequence.indexes));
      setBass(window.clonedXSound('mml').getMML(0) ?? '');
    },
    [dispatch]
  );

  const stopMelodyCallback = useCallback(
    (sequence: Sequence) => {
      dispatch(upMelodyKeyboards(sequence.indexes));
    },
    [dispatch]
  );

  const stopBassCallback = useCallback(
    (sequence: Sequence) => {
      dispatch(upBassKeyboards(sequence.indexes));
    },
    [dispatch]
  );

  const endedAllPartsCallback = useCallback(() => {
    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (i !== 0) {
        X('oscillator').get(i).deactivate();
        window.clonedXSound('oscillator').get(i).deactivate();
      }
    }

    dispatch(downMelodyKeyboards([]));
    dispatch(downBassKeyboards([]));

    const currentMelody = X('mml').getMML(0)?.replace(CLEAR_HIGHLIGHT_REGEXP, '$1') ?? '';
    const currentBass = X('mml').getMML(1)
      ? X('mml').getMML(1)?.replace(CLEAR_HIGHLIGHT_REGEXP, '$1') ?? ''
      : window.clonedXSound('mml').getMML(0)?.replace(CLEAR_HIGHLIGHT_REGEXP, '$1') ?? '';

    readyMMLCallback(currentMelody, currentBass);

    setMelody(currentMelody);
    setBass(currentBass);
    setPaused(true);
  }, [dispatch, readyMMLCallback]);

  const errorCallbackForMelody = useCallback((error: MMLSyntaxError) => {
    const token = error.token;

    switch (token.type) {
      case 'TEMPO':
      case 'OCTAVE':
      case 'NOTE':
      case 'REST':
      case 'TIE':
        setErrorMessageForMMLMelody(`${token.token.toUpperCase()} is invalid`);
        break;
      default:
        setErrorMessageForMMLMelody('MML is invalid');
        break;
    }
  }, []);

  const errorCallbackForBass = useCallback((error: MMLSyntaxError) => {
    const token = error.token;

    switch (token.type) {
      case 'TEMPO':
      case 'OCTAVE':
      case 'NOTE':
      case 'REST':
      case 'TIE':
        setErrorMessageForMMLBass(`${token.token.toUpperCase()} is invalid`);
        break;
      default:
        setErrorMessageForMMLBass('MML is invalid');
        break;
    }
  }, []);

  const onBlurMelodyCallback = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget === null || event.currentTarget.textContent === null) {
      return;
    }

    const currentMelody = event.currentTarget.textContent;

    setMelody(currentMelody);
    setPaused(true);
  }, []);

  const onBlurBassCallback = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget === null || event.currentTarget.textContent === null) {
      return;
    }

    const currentBass = event.currentTarget.textContent;

    setBass(currentBass);
    setPaused(true);
  }, []);

  const onClickMMLControllerCallback = useCallback(() => {
    if (paused) {
      setErrorMessageForMMLMelody('');
      setErrorMessageForMMLBass('');

      readyMMLCallback(melody, bass);

      X('mml').currentIndex(0, melodyIndex);
      window.clonedXSound('mml').currentIndex(0, bassIndex);

      // Start MML
      if (currentSoundSource === 'oscillator') {
        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          X('oscillator').get(i).activate();
          window.clonedXSound('oscillator').get(i).activate();
        }

        X('mml').start(0, true);
        window.clonedXSound('mml').start(0, true);

        X('mixer').start([X('oscillator'), window.clonedXSound('oscillator')], [1, 1]);

        X('mixer').module('recorder').start();

        dispatch(changeOscillatorStates([true, true]));
      } else if (currentSoundSource.endsWith('noise')) {
        X('mml').start(0, true);
        window.clonedXSound('mml').start(0, true);

        X('mixer').module('recorder').start();
      } else {
        X('mml').start(0, true);
        X('mml').start(1, true);

        X('oneshot').module('recorder').start();
      }
    } else {
      setMelodyIndex(X('mml').currentIndex(0));
      setBassIndex(window.clonedXSound('mml').currentIndex(0));

      // Stop MML
      X('mml').stop();
      window.clonedXSound('mml').stop();

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (i !== 0) {
          X('oscillator').get(i).deactivate();
        }

        window.clonedXSound('oscillator').get(i).deactivate();
      }
    }

    setPaused(!paused);
  }, [dispatch, currentSoundSource, paused, melody, bass, melodyIndex, bassIndex, readyMMLCallback]);

  const onClickRewindButtonCallback = useCallback(() => {
    X('mml').stop();
    window.clonedXSound('mml').stop();

    dispatch(downMelodyKeyboards([]));
    dispatch(downBassKeyboards([]));

    const currentMelody = melody.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');
    const currentBass = bass.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');

    setMelody(currentMelody);
    setBass(currentBass);
    setMelodyIndex(0);
    setBassIndex(0);
    setPaused(true);
  }, [dispatch, melody, bass]);

  const onClickDownloadButtonCallback = useCallback(() => {
    const currentMelody = melody.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');
    const currentBass = bass.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');

    const json = JSON.stringify({
      title: '',
      artist: '',
      description: '',
      melody: currentMelody,
      bass: currentBass
    });

    setDataURL(X.toTextFile(json, true));
  }, [melody, bass]);

  const onChangeHightlightCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHighlight(event.currentTarget.checked);
  }, []);

  const onChangeFileCallback = useCallback(
    (event: React.BaseSyntheticEvent<FileEvent>) => {
      const file = X.file({
        event: event.nativeEvent,
        type: 'json',
        successCallback: (_: ProgressEvent, mmls: ReturnType<typeof JSON.parse>) => {
          event.nativeEvent.target.value = '';

          if (melody || bass) {
            savedMMLs[0] = mmls.melody;
            savedMMLs[1] = mmls.bass;

            setIsShowModalConfirmation(true);
          } else {
            readyMMLCallback(mmls.melody, mmls.bass);

            setMelody(mmls.melody);
            setBass(mmls.bass);
          }

          setShowProgress(false);
          setIsShowModalForProgress(false);
        },
        errorCallback: (_: ProgressEvent, textStatus: FileReaderErrorText) => {
          setShowProgress(false);
          setErrorMessage(textStatus);
          setIsShowModalForFileUploadError(true);
        },
        progressCallback: (e: ProgressEvent) => {
          const { lengthComputable, loaded, total } = e;

          setShowProgress(lengthComputable);
          setLoadedByte(loaded);
          setRate(lengthComputable && total > 0 ? Math.trunc((loaded / total) * 100) : 0);
          setIsShowModalForProgress(true);
        }
      });

      if (file === null) {
        setErrorMessage('Please upload file');
        setIsShowModalForFileUploadError(true);
      } else if (typeof file !== 'string') {
        setFilename(file.name);
      }
    },
    [melody, bass, readyMMLCallback]
  );

  const onDragEnterCallback = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(true);
  }, []);

  const onDragOverCallback = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const onDragLeaveCallback = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(false);
  }, []);

  const onDropCallback = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const file = X.drop({
        event: event.nativeEvent,
        type: 'json',
        successCallback: (_: ProgressEvent, mmls: ReturnType<typeof JSON.parse>) => {
          if (melody || bass) {
            savedMMLs[0] = mmls.melody;
            savedMMLs[1] = mmls.bass;

            setIsShowModalConfirmation(true);
          } else {
            readyMMLCallback(mmls.melody, mmls.bass);

            setMelody(mmls.melody);
            setBass(mmls.bass);
          }

          setShowProgress(false);
          setIsShowModalForProgress(false);
        },
        errorCallback: (_: ProgressEvent, textStatus: FileReaderErrorText) => {
          setShowProgress(false);
          setErrorMessage(textStatus);
          setIsShowModalForFileUploadError(true);
        },
        progressCallback: (e: ProgressEvent) => {
          const { lengthComputable, loaded, total } = e;

          setShowProgress(lengthComputable);
          setLoadedByte(loaded);
          setRate(lengthComputable && total > 0 ? Math.trunc((loaded / total) * 100) : 0);
          setIsShowModalForProgress(true);
        }
      });

      if (file === null) {
        setErrorMessage('Please drop file');
        setIsShowModalForFileUploadError(true);
      } else if (typeof file !== 'string') {
        setFilename(file.name);
      }

      setDrag(false);
      setDrop(true);
    },
    [melody, bass, readyMMLCallback]
  );

  const onCloseModalCallback = useCallback(() => {
    setIsShowModalForFileUploadError(false);
  }, []);

  const onClickOverwriteCallback = useCallback(() => {
    readyMMLCallback(savedMMLs[0], savedMMLs[1]);

    setMelody(savedMMLs[0]);
    setBass(savedMMLs[1]);
    setIsShowModalConfirmation(false);
  }, [readyMMLCallback]);

  const onClickCancelCallback = useCallback(() => {
    setFilename('');
    setIsShowModalConfirmation(false);
  }, []);

  const onChangeSampleMMLCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const sampleMML = JSON.parse(event.currentTarget.value);

    setMelody(sampleMML.melody);
    setBass(sampleMML.bass);
  }, []);

  useEffect(() => {
    if (!loadedApp || loaded) {
      return;
    }

    X('mml').setup({
      startCallback: startMelodyCallback,
      stopCallback: stopMelodyCallback,
      endedCallback: endedAllPartsCallback,
      errorCallback: errorCallbackForMelody
    });

    window.clonedXSound('mml').setup({
      startCallback: startBassCallback,
      stopCallback: stopBassCallback,
      endedCallback: endedAllPartsCallback,
      errorCallback: errorCallbackForBass
    });

    if (process.env.NODE_ENV === 'production') {
      setLoaded(true);
      return;
    }

    Promise.all([
      fetch('/assets/mmls/endless-rain.json'),
      fetch('/assets/mmls/forever-love.json'),
      fetch('/assets/mmls/tears.json'),
      fetch('/assets/mmls/seifuku-no-mannequin.json')
    ])
      .then((responses: Response[]) => {
        return responses.map((response: Response) => response.json());
      })
      .then((promises: Promise<MMLDescriptor>[]) => {
        promises.forEach((promise: Promise<MMLDescriptor>) => {
          promise
            .then((json: MMLDescriptor) => {
              const { title, artist, melody, bass } = json;

              let index = 0;

              switch (title) {
                case 'ENDLESS RAIN':
                  index = 1;
                  break;
                case 'Forever Love':
                  index = 2;
                  break;
                case 'Tears':
                  index = 3;
                  break;
                case '制服のマネキン':
                  index = 4;
                  break;
                default:
                  break;
              }

              values[index] = JSON.stringify({ melody, bass });
              texts[index] = `${title} | ${artist}`;

              if (values.length === 5 && texts.length === 5) {
                setValues(values);
                setTexts(texts);
              }
            })
            .catch((error: Error) => {
              // eslint-disable-next-line no-console
              console.error(error);
            });
        });
      })
      .catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [
    loadedApp,
    loaded,
    melody,
    bass,
    values,
    texts,
    readyMMLCallback,
    startMelodyCallback,
    startBassCallback,
    stopMelodyCallback,
    stopBassCallback,
    endedAllPartsCallback,
    errorCallbackForMelody,
    errorCallbackForBass
  ]);

  return (
    <div id='mml-fieldset' aria-hidden={!active} className={`MML${active ? ' -active' : ''}`}>
      <div className='MML__editor'>
        <dl>
          <dt>
            Melody
            {errorMessageForMMLMelody ? (
              <span className='MML__error' role='alert'>
                {errorMessageForMMLMelody}
              </span>
            ) : null}
          </dt>
          <dd
            contentEditable={active && paused}
            dangerouslySetInnerHTML={{ __html: melody }}
            aria-disabled={!active || !paused}
            className={highlight ? '-highlight' : ''}
            onBlur={onBlurMelodyCallback}
          />
        </dl>
        <dl>
          <dt>
            Bass
            {errorMessageForMMLBass ? (
              <span className='MML__error' role='alert'>
                {errorMessageForMMLBass}
              </span>
            ) : null}
          </dt>
          <dd
            contentEditable={active && paused}
            dangerouslySetInnerHTML={{ __html: bass }}
            aria-disabled={!active || !paused}
            className={highlight ? '-highlight' : ''}
            onBlur={onBlurBassCallback}
          />
        </dl>
      </div>
      <div className='MML__controllers'>
        <button
          type='button'
          disabled={!melody && !bass}
          aria-label={paused ? 'Start' : 'Pause'}
          tabIndex={active ? 0 : -1}
          className={`MML__controller${paused ? ' -paused' : ''}`}
          onClick={onClickMMLControllerCallback}
        />
        <button type='button' aria-label='Rewind' tabIndex={active ? 0 : -1} className='MML__rewinder' onClick={onClickRewindButtonCallback} />
        <a
          href={dataURL}
          download={dataURL ? createFilename('mml-', 'json') : null}
          role='button'
          tabIndex={active ? 0 : -1}
          className='MML__download'
          onClick={onClickDownloadButtonCallback}
        >
          Download
        </a>
        <Spacer space={8} direction='left' />
        <Switch label='Highlight' checked={highlight} labelAsText={true} tabIndex={active ? 0 : -1} onChange={onChangeHightlightCallback} />
        <Spacer space={8} direction='right' />
        <FileUploader
          accept='application/json'
          disabled={!paused}
          placeholder='MML JSON file'
          filename={filename}
          drag={drag}
          drop={drop}
          tabIndex={active ? 0 : -1}
          onChange={onChangeFileCallback}
          onDragEnter={onDragEnterCallback}
          onDragOver={onDragOverCallback}
          onDragLeave={onDragLeaveCallback}
          onDrop={onDropCallback}
        />
        {process.env.NODE_ENV !== 'production' ? (
          <Select
            label='Select Sample MML'
            values={values}
            texts={texts}
            disabled={!paused}
            width='200px'
            tabIndex={active ? 0 : -1}
            onChange={onChangeSampleMMLCallback}
          />
        ) : null}
      </div>
      <Modal isShow={isShowModalForFileUploadError} title='Error' hasOverlay={true} asAlert={true} onClose={onCloseModalCallback}>
        {errorMessage}
      </Modal>
      <Modal isShow={isShowModalForProgress} title='Progress ...' hasOverlay={true} asAlert={false}>
        {showProgress ? <ProgressBar label={`${loadedByte} bytes (${rate} %)`} rate={rate} /> : null}
      </Modal>
      <SelectableModal
        hasOverlay={true}
        isShow={isShowModalConfirmation}
        title='Confirmation'
        first={{
          label: 'Cancel',
          action: onClickCancelCallback
        }}
        second={{
          label: 'OK',
          action: onClickOverwriteCallback
        }}
        onClose={onClickCancelCallback}
      >
        <p>Overwrite. OK ?</p>
      </SelectableModal>
    </div>
  );
};
