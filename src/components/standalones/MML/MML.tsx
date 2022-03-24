import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState, SoundSource, MMLInfo } from '../../../types';
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
import { NUMBER_OF_PIANO_KEYBOARDS } from '../../../config';
import { X, Sequence, MMLSyntaxError, FileEvent, FileReaderErrorText } from 'xsound';

export interface Props {
  loadedApp: boolean;
  currentSoundSource: SoundSource;
}

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
  const [errorMessageForMMLMelody, setErrorMessageForMMLMelody] = useState<string>('');
  const [errorMessageForMMLBass, setErrorMessageForMMLBass] = useState<string>('');
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
        X('mml').ready({ source: X('oscillator'), mmls: [melody] });
        window.C('mml').ready({ source: window.C('oscillator'), mmls: [bass] });
        break;
      case 'piano':
        X('mml').ready({ source: X('oneshot'), mmls: [melody], offset: 0 });
        window.C('mml').ready({ source: X('oneshot'), mmls: [bass], offset: 0 });
        break;
      case 'guitar':
        X('mml').ready({ source: X('oneshot'), mmls: [melody], offset: NUMBER_OF_PIANO_KEYBOARDS });
        window.C('mml').ready({ source: X('oneshot'), mmls: [bass], offset: NUMBER_OF_PIANO_KEYBOARDS });
        break;
      case 'electric-guitar':
        X('mml').ready({ source: X('oneshot'), mmls: [melody], offset: (2 * NUMBER_OF_PIANO_KEYBOARDS) });
        window.C('mml').ready({ source: X('oneshot'), mmls: [bass], offset: (2 * NUMBER_OF_PIANO_KEYBOARDS) });
        break;
      case 'whitenoise'   :
      case 'pinknoise'    :
      case 'browniannoise':
        X('mml').ready({ source: X('noise'), mmls: [melody] });
        window.C('mml').ready({ source: X('noise'), mmls: [bass] });
        break;
      default:
        break;
    }
  }, [currentSoundSource]);

  const startMelodyCallback = useCallback((sequence: Sequence) => {
    dispatch(downMelodyKeyboards(sequence.indexes));
    setMelody(X('mml').getMML(0) ?? '');
  }, [dispatch]);

  const startBassCallback = useCallback((sequence: Sequence) => {
    dispatch(downBassKeyboards(sequence.indexes));
    setBass(window.C('mml').getMML(0) ?? '');
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
        X('oscillator').get(i).deactivate();
        window.C('oscillator').get(i).deactivate();
      }
    }

    dispatch(downMelodyKeyboards([]));
    dispatch(downBassKeyboards([]));

    const currentMelody = X('mml').getMML(0)?.replace(CLEAR_HIGHLIGHT_REGEXP, '$1') ?? '';
    const currentBass   = window.C('mml').getMML(0)?.replace(CLEAR_HIGHLIGHT_REGEXP, '$1') ?? '';

    readyMMLCallback(currentMelody, currentBass);

    setMelody(currentMelody);
    setBass(currentBass);
    setPaused(true);
  }, [dispatch, readyMMLCallback]);

  const errorCallbackForMelody = useCallback((error: MMLSyntaxError) => {
    switch (error.token) {
      case 'TEMPO' :
      case 'OCTAVE':
      case 'NOTE'  :
      case 'REST'  :
      case 'TIE'   :
        setErrorMessageForMMLMelody(`${error.token.toLowerCase()} is invalid`);
        break;
      default:
        setErrorMessageForMMLMelody('MML is invalid');
        break;
    }
  }, []);

  const errorCallbackForBass = useCallback((error: MMLSyntaxError) => {
    switch (error.token) {
      case 'TEMPO' :
      case 'OCTAVE':
      case 'NOTE'  :
      case 'REST'  :
      case 'TIE'   :
        setErrorMessageForMMLBass(`${error.token.toLowerCase()} is invalid`);
        break;
      default:
        setErrorMessageForMMLBass('MML is invalid');
        break;
    }
  }, []);

  const onBlurMelodyCallback = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if ((event.currentTarget === null) || (event.currentTarget.textContent === null)) {
      return;
    }

    const currentMelody = event.currentTarget.textContent;

    setMelody(currentMelody);
    setPaused(true);
  }, []);

  const onBlurBassCallback = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if ((event.currentTarget === null) || (event.currentTarget.textContent === null)) {
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
      window.C('mml').currentIndex(0, bassIndex);

      // Start MML
      if (currentSoundSource === 'oscillator') {
        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          X('oscillator').get(i).activate();
          window.C('oscillator').get(i).activate();
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
        if (i !== 0) {
          X('oscillator').get(i).deactivate();
        }

        window.C('oscillator').get(i).deactivate();
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
    X('mml').stop();
    window.C('mml').stop();

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

  const onChangeHightlightCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setHighlight(event.currentTarget.checked);
  }, []);

  const onChangeFileCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = X.file({
      event           : event.nativeEvent as FileEvent,  // HACK:
      type            : 'json',
      successCallback : (_: FileEvent, text: string) => {
        event.currentTarget.value = '';

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
          if (error instanceof Error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        }
      },
      errorCallback   : (event: FileEvent, textStatus: FileReaderErrorText) => {
        setShowProgress(false);
        setErrorMessage(textStatus);
        setIsShowModalForFileUploadError(true);
      },
      progressCallback: (event: ProgressEvent) => {
        const { lengthComputable, loaded, total } = event;

        setShowProgress(lengthComputable);
        setLoadedByte(loaded);
        setRate(lengthComputable && (total > 0) ? Math.trunc((loaded / total) * 100) : 0);
        setIsShowModalForProgress(true);
      }
    });

    if (file instanceof Error) {
      setErrorMessage(file.message);
      setIsShowModalForFileUploadError(true);
    } else if (typeof file !== 'string') {
      setFilename(file.name);
    }
  }, [melody, bass, readyMMLCallback]);

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

  const onDropCallback = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = X.drop({
      event           : event.nativeEvent,
      type            : 'json',
      successCallback : (_: DragEvent, text: string) => {
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
          if (error instanceof Error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        }
      },
      errorCallback   : (event: DragEvent, textStatus: FileReaderErrorText) => {
        setShowProgress(false);
        setErrorMessage(textStatus);
        setIsShowModalForFileUploadError(true);
      },
      progressCallback: (event: ProgressEvent) => {
        const { lengthComputable, loaded, total } = event;

        setShowProgress(lengthComputable);
        setLoadedByte(loaded);
        setRate(lengthComputable && (total > 0) ? Math.trunc((loaded / total) * 100) : 0);
        setIsShowModalForProgress(true);
      }
    });

    if (file instanceof Error) {
      setErrorMessage(file.message);
      setIsShowModalForFileUploadError(true);
    } else if (typeof file !== 'string') {
      setFilename(file.name);
    }

    setDrag(false);
    setDrop(true);
  }, [melody, bass, readyMMLCallback]);

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

  const onChangeSampleMMLCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const sampleMML = JSON.parse(event.currentTarget.value);

    setMelody(sampleMML.melody);
    setBass(sampleMML.bass);
  }, []);

  useEffect(() => {
    if (!loadedApp || loaded) {
      return;
    }

    let unmounted = false;

    X('mml').setup({
      startCallback: startMelodyCallback,
      stopCallback : stopMelodyCallback,
      endedCallback: endedCallback,
      errorCallback: errorCallbackForMelody
    });

    window.C('mml').setup({
      startCallback: startBassCallback,
      stopCallback : stopBassCallback,
      endedCallback: endedCallback,
      errorCallback: errorCallbackForBass
    });

    Promise
      .all([
        fetch('/assets/mmls/endless-rain.json'),
        fetch('/assets/mmls/forever-love.json'),
        fetch('/assets/mmls/tears.json')
      ])
      .then((responses: Response[]) => {
        if (unmounted) {
          return Promise.reject();
        }

        return responses.map((response: Response) => response.json());
      })
      .then((promises: Promise<MMLInfo>[]) => {
        if (unmounted) {
          return;
        }

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

    return () => {
      unmounted = true;
    };
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
    errorCallbackForMelody,
    errorCallbackForBass
  ]);

  return (
    <div id="mml-fieldset" aria-hidden={!active} className={`MML${active ? ' -active' : ''}`}>
      <div className="MML__editor">
        <dl>
          <dt>Melody{errorMessageForMMLMelody ? <span className="MML__error">{errorMessageForMMLMelody}</span> : null}</dt>
          <dd
            contentEditable={active && paused}
            dangerouslySetInnerHTML={{ __html: melody }}
            aria-disabled={!active || !paused}
            className={highlight ? '-highlight' : ''}
            onBlur={onBlurMelodyCallback}
          />
        </dl>
        <dl>
          <dt>Bass{errorMessageForMMLBass ? <span className="MML__error">{errorMessageForMMLBass}</span> : null}</dt>
          <dd
            contentEditable={active && paused}
            dangerouslySetInnerHTML={{ __html: bass }}
            aria-disabled={!active || !paused}
            className={highlight ? '-highlight' : ''}
            onBlur={onBlurBassCallback}
          />
        </dl>
      </div>
      <div className="MML__controllers">
        <button
          type="button"
          disabled={!melody && !bass}
          aria-label={paused ? 'Start' : 'Pause'}
          tabIndex={active ? 0 : -1}
          className={`MML__controller${paused ? ' -paused' : ''}`}
          onClick={onClickMMLControllerCallback}
        />
        <button
          type="button"
          aria-label="Rewind"
          tabIndex={active ? 0 : -1}
          className="MML__rewinder"
          onClick={onClickRewindButtonCallback}
        />
        <a
          href={dataURL}
          download={dataURL ? createFilename('mml-', 'json') : null}
          role="button"
          tabIndex={active ? 0 : -1}
          className="MML__download"
          onClick={onClickDownloadButtonCallback}
        >
          Download
        </a>
        <Switch
          id="mml-switch-highlight"
          label="Highlight"
          checked={highlight}
          tabIndex={active ? 0 : -1}
          onChange={onChangeHightlightCallback}
        />
        <FileUploader
          id="uploader-mml"
          accept="application/json"
          disabled={!paused}
          placeholder="MML JSON file"
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
        <Select
          id="select-mml"
          label="Select Sample MML"
          values={values}
          texts={texts}
          disabled={!paused}
          width="200px"
          tabIndex={active ? 0 : -1}
          onChange={onChangeSampleMMLCallback}
        />
      </div>
      <Modal
        id="modal-mml-file-upload-error"
        hasOverlay
        isShow={isShowModalForFileUploadError}
        title="Error"
        asAlert={true}
        onClose={onCloseModalCallback}
      >
        {errorMessage}
      </Modal>
      <Modal
        id="modal-mml-for-progress"
        hasOverlay
        isShow={isShowModalForProgress}
        title="Progress ..."
        asAlert={false}
      >
        {showProgress ? <ProgressBar id="progress-bar-read-mml" label={`${loadedByte} bytes (${rate} %)`} rate={rate} /> : null}
      </Modal>
      <SelectableModal
        hasOverlay
        id="modal-mml-confirmation"
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
