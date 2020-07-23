import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class PhaserFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState     = this.onChangeState.bind(this);
    this.onChangeStage     = this.onChangeStage.bind(this);
    this.onChangeFrequency = this.onChangeFrequency.bind(this);
    this.onChangeDepth     = this.onChangeDepth.bind(this);
    this.onChangeRate      = this.onChangeRate.bind(this);
    this.onChangeMix       = this.onChangeMix.bind(this);
    this.onChangeFeedback  = this.onChangeFeedback.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="PhaserFieldset">
        <fieldset>
          <legend>
            <Switch
              id="phaser-state"
              label="Phaser"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <Select
            values={[
              '0',
              '2',
              '4',
              '8',
              '12',
              '24'
            ]}
            texts={[
              'All-Pass Filter',
              '2 stages',
              '4 stages',
              '8 stages',
              '12 stages',
              '24 stages'
            ]}
            onChange={this.onChangeStage}
          />
          <Spacer space={8} />
          <ValueController
            label="Frequency"
            id="phaser-frequency"
            defaultValue={350}
            min={350}
            max={8000}
            step={1}
            onChange={this.onChangeFrequency}
          />
          <Spacer space={8} />
          <ValueController
            label="Depth"
            id="phaser-depth"
            defaultValue={0}
            min={0}
            max={0.9}
            step={0.05}
            onChange={this.onChangeDepth}
          />
          <Spacer space={8} />
          <ValueController
            label="Rate"
            id="phaser-rate"
            defaultValue={0}
            min={0}
            max={5}
            step={0.05}
            onChange={this.onChangeRate}
          />
          <Spacer space={8} />
          <ValueController
            label="Mix"
            id="phaser-mix"
            defaultValue={0}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeMix}
          />
          <Spacer space={8} />
          <ValueController
            label="Feedback"
            id="phaser-feedback"
            defaultValue={0}
            min={0}
            max={0.95}
            step={0.05}
            onChange={this.onChangeFeedback}
          />
          <Spacer space={8} />
        </fieldset>
      </div>
    );
  }

  private onChangeState(event: React.SyntheticEvent): void {
    const state = event.currentTarget.checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('phaser').state(state);
    });
  }

  private onChangeStage(event: React.SyntheticEvent): void {
    const stage = parseInt(event.currentTarget.value, 10);

    this.props.sources.forEach((source: string) => {
      X(source).module('phaser').param('stage', stage);
    });
  }

  private onChangeFrequency(event: React.SyntheticEvent): void {
    const frequency = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('phaser').param('frequency', frequency);
    });
  }

  private onChangeDepth(event: React.SyntheticEvent): void {
    const depth = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('phaser').param('depth', depth);
    });
  }

  private onChangeRate(event: React.SyntheticEvent): void {
    const rate = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('phaser').param('rate', rate);
    });
  }

  private onChangeMix(event: React.SyntheticEvent): void {
    const mix = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('phaser').param('mix', mix);
    });
  }

  private onChangeFeedback(event: React.SyntheticEvent): void {
    const feedback = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('phaser').param('feedback', feedback);
    });
  }
}
