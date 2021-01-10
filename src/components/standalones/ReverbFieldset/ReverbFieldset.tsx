import React from 'react';
import { RIRInfo } from '../../../types/types';
import { Spacer } from '../../atoms/Spacer';
import { GroupSelect } from '../../atoms/GroupSelect';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
  rirInfos: RIRInfo[];
}

export default class ReverbFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeType  = this.onChangeType.bind(this);
    this.onChangeDry   = this.onChangeDry.bind(this);
    this.onChangeWet   = this.onChangeWet.bind(this);
    this.onChangeTone  = this.onChangeTone.bind(this);
  }

  render(): React.ReactNode {
    const groups: string[] = [];
    const values: { [group: string]: string[] } = {};
    const texts: { [group: string]: string[] } = {};

    this.props.rirInfos.forEach((rirInfo: RIRInfo) => {
      const { value, label, group } = rirInfo;

      groups.push(group);

      if (Array.isArray(values[group])) {
        values[group].push(value.toString(10));
      } else {
        values[group] = [value.toString(10)];
      }

      if (Array.isArray(texts[group])) {
        texts[group].push(label);
      } else {
        texts[group] = [label];
      }
    });

    return (
      <div className="ReverbFieldset">
        <fieldset>
          <legend>
            <Switch
              id="reverb-state"
              label="Reverb"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <GroupSelect
            groups={groups}
            values={values}
            texts={texts}
            onChange={this.onChangeType}
          />
          <Spacer space={8} />
          <ValueController
            label="Dry"
            id="reverb-dry"
            defaultValue={1}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeDry}
          />
          <Spacer space={8} />
          <ValueController
            label="Wet"
            id="reverb-wet"
            defaultValue={0}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeWet}
          />
          <Spacer space={8} />
          <ValueController
            label="Tone"
            id="reverb-tone"
            defaultValue={4000}
            min={20}
            max={8000}
            step={1}
            onChange={this.onChangeTone}
          />
          <Spacer space={8} />
          <aside>Reverb effect requires Impulse Response data. <a href="http://legacy.spa.aalto.fi/projects/poririrs/" target="_black" rel="noopener noreferrer">Here</a>, you can get Impulse Response file !</aside>
        </fieldset>
      </div>
    );
  }

  private onChangeState(event: React.SyntheticEvent): void {
    const state = (event.currentTarget as HTMLInputElement).checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('reverb').state(state);
    });
  }

  private onChangeType(event: React.SyntheticEvent): void {
    const type = parseInt((event.currentTarget as HTMLInputElement).value, 10);

    this.props.sources.forEach((source: string) => {
      X(source).module('reverb').param('type', type);
    });
  }

  private onChangeDry(event: React.SyntheticEvent): void {
    const dry = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('reverb').param('dry', dry);
    });
  }

  private onChangeWet(event: React.SyntheticEvent): void {
    const wet = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('reverb').param('wet', wet);
    });
  }

  private onChangeTone(event: React.SyntheticEvent): void {
    const tone = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('reverb').param('tone', tone);
    });
  }
}
