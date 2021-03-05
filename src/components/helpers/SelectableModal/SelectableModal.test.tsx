import React from 'react';
import renderer from 'react-test-renderer';
import { Props, SelectableModal } from './SelectableModal';

describe('helpers/SelectableModal', () => {
  test('render', () => {
    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'with overlay',
      first     : {
        label : 'first',
        action: (event: React.SyntheticEvent) => {
          alert(`${event.type} first`);
        }
      },
      second    : {
        label : 'second',
        action: (event: React.SyntheticEvent) => {
          alert(`${event.type} second`);
        }
      },
      onClose   : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<SelectableModal {...props}><div>Contents</div></SelectableModal>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
