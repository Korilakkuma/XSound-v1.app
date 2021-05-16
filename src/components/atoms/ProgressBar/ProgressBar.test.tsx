import React from 'react';
import renderer from 'react-test-renderer';
import { ProgressBar } from './ProgressBar';

describe('atoms/ProgressBar', () => {
  test('manual', () => {
    const props = {
      id   : 'progress-bar-manual',
      label: 'Progress Bar',
      rate : 50
    };

    const tree = renderer.create(<ProgressBar {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('manual max', () => {
    const props = {
      id   : 'progress-bar-manual',
      label: 'Progress Bar',
      rate : 101
    };

    const tree = renderer.create(<ProgressBar {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('auto', () => {
    const props = {
      id   : 'progress-bar-auto',
      label: 'Progress Bar'
    };

    const tree = renderer.create(<ProgressBar {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
