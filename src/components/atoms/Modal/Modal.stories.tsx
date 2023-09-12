import React, { useCallback, useState } from 'react';

import { Modal } from '/src/components/atoms/Modal';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Modal
} as Meta<typeof Modal>;

const ModalContainer: React.FC<{
  hasOverlay: boolean;
  title: string;
  asAlert: boolean;
}> = (args) => {
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
      <button type='button' onClick={onClick} style={{ backgroundColor: '#fff' }}>
        Open
      </button>
      <Modal {...props}>
        <div>contents</div>
      </Modal>
    </React.Fragment>
  );
};

const Template: StoryObj<typeof Modal> = {
  render: (args) => <ModalContainer {...args} />
};

export const Primary = {
  ...Template,
  args: {
    hasOverlay: false,
    title: 'without overlay',
    asAlert: false
  }
};

export const Secondary = {
  ...Template,
  args: {
    hasOverlay: true,
    title: 'with overlay',
    asAlert: false
  }
};

export const Tertiary = {
  ...Template,
  args: {
    hasOverlay: false,
    title: 'Alert',
    asAlert: true
  }
};
