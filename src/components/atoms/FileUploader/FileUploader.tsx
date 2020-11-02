import * as React from 'react';
import { RefObject } from 'react';

interface Props {
  label: string;
  accept: string;
  placeholder: string;
  filename: string;
  onChange(event: React.SyntheticEvent): void;
  onDragEnter(event: React.SyntheticEvent): void;
  onDragOver(event: React.SyntheticEvent): void;
  onDragLeave(event: React.SyntheticEvent): void;
  onDrop(event: React.SyntheticEvent): void;
}

interface State {
  drag: boolean;
  drop: boolean;
}

export default class FileUploader extends React.Component<Props, State> {
  private fileUploaderRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      drag: false,
      drop: false
    };

    this.onClick     = this.onClick.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver  = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop      = this.onDrop.bind(this);
  }

  render(): React.ReactNode {
    const { label, accept, placeholder, filename, onChange } = this.props;
    const { drag, drop } = this.state;

    return (
      <div
        className={`FileUploader${drag ? ' -drag' : ''}${drop ? ' -drop' : ''}`}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        <button type="button" className="text-ellipsis" aria-label={label} onClick={this.onClick}>{filename ? filename : placeholder}</button>
        <input type="file" ref={this.fileUploaderRef} hidden accept={accept} placeholder={placeholder} onChange={onChange} />
      </div>
    );
  }

  private onClick(): void {
    const node = this.fileUploaderRef.current;

    if (node === null) {
      return;
    }

    node.value = '';
    node.click();
  }

  private onDragEnter(event: React.SyntheticEvent): void {
    event.preventDefault();

    this.setState({
      drag: true,
      drop: false
    });

    this.props.onDragEnter(event);
  }

  private onDragOver(event: React.SyntheticEvent): void {
    event.preventDefault();

    this.props.onDragOver(event);
  }

  private onDragLeave(event: React.SyntheticEvent): void {
    event.preventDefault();

    this.setState({
      drag: false,
      drop: false
    });

    this.props.onDragLeave(event);
  }

  private onDrop(event: React.SyntheticEvent): void {
    event.preventDefault();

    this.setState({
      drag: false,
      drop: true
    });

    this.props.onDrop(event);
  }
}
