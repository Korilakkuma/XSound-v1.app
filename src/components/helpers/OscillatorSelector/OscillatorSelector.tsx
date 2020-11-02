import * as React from 'react';

interface Props {
  radioName: string;
  initialValue: 'sine' | 'square' | 'sawtooth' | 'triangle';
  onChange(event: React.SyntheticEvent): void;
}

interface State {
  value: 'sine' | 'square' | 'sawtooth' | 'triangle';
}

export default class OscillatorSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.initialValue
    };

    this.onChange = this.onChange.bind(this);
  }

  render(): React.ReactNode {
    const { radioName, onChange } = this.props;
    const { value } = this.state;

    return (
      <form className="OscillatorSelector" onChange={this.onChange}>
        <label className={`OscillatorSelector__sine${value === 'sine' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="sine" checked={value === 'sine'} value="sine" onChange={onChange} /></label>
        <label className={`OscillatorSelector__square${value === 'square' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="square" checked={value === 'square'} value="square" onChange={onChange} /></label>
        <label className={`OscillatorSelector__sawtooth${value === 'sawtooth' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="sawtooth" checked={value === 'sawtooth'} value="sawtooth" onChange={onChange} /></label>
        <label className={`OscillatorSelector__triangle${value === 'triangle' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="triangle" checked={value === 'triangle'} value="triangle" onChange={onChange} /></label>
      </form>
    );
  }

  private onChange(event: React.SyntheticEvent): void {
    const form = event.currentTarget as HTMLFormElement;
    const name = `radio-${this.props.radioName}`;

    for (let i = 0, len = form.elements[name].length; i < len; i++) {
      if (form.elements[name][i].checked) {
        this.setState({ value: form.elements[name][i].value });
        break;
      }
    }
  }
}
