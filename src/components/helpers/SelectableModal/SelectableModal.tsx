import * as React from 'react';
import { Modal } from '../../atoms/Modal';

interface Selection {
  label: string;
  action(event: React.SyntheticEvent): void;
}

interface Props {
  isShow: boolean;
  hasOverlay: boolean;
  title: string;
  first: Selection;
  second: Selection;
  onClose(event: React.SyntheticEvent): void;
  children: React.ReactNode;
}

const SelectableModal: React.SFC<Props> = (props: Props) => {
  const {
    isShow,
    hasOverlay,
    title,
    first,
    second,
    onClose,
    children
  } = props;

  return (
    <div className="SelectableModal">
      <Modal isShow={isShow} hasOverlay={hasOverlay} title={title} onClose={onClose}>
        <div className="SelectableModal__contents">{children}</div>
        <div className="SelectableModal__buttons">
          <button type="button" onClick={first.action}>{first.label}</button>
          <button type="button" onClick={second.action}>{second.label}</button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectableModal;
