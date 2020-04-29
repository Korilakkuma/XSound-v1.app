import * as React from 'react';

interface Props {
  id?: string;
  label: string;
  defaultChecked: boolean;
  onChange(event: React.SyntheticEvent): void;
}

interface State {
  checked: boolean;
}

export default class Switch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: props.defaultChecked
    };

    this.onChange = this.onChange.bind(this);
  }

  render(): React.ReactNode {
    const { id, label } = this.props;

    return (
      <div className={`Switch${this.state.checked ? ' -checked' : ''}`}>
        <label htmlFor={id}>{label}<span aria-label={`${label} switch`} /></label>
        <input type="checkbox" hidden id={id} checked={this.state.checked} onChange={this.onChange} />
      </div>
    );
  }

  private onChange(event: React.SyntheticEvent): void {
    this.props.onChange(event);
    this.setState({ checked: event.currentTarget.checked });
  }
}
