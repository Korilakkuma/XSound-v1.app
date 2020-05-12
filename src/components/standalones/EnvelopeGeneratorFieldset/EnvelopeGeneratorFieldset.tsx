import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

interface State {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export default class EnvelopeGenerator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      attack : 0.01,
      decay  : 0.3,
      sustain: 0.5,
      release: 1.0
    };

    this.onChangeAttack  = this.onChangeAttack.bind(this);
    this.onChangeDecay   = this.onChangeDecay.bind(this);
    this.onChangeSustain = this.onChangeSustain.bind(this);
    this.onChangeRelease = this.onChangeRelease.bind(this);
  }

  render(): React.ReactNode {
    const { attack, decay, sustain, release } = this.state;

    return (
      <div className="EnvelopeGeneratorFieldset">
        <fieldset>
          <legend>Envelope Generator</legend>
          <ValueController
            label="Attack"
            id="envelope-generator-attack"
            defaultValue={attack}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeAttack}
          />
          <Spacer space={8} />
          <ValueController
            label="Decay"
            id="envelope-generator-decay"
            defaultValue={decay}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeDecay}
          />
          <Spacer space={8} />
          <ValueController
            label="Sutain"
            id="envelope-generator-sustain"
            defaultValue={sustain}
            min={0}
            max={1}
            step={0.01}
            onChange={this.onChangeSustain}
          />
          <Spacer space={8} />
          <ValueController
            label="Release"
            id="envelope-generator-release"
            defaultValue={release}
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

  private onChangeAttack(event: React.SyntheticEvent): void {
    const attack = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param('attack', attack);
    window.C('oscillator').module('envelopegenerator').param('attack', attack);
  }

  private onChangeDecay(event: React.SyntheticEvent): void {
    const decay = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param('decay', decay);
    window.C('oscillator').module('envelopegenerator').param('decay', decay);
  }

  private onChangeSustain(event: React.SyntheticEvent): void {
    const sustain = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param('sustain', sustain);
    window.C('oscillator').module('envelopegenerator').param('sustain', sustain);
  }

  private onChangeRelease(event: React.SyntheticEvent): void {
    const release = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param('release', release);
    window.C('oscillator').module('envelopegenerator').param('release', release);
  }
}
