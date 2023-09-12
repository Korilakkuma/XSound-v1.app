import React, { useCallback, useState } from 'react';

import { SelectableModal } from '/src/components/helpers/SelectableModal';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SelectableModal
} as Meta<typeof SelectableModal>;

const SelectableModalContainer: React.FC<{
  hasOverlay: boolean;
  title: string;
}> = (args) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setIsShow(true);
  }, []);

  const onClose = useCallback(() => {
    setIsShow(false);
  }, []);

  const first = {
    label: 'first',
    action: useCallback(
      (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        alert(`${event.type} first`);
        onClose();
      },
      [onClose]
    )
  };

  const second = {
    label: 'second',
    action: useCallback(
      (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        alert(`${event.type} second`);
        onClose();
      },
      [onClose]
    )
  };

  const props = { ...args, isShow, onClose, first, second };

  return (
    <React.Fragment>
      <button type='button' onClick={onClick} style={{ backgroundColor: '#fff' }}>
        Open
      </button>
      <SelectableModal {...props}>
        <p>Select</p>
      </SelectableModal>
    </React.Fragment>
  );
};

const Template: StoryObj<typeof SelectableModal> = {
  render: (args) => <SelectableModalContainer {...args} />
};

export const Primary = {
  ...Template,
  args: {
    hasOverlay: false,
    title: 'without overlay'
  }
};

export const Secondary = {
  ...Template,
  args: {
    hasOverlay: true,
    title: 'with overlay'
  }
};
