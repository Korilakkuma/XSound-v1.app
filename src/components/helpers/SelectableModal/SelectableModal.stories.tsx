/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { SelectableModal } from './SelectableModal';
import '../../../main.css';

export default {
  component: SelectableModal
} as ComponentMeta<typeof SelectableModal>;

const Template: ComponentStoryObj<typeof SelectableModal> = {
  render: (args) => {
    const [isShow, setIsShow] = useState<boolean>(false);

    const onClick = useCallback(() => {
      setIsShow(true);
    }, []);

    const onClose = useCallback(() => {
      setIsShow(false);
    }, []);

    const first = {
      label : 'first',
      action: useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        alert(`${event.type} first`);
        onClose();
      }, [onClose])
    };

    const second = {
      label : 'second',
      action: useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        alert(`${event.type} second`);
        onClose();
      }, [onClose])
    };

    const props = { ...args, isShow, onClose, first, second };

    return (
      <React.Fragment>
        <button type="button" onClick={onClick} style={{ backgroundColor: '#fff' }}>Open</button>
        <SelectableModal {...props} />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template,
  args: {
    hasOverlay: false,
    title     : 'without overlay'
  }
};

export const Secondary = {
  ...Template,
  args: {
    hasOverlay: true,
    title     : 'with overlay'
  }
};
