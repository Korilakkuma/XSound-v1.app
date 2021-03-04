import React from 'react';
import renderer from 'react-test-renderer';
import { Props, OscillatorSelector } from './OscillatorSelector';

describe('helpers/OscillatorSelector', () => {
  it('render (type is sawtooth)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'sawtooth',
      onChange     : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onChangeRadio: (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('render (type is sine)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'sine',
      onChange     : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onChangeRadio: (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('render (type is square)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'square',
      onChange     : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onChangeRadio: (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('render (type is triangle)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'triangle',
      onChange     : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onChangeRadio: (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
