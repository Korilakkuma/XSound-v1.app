import React from 'react';

import { Modal } from '/src/components/atoms/Modal';

type Selection = {
  label: string;
  action(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type Props = {
  isShow: boolean;
  hasOverlay: boolean;
  title: string;
  first: Selection;
  second: Selection;
  children: React.ReactNode;
  onClose(event: React.MouseEvent<HTMLButtonElement | HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void;
};

export const SelectableModal: React.FC<Props> = (props: Props) => {
  const { isShow, hasOverlay, title, first, second, children, onClose } = props;

  return (
    <div className='SelectableModal'>
      <Modal isShow={isShow} hasOverlay={hasOverlay} title={title} asAlert={false} onClose={onClose}>
        <div className='SelectableModal__contents'>{children}</div>
        <div className='SelectableModal__buttons'>
          <button type='button' onClick={first.action}>
            {first.label}
          </button>
          <button type='button' onClick={second.action}>
            {second.label}
          </button>
        </div>
      </Modal>
    </div>
  );
};
