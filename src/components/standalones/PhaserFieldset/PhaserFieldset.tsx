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

  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').state(state);
    });

    setPhaser(state);
  }, [props.sources]);

  const onChangeStageCallback = useCallback((event: React.SyntheticEvent) => {
    const stage = parseInt((event.currentTarget as HTMLInputElement).value, 10);

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('stage', stage);
    });
  }, [props.sources]);

  const onChangeFrequencyCallback = useCallback((event: React.SyntheticEvent) => {
    const frequency = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('frequency', frequency);
    });
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.SyntheticEvent) => {
    const depth = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('depth', depth);
    });
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.SyntheticEvent) => {
    const rate = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('rate', rate);
    });
  }, [props.sources]);

  const onChangeMixCallback = useCallback((event: React.SyntheticEvent) => {
    const mix = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('mix', mix);
    });
  }, [props.sources]);

  const onChangeFeedbackCallback = useCallback((event: React.SyntheticEvent) => {
    const feedback = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('phaser').param('feedback', feedback);
    });
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
            'ALL-PASS FILTER',
            '2 STAGES',
            '4 STAGES',
            '8 STAGES',
            '12 STAGES',
            '24 STAGES'
          ]}
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
