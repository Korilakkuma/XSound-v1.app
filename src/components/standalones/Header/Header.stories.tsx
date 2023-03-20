/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import { X } from 'xsound';

import { Header } from './Header';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStoryObj<typeof Header> = {
  render: () => {
    const [loadedApp, setLoadedApp] = useState<boolean>(false);
    const [progress, setProgress] = useState<boolean>(false);
    const [rate, setRate] = useState<number>(0);

    const onClickSetupCallback = useCallback(async () => {
      await X.setup();
      setLoadedApp(true);
      setProgress(true);
    }, []);

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

    return <Header loadedApp={loadedApp} progress={progress} rate={rate} onClickSetupCallback={onClickSetupCallback} />;
  }
};

export const Primary = {
  ...Template
};
