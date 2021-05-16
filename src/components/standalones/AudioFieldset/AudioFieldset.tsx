import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ConvertedTime } from '../../../types';
import { formatAudioTime } from '../../../utils';
import { Spacer } from '../../atoms/Spacer';
import { FileUploader } from '../../atoms/FileUploader';
import { Button } from '../../atoms/Button';
import { ProgressBar } from '../../atoms/ProgressBar';
import { Modal } from '../../atoms/Modal';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  loadedApp: boolean;
}

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

  const decodeCallback = useCallback(() => {
    setShowProgress(true);
    setLoadedByte(0);
    setRate(0);
    setIsShowModalForProgress(false);
    setIsShowModalForDecoding(true);
  }, []);

  const readFileCallback = useCallback((event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    const options = {
      event   : event.nativeEvent,
      type    : 'ArrayBuffer',
      success : (event: Event, arrayBuffer: ArrayBuffer) => {
        X('audio').ready(arrayBuffer);

        (event.currentTarget as HTMLInputElement).value = '';
      },
      error   : (error: Error) => {
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
  }, []);

  const onChangeFileCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    readFileCallback(event);
  }, [readFileCallback]);

  const onDragEnterCallback = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(true);
  }, []);

  const onDragOverCallback = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(false);
  }, []);

  const onDragLeaveCallback = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const onDropCallback = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    readFileCallback(event);

    setDrag(false);
    setDrop(true);
  }, [readFileCallback]);

  const onClickCallback = useCallback(() => {
    if (!X('audio').isBuffer()) {
      return;
    }

    if (X('audio').isPaused()) {
      X('audio').start(X('audio').param('currentTime'));
      setPaused(false);
    } else {
      X('audio').stop();
      setPaused(true);
    }
  }, []);

  const onChangeCurrentTimeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('audio').param('currentTime', event.currentTarget.valueAsNumber);
  }, []);

  const onChangePitchCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('audio').module('pitchshifter').param('pitch', event.currentTarget.valueAsNumber);
    X('stream').module('pitchshifter').param('pitch', event.currentTarget.valueAsNumber);
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('audio').module('vocalcanceler').param('depth', event.currentTarget.valueAsNumber);
  }, []);

  const onCloseModalCallback = useCallback(() => {
    setIsShowModalForFileUploadError(false);
    setIsShowModalForDecodingError(false);
  }, []);

  const readyCallback = useCallback((buffer: AudioBuffer) => {
    setDuration(buffer.duration);
    setIsShowModalForDecoding(false);
  }, []);

  const startCallback = useCallback(() => {
    X('audio').module('recorder').start();
    // X('audio').module('session').start();
  }, []);

  const stopCallback = useCallback(() => {
    // TODO: do something ...
  }, []);

  const updateCallback = useCallback((source: AudioBufferSourceNode, currentTime: number) => {
    if (source.buffer === null) {
      return;
    }

    const index = Math.floor(currentTime * source.buffer.sampleRate);

    if ((index % source.buffer.sampleRate) !== 0) {
      return;
    }

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

  const convertedCurrenTime = useMemo(() => X.convertTime(currentTime) as ConvertedTime, [currentTime]);
  const convertedDuration   = useMemo(() => X.convertTime(duration) as ConvertedTime, [duration]);

  const currentTimeText = useMemo(() => `${formatAudioTime(convertedCurrenTime)}`, [convertedCurrenTime]);
  const durationText    = useMemo(() => `${formatAudioTime(convertedDuration)}`, [convertedDuration]);

  useEffect(() => {
    if (!props.loadedApp || loaded) {
      return;
    }

    X('audio').setup({
      decode: decodeCallback,
      ready : readyCallback,
      start : startCallback,
      stop  : stopCallback,
      update: updateCallback,
      ended : endedCallback,
      error : errorCallback
    });

    setLoaded(true);
  }, [
    props.loadedApp,
    loaded,
    decodeCallback,
    readyCallback,
    startCallback,
    stopCallback,
    updateCallback,
    endedCallback,
    errorCallback
  ]);

  return (
    <div className="AudioFieldset">
      <fieldset>
        <legend>Audio</legend>
        <div className="AudioFieldset__selectAudio">
          <FileUploader
            id="uploader-audio"
            accept="audio/*, audio/mpeg, audio/ogg"
            placeholder="Audio File (wav, ogg, mp3 ... etc)"
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
            image="/assets/images/button-audio.png"
            size="70px 99px"
            onClick={onClickCallback}
          />
        </div>
        <ValueController
          label={`${currentTimeText} / ${durationText}`}
          id="audio-fieldset-current-time"
          defaultValue={Math.floor(currentTime)}
          min={0}
          max={duration > 0 ? duration : 0}
          step={1}
          onChange={onChangeCurrentTimeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Pitch Shifter"
          id="audio-fieldset-pitch"
          defaultValue={1}
          min={0.05}
          max={4}
          step={0.05}
          onChange={onChangePitchCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Vocal Canceler"
          id="audio-fieldset-vocal-canceler"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeDepthCallback}
        />
      </fieldset>
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
        isShow={isShowModalForDecodingError}
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
        {showProgress ? <ProgressBar id="progress-bar-read-audio" label={`${loadedByte} bytes (${rate} %)`} rate={rate} /> : null}
      </Modal>
      <Modal
        hasOverlay
        isShow={isShowModalForDecoding}
        title="Decoding ..."
      >
        {showProgress ? <ProgressBar /> : null}
      </Modal>
    </div>
  );
};
