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
      onChange    : () => {}
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
      onChange    : () => {}
    } as Props;

    const tree = renderer.create(<ValueController {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      label       : 'Value Controller',
      id          : 'value-controller',
      min         : -100,
      max         : 100,
      step        : 1,
      defaultValue: 0,
      onChange    : mockOnChange
    } as Props;

    render(<ValueController {...props} />);

    const spinner = screen.getByRole('spinbutton');
    const slider  = screen.getByRole('slider');

    fireEvent.change(spinner, { valueAsNumber: 100 });
    fireEvent.change(slider,  { valueAsNumber: 100 });

    // expect(mockOnChange.mock.calls.length).toBe(2);
  });

  test('change (id is `audio-fieldset-current-time`)', () => {
    const props = {
      label       : 'Value Controller',
      id          : 'audio-fieldset-current-time',
      min         : -100,
      max         : 100,
      step        : 1,
      defaultValue: 0,
      onChange    : () => {}
    } as Props;

    render(<ValueController {...props} />);
    render(<ValueController {...props} defaultValue={1} />);

    const spinner = screen.getAllByRole('spinbutton')[1];
    const slider  = screen.getAllByRole('slider')[1];

    expect((spinner as HTMLInputElement).valueAsNumber).toBe(1);
    expect((slider  as HTMLInputElement).valueAsNumber).toBe(1);
  });
});
