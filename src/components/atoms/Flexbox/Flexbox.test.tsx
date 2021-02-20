import React from 'react';
import renderer from 'react-test-renderer';
import { Flexbox } from './Flexbox';

describe('atoms/Flexbox', () => {
  it('render', () => {
    const tree = renderer.create(
      <Flexbox>
        <div style={{ width: '150px', height: '150px', backgroundColor: '#333' }} />
        <div style={{ width: '300px', height: '300px', backgroundColor: '#666' }} />
        <div style={{ width: '600px', height: '600px', backgroundColor: '#999' }} />
      </Flexbox>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
