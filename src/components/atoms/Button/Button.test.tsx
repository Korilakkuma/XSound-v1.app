import React from 'react';
import renderer from 'react-test-renderer';
import { Props, Button } from './Button';

describe('atoms/Button', () => {
  test('inactive', () => {
    const props = {
      active : false,
      label  : 'Start',
      width  : 70,
      height : 33,
      image  : 'https://xsound.app/assets/images/button-audio.png',
      size   : '70px 99px',
      onClick: (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<Button {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('active', () => {
    const props = {
      active : true,
      label  : 'Stop',
      width  : 70,
      height : 33,
      image  : 'https://xsound.app/assets/images/button-audio.png',
      size   : '70px 99px',
      onClick: (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<Button {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
