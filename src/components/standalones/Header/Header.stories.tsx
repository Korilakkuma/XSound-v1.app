import React, { useState, useEffect } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Header } from './Header';
import '../../../main.css';

export default {
  title    : 'standalones/Header',
  component: Header
} as Meta;

const Template: Story<Props> = () => {
  const [progress, setProgress] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    if (!progress) {
      return;
    }

    const animationid = requestAnimationFrame(() => {
      setRate(rate + 1);

      if (rate >= 100) {
        setProgress(false);
      }
    });

    return () => {
      cancelAnimationFrame(animationid);
    };
  });

  return <Header progress={progress} rate={rate} />;
};

export const Primary = Template.bind({});
