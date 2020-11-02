import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class CompressorFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState     = this.onChangeState.bind(this);
    this.onChangeThreshold = this.onChangeThreshold.bind(this);
    this.onChangeKnee      = this.onChangeKnee.bind(this);
    this.onChangeRatio     = this.onChangeRatio.bind(this);
    this.onChangeAttack    = this.onChangeAttack.bind(this);
    this.onChangeRelease   = this.onChangeRelease.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="CompressorFieldset">
        <fieldset>
          <legend>
            <Switch
              defaultChecked
              id="compressor-state"
              label="Compressor"
              onChange={this.onChangeState}
            />
          </legend>
          <ValueController
            label="Threshold"
            id="compressor-threshold"
            defaultValue={-24}
            min={-100}
            max={0}
            step={1}
            onChange={this.onChangeThreshold}
          />
          <Spacer space={8} />
          <ValueController
            label="Knee"
            id="compressor-knee"
            defaultValue={30}
            min={0}
            max={40}
            step={1}
            onChange={this.onChangeKnee}
          />
          <Spacer space={8} />
          <ValueController
            label="Ratio"
            id="compressor-ratio"
            defaultValue={12}
            min={1}
            max={20}
            step={1}
            onChange={this.onChangeRatio}
          />
          <Spacer space={8} />
          <ValueController
            label="Attack"
            id="compressor-attack"
            defaultValue={0.003}
            min={0}
            max={1}
            step={0.001}
            onChange={this.onChangeAttack}
          />
          <Spacer space={8} />
          <ValueController
            label="Release"
            id="compressor-release"
            defaultValue={0.25}
            min={0.01}
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
      X(source).module('compressor').state(state);
    });
  }

  private onChangeThreshold(event: React.SyntheticEvent): void {
    const threshold = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('compressor').param('threshold', threshold);
    });
  }

  private onChangeKnee(event: React.SyntheticEvent): void {
    const knee = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('compressor').param('knee', knee);
    });
  }

  private onChangeRatio(event: React.SyntheticEvent): void {
    const ratio = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('compressor').param('ratio', ratio);
    });
  }

  private onChangeAttack(event: React.SyntheticEvent): void {
    const attack = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('compressor').param('attack', attack);
    });
  }

  private onChangeRelease(event: React.SyntheticEvent): void {
    const release = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('compressor').param('release', release);
    });
  }
}
