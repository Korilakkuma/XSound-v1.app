import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const PhaserFieldset: React.FC<Props> = (props: Props) => {
  const [phaser, setPhaser] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').state(state);
    });

    window.C('oscillator').module('phaser').state(state);

    setPhaser(state);
  }, [props.sources]);

  const onChangeStageCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const stage = parseInt(event.currentTarget.value, 10);

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('stage', stage);
    });

    window.C('oscillator').module('phaser').param('stage', stage);
  }, [props.sources]);

  const onChangeFrequencyCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const frequency = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('frequency', frequency);
    });

    window.C('oscillator').module('phaser').param('frequency', frequency);
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('depth', depth);
    });

    window.C('oscillator').module('phaser').param('depth', depth);
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('rate', rate);
    });

    window.C('oscillator').module('phaser').param('rate', rate);
  }, [props.sources]);

  const onChangeMixCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mix = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('mix', mix);
    });

    window.C('oscillator').module('phaser').param('mix', mix);
  }, [props.sources]);

  const onChangeFeedbackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const feedback = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('feedback', feedback);
    });

    window.C('oscillator').module('phaser').param('feedback', feedback);
  }, [props.sources]);

  return (
    <div className="PhaserFieldset">
      <fieldset>
        <legend>
          <Switch
            id="phaser-state"
            label="Phaser"
            checked={phaser}
            onChange={onChangeStateCallback}
          />
        </legend>
        <Select
          id="select-phaser-stages"
          label="Select Phaser Stages"
          values={[
            '0',
            '2',
            '4',
            '8',
            '12',
            '24'
          ]}
          texts={[
            'all-pass filter',
            '2 stages',
            '4 stages',
            '8 stages',
            '12 stages',
            '24 stages'
          ]}
          disabled={false}
          onChange={onChangeStageCallback}
          defaultValue="12"
        />
        <Spacer space={8} />
        <ValueController
          label="Frequency"
          id="phaser-frequency"
          defaultValue={350}
          min={350}
          max={8000}
          step={1}
          onChange={onChangeFrequencyCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Depth"
          id="phaser-depth"
          defaultValue={0}
          min={0}
          max={0.9}
          step={0.05}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="phaser-rate"
          defaultValue={0}
          min={0}
          max={5}
          step={0.05}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Mix"
          id="phaser-mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeMixCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Feedback"
          id="phaser-feedback"
          defaultValue={0}
          min={0}
          max={0.95}
          step={0.05}
          onChange={onChangeFeedbackCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
