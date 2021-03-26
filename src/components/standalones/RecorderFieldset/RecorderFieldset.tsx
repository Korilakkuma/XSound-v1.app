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

  const onClickRecordButtonCallback = useCallback(() => {
    if (running) {
      sources.forEach((source: XSoundSource) => {
        if (source !== 'oscillator') {
          X(source).module('recorder').stop();
        }
      });

      setRunning(false);
    } else {
      sources.forEach((source: XSoundSource) => {
        if (source !== 'oscillator') {
          X(source).module('recorder').ready(activeTrack);

          if (source === 'stream') {
            X(source).module('recorder').start();
          }
        }
      });

      setRunning(true);
    }
  }, [sources, activeTrack, running]);

  const onClickCreateButtonCallback = useCallback(() => {
    setRunning(false);

    for (const source of sources) {
      if (source === 'oscillator') {
        continue;
      }

      setCreating(true);

      const url = X(source).module('recorder').create('all', CHANNEL, BIT, TYPE);

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

  const onClickDownloadButtonCallback = useCallback((event: React.SyntheticEvent) => {
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

  const onChangeTrackCallback = useCallback((event: React.SyntheticEvent) => {
    if (running) {
      // In the case of recording
      return;
    }

    const nextActiveTrack = parseInt((event.currentTarget as HTMLInputElement).value, 10);

    sources.forEach((source: XSoundSource) => {
      if (source !== 'oscillator') {
        if (source === 'stream') {
          X('stream').stop();
          X('stream').module('recorder').stop();
        }

        X(source).module('recorder').ready(nextActiveTrack);

        if (source === 'stream') {
          X('stream').start();
          X('stream').module('recorder').start();
        }
      }
    });

    setActiveTrack(nextActiveTrack);
  }, [sources, running]);

  const onChangeLeftChannelGainCallback = useCallback((event: React.SyntheticEvent) => {
    sources.forEach((source: XSoundSource) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').param('gainL', (event.currentTarget as HTMLInputElement).valueAsNumber);
      }
    });
  }, [sources]);

  const onChangeRightChannelGainCallback = useCallback((event: React.SyntheticEvent) => {
    sources.forEach((source: XSoundSource) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').param('gainR', (event.currentTarget as HTMLInputElement).valueAsNumber);
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
            className={`RecorderFieldset__controller${running ? ' -active' : ''}`}
            aria-label={running ? 'Stop Recording' : 'Start Recording'}
            onClick={onClickRecordButtonCallback}
          >
          </button>
          <button
            type="button"
            className={`RecorderFieldset__creator${creating ? ' -active' : ''}`}
            aria-label={creating ? 'Now creating WAVE file' : 'Create WAVE file'}
            onClick={onClickCreateButtonCallback}
          >
          </button>
          <a
            href={objectURL}
            download={objectURL ? createFilename('record-', '.wav') : null}
            className="RecorderFieldset__download"
            aria-label="Download"
            aria-disabled={Boolean(objectURL === '')}
            onClick={onClickDownloadButtonCallback}
          >
          </a>
          <button
            type="button"
            className="RecorderFieldset__clear"
            aria-label="Clear Track"
            onClick={onClickClearButtonCallback}
          >
          </button>
        </div>
        <Spacer space={16} />
        <Select
          id="select-track"
          label="Select Track"
          values={['0', '1', '2', '3']}
          texts={['TRACK 1', 'TRACK 2', 'TRACK 3', 'TRACK 4']}
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
