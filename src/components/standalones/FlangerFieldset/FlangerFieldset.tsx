import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class FlangerFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState    = this.onChangeState.bind(this);
    this.onChangeTime     = this.onChangeTime.bind(this);
    this.onChangeDepth    = this.onChangeDepth.bind(this);
    this.onChangeRate     = this.onChangeRate.bind(this);
    this.onChangeMix      = this.onChangeMix.bind(this);
    this.onChangeTone     = this.onChangeTone.bind(this);
    this.onChangeFeedback = this.onChangeFeedback.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="FlangerFieldset">
        <fieldset>
          <legend>
            <Switch
              id="flanger-state"
              label="Flanger"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <ValueController
            label="Time"
            id="flanger-time"
            defaultValue={0}
            min={0}
            max={10}
            step={0.05}
            onChange={this.onChangeTime}
          />
          <Spacer space={8} />
          <ValueController
            label="Depth"
            id="flanger-depth"
            defaultValue={0}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeDepth}
          />
          <Spacer space={8} />
          <ValueController
            label="Rate"
            id="flanger-rate"
            defaultValue={0}
            min={0}
            max={10}
            step={0.05}
            onChange={this.onChangeRate}
          />
          <Spacer space={8} />
          <ValueController
            label="Mix"
            id="flanger-mix"
            defaultValue={0}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeMix}
          />
          <Spacer space={8} />
          <ValueController
            label="Tone"
            id="flanger-tone"
            defaultValue={4000}
            min={20}
            max={8000}
            step={1}
            onChange={this.onChangeTone}
          />
          <Spacer space={8} />
          <ValueController
            label="Feedback"
            id="flanger-feedback"
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
    const state = (event.currentTarget as HTMLInputElement).checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('flanger').state(state);
    });
  }

  private onChangeTime(event: React.SyntheticEvent): void {
    const time = (event.currentTarget as HTMLInputElement).valueAsNumber / 1000;

    this.props.sources.forEach((source: string) => {
      X(source).module('flanger').param('time', time);
    });
  }

  private onChangeDepth(event: React.SyntheticEvent): void {
    const depth = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('flanger').param('depth', depth);
    });
  }

  private onChangeRate(event: React.SyntheticEvent): void {
    const rate = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('flanger').param('rate', rate);
    });
  }

  private onChangeMix(event: React.SyntheticEvent): void {
    const mix = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('flanger').param('mix', mix);
    });
  }

  private onChangeTone(event: React.SyntheticEvent): void {
    const tone = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('flanger').param('tone', tone);
    });
  }

  private onChangeFeedback(event: React.SyntheticEvent): void {
    const feedback = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('flanger').param('feedback', feedback);
    });
  }
}
