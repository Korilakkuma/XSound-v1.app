import React from 'react';
import { SoundSource } from '../../../types/types';
import { X } from 'xsound';

const indexMap: { [pitch: string]: number } = {
  'A-4' :  0,
  'A-4h':  1,
  'B-4' :  2,
  'C-3' :  3,
  'C-3h':  4,
  'D-3' :  5,
  'D-3h':  6,
  'E-3' :  7,
  'F-3' :  8,
  'F-3h':  9,
  'G-3' : 10,
  'G-3h': 11,
  'A-3' : 12,
  'A-3h': 13,
  'B-3' : 14,
  'C-2' : 15,
  'C-2h': 16,
  'D-2' : 17,
  'D-2h': 18,
  'E-2' : 19,
  'F-2' : 20,
  'F-2h': 21,
  'G-2' : 22,
  'G-2h': 23,
  'A-2' : 24,
  'A-2h': 25,
  'B-2' : 26,
  'C-1' : 27,
  'C-1h': 28,
  'D-1' : 29,
  'D-1h': 30,
  'E-1' : 31,
  'F-1' : 32,
  'F-1h': 33,
  'G-1' : 34,
  'G-1h': 35,
  'A-1' : 36,
  'A-1h': 37,
  'B-1' : 38,
  'C'   : 39,
  'Ch'  : 40,
  'D'   : 41,
  'Dh'  : 42,
  'E'   : 43,
  'F'   : 44,
  'Fh'  : 45,
  'G'   : 46,
  'Gh'  : 47,
  'A'   : 48,
  'Ah'  : 49,
  'B'   : 50,
  'C1'  : 51,
  'C1h' : 52,
  'D1'  : 53,
  'D1h' : 54,
  'E1'  : 55,
  'F1'  : 56,
  'F1h' : 57,
  'G1'  : 58,
  'G1h' : 59,
  'A1'  : 60,
  'A1h' : 61,
  'B1'  : 62,
  'C2'  : 63,
  'C2h' : 64,
  'D2'  : 65,
  'D2h' : 66,
  'E2'  : 67,
  'F2'  : 68,
  'F2h' : 69,
  'G2'  : 70,
  'G2h' : 71,
  'A2'  : 72,
  'A2h' : 73,
  'B2'  : 74,
  'C3'  : 75,
  'C3h' : 76,
  'D3'  : 77,
  'D3h' : 78,
  'E3'  : 79,
  'F3'  : 80,
  'F3h' : 81,
  'G3'  : 82,
  'G3h' : 83,
  'A3'  : 84,
  'A3h' : 85,
  'B3'  : 86,
  'C4'  : 87
};

const whites = [
  'A-4', 'B-4',
  'C-3', 'D-3', 'E-3', 'F-3', 'G-3', 'A-3', 'B-3',
  'C-2', 'D-2', 'E-2', 'F-2', 'G-2', 'A-2', 'B-2',
  'C-1', 'D-1', 'E-1', 'F-1', 'G-1', 'A-1', 'B-1',
  'C',   'D',   'E',   'F',   'G',   'A',   'B',
  'C1',  'D1',  'E1',  'F1',  'G1',  'A1',  'B1',
  'C2',  'D2',  'E2',  'F2',  'G2',  'A2',  'B2',
  'C3',  'D3',  'E3',  'F3',  'G3',  'A3',  'B3',
  'C4'
];

const blacks = [
  'A-4h', 'skip0',
  'C-3h', 'D-3h', 'skip1',  'F-3h', 'G-3h', 'A-3h', 'skip2',
  'C-2h', 'D-2h', 'skip3',  'F-2h', 'G-2h', 'A-2h', 'skip4',
  'C-1h', 'D-1h', 'skip5',  'F-1h', 'G-1h', 'A-1h', 'skip6',
  'Ch',   'Dh',   'skip7',  'Fh',   'Gh',   'Ah',   'skip8',
  'C1h',  'D1h',  'skip9',  'F1h',  'G1h',  'A1h',  'skip10',
  'C2h',  'D2h',  'skip11', 'F2h',  'G2h',  'A2h',  'skip12',
  'C3h',  'D3h',  'skip13', 'F3h',  'G3h',  'A3h'
];

interface Props {
  currentSoundSource: SoundSource;
}

interface State {
  isSoundStops: boolean[];
}

export default class Piano extends React.Component<Props, State> {
  private isDown = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      isSoundStops: new Array(88).fill(true)
    };

    this.startSound = this.startSound.bind(this);
    this.stopSound  = this.stopSound.bind(this);
  }

  render(): React.ReactNode {
    return (
      <div className="Piano">
        <ul className="Piano__whites">
          {whites.map((pitch: string) => {
            return (
              <li
                key={pitch}
                className={`Piano__keyboard${this.state.isSoundStops[indexMap[pitch]] ? '' : ' -active'}`}
                role="button"
                aria-label={pitch}
                data-pitch={pitch}
                data-index={indexMap[pitch]}
                onMouseDown={this.startSound}
                onTouchStart={this.startSound}
                onMouseUp={this.stopSound}
                onTouchEnd={this.stopSound}
                onMouseOver={this.startSound}
                onTouchMove={this.startSound}
                onMouseOut={this.stopSound}
              >
              </li>
            );
          })}
        </ul>
        <ul className="Piano__blacks">
          {blacks.map((pitch: string) => {
            if (pitch.indexOf('skip') !== -1) {
              return <li key={pitch} className="Piano__keyboard -skip" aria-label="skip" />;
            }

            return (
              <li
                key={pitch}
                className={`Piano__keyboard${this.state.isSoundStops[indexMap[pitch]] ? '' : ' -active'}`}
                role="button"
                aria-label={pitch}
                data-pitch={pitch}
                data-index={indexMap[pitch]}
                onMouseDown={this.startSound}
                onTouchStart={this.startSound}
                onMouseUp={this.stopSound}
                onTouchEnd={this.stopSound}
                onMouseOver={this.startSound}
                onTouchMove={this.startSound}
                onMouseOut={this.stopSound}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  // Ref
  setSoundStop(index: number, isStop: boolean): void {
    const isSoundStops = this.state.isSoundStops.slice(0);

    isSoundStops[index] = isStop;

    this.setState({ isSoundStops });
  }

  // Ref
  clear(): void {
    const isSoundStops = this.state.isSoundStops.map(() => true);

    this.setState({ isSoundStops });
  }

  private startSound(event: React.SyntheticEvent): void {
    if (!X.IS_XSOUND || (event.currentTarget as Element).classList.contains('skip')) {
      return;  // skip
    }

    if (((event.type === 'mouseover') || (event.type === 'touchmove')) && !this.isDown) {
      return;
    }

    const dataIndex = (event.currentTarget as Element).getAttribute('data-index');

    if (dataIndex === null) {
      return;
    }

    const index = parseInt(dataIndex, 10);

    switch (this.props.currentSoundSource) {
      case 'oscillator':
        X('oscillator').ready(0, 0).start(X.toFrequencies(index));
        window.C('oscillator').ready(0, 0).start(X.toFrequencies(index));

        X('mixer').mix([X('oscillator'), window.C('oscillator')]);

        X('mixer').module('recorder').start();
        X('mixer').module('session').start();

        break;
      case 'piano':
        X('oneshot').ready(0, 0).start(index);

        X('oneshot').module('recorder').start();
        X('oneshot').module('session').start();

        break;
      case 'guitar':
        X('oneshot').ready(0, 0).start(index + 88);

        X('oneshot').module('recorder').start();
        X('oneshot').module('session').start();

        break;
      case 'electric-guitar':
        X('oneshot').ready(0, 0).start(index + 88 + 88);

        X('oneshot').module('recorder').start();
        X('oneshot').module('session').start();

        break;
      case 'whitenoise':
        X('noise').param('type', 'whitenoise').start();

        X('noise').module('recorder').start();
        X('noise').module('session').start();

        break;
      case 'pinknoise':
        X('noise').param('type', 'pinknoise').start();

        X('noise').module('recorder').start();
        X('noise').module('session').start();

        break;
      case 'browniannoise':
        X('noise').param('type', 'browniannoise').start();

        X('noise').module('recorder').start();
        X('noise').module('session').start();

        break;
      default:
        console.assert(`Error: currentSoundSource = ${this.props.currentSoundSource}`);
        break;
    }

    const isSoundStops = this.state.isSoundStops.slice(0);

    isSoundStops[index] = false;

    this.setState({ isSoundStops });

    this.isDown = true;
  }

  private stopSound(event: React.SyntheticEvent): void {
    if (!X.IS_XSOUND || (event.currentTarget as Element).classList.contains('skip')) {
      return;  // skip
    }

    event.stopPropagation();

    const dataIndex = (event.currentTarget as Element).getAttribute('data-index');

    if (dataIndex === null) {
      return;
    }

    const index = parseInt(dataIndex, 10);

    switch (this.props.currentSoundSource) {
      case 'oscillator':
        X('oscillator').stop();
        window.C('oscillator').stop();

        // X('mixer').stop();

        break;
      case 'piano':
        X('oneshot').stop(index);
        break;
      case 'guitar':
        X('oneshot').stop(index + 88);
        break;
      case 'electric-guitar':
        X('oneshot').stop(index + 88 + 88);
        break;
      default:
        X('noise').stop();
        break;
    }

    const isSoundStops = this.state.isSoundStops.slice(0);

    isSoundStops[index] = true;

    this.setState({ isSoundStops });

    if (event.type === 'mouseup') {
      this.isDown = false;
    }
  }
}
