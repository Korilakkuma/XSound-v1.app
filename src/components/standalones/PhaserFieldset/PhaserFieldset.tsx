import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const PhaserFieldset: React.FC<Props> = () => {
  const [phaser, setPhaser] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('phaser').activate();
      X('oneshot').module('phaser').activate();
      X('audio').module('phaser').activate();
      X('stream').module('phaser').activate();
      X('noise').module('phaser').activate();
      X('oscillator').module('phaser').activate();
      window.C('oscillator').module('phaser').activate();
    } else {
      X('mixer').module('phaser').deactivate();
      X('oneshot').module('phaser').deactivate();
      X('audio').module('phaser').deactivate();
      X('stream').module('phaser').deactivate();
      X('noise').module('phaser').deactivate();
      X('oscillator').module('phaser').deactivate();
      window.C('oscillator').module('phaser').deactivate();
    }

    setPhaser(checked);
  }, []);

  const onChangeStageCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const stage = parseInt(event.currentTarget.value, 10);

    switch (stage) {
      case  2:
      case  4:
      case  8:
      case 12:
      case 24:
        X('mixer').module('phaser').param({ stage });
        X('oneshot').module('phaser').param({ stage });
        X('audio').module('phaser').param({ stage });
        X('stream').module('phaser').param({ stage });
        X('noise').module('phaser').param({ stage });
        X('oscillator').module('phaser').param({ stage });
        window.C('oscillator').module('phaser').param({ stage });

        break;
      default:
        break;
    }
  }, []);

  const onChangeFrequencyCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const frequency = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ frequency });
    X('oneshot').module('phaser').param({ frequency });
    X('audio').module('phaser').param({ frequency });
    X('stream').module('phaser').param({ frequency });
    X('noise').module('phaser').param({ frequency });
    X('oscillator').module('phaser').param({ frequency });
    window.C('oscillator').module('phaser').param({ frequency });
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ depth });
    X('oneshot').module('phaser').param({ depth });
    X('audio').module('phaser').param({ depth });
    X('stream').module('phaser').param({ depth });
    X('noise').module('phaser').param({ depth });
    X('oscillator').module('phaser').param({ depth });
    window.C('oscillator').module('phaser').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ rate });
    X('oneshot').module('phaser').param({ rate });
    X('audio').module('phaser').param({ rate });
    X('stream').module('phaser').param({ rate });
    X('noise').module('phaser').param({ rate });
    X('oscillator').module('phaser').param({ rate });
    window.C('oscillator').module('phaser').param({ rate });
  }, []);

  const onChangeMixCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mix = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ mix });
    X('oneshot').module('phaser').param({ mix });
    X('audio').module('phaser').param({ mix });
    X('stream').module('phaser').param({ mix });
    X('noise').module('phaser').param({ mix });
    X('oscillator').module('phaser').param({ mix });
    window.C('oscillator').module('phaser').param({ mix });
  }, []);

  const onChangeFeedbackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const feedback = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ feedback });
    X('oneshot').module('phaser').param({ feedback });
    X('audio').module('phaser').param({ feedback });
    X('stream').module('phaser').param({ feedback });
    X('noise').module('phaser').param({ feedback });
    X('oscillator').module('phaser').param({ feedback });
    window.C('oscillator').module('phaser').param({ feedback });
  }, []);

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
