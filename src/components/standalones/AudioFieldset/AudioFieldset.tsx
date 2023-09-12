import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { X } from 'xsound';

import { formatAudioTime, getStorage } from '/src/utils';
import { Button } from '/src/components/atoms/Button';
import { FileUploader } from '/src/components/atoms/FileUploader';
import { Modal } from '/src/components/atoms/Modal';
import { ProgressBar } from '/src/components/atoms/ProgressBar';
import { Spacer } from '/src/components/atoms/Spacer';
import { ParameterController } from '/src/components/helpers/ParameterController';

import type { FileEvent, FileReaderErrorText } from 'xsound';

export type Props = {
  loadedApp: boolean;
};

export const AudioFieldset: React.FC<Props> = (props: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>('');
  const [paused, setPaused] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [drag, setDrag] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [loadedByte, setLoadedByte] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShowModalForFileUploadError, setIsShowModalForFileUploadError] = useState<boolean>(false);
  const [isShowModalForDecodingError, setIsShowModalForDecodingError] = useState<boolean>(false);
  const [isShowModalForProgress, setIsShowModalForProgress] = useState<boolean>(false);
  const [isShowModalForDecoding, setIsShowModalForDecoding] = useState<boolean>(false);

  const storage = useMemo(() => {
    return getStorage();
  }, []);

  const usePlaybackRate = useMemo(() => {
    return storage.audio?.playbackRate === true;
  }, [storage]);

  const startDecodeCallback = useCallback(() => {
    setShowProgress(true);
    setLoadedByte(0);
    setRate(0);
    setIsShowModalForProgress(false);
    setIsShowModalForDecoding(true);
  }, []);

  const onChangeFileCallback = useCallback(
    (event: React.BaseSyntheticEvent<FileEvent>) => {
      const file = X.file({
        event: event.nativeEvent,
        type: 'arraybuffer',
        successCallback: (_: ProgressEvent, arraybuffer: ArrayBuffer) => {
          event.nativeEvent.target.value = '';

          startDecodeCallback();
          X('audio').ready(arraybuffer);
        },
        errorCallback: (_: ProgressEvent, textStatus: FileReaderErrorText) => {
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
    [startDecodeCallback]
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
      const file = X.drop({
        event: event.nativeEvent,
        type: 'arraybuffer',
        successCallback: (_: ProgressEvent, arraybuffer: ArrayBuffer) => {
          startDecodeCallback();
          X('audio').ready(arraybuffer);
        },
        errorCallback: (_: ProgressEvent, textStatus: FileReaderErrorText) => {
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
    [startDecodeCallback]
  );

  const onClickCallback = useCallback(() => {
    if (!X('audio').has()) {
      return;
    }

    if (X('audio').paused()) {
      X('audio').start(X('audio').param('currentTime'));
      X('audio').module('recorder').start();
      setPaused(false);
    } else {
      X('audio').stop();
      setPaused(true);
    }
  }, []);

  const onChangeCurrentTimeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('audio').param({ currentTime: event.currentTarget.valueAsNumber });

    setCurrentTime(X('audio').param('currentTime'));
  }, []);

  const onChangePitchCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('audio').module('pitchshifter').param({ pitch: event.currentTarget.valueAsNumber });
    X('stream').module('pitchshifter').param({ pitch: event.currentTarget.valueAsNumber });
  }, []);

  const onChangePlaybackRate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('audio').param({ playbackRate: event.currentTarget.valueAsNumber });
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('audio').module('vocalcanceler').param({ depth: event.currentTarget.valueAsNumber });
  }, []);

  const onCloseModalCallback = useCallback(() => {
    setIsShowModalForFileUploadError(false);
    setIsShowModalForDecodingError(false);
  }, []);

  const decodeCallback = useCallback((buffer: AudioBuffer) => {
    setDuration(buffer.duration);
    setIsShowModalForDecoding(false);
  }, []);

  const updateCallback = useCallback((source: AudioBufferSourceNode, currentTime: number) => {
    setCurrentTime(currentTime);
  }, []);

  const endedCallback = useCallback(() => {
    setPaused(true);
    setCurrentTime(0);

    X('audio').module('analyser').domain('timeoverview', 0).update(0);
    X('audio').module('analyser').domain('timeoverview', 1).update(0);
  }, []);

  const errorCallback = useCallback((error: Error) => {
    setErrorMessage(error.message);
    setIsShowModalForDecodingError(true);
  }, []);

  const convertedCurrenTime = useMemo(() => X.convertTime(currentTime), [currentTime]);
  const convertedDuration = useMemo(() => X.convertTime(duration), [duration]);

  const currentTimeText = useMemo(() => `${formatAudioTime(convertedCurrenTime)}`, [convertedCurrenTime]);
  const durationText = useMemo(() => `${formatAudioTime(convertedDuration)}`, [convertedDuration]);

  useEffect(() => {
    if (!props.loadedApp || loaded) {
      return;
    }

    X('audio').setup({
      decodeCallback,
      updateCallback,
      endedCallback,
      errorCallback
    });

    setLoaded(true);
  }, [props.loadedApp, loaded, decodeCallback, updateCallback, endedCallback, errorCallback]);

  return (
    <div className='AudioFieldset'>
      <fieldset>
        <legend>Audio</legend>
        <div className='AudioFieldset__selectAudio'>
          <FileUploader
            accept='audio/*, audio/mpeg, audio/ogg'
            disabled={false}
            placeholder='Audio File (wav, ogg, mp3 ... etc)'
            filename={filename}
            drag={drag}
            drop={drop}
            onChange={onChangeFileCallback}
            onDragEnter={onDragEnterCallback}
            onDragOver={onDragOverCallback}
            onDragLeave={onDragLeaveCallback}
            onDrop={onDropCallback}
          />
          <Button
            active={!paused}
            label={paused ? 'Start Audio' : 'Stop Audio'}
            width={70}
            height={33}
            image='/assets/images/button-audio.png'
            size='70px 99px'
            onClick={onClickCallback}
          />
        </div>
        <Spacer space={20} />
        <ParameterController
          label={`${currentTimeText} / ${durationText}`}
          autoupdate={true}
          defaultValue={Math.trunc(currentTime)}
          min={0}
          max={duration > 0 ? duration : 0}
          step={1}
          onChange={onChangeCurrentTimeCallback}
        />
        <Spacer space={8} />
        {usePlaybackRate ? (
          <ParameterController label='Playback Rate' autoupdate={false} defaultValue={1} min={0.05} max={2} step={0.025} onChange={onChangePlaybackRate} />
        ) : (
          <ParameterController label='Pitch Shifter' autoupdate={false} defaultValue={1} min={0.05} max={4} step={0.025} onChange={onChangePitchCallback} />
        )}
        <Spacer space={8} />
        <ParameterController label='Vocal Canceler' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeDepthCallback} />
      </fieldset>
      <Modal isShow={isShowModalForFileUploadError} title='Error' hasOverlay={true} asAlert={true} onClose={onCloseModalCallback}>
        {errorMessage}
      </Modal>
      <Modal isShow={isShowModalForDecodingError} title='Error' hasOverlay={true} asAlert={true} onClose={onCloseModalCallback}>
        {errorMessage}
      </Modal>
      <Modal isShow={isShowModalForProgress} title='Progress ...' hasOverlay={true} asAlert={false}>
        {showProgress ? <ProgressBar label={`${loadedByte} bytes (${rate} %)`} rate={rate} /> : null}
      </Modal>
      <Modal isShow={isShowModalForDecoding} title='Decoding ...' hasOverlay={true} asAlert={false}>
        {showProgress ? <ProgressBar /> : null}
      </Modal>
    </div>
  );
};
