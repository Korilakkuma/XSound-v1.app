import * as React from 'react';
import { createFilename } from '../../../utils';
import { Switch } from '../../atoms/Switch';
import { FileUploader } from '../../atoms/FileUploader';
import { ProgressBar } from '../../atoms/ProgressBar';
import { Modal } from '../../atoms/Modal';
import { SelectableModal } from '../../helpers/SelectableModal';
import { X } from 'xsound';

interface Sequence {
  indexes: number[];
  frequencies: number[];
  start: number;
  duration: number;
  stop: number;
  note: string;
}

interface Props {
  active: boolean;
  currentSoundSource: 'oscillator' | 'piano' | 'guitar' | 'electric-guitar' | 'whitenoise' | 'pinknoise' | 'browniannoise';
  setSoundStop(index: number, isStop: boolean): void;
  clear(): void;
}

interface State {
  active: boolean;
  paused: boolean;
  highlight: boolean;
  melody: string;
  bass: string;
  dataURL: string;
  filename: string;
  progress: boolean;
  loaded: number;
  total: number;
  rate: number;
  errorMessage: string;
  isShowModalForFileUploadError: boolean;
  isShowModalForProgress: boolean;
  isShowModalConfirmation: boolean;
}

export default class MML extends React.Component<Props, State> {
  private setupped = false;
  private mmls: string[] = ['', ''];

  static getDerivedStateFromProps(props: Props, state: State): State | null {
    if (state.active !== props.active) {
      return { active: props.active };
    }

    return null;
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      active                       : props.active,
      paused                       : true,
      highlight                    : false,
      melody                       : '',
      bass                         : '',
      filename                     : '',
      progress                     : false,
      loaded                       : 0,
      total                        : 0,
      rate                         : 0,
      mmlErrorMessage              : '',
      errorMessage                 : '',
      isShowModalForFileUploadError: false,
      isShowModalForProgress       : false,
      isShowModalConfirmation      : false
    };

    this.readyMML = this.readyMML.bind(this);

    this.onBlurMelody = this.onBlurMelody.bind(this);
    this.onBlurBass   = this.onBlurBass.bind(this);

    this.onChangeFile = this.onChangeFile.bind(this);
    this.onDragEnter  = this.onDragEnter.bind(this);
    this.onDragOver   = this.onDragOver.bind(this);
    this.onDragLeave  = this.onDragLeave.bind(this);
    this.onDrop       = this.onDrop.bind(this);

    this.onClickMMLController  = this.onClickMMLController.bind(this);
    this.onClickRewindButton   = this.onClickRewindButton.bind(this);
    this.onClickDownloadButton = this.onClickDownloadButton.bind(this);
    this.onChangeHightlight    = this.onChangeHightlight.bind(this);

    this.onClickOverwrite = this.onClickOverwrite.bind(this);
    this.onClickCancel    = this.onClickCancel.bind(this);
  }

  componentDidMount(): void {
    const sampleMMLs = ['foreverlove', 'tears'];
    const sampleMML  = sampleMMLs[Date.now() % 2];

    fetch(`/assets/mml/mml-${sampleMML}.txt`)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        const mmls = text.split(/\|+/);

        this.setState({
          melody: mmls[0],
          bass  : mmls[1]
        }, () => {
          this.readyMML();
        });
      })
      .catch((error) => {
        // do not anything ...
        console.error(error);
      });
  }

  // `MML#setup` is not invoked on `componentDidMount`
  componentDidUpdate(prevProps: Props): void {
    if (prevProps.currentSoundSource !== this.props.currentSoundSource) {
      this.setState((prevState: State) => {
        const { melody, bass } = prevState;

        return {
          melody: melody.replace(/<span>(.+?)<\/span>/g, '$1'),
          bass  : bass.replace(/<span>(.+?)<\/span>/g, '$1'),
          paused: true
        };
      }, () => {
        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          if (i !== 0) {
            X('oscillator').get(i).state(false);
            window.C('oscillator').get(i).state(false);
          }
        }

        this.readyMML();
      });

      return;
    }

    if (this.setupped) {
      return;
    }

    const startCallbackMelody = (sequence: Sequence) => {
      const { indexes, note } = sequence;

      indexes.forEach((index: number) => {
        if (index === 'R') {
          return;
        }

        this.props.setSoundStop(index, false);
      });

      if (this.state.highlight) {
        this.setState((prevState: State) => {
          return { melody: prevState.melody.replace(` ${note}`, ` <span>${note}</span>`) };
        });
      }
    };

    const startCallbackBass = (sequence: Sequence) => {
      const { indexes, note } = sequence;

      indexes.forEach((index: number) => {
        if (index === 'R') {
          return;
        }

        this.props.setSoundStop(index, false);
      });

      if (this.state.highlight) {
        this.setState((prevState: State) => {
          return { bass: prevState.bass.replace(` ${note}`, ` <span>${note}</span>`) };
        });
      }
    };

    const stopCallback = (sequence: Sequence) => {
      sequence.indexes.forEach((index: number) => {
        if (index === 'R') {
          return;
        }

        this.props.setSoundStop(index, true);
      });
    };

    const endedCallback = () => {
      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (i !== 0) {
          X('oscillator').get(i).state(false);
          window.C('oscillator').get(i).state(false);
        }
      }

      this.props.clear();

      this.setState((prevState: State) => {
        const { melody, bass } = prevState;

        return {
          melody: melody.replace(/<span>(.+?)<\/span>/g, '$1'),
          bass  : bass.replace(/<span>(.+?)<\/span>/g, '$1'),
          paused: true
        };
      }, () => {
        this.readyMML();
      });
    };

    const errorCallback = (error: string, note: string) => {
      switch (error) {
        case 'TEMPO' :
        case 'OCTAVE':
        case 'NOTE'  :
          this.setState({ mmlErrorMessage: `Maybe, ${note} is invalid.` });
          break;
        case 'MML':
          this.setState({ mmlErrorMessage: 'The designated MML is invalid.' });
          break;
        default:
          this.setState({ mmlErrorMessage: 'The designated MML is invalid.' });
          break;
      }
    };

    X('mml').setup({
      start: startCallbackMelody,
      stop : stopCallback,
      ended: endedCallback,
      error: errorCallback
    });

    window.C('mml').setup({
      start: startCallbackBass,
      stop : stopCallback,
      ended: endedCallback,
      error: errorCallback
    });

    this.setupped = true;
  }

  render(): React.ReactNode {
    const {
      active,
      paused,
      highlight,
      melody,
      bass,
      dataURL,
      filename,
      progress,
      loaded,
      // total,
      rate,
      errorMessage,
      isShowModalForFileUploadError,
      isShowModalForProgress,
      isShowModalConfirmation
    } = this.state;

    return (
      <div className={`MML${active ? ' -active' : ''}`}>
        <div className="MML__editor">
          <dl>
            <dt>Melody</dt>
            <dd
              contentEditable={true}
              dangerouslySetInnerHTML={{ __html: melody }}
              onBlur={this.onBlurMelody}
            >
            </dd>
          </dl>
          <dl>
            <dt>Bass</dt>
            <dd
              contentEditable={true}
              dangerouslySetInnerHTML={{ __html: bass }}
              onBlur={this.onBlurBass}
            >
            </dd>
          </dl>
        </div>
        <div className="MML__controllers">
          <button
            type="button"
            className={`MML__controller${paused ? ' -paused' : ''}`}
            aria-label={paused ? 'Start' : 'Pause'}
            onClick={this.onClickMMLController}
          >
          </button>
          <button
            type="button"
            className="MML__rewinder"
            aria-label="Rewind"
            onClick={this.onClickRewindButton}
          >
          </button>
          <a
            href={dataURL}
            download={dataURL ? createFilename('mml-', '.txt') : null}
            role="button"
            className="MML__download"
            aria-label="Download"
            onClick={this.onClickDownloadButton}
          >
          </a>
          <Switch
            id="mml-switch-highlight"
            label="Highlight"
            defaultChecked={highlight}
            onChange={this.onChangeHightlight}
          />
          <FileUploader
            label="MML text file"
            accept="text/plain"
            placeholder="MML text file"
            filename={filename}
            onChange={this.onChangeFile}
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            onDrop={this.onDrop}
          />
        </div>
        <Modal
          isShow={isShowModalForFileUploadError}
          hasOverlay={true}
          title="Error"
          onClose={this.onClose}
        >
          {errorMessage}
        </Modal>
        <Modal
          isShow={isShowModalForProgress}
          hasOverlay={true}
          title="Progress ..."
          onClose={this.onClose}
        >
          <p>{loaded} bytes ({rate} %)</p>
          <ProgressBar title="" progress={progress} rate={rate} auto={false} />
        </Modal>
        <SelectableModal
          isShow={isShowModalConfirmation}
          hasOverlay={true}
          title="Confirmation"
          first={{
            label : 'Cancel',
            action: this.onClickCancel
          }}
          second={{
            label : 'OK',
            action: this.onClickOverwrite
          }}
          onClose={this.onClickCancel}
        >
          <p>Overwrite. OK ?</p>
        </SelectableModal>
      </div>
    );
  }

  private readyMML(): void {
    const { melody, bass } = this.state;

    switch (this.props.currentSoundSource) {
      case 'oscillator':
        X('mml').ready(X('oscillator'), melody);
        window.C('mml').ready(window.C('oscillator'), bass);
        break;
      case 'piano':
        X('mml').ready(X('oneshot'), melody, 0);
        window.C('mml').ready(X('oneshot'), bass, 0);
        break;
      case 'guitar':
        X('mml').ready(X('oneshot'), melody, 88);
        window.C('mml').ready(X('oneshot'), bass, 88);
        break;
      case 'electric-guitar':
        X('mml').ready(X('oneshot'), melody, 88 + 88);
        window.C('mml').ready(X('oneshot'), bass, 88 + 88);
        break;
      case 'whitenoise'   :
      case 'pinknoise'    :
      case 'browniannoise':
        X('mml').ready(X('noise'), melody);
        window.C('mml').ready(window.C('noise'), bass);
        break;
      default:
        break;
    }
  }

  private onBlurMelody(event: React.SyntheticEvent): void {
    this.setState({
      melody: event.currentTarget.textContent,
      paused: true
    }, () => {
      this.readyMML();
    });
  }

  private onBlurBass(event: React.SyntheticEvent): void {
    this.setState({
      bass  : event.currentTarget.textContent,
      paused: true
    }, () => {
      this.readyMML();
    });
  }

  private onClickMMLController(): void {
    if (!X('mml').isSequences() || !window.C('mml').isSequences()) {
      return;
    }

    if (this.state.paused) {
      // Start MML
      if (this.props.currentSoundSource === 'oscillator') {
        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          X('oscillator').get(i).state(true);
          window.C('oscillator').get(i).state(true);
        }

        X('mml').start(0);
        window.C('mml').start(0);

        X('mixer').module('recorder').start();
        X('mixer').module('session').start();
      } else {
        X('mml').start(0);
        window.C('mml').start(0);

        X('oneshot').module('recorder').start();
        X('oneshot').module('session').start();
      }
    } else {
      // Stop MML
      X('mml').stop();
      window.C('mml').stop();

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        X('oscillator').get(i).state(false);
        // eslint-disable-next-line no-undef
        window.C('oscillator').get(i).state(false);
      }
    }

    this.setState((prevState: State) => {
      return { paused: !prevState.paused };
    });
  }

  private onClickRewindButton(): void {
    // Stop MML
    X('mml').stop().clear();
    window.C('mml').stop().clear();

    this.props.clear();

    this.setState((prevState: State) => {
      const { melody, bass } = prevState;

      return {
        melody: melody.replace(/<span>(.+?)<\/span>/g, '$1'),
        bass  : bass.replace(/<span>(.+?)<\/span>/g, '$1'),
        paused: true
      };
    }, () => {
      this.readyMML();
    });
  }

  private onClickDownloadButton(): void {
    this.setState((prevState: State) => {
      const { melody, bass } = prevState;

      return {
        melody: melody.replace(/<span>(.+?)<\/span>/g, '$1'),
        bass  : bass.replace(/<span>(.+?)<\/span>/g, '$1')
      };
    }, () => {
      this.setState((prevState: State) => {
        return { dataURL : X.toTextFile(`${prevState.melody}||||${prevState.bass}`) };
      });
    });
  }

  private onChangeHightlight(event: React.SyntheticEvent): void {
    this.setState({ highlight: event.currentTarget.checked });
  }

  private readFile(event: React.SyntheticEvent): void {
    const options = {
      event   : event.nativeEvent,
      type    : 'Text',
      success : (event: Event, text: string) => {
        event.currentTarget.value = '';

        this.setState({
          progress              : false,
          isShowModalForProgress: false
        }, () => {
          this.mmls = text.split(/\|+/);

          const { melody, bass } = this.state;

          console.log(melody);
          console.log(bass);

          if (melody || bass) {
            this.setState({ isShowModalConfirmation: true });
          } else {
            this.setState({
              melody: this.mmls[0],
              bass  : this.mmls[1]
            }, () => {
              this.readyMML();
            });
          }
        });
      },
      error   : (error: Error) => {
        this.setState({
          progress                     : false,
          errorMessage                 : error.message,
          isShowModalForFileUploadError: true
        });
      },
      progress: (event: Event) => {
        const { lengthComputable, loaded, total } = event;

        this.setState({
          progress              : lengthComputable,
          loaded                : loaded,
          total                 : total,
          rate                  : lengthComputable && (total > 0) ? Math.floor((loaded / total) * 100) : 0,
          isShowModalForProgress: true
        });
      }
    };

    try {
      const file = X.file(options);

      this.setState({ filename: file.name });
    } catch (error: Error) {
      this.setState({
        errorMessage                 : error.message,
        isShowModalForFileUploadError: true
      });
    }
  }

  private onChangeFile(event: React.SyntheticEvent): void {
    this.readFile(event);
  }

  private onDragEnter(event: React.SyntheticEvent): void {
    event.preventDefault();
  }

  private onDragOver(event: React.SyntheticEvent): void {
    event.preventDefault();
  }

  private onDragLeave(event: React.SyntheticEvent): void {
    event.preventDefault();
  }

  private onDrop(event: React.SyntheticEvent): void {
    this.readFile(event);
  }

  private onClickOverwrite(): void {
    if (this.mmls[0]) {
      this.setState({ melody: this.mmls[0] });
    }

    if (this.mmls[1]) {
      this.setState({ bass: this.mmls[1] });
    }

    this.readyMML();

    this.mmls = ['', ''];

    this.setState({ isShowModalConfirmation: false });
  }

  private onClickCancel(): void {
    this.setState({ isShowModalConfirmation: false });
  }
}
