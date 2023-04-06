/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useState } from 'react';

import { FileUploader } from './FileUploader';

import type { Meta, StoryObj } from '@storybook/react';
import '../../../main.css';

export default {
  component: FileUploader
} as Meta<typeof FileUploader>;

const Template: StoryObj<typeof FileUploader> = {
  render: (args) => {
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
  }
};

export const Primary = {
  ...Template,
  args: {
    accept     : 'audio/*',
    disabled   : false,
    placeholder: 'MP3, Ogg, WAV ... etc',
    filename   : '',
    onChange   : (event: React.ChangeEvent<HTMLInputElement>) => {
      alert(event.type);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    accept     : 'audio/*',
    disabled   : false,
    placeholder: 'MP3, Ogg, WAV ... etc',
    filename   : 'Default filename',
    onChange   : (event: React.ChangeEvent<HTMLInputElement>) => {
      alert(event.type);
    }
  }
};
