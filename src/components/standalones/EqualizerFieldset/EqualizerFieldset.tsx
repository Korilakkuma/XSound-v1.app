import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const EqualizerFieldset: React.FC<Props> = (props: Props) => {
  const [equalizer, setEqualizer] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('equalizer').state(state);
    });

    window.C('oscillator').module('equalizer').state(state);

    setEqualizer(state);
  }, [props.sources]);

  const onChangeBassCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const bass = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('equalizer').param('bass', bass);
    });

    window.C('oscillator').module('equalizer').param('bass', bass);
  }, [props.sources]);

  const onChangeMiddleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const middle = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('equalizer').param('middle', middle);
    });

    window.C('oscillator').module('equalizer').param('middle', middle);
  }, [props.sources]);

  const onChangeTrebleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const treble = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('equalizer').param('treble', treble);
    });

    window.C('oscillator').module('equalizer').param('treble', treble);
  }, [props.sources]);

  const onChangePresenceCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const presence = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('equalizer').param('presence', presence);
    });

    window.C('oscillator').module('equalizer').param('presence', presence);
  }, [props.sources]);

  return (
    <div className="EqualizerFieldset">
      <fieldset>
        <legend>
          <Switch
            id="equalizer-state"
            label="Equalizer"
            checked={equalizer}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Bass"
          id="equalizer-bass"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeBassCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Middle"
          id="equalizer-middle"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeMiddleCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Treble"
          id="equalizer-treble"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeTrebleCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Presence"
          id="equalizer-presence"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangePresenceCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
