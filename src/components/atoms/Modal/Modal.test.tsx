import React from 'react';
import renderer from 'react-test-renderer';
import { Props, Modal } from './Modal';

describe('atoms/Modal', () => {
  test('not show', () => {
    const props = { isShow: false } as Props;

    const tree = renderer.create(<Modal {...props}><div>Content</div></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('not has overlay', () => {
    const props = {
      isShow    : true,
      hasOverlay: false,
      title     : 'not has overlay',
      onClose   : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<Modal {...props}><div>Content</div></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('has overlay', () => {
    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'has overlay',
      onClose   : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<Modal {...props}><div>Content</div></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('not close handler', () => {
    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'has overlay'
    } as Props;

    const tree = renderer.create(<Modal {...props}><div>Content</div></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
