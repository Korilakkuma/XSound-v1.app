import React from 'react';

interface Props {
  label: string;
  id?: string;
  defaultChecked?: boolean;
  onChange(event: React.SyntheticEvent): void;
}

interface State {
  checked: boolean;
}

export default class Switch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: Boolean(props.defaultChecked)
    };

    this.onChange = this.onChange.bind(this);
  }

  render(): React.ReactNode {
    const { label, id } = this.props;

    return (
      <div className={`Switch${this.state.checked ? ' -checked' : ''}`}>
        <label htmlFor={id}>{label}<span aria-label={`${label} switch`} /></label>
        <input type="checkbox" hidden id={id} checked={this.state.checked} onChange={this.onChange} />
      </div>
    );
  }

  private onChange(event: React.SyntheticEvent): void {
    this.props.onChange(event);
    this.setState({ checked: (event.currentTarget as HTMLInputElement).checked });
  }
}
