import React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class FilterFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState     = this.onChangeState.bind(this);
    this.onChangeType      = this.onChangeType.bind(this);
    this.onChangeFrequency = this.onChangeFrequency.bind(this);
    this.onChangeQuality   = this.onChangeQuality.bind(this);
    this.onChangeGain      = this.onChangeGain.bind(this);
    this.onChangeAttack    = this.onChangeAttack.bind(this);
    this.onChangeDecay     = this.onChangeDecay.bind(this);
    this.onChangeSustain   = this.onChangeSustain.bind(this);
    this.onChangeRelease   = this.onChangeRelease.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="FilterFieldset">
        <fieldset>
          <legend>
            <Switch
              id="filter-state"
              label="Filter"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <Select
            values={[
              'lowpass',
              'highpass',
              'bandpass',
              'lowshelf',
              'highshelf',
              'peaking',
              'notch',
              'allpass'
            ]}
            texts={[
              'LOWPASS',
              'HIGHPASS',
              'BANDPASS',
              'LOWSHELF',
              'HIGHSHELF',
              'PEAKING',
              'NOTCH',
              'ALLPASS'
            ]}
            onChange={this.onChangeType}
          />
          <Spacer space={8} />
          <ValueController
            label="Frequency"
            id="filter-frequency"
            defaultValue={8000}
            min={20}
            max={22050}
            step={1}
            onChange={this.onChangeFrequency}
          />
          <Spacer space={8} />
          <ValueController
            label="Quality"
            id="filter-quality"
            defaultValue={1}
            min={1}
            max={20}
            step={1}
            onChange={this.onChangeQuality}
          />
          <Spacer space={8} />
          <ValueController
            label="Gain"
            id="filter-gain"
            defaultValue={0}
            min={-18}
            max={18}
            step={1}
            onChange={this.onChangeGain}
          />
          <Spacer space={8} />
          <ValueController
            label="Attack"
            id="filter-attack"
            defaultValue={0.01}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeAttack}
          />
          <Spacer space={8} />
          <ValueController
            label="Decay"
            id="filter-decay"
            defaultValue={0.3}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeDecay}
          />
          <Spacer space={8} />
          <ValueController
            label="Sustain"
            id="filter-sustain"
            defaultValue={0.5}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeSustain}
          />
          <Spacer space={8} />
          <ValueController
            label="Release"
            id="filter-release"
            defaultValue={1}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeRelease}
          />
          <Spacer space={8} />
        </fieldset>
      </div>
    );
  }

  private onChangeState(event: React.SyntheticEvent): void {
    const state = (event.currentTarget as HTMLInputElement).checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').state(state);
    });
  }

  private onChangeType(event: React.SyntheticEvent): void {
    const type = (event.currentTarget as HTMLInputElement).value;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').param('type', type);
    });
  }

  private onChangeFrequency(event: React.SyntheticEvent): void {
    const frequency = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').param('frequency', frequency);
    });
  }

  private onChangeQuality(event: React.SyntheticEvent): void {
    const quality = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').param('Q', quality);
    });
  }

  private onChangeGain(event: React.SyntheticEvent): void {
    const gain = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').param('gain', gain);
    });
  }

  private onChangeAttack(event: React.SyntheticEvent): void {
    const attack = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').param('attack', attack);
    });
  }

  private onChangeDecay(event: React.SyntheticEvent): void {
    const decay = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').param('decay', decay);
    });
  }

  private onChangeSustain(event: React.SyntheticEvent): void {
    const sustain = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').param('sustain', sustain);
    });
  }

  private onChangeRelease(event: React.SyntheticEvent): void {
    const release = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('filter').param('release', release);
    });
  }
}
