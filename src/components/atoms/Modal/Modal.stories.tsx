/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Modal } from './Modal';
import '../../../main.css';

export default {
  component: Modal
} as ComponentMeta<typeof Modal>;

const Template: ComponentStoryObj<typeof Modal> = {
  render: (args) => {
    const [isShow, setIsShow] = useState<boolean>(false);

    const onClick = useCallback(() => {
      setIsShow(true);
    }, []);

    const onClose = useCallback(() => {
      setIsShow(false);
    }, []);

    const props = { ...args, isShow, onClose };

    return (
      <React.Fragment>
        <button type="button" onClick={onClick} style={{ backgroundColor: '#fff' }}>Open</button>
        <Modal {...props}>
          <div>contents</div>
        </Modal>
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template,
  args: {
    hasOverlay: false,
    title     : 'without overlay',
    asAlert   : false
  }
};

export const Secondary = {
  ...Template,
  args: {
    hasOverlay: true,
    title     : 'with overlay',
    asAlert   : false
  }
};

export const Tertiary = {
  ...Template,
  args: {
    hasOverlay: false,
    title     : 'Alert',
    asAlert   : true
  }
};
