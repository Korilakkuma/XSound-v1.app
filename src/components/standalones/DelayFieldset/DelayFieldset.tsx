import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class DelayFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState    = this.onChangeState.bind(this);
    this.onChangeTime     = this.onChangeTime.bind(this);
    this.onChangeDry      = this.onChangeDry.bind(this);
    this.onChangeWet      = this.onChangeWet.bind(this);
    this.onChangeTone     = this.onChangeTone.bind(this);
    this.onChangeFeedback = this.onChangeFeedback.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="DelayFieldset">
        <fieldset>
          <legend>
            <Switch
              id="delay-state"
              label="Delay"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <ValueController
            label="Time"
            id="delay-time"
            defaultValue={0}
            min={0}
            max={1000}
            step={1}
            onChange={this.onChangeTime}
          />
          <Spacer space={8} />
          <ValueController
            label="Dry"
            id="delay-dry"
            defaultValue={1}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeDry}
          />
          <Spacer space={8} />
          <ValueController
            label="Wet"
            id="delay-wet"
            defaultValue={0}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeWet}
          />
          <Spacer space={8} />
          <ValueController
            label="Tone"
            id="delay-tone"
            defaultValue={4000}
            min={20}
            max={8000}
            step={1}
            onChange={this.onChangeTone}
          />
          <Spacer space={8} />
          <ValueController
            label="Feedback"
            id="delay-feedback"
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
      X(source).module('delay').state(state);
    });
  }

  private onChangeTime(event: React.SyntheticEvent): void {
    const time = event.currentTarget.valueAsNumber / 1000;

    this.props.sources.forEach((source: string) => {
      X(source).module('delay').param('time', time);
    });
  }

  private onChangeDry(event: React.SyntheticEvent): void {
    const dry = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('delay').param('dry', dry);
    });
  }

  private onChangeWet(event: React.SyntheticEvent): void {
    const wet = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('delay').param('wet', wet);
    });
  }

  private onChangeTone(event: React.SyntheticEvent): void {
    const tone = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('delay').param('tone', tone);
    });
  }

  private onChangeFeedback(event: React.SyntheticEvent): void {
    const feedback = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('delay').param('feedback', feedback);
    });
  }
}
