import React from 'react';
import renderer from 'react-test-renderer';
import { Props, GroupSelect } from './GroupSelect';

describe('atoms/GroupSelect', () => {
  it('render without width', () => {
    const props = {
      id      : 'group-select',
      label   : 'Group Select',
      values  : {
        group0: ['A', 'B', 'C'],
        group1: ['D', 'E', 'F'],
        group2: ['G', 'H', 'I']
      },
      texts   : {
        group0: ['0 - 0', '0 - 1', '0 - 2'],
        group1: ['1 - 0', '1 - 1', '1 - 2'],
        group2: ['2 - 0', '2 - 1', '2 - 2']
      },
      groups  : ['group0', 'group1', 'group2'],
      onChange: (event: React.SyntheticEvent) => {
        alert((event.currentTarget as HTMLInputElement).value);
      }
    } as Props;

    const tree = renderer.create(<GroupSelect {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('render with width', () => {
    const props = {
      id      : 'group-select',
      label   : 'Group Select',
      values  : {
        group0: ['A', 'B', 'C'],
        group1: ['D', 'E', 'F'],
        group2: ['G', 'H', 'I']
      },
      texts   : {
        group0: ['0 - 0', '0 - 1', '0 - 2'],
        group1: ['1 - 0', '1 - 1', '1 - 2'],
        group2: ['2 - 0', '2 - 1', '2 - 2']
      },
      groups  : ['group0', 'group1', 'group2'],
      width   : '50%',
      onChange: (event: React.SyntheticEvent) => {
        alert((event.currentTarget as HTMLInputElement).value);
      }
    } as Props;

    const tree = renderer.create(<GroupSelect {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
