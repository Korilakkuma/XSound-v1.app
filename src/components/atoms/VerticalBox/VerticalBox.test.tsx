import React from 'react';
import renderer from 'react-test-renderer';
import { VerticalBox } from './VerticalBox';

describe('atoms/VerticalBox', () => {
  it('render', () => {
    const tree = renderer.create(
      <VerticalBox>
        <div style={{ height: '150px', backgroundColor: '#333' }} />
        <div style={{ height: '300px', backgroundColor: '#666' }} />
        <div style={{ height: '600px', backgroundColor: '#999' }} />
      </VerticalBox>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
