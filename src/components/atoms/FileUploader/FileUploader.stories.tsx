import React, { useState, useCallback } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, FileUploader } from './FileUploader';
import '../../../main.css';

export default {
  title    : 'atoms/FileUploader',
  component: FileUploader
} as Meta;

const Template: Story<Props> = (args: Props) => {
  const [drag, setDrag] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);

  const onDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    document.body.style.backgroundColor = '#333';

    setDrag(true);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    document.body.style.backgroundColor = '#999';
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    document.body.style.backgroundColor = '#000';

    setDrag(false);
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    alert(event.type);

    setDrag(false);
    setDrop(true);
  }, []);

  const props = { ...args, drag, drop, onDragEnter, onDragOver, onDragLeave, onDrop };

  return <FileUploader {...props} />;
};

export const Primary = Template.bind({});

Primary.args = {
  id         : 'uploader-1',
  accept     : 'audio/*',
  disabled    : false,
  placeholder: 'MP3, Ogg, WAV ... etc',
  filename   : '',
  onChange   : (event: React.ChangeEvent<HTMLInputElement>) => {
    alert(event.type);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  id         : 'uploader-2',
  accept     : 'audio/*',
  disabled   : false,
  placeholder: 'MP3, Ogg, WAV ... etc',
  filename   : 'Default filename',
  onChange   : (event: React.ChangeEvent<HTMLInputElement>) => {
    alert(event.type);
  }
};
