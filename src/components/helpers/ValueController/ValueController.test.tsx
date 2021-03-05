import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, ValueController } from './ValueController';

describe('helpers/ValueController', () => {
  test('render without width', () => {
    const props = {
      label       : 'Value Controller',
      id          : 'value-controller',
      min         : -100,
      max         : 100,
      step        : 1,
      defaultValue: 0,
      onChange    : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<ValueController {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render with width', () => {
    const props = {
      label       : 'Value Controller',
      id          : 'value-controller',
      min         : -100,
      max         : 100,
      step        : 1,
      defaultValue: 0,
      width       : '50%',
      onChange    : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<ValueController {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('change', () => {
    const props = {
      label       : 'Value Controller',
      id          : 'value-controller',
      min         : -100,
      max         : 100,
      step        : 1,
      defaultValue: 0,
      onChange    : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    render(<ValueController {...props} />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { valueAsNumber: 100 } });
    fireEvent.change(screen.getByRole('slider'), { target: { valueAsNumber: 100 } });
  });

  test('change (id is `audio-fieldset-current-time`)', () => {
    const props = {
      label       : 'Value Controller',
      id          : 'audio-fieldset-current-time',
      min         : -100,
      max         : 100,
      step        : 1,
      defaultValue: 0,
      onChange    : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    render(<ValueController {...props} />);
    render(<ValueController {...props} defaultValue={1} />);
  });
});
