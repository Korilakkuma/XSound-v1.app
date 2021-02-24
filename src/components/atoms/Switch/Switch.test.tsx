import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, Switch } from './Switch';

describe('atoms/Switch', () => {
  it('render', () => {
    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: (event: React.SyntheticEvent) => {
        alert((event.currentTarget as HTMLInputElement).checked);
      }
    } as Props;

    const tree = renderer.create(<Switch {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('keyboard access', () => {
    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: (event: React.SyntheticEvent) => {
        // eslint-disable-next-line no-console
        console.log((event.currentTarget as HTMLInputElement).checked);
      }
    } as Props;

    render(<Switch {...props} />);

    fireEvent.keyDown(screen.getByText('checked'), { key: 13, code: 'Space' });
  });
});
