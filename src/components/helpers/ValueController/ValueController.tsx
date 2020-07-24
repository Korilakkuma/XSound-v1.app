import * as React from 'react';
import { Slider } from '../../atoms/Slider';
import { Spinner } from '../../atoms/Spinner';

interface Props {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  width: string;
  onChange(event: React.SyntheticEvent): void;
}

interface State {
  value: number;
}

export default class ValueController extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props): State | null {
    if (props.id === 'audio-fieldset-current-time') {
      return { value: props.defaultValue };
    }

    return null;
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.defaultValue
    };

    this.onChange = this.onChange.bind(this);
  }

  // TODO: Use `getDerivedStateFromProps` in React v17+
  // UNSAFE_componentWillReceiveProps(nextProps: Props): void {
  //   // HACK
  //   if (this.props.id === 'audio-fieldset-current-time') {
  //     this.setState({ value: nextProps.defaultValue });
  //   }
  // }

  render(): React.ReactNode {
    const { label, id, min, max, step, width } = this.props;
    const { value } = this.state;

    return (
      <dl className="ValueController" style={{ width }}>
        <dt>
          <label htmlFor={id}>{label}</label>
          <Spinner
            id={id}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={this.onChange}
          />
        </dt>
        <dd>
          <Slider
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={this.onChange}
          />
        </dd>
      </dl>
    );
  }

  private onChange(event: React.SyntheticEvent): void {
    this.props.onChange(event);
    this.setState({ value: event.currentTarget.valueAsNumber });
  }
}
