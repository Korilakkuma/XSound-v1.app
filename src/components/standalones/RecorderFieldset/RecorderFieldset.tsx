import React, { useCallback, useEffect, useMemo, useState } from 'react';

import type { RecordType, QuantizationBit, WaveExportType } from 'xsound';

import { X } from 'xsound';

import { createFilename, getStorage } from '/src/utils';

import type { CustomizedParameters } from '/src/types';

import { Select } from '/src/components/atoms/Select';
import { Spacer } from '/src/components/atoms/Spacer';
import { ParameterController } from '/src/components/helpers/ParameterController';
import { SelectableModal } from '/src/components/helpers/SelectableModal';

export type Props = {
  loadedApp: boolean;
};

export const RecorderFieldset: React.FC<Props> = (props: Props) => {
  const { loadedApp } = props;

  const [activeTrack, setActiveTrack] = useState<number>(-1);
  const [objectURL, setObjectURL] = useState<string>('');
  const [running, setRunning] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [hasRecordedData, sethasRecordedData] = useState<boolean>(false);

  const storage: CustomizedParameters = useMemo(() => {
    return getStorage();
  }, []);

  const channel: RecordType = useMemo(() => {
    return storage.recorder?.channel || 2;
  }, [storage]);

  const bit: QuantizationBit = useMemo(() => {
    return storage.recorder?.bit || 16;
  }, [storage]);

  const type: WaveExportType = useMemo(() => {
    return storage.recorder?.type || 'objectURL';
  }, [storage]);

  const onClickRecordButtonCallback = useCallback(() => {
    if (
      X('mixer').module('recorder').get() !== -1 ||
      X('oneshot').module('recorder').get() !== -1 ||
      X('audio').module('recorder').get() !== -1 ||
      X('noise').module('recorder').get() !== -1
    ) {
      X('mixer').module('recorder').stop();
      X('oneshot').module('recorder').stop();
      X('audio').module('recorder').stop();
      X('noise').module('recorder').stop();

      setRunning(false);
    } else {
      X('mixer').module('recorder').ready(activeTrack);
      X('oneshot').module('recorder').ready(activeTrack);
      X('audio').module('recorder').ready(activeTrack);
      X('noise').module('recorder').ready(activeTrack);

      setRunning(true);
    }

    if (X('stream').module('recorder').get() !== -1) {
      X('stream').module('recorder').stop();

      setRunning(false);
    } else {
      X('stream').module('recorder').ready(activeTrack);
      X('stream').start();
      X('stream').module('recorder').start();

      setRunning(true);
    }

    sethasRecordedData(
      X('mixer').module('recorder').has(-1, -1) ||
        X('oneshot').module('recorder').has(-1, -1) ||
        X('audio').module('recorder').has(-1, -1) ||
        X('stream').module('recorder').has(-1, -1) ||
        X('noise').module('recorder').has(-1, -1)
    );
  }, [activeTrack]);

  const onClickCreateButtonCallback = useCallback(() => {
    setRunning(false);

    if (X('mixer').module('recorder').has(-1, -1)) {
      setCreating(true);

      const url = X('mixer').module('recorder').create(-1, channel, bit, type);

      if (typeof url === 'string') {
        const audio = new Audio(url);

        audio.controls = false;
        audio.play();

        setObjectURL(url);
        setCreating(false);

        return;
      }

      setCreating(false);
    }

    if (X('oneshot').module('recorder').has(-1, -1)) {
      setCreating(true);

      const url = X('oneshot').module('recorder').create(-1, channel, bit, type);

      if (typeof url === 'string') {
        const audio = new Audio(url);

        audio.controls = false;
        audio.play();

        setObjectURL(url);
        setCreating(false);

        return;
      }

      setCreating(false);
    }

    if (X('audio').module('recorder').has(-1, -1)) {
      setCreating(true);

      const url = X('audio').module('recorder').create(-1, channel, bit, type);

      if (typeof url === 'string') {
        const audio = new Audio(url);

        audio.controls = false;
        audio.play();

        setObjectURL(url);
        setCreating(false);

        return;
      }

      setCreating(false);
    }

    if (X('stream').module('recorder').has(-1, -1)) {
      setCreating(true);

      const url = X('stream').module('recorder').create(-1, channel, bit, type);

      if (typeof url === 'string') {
        const audio = new Audio(url);

        audio.controls = false;
        audio.play();

        setObjectURL(url);
        setCreating(false);

        return;
      }

      setCreating(false);
    }

    if (X('noise').module('recorder').has(-1, -1)) {
      setCreating(true);

      const url = X('noise').module('recorder').create(-1, channel, bit, type);

      if (typeof url === 'string') {
        const audio = new Audio(url);

        audio.controls = false;
        audio.play();

        setObjectURL(url);
        setCreating(false);

        return;
      }

      setCreating(false);
    }
  }, [channel, bit, type]);

  const onClickDownloadButtonCallback = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!objectURL || running) {
        // In the case of recording
        event.preventDefault();
      }
    },
    [objectURL, running]
  );

  const onClickClearButtonCallback = useCallback(() => {
    if (running) {
      // In the case of recording
      return;
    }

    setIsShowModal(true);
  }, [running]);

  const onClickClearTrackCallback = useCallback(() => {
    X('mixer').module('recorder').clear(activeTrack);
    X('oneshot').module('recorder').clear(activeTrack);
    X('audio').module('recorder').clear(activeTrack);
    X('stream').module('recorder').clear(activeTrack);
    X('noise').module('recorder').clear(activeTrack);

    sethasRecordedData(
      X('mixer').module('recorder').has(-1, -1) ||
        X('oneshot').module('recorder').has(-1, -1) ||
        X('audio').module('recorder').has(-1, -1) ||
        X('stream').module('recorder').has(-1, -1) ||
        X('noise').module('recorder').has(-1, -1)
    );

    setIsShowModal(false);
  }, [activeTrack]);

  const onClickCancelClearTrackCallback = useCallback(() => {
    setIsShowModal(false);
  }, []);

  const onChangeTrackCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (running) {
        // In the case of recording
        return;
      }

      const nextActiveTrack = Number(event.currentTarget.value);

      X('stream').stop();
      X('stream').module('recorder').stop();

      setActiveTrack(nextActiveTrack);
    },
    [running]
  );

  const onChangeLeftChannelGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('mixer').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
    X('oneshot').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
    X('audio').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
    X('stream').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
    X('noise').module('recorder').param({ '0': event.currentTarget.valueAsNumber });
  }, []);

  const onChangeRightChannelGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    X('mixer').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
    X('oneshot').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
    X('audio').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
    X('stream').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
    X('noise').module('recorder').param({ '1': event.currentTarget.valueAsNumber });
  }, []);

  useEffect(() => {
    if (!loadedApp || activeTrack > -1) {
      return;
    }

    setActiveTrack(0);
  }, [loadedApp, activeTrack]);

  return (
    <div className='RecorderFieldset'>
      <fieldset>
        <legend>Recorder</legend>
        <div className='RecorderFieldset__buttons'>
          <button
            type='button'
            aria-label={running ? 'Stop Recording' : 'Start Recording'}
            className={`RecorderFieldset__controller${running ? ' -active' : ''}`}
            onClick={onClickRecordButtonCallback}
          />
          <button
            type='button'
            disabled={running || !hasRecordedData}
            aria-label={creating ? 'Now creating WAVE file' : 'Create WAVE file'}
            className={`RecorderFieldset__creator${creating ? ' -active' : ''}`}
            onClick={onClickCreateButtonCallback}
          />
          <a
            href={objectURL}
            download={objectURL ? createFilename('record-', 'wav') : null}
            aria-disabled={running || Boolean(objectURL === '')}
            tabIndex={objectURL === '' ? -1 : 0}
            className='RecorderFieldset__download'
            onClick={onClickDownloadButtonCallback}
          >
            Download
          </a>
          <button type='button' disabled={running} aria-label='Clear Track' className='RecorderFieldset__clear' onClick={onClickClearButtonCallback} />
        </div>
        <Spacer space={24} />
        <Select
          label='Select Track'
          values={['0', '1', '2', '3']}
          texts={['track 1', 'track 2', 'track 3', 'track 4']}
          disabled={running}
          onChange={onChangeTrackCallback}
        />
        <Spacer space={24} />
        <ParameterController label='Left Channel' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeLeftChannelGainCallback} />
        <Spacer space={8} />
        <ParameterController
          label='Right Channel'
          autoupdate={false}
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeRightChannelGainCallback}
        />
      </fieldset>
      <SelectableModal
        hasOverlay={true}
        isShow={isShowModal}
        title='Confirmation'
        first={{
          label: 'Cancel',
          action: onClickCancelClearTrackCallback
        }}
        second={{
          label: 'OK',
          action: onClickClearTrackCallback
        }}
        onClose={onClickCancelClearTrackCallback}
      >
        <p>Clear Track {activeTrack + 1}. OK ?</p>
      </SelectableModal>
    </div>
  );
};
