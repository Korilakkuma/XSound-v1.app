import React from 'react';
import renderer from 'react-test-renderer';
import { Props, Select } from './Select';

describe('atoms/Select', () => {
  it('render without width', () => {
    const props = {
      id      : 'select',
      label   : 'Select',
      values  : ['A', 'B', 'C'],
      texts   : ['0 - 0', '0 - 1', '0 - 2'],
      groups  : ['group0', 'group1', 'group2'],
      onChange: (event: React.SyntheticEvent) => {
        alert((event.currentTarget as HTMLInputElement).value);
      }
    } as Props;

    const tree = renderer.create(<Select {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('render with width', () => {
    const props = {
      id      : 'select',
      label   : 'Select',
      values  : ['A', 'B', 'C'],
      texts   : ['0 - 0', '0 - 1', '0 - 2'],
      width   : '50%',
      onChange: (event: React.SyntheticEvent) => {
        alert((event.currentTarget as HTMLInputElement).value);
      }
    } as Props;

    const tree = renderer.create(<Select {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
