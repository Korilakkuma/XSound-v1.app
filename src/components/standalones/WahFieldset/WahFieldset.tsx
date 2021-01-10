import React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class WahFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState     = this.onChangeState.bind(this);
    this.onChangeCutoff    = this.onChangeCutoff.bind(this);
    this.onChangeDepth     = this.onChangeDepth.bind(this);
    this.onChangeRate      = this.onChangeRate.bind(this);
    this.onChangeResonance = this.onChangeResonance.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="WahFieldset">
        <fieldset>
          <legend>
            <Switch
              id="wah-state"
              label="Wah"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <ValueController
            label="Cutoff"
            id="wah-cutoff"
            defaultValue={350}
            min={350}
            max={8000}
            step={1}
            onChange={this.onChangeCutoff}
          />
          <Spacer space={8} />
          <ValueController
            label="Depth"
            id="wah-depth"
            defaultValue={0}
            min={0}
            max={0.9}
            step={0.01}
            onChange={this.onChangeDepth}
          />
          <Spacer space={8} />
          <ValueController
            label="Rate"
            id="wah-rate"
            defaultValue={0}
            min={0}
            max={10}
            step={0.05}
            onChange={this.onChangeRate}
          />
          <Spacer space={8} />
          <ValueController
            label="Resonance"
            id="wah-resonance"
            defaultValue={1}
            min={1}
            max={20}
            step={1}
            onChange={this.onChangeResonance}
          />
          <Spacer space={8} />
        </fieldset>
      </div>
    );
  }

  private onChangeState(event: React.SyntheticEvent): void {
    const state = (event.currentTarget as HTMLInputElement).checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('wah').state(state);
    });
  }

  private onChangeCutoff(event: React.SyntheticEvent): void {
    const cutoff = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('wah').param('cutoff', cutoff);
    });
  }

  private onChangeDepth(event: React.SyntheticEvent): void {
    const depth = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('wah').param('depth', depth);
    });
  }

  private onChangeRate(event: React.SyntheticEvent): void {
    const rate = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('wah').param('rate', rate);
    });
  }

  private onChangeResonance(event: React.SyntheticEvent): void {
    const resonance = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('wah').param('resonance', resonance);
    });
  }
}
