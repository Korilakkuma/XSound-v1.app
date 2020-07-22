import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class EqualizerFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState    = this.onChangeState.bind(this);
    this.onChangeBass     = this.onChangeBass.bind(this);
    this.onChangeMiddle   = this.onChangeMiddle.bind(this);
    this.onChangeTreble   = this.onChangeTreble.bind(this);
    this.onChangePresence = this.onChangePresence.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="EqualizerFieldset">
        <fieldset>
          <legend>
            <Switch
              id="equalizer-state"
              label="Equalizer"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <ValueController
            label="Bass"
            id="equalizer-bass"
            defaultValue={0}
            min={-18}
            max={18}
            step={1}
            onChange={this.onChangeBass}
          />
          <Spacer space={8} />
          <ValueController
            label="Middle"
            id="equalizer-middle"
            defaultValue={0}
            min={-18}
            max={18}
            step={1}
            onChange={this.onChangeMiddle}
          />
          <Spacer space={8} />
          <ValueController
            label="Treble"
            id="equalizer-treble"
            defaultValue={0}
            min={-18}
            max={18}
            step={1}
            onChange={this.onChangeTreble}
          />
          <Spacer space={8} />
          <ValueController
            label="Presence"
            id="equalizer-presence"
            defaultValue={0}
            min={-18}
            max={18}
            step={1}
            onChange={this.onChangePresence}
          />
          <Spacer space={8} />
        </fieldset>
      </div>
    );
  }

  private onChangeState(event: React.SyntheticEvent): void {
    const state = event.currentTarget.checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('equalizer').state(state);
    });
  }

  private onChangeBass(event: React.SyntheticEvent): void {
    const bass = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('equalizer').param('bass', bass);
    });
  }

  private onChangeMiddle(event: React.SyntheticEvent): void {
    const middle = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('equalizer').param('middle', middle);
    });
  }

  private onChangeTreble(event: React.SyntheticEvent): void {
    const treble = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('equalizer').param('treble', treble);
    });
  }

  private onChangePresence(event: React.SyntheticEvent): void {
    const presence = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('equalizer').param('presence', presence);
    });
  }
}
