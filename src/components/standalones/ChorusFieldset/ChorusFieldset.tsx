import React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class ChorusFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeTime  = this.onChangeTime.bind(this);
    this.onChangeDepth = this.onChangeDepth.bind(this);
    this.onChangeRate  = this.onChangeRate.bind(this);
    this.onChangeMix   = this.onChangeMix.bind(this);
    this.onChangeTone  = this.onChangeTone.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="ChorusFieldset">
        <fieldset>
          <legend>
            <Switch
              id="chorus-state"
              label="Chorus"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <ValueController
            label="Time"
            id="chorus-time"
            defaultValue={0}
            min={0}
            max={50}
            step={1}
            onChange={this.onChangeTime}
          />
          <Spacer space={8} />
          <ValueController
            label="Depth"
            id="chorus-depth"
            defaultValue={0}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeDepth}
          />
          <Spacer space={8} />
          <ValueController
            label="Rate"
            id="chorus-rate"
            defaultValue={0}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeRate}
          />
          <Spacer space={8} />
          <ValueController
            label="Mix"
            id="chorus-mix"
            defaultValue={0}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeMix}
          />
          <Spacer space={8} />
          <ValueController
            label="Tone"
            id="chorus-tone"
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
    const state = (event.currentTarget as HTMLInputElement).checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('chorus').state(state);
    });
  }

  private onChangeTime(event: React.SyntheticEvent): void {
    const time = (event.currentTarget as HTMLInputElement).valueAsNumber / 1000;

    this.props.sources.forEach((source: string) => {
      X(source).module('chorus').param('time', time);
    });
  }

  private onChangeDepth(event: React.SyntheticEvent): void {
    const depth = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('chorus').param('depth', depth);
    });
  }

  private onChangeRate(event: React.SyntheticEvent): void {
    const rate = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('chorus').param('rate', rate);
    });
  }

  private onChangeMix(event: React.SyntheticEvent): void {
    const mix = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('chorus').param('mix', mix);
    });
  }

  private onChangeTone(event: React.SyntheticEvent): void {
    const tone = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('chorus').param('tone', tone);
    });
  }
}
