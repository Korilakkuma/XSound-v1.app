import React, { useState, useEffect, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { createFilename } from '../../../utils';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { ValueController } from '../../helpers/ValueController';
import { SelectableModal } from '../../helpers/SelectableModal';
import { X } from 'xsound';

export interface Props {
  loadedApp: boolean;
  sources: XSoundSource[];
}

const NUMBER_OF_TRACKS = 4;

const CHANNEL = 2;   // Stereo
const BIT     = 16;  // 16 bit
const TYPE    = 'objectURL';

export const RecorderFieldset: React.FC<Props> = (props: Props) => {
  const { loadedApp, sources } = props;

  const [activeTrack, setActiveTrack] = useState<number>(-1);
  const [objectURL, setObjectURL] = useState<string>('');
  const [running, setRunning] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const hasRecordedData = sources.some((source: XSoundSource) => X(source).module('recorder').has());

  const onClickRecordButtonCallback = useCallback(() => {
    sources.forEach((source: XSoundSource) => {
      if (source !== 'oscillator') {
        if (X(source).module('recorder').get() !== -1) {
          X(source).module('recorder').stop();

          setRunning(false);
        } else {
          X(source).module('recorder').ready(activeTrack);

          if (source === 'stream') {
            X(source).start();
            X(source).module('recorder').start();
          }

          setRunning(true);
        }
      }
    });
  }, [sources, activeTrack]);

  const onClickCreateButtonCallback = useCallback(() => {
    setRunning(false);

    for (const source of sources) {
      if (source === 'oscillator') {
        continue;
      }

      setCreating(true);

      const url = X(source).module('recorder').create(-1, CHANNEL, BIT, TYPE);

      if (url) {
        const audio = new Audio(url);

        audio.controls = false;
        audio.play();

        setObjectURL(url);
        setCreating(false);

        return;
      }
    }

    setCreating(false);
  }, [sources]);

  const onClickDownloadButtonCallback = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!objectURL || running) {
      // In the case of recording
      event.preventDefault();
    }
  }, [objectURL, running]);

  const onClickClearButtonCallback = useCallback(() => {
    if (running) {
      // In the case of recording
      return;
    }

    setIsShowModal(true);
  }, [running]);

  const onClickClearTrackCallback = useCallback(() => {
    sources.forEach((source: XSoundSource) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').clear(activeTrack);
      }
    });

    setIsShowModal(false);
  }, [sources, activeTrack]);

  const onClickCancelClearTrackCallback = useCallback(() => {
    setIsShowModal(false);
  }, []);

  const onChangeTrackCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (running) {
      // In the case of recording
      return;
    }

    const nextActiveTrack = parseInt(event.currentTarget.value, 10);

    X('stream').stop();
    X('stream').module('recorder').stop();

    setActiveTrack(nextActiveTrack);
  }, [running]);

  const onChangeLeftChannelGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    sources.forEach((source: XSoundSource) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').param('left', event.currentTarget.valueAsNumber);
      }
    });
  }, [sources]);

  const onChangeRightChannelGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    sources.forEach((source: XSoundSource) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').param('right', event.currentTarget.valueAsNumber);
      }
    });
  }, [sources]);

  useEffect(() => {
    if (!loadedApp || (activeTrack > -1)) {
      return;
    }

    sources.forEach((source: XSoundSource) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').setup(NUMBER_OF_TRACKS);
      }
    });

    setActiveTrack(0);
  }, [loadedApp, sources, activeTrack]);

  return (
    <div className="RecorderFieldset">
      <fieldset>
        <legend>Recorder</legend>
        <div className="RecorderFieldset__buttons">
          <button
            type="button"
            aria-label={running ? 'Stop Recording' : 'Start Recording'}
            className={`RecorderFieldset__controller${running ? ' -active' : ''}`}
            onClick={onClickRecordButtonCallback}
          />
          <button
            type="button"
            disabled={running || !hasRecordedData}
            aria-label={creating ? 'Now creating WAVE file' : 'Create WAVE file'}
            className={`RecorderFieldset__creator${creating ? ' -active' : ''}`}
            onClick={onClickCreateButtonCallback}
          />
          <a
            href={objectURL}
            download={objectURL ? createFilename('record-', 'wav') : null}
            aria-label="Download"
            aria-disabled={running || Boolean(objectURL === '')}
            tabIndex={objectURL === '' ? -1 : 0}
            className="RecorderFieldset__download"
            onClick={onClickDownloadButtonCallback}
          >
            Download
          </a>
          <button
            type="button"
            disabled={running}
            aria-label="Clear Track"
            className="RecorderFieldset__clear"
            onClick={onClickClearButtonCallback}
          />
        </div>
        <Spacer space={16} />
        <Select
          id="select-track"
          label="Select Track"
          values={['0', '1', '2', '3']}
          texts={['track 1', 'track 2', 'track 3', 'track 4']}
          disabled={running}
          onChange={onChangeTrackCallback}
        />
        <Spacer space={16} />
        <ValueController
          label="Left Channel"
          id="recorder-fieldset-left-channel-gain"
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeLeftChannelGainCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Right Channel"
          id="recorder-fieldset-right-channel-gain"
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeRightChannelGainCallback}
        />
      </fieldset>
      <SelectableModal
        hasOverlay
        id="modal-recorder-confirmation"
        isShow={isShowModal}
        title="Confirmation"
        first={{
          label : 'Cancel',
          action: onClickCancelClearTrackCallback
        }}
        second={{
          label : 'OK',
          action: onClickClearTrackCallback
        }}
        onClose={onClickCancelClearTrackCallback}
      >
        <p>Clear Track {activeTrack + 1}. OK ?</p>
      </SelectableModal>
    </div>
  );
};
