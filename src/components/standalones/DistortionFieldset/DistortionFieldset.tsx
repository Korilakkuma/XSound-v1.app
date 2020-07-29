import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class DistortionFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState   = this.onChangeState.bind(this);
    this.onChangeCurve   = this.onChangeCurve.bind(this);
    this.onChangeSamples = this.onChangeSamples.bind(this);
    this.onChangeAmount  = this.onChangeAmount.bind(this);
    this.onChangeDrive   = this.onChangeDrive.bind(this);
    this.onChangeColor   = this.onChangeColor.bind(this);
    this.onChangeTone    = this.onChangeTone.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="DistortionFieldset">
        <fieldset>
          <legend>
            <Switch
              id="distortion-state"
              label="Distortion"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <Select
            values={[
              'clean',
              'crunch',
              'overdrive',
              'distortion',
              'fuzz'
            ]}
            texts={[
              'CLEAN',
              'CRUNCH',
              'OVERDRIVE',
              'DISTORTION',
              'FUZZ'
            ]}
            onChange={this.onChangeCurve}
          />
          <Spacer space={8} />
          <Select
            values={[
              '8',
              '16',
              '32',
              '64',
              '128',
              '256',
              '512',
              '1024',
              '2048',
              '4096',
              '8192',
              '16384',
              '32768',
              '65536'
            ]}
            texts={[
              '8',
              '16',
              '32',
              '64',
              '128',
              '256',
              '512',
              '1024',
              '2048',
              '4096',
              '8192',
              '16384',
              '32768',
              '65536'
            ]}
            onChange={this.onChangeSamples}
            defaultValue="32768"
          />
          <Spacer space={8} />
          <ValueController
            label="Amount"
            id="distortion-amount"
            defaultValue={0.5}
            min={0.05}
            max={0.95}
            step={0.05}
            onChange={this.onChangeAmount}
          />
          <Spacer space={8} />
          <ValueController
            label="Drive"
            id="distortion-drive"
            defaultValue={1}
            min={0}
            max={100}
            step={1}
            onChange={this.onChangeDrive}
          />
          <Spacer space={8} />
          <ValueController
            label="Color"
            id="distortion-color"
            defaultValue={2000}
            min={20}
            max={2000}
            step={1}
            onChange={this.onChangeColor}
          />
          <Spacer space={8} />
          <ValueController
            label="Tone"
            id="distortion-tone"
            defaultValue={4000}
            min={20}
            max={8000}
            step={1}
            onChange={this.onChangeTone}
          />
          <Spacer space={8} />
        </fieldset>
      </div>
    );
  }

  private onChangeState(event: React.SyntheticEvent): void {
    const state = event.currentTarget.checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('distortion').state(state);
    });
  }

  private onChangeCurve(event: React.SyntheticEvent): void {
    const curve = event.currentTarget.value;

    this.props.sources.forEach((source: string) => {
      X(source).module('distortion').param('curve', curve);
    });
  }

  private onChangeSamples(event: React.SyntheticEvent): void {
    const samples = parseInt(event.currentTarget.value, 10);

    this.props.sources.forEach((source: string) => {
      X(source).module('distortion').param('samples', samples);
    });
  }

  private onChangeAmount(event: React.SyntheticEvent): void {
    const amount = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('distortion').param('amount', amount);
    });
  }

  private onChangeDrive(event: React.SyntheticEvent): void {
    const drive = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('distortion').param('drive', drive);
    });
  }

  private onChangeColor(event: React.SyntheticEvent): void {
    const color = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('distortion').param('color', color);
    });
  }

  private onChangeTone(event: React.SyntheticEvent): void {
    const tone = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('distortion').param('tone', tone);
    });
  }
}
