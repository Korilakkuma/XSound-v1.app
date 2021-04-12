import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState, SoundSource } from '../../../types';
import {
  downMelodyKeyboards,
  downBassKeyboards,
  upMelodyKeyboards,
  upBassKeyboards
} from '../../../actions';
import { createFilename } from '../../../utils';
import { Switch } from '../../atoms/Switch';
import { Select } from '../../atoms/Select';
import { FileUploader } from '../../atoms/FileUploader';
import { ProgressBar } from '../../atoms/ProgressBar';
import { Modal } from '../../atoms/Modal';
import { SelectableModal } from '../../helpers/SelectableModal';
import { X } from 'xsound';

interface MMLInfo {
  title: string;
  artist: string;
  description: string;
  melody: string;
  bass: string;
}

interface Sequence {
  indexes: number[];
  frequencies: number[];
  start: number;
  duration: number;
  stop: number;
  note: string;
}

export interface Props {
  loadedApp: boolean;
  currentSoundSource: SoundSource;
}

const NUMBER_OF_PIANO_KEYBOARDS = 88;
const CLEAR_HIGHLIGHT_REGEXP = /<span class="x-highlight">(.+?)<\/span>/g;

// HACK:
const savedMMLs = ['', ''];

export const MML: React.FC<Props> = (props: Props) => {
  const { loadedApp, currentSoundSource } = props;

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
  // const [errorMessageForMML, setErrorMessageForMML] = useState<string>('');
  const [isShowModalForFileUploadError, setIsShowModalForFileUploadError] = useState<boolean>(false);
  const [isShowModalForProgress, setIsShowModalForProgress] = useState<boolean>(false);
  const [isShowModalConfirmation, setIsShowModalConfirmation] = useState<boolean>(false);

  const dispatch = useDispatch();

  const active = useSelector((state: IState) => state.mmlState);

  const readyMMLCallback = useCallback((currentMelody: string, currentBass: string) => {
    const melody = currentMelody.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');
    const bass   = currentBass.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');

    switch (currentSoundSource) {
      case 'oscillator':
        X('mml').ready(X('oscillator'), melody);
        window.C('mml').ready(window.C('oscillator'), bass);
        break;
      case 'piano':
        X('mml').ready(X('oneshot'), melody, 0);
        window.C('mml').ready(X('oneshot'), bass, 0);
        break;
      case 'guitar':
        X('mml').ready(X('oneshot'), melody, NUMBER_OF_PIANO_KEYBOARDS);
        window.C('mml').ready(X('oneshot'), bass, NUMBER_OF_PIANO_KEYBOARDS);
        break;
      case 'electric-guitar':
        X('mml').ready(X('oneshot'), melody, NUMBER_OF_PIANO_KEYBOARDS + NUMBER_OF_PIANO_KEYBOARDS);
        window.C('mml').ready(X('oneshot'), bass, NUMBER_OF_PIANO_KEYBOARDS + NUMBER_OF_PIANO_KEYBOARDS);
        break;
      case 'whitenoise'   :
      case 'pinknoise'    :
      case 'browniannoise':
        X('mml').ready(X('noise'), melody);
        window.C('mml').ready(window.C('noise'), bass);
        break;
      default:
        break;
    }
  }, [currentSoundSource]);

  const readFileCallback = useCallback((event: React.SyntheticEvent) => {
    const options = {
      event   : event.nativeEvent,
      type    : 'JSON',
      success : (event: Event, text: string) => {
        (event.currentTarget as HTMLInputElement).value = '';

        try {
          const mmls = JSON.parse(text);

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
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      },
      error   : (error: Error) => {
        setShowProgress(false);
        setErrorMessage(error.message);
        setIsShowModalForFileUploadError(true);
      },
      progress: (event: Event) => {
        const { lengthComputable, loaded, total } = event as ProgressEvent;

        setShowProgress(lengthComputable);
        setLoadedByte(loaded);
        setRate(lengthComputable && (total > 0) ? Math.floor((loaded / total) * 100) : 0);
        setIsShowModalForProgress(true);
      }
    };

    try {
      const file = X.file(options);

      setFilename(file.name);
    } catch (error) {
      setErrorMessage(error.message);
      setIsShowModalForFileUploadError(true);
    }
  }, [melody, bass, readyMMLCallback]);

  const startMelodyCallback = useCallback((sequence: Sequence) => {
    dispatch(downMelodyKeyboards(sequence.indexes));
    setMelody(X('mml').get(0, true));
  }, [dispatch]);

  const startBassCallback = useCallback((sequence: Sequence) => {
    dispatch(downBassKeyboards(sequence.indexes));
    setBass(window.C('mml').get(0, true));
  }, [dispatch]);

  const stopMelodyCallback = useCallback((sequence: Sequence) => {
    dispatch(upMelodyKeyboards(sequence.indexes));
  }, [dispatch]);

  const stopBassCallback = useCallback((sequence: Sequence) => {
    dispatch(upBassKeyboards(sequence.indexes));
  }, [dispatch]);

  const endedCallback = useCallback(() => {
    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (i !== 0) {
        X('oscillator').get(i).state(false);
        window.C('oscillator').get(i).state(false);
      }
    }

    dispatch(downMelodyKeyboards([]));
    dispatch(downBassKeyboards([]));

    const currentMelody = melody.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');
    const currentBass   = bass.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');

    readyMMLCallback(currentMelody, currentBass);

    setMelody(currentMelody);
    setBass(currentBass);
    setPaused(true);
  }, [dispatch, melody, bass, readyMMLCallback]);

  const errorCallback = useCallback((error: string, note: string) => {
    // TODO:
    switch (error) {
      case 'TEMPO' :
      case 'OCTAVE':
      case 'NOTE'  :
        // eslint-disable-next-line no-console
        console.error(`Maybe, ${note} is invalid.`);
        break;
      case 'MML':
        // eslint-disable-next-line no-console
        console.error('The designated MML is invalid.');
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('The designated MML is invalid.');
        break;
    }
  }, []);

  const onBlurMelodyCallback = useCallback((event: React.SyntheticEvent) => {
    if ((event.currentTarget === null) || (event.currentTarget.textContent === null)) {
      return;
    }

    const currentMelody = event.currentTarget.textContent;

    setMelody(currentMelody);
    setPaused(true);
  }, []);

  const onBlurBassCallback = useCallback((event: React.SyntheticEvent) => {
    if ((event.currentTarget === null) || (event.currentTarget.textContent === null)) {
      return;
    }

    const currentBass = event.currentTarget.textContent;

    setBass(currentBass);
    setPaused(true);
  }, []);

  const onClickMMLControllerCallback = useCallback(() => {
    if (paused) {
      readyMMLCallback(melody, bass);

      X('mml').currentIndex(0, melodyIndex);
      window.C('mml').currentIndex(0, bassIndex);

      // Start MML
      if (currentSoundSource === 'oscillator') {
        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          X('oscillator').get(i).state(true);
          window.C('oscillator').get(i).state(true);
        }

        X('mml').start(0, true);
        window.C('mml').start(0, true);

        X('mixer').module('recorder').start();
      } else {
        X('mml').start(0, true);
        window.C('mml').start(0, true);

        X('oneshot').module('recorder').start();
      }
    } else {
      setMelodyIndex(X('mml').currentIndex(0));
      setBassIndex(window.C('mml').currentIndex(0));

      // Stop MML
      X('mml').stop();
      window.C('mml').stop();

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        X('oscillator').get(i).state(false);
        window.C('oscillator').get(i).state(false);
      }
    }

    setPaused(!paused);
  }, [
    currentSoundSource,
    paused,
    melody,
    bass,
    melodyIndex,
    bassIndex,
    readyMMLCallback
  ]);

  const onClickRewindButtonCallback = useCallback(() => {
    X('mml').stop().clear();
    window.C('mml').stop().clear();

    dispatch(downMelodyKeyboards([]));
    dispatch(downBassKeyboards([]));

    const currentMelody = melody.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');
    const currentBass   = bass.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');

    setMelody(currentMelody);
    setBass(currentBass);
    setMelodyIndex(0);
    setBassIndex(0);
    setPaused(true);
  }, [dispatch, melody, bass]);

  const onClickDownloadButtonCallback = useCallback(() => {
    const currentMelody = melody.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');
    const currentBass   = bass.replace(CLEAR_HIGHLIGHT_REGEXP, '$1');

    const json = JSON.stringify({
      title      : '',
      artist     : '',
      description: '',
      melody     : currentMelody,
      bass       : currentBass
    });

    setDataURL(X.toTextFile(json));
  }, [melody, bass]);

  const onChangeHightlightCallback = useCallback((event: React.SyntheticEvent) => {
    setHighlight((event.currentTarget as HTMLInputElement).checked);
  }, []);

  const onChangeFileCallback = useCallback((event: React.SyntheticEvent) => {
    readFileCallback(event);
  }, [readFileCallback]);

  const onDragEnterCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
    setDrag(true);
  }, []);

  const onDragOverCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
  }, []);

  const onDragLeaveCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
    setDrag(false);
  }, []);

  const onDropCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();

    readFileCallback(event);

    setDrag(false);
    setDrop(true);
  }, [readFileCallback]);

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
    setIsShowModalConfirmation(false);
  }, []);

  const onChangeSampleMMLCallback = useCallback((event: React.SyntheticEvent) => {
    const sampleMML = JSON.parse((event.currentTarget as HTMLInputElement).value);

    setMelody(sampleMML.melody);
    setBass(sampleMML.bass);
  }, []);

  useEffect(() => {
    if (!loadedApp) {
      return;
    }

    if (loaded) {
      // HACK:
      X('mml').setup({
        start: startMelodyCallback,
        stop : stopMelodyCallback,
        ended: endedCallback,
        error: errorCallback
      });

      window.C('mml').setup({
        start: startBassCallback,
        stop : stopBassCallback,
        ended: endedCallback,
        error: errorCallback
      });

      return;
    }

    X('mml').setup({
      start: startMelodyCallback,
      stop : stopMelodyCallback,
      ended: endedCallback,
      error: errorCallback
    });

    window.C('mml').setup({
      start: startBassCallback,
      stop : stopBassCallback,
      ended: endedCallback,
      error: errorCallback
    });

    Promise
      .all([
        fetch('/assets/mmls/endless-rain.json'),
        fetch('/assets/mmls/forever-love.json'),
        fetch('/assets/mmls/tears.json')
      ])
      .then((responses: Response[]) => {
        return responses.map((response: Response) => response.json());
      })
      .then((promises: Promise<MMLInfo>[]) => {
        promises.forEach((promise: Promise<MMLInfo>) => {
          promise
            .then((json: MMLInfo) => {
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
                default:
                  break;
              }

              values[index] = JSON.stringify({ melody, bass });
              texts[index]  = `${title} | ${artist}`;

              if ((values.length === 4) && (texts.length === 4)) {
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
    endedCallback,
    errorCallback
  ]);

  return (
    <div className={`MML${active ? ' -active' : ''}`}>
      <div className="MML__editor">
        <dl>
          <dt>Melody</dt>
          <dd
            contentEditable
            dangerouslySetInnerHTML={{ __html: melody }}
            className={highlight ? '-highlight' : ''}
            onBlur={onBlurMelodyCallback}
          />
        </dl>
        <dl>
          <dt>Bass</dt>
          <dd
            contentEditable
            dangerouslySetInnerHTML={{ __html: bass }}
            className={highlight ? '-highlight' : ''}
            onBlur={onBlurBassCallback}
          />
        </dl>
      </div>
      <div className="MML__controllers">
        <button
          type="button"
          className={`MML__controller${paused ? ' -paused' : ''}`}
          aria-label={paused ? 'Start' : 'Pause'}
          onClick={onClickMMLControllerCallback}
        >
        </button>
        <button
          type="button"
          className="MML__rewinder"
          aria-label="Rewind"
          onClick={onClickRewindButtonCallback}
        >
        </button>
        <a
          href={dataURL}
          download={dataURL ? createFilename('mml-', '.json') : null}
          role="button"
          className="MML__download"
          aria-label="Download"
          onClick={onClickDownloadButtonCallback}
        >
        </a>
        <Switch
          id="mml-switch-highlight"
          label="Highlight"
          checked={highlight}
          onChange={onChangeHightlightCallback}
        />
        <FileUploader
          id="uploader-mml"
          accept="application/json"
          placeholder="MML JSON file"
          filename={filename}
          drag={drag}
          drop={drop}
          onChange={onChangeFileCallback}
          onDragEnter={onDragEnterCallback}
          onDragOver={onDragOverCallback}
          onDragLeave={onDragLeaveCallback}
          onDrop={onDropCallback}
        />
        <Select
          id="select-mml"
          label="Select Sample MML"
          values={values}
          texts={texts}
          width="200px"
          onChange={onChangeSampleMMLCallback}
        />
      </div>
      <Modal
        hasOverlay
        isShow={isShowModalForFileUploadError}
        title="Error"
        onClose={onCloseModalCallback}
      >
        {errorMessage}
      </Modal>
      <Modal
        hasOverlay
        isShow={isShowModalForProgress}
        title="Progress ..."
      >
        {showProgress ? <ProgressBar id="progress-bar-read-mml" label={`${loadedByte} bytes (${rate} %)`} rate={rate} /> : null}
      </Modal>
      <SelectableModal
        hasOverlay
        isShow={isShowModalConfirmation}
        title="Confirmation"
        first={{
          label : 'Cancel',
          action: onClickCancelCallback
        }}
        second={{
          label : 'OK',
          action: onClickOverwriteCallback
        }}
        onClose={onClickCancelCallback}
      >
        <p>Overwrite. OK ?</p>
      </SelectableModal>
    </div>
  );
};
