/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Header } from './Header';
import '../../../main.css';

export default {
  component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStoryObj<typeof Header> = {
  render: () => {
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
  }
};

export const Primary = {
  ...Template
};
