import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, FileUploader } from './FileUploader';

describe('atoms/FileUploader', () => {
  it('no drag, no drop', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : false,
      drop       : false,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<FileUploader {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('drag, no drop', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : true,
      drop       : false,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<FileUploader {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('drop', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : false,
      drop       : true,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<FileUploader {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('click', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : false,
      drop       : true,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    render(<FileUploader {...props} />);

    fireEvent.click(screen.getByRole('button'));
  });
});
