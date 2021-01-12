import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, FileUploader } from './FileUploader';
import '../../../main.css';

export default {
  title    : 'atoms/FileUploader',
  component: FileUploader
} as Meta;

const Template: Story<Props> = (args: Props) => <FileUploader {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label      : 'Upload Audio',
  accept     : 'audio/*',
  placeholder: 'MP3, Ogg, WAV ... etc',
  filename   : '',
  onChange   : (event: React.SyntheticEvent) => {
    alert(event.type);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragEnter: (event: React.SyntheticEvent) => {
    document.body.style.backgroundColor = '#333';
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragOver : (event: React.SyntheticEvent) => {
    document.body.style.backgroundColor = '#999';
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragLeave: (event: React.SyntheticEvent) => {
    document.body.style.backgroundColor = '#000';
  },
  onDrop     : (event: React.SyntheticEvent) => {
    alert(event.type);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  label      : 'Uploaded Audio',
  accept     : 'audio/*',
  placeholder: 'MP3, Ogg, WAV ... etc',
  filename   : 'Default filename',
  onChange   : (event: React.SyntheticEvent) => {
    alert(event.type);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragEnter: (event: React.SyntheticEvent) => {
    document.body.style.backgroundColor = '#333';
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragOver : (event: React.SyntheticEvent) => {
    document.body.style.backgroundColor = '#999';
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragLeave: (event: React.SyntheticEvent) => {
    document.body.style.backgroundColor = '#000';
  },
  onDrop     : (event: React.SyntheticEvent) => {
    alert(event.type);
  }
};
