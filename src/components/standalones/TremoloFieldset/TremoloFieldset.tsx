import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

export default class TremoloFieldset extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeDepth = this.onChangeDepth.bind(this);
    this.onChangeRate  = this.onChangeRate.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="TremoloFieldset">
        <fieldset>
          <legend>
            <Switch
              id="tremolo-state"
              label="Tremolo"
              defaultChecked={false}
              onChange={this.onChangeState}
            />
          </legend>
          <ValueController
            label="Depth"
            id="tremolo-depth"
            defaultValue={0}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeDepth}
          />
          <Spacer space={8} />
          <ValueController
            label="Rate"
            id="tremolo-rate"
            defaultValue={0}
            min={0}
            max={25}
            step={0.05}
            onChange={this.onChangeRate}
          />
          <Spacer space={8} />
        </fieldset>
      </div>
    );
  }

  private onChangeState(event: React.SyntheticEvent): void {
    const state = event.currentTarget.checked;

    this.props.sources.forEach((source: string) => {
      X(source).module('tremolo').state(state);
    });
  }

  private onChangeDepth(event: React.SyntheticEvent): void {
    const depth = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('tremolo').param('depth', depth);
    });
  }

  private onChangeRate(event: React.SyntheticEvent): void {
    const rate = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('tremolo').param('rate', rate);
    });
  }
}
