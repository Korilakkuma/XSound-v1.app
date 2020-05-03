import * as React from 'react';

interface Props {
  isShow: boolean;
  hasOverlay: boolean;
  title: string;
  onClose(event: React.SyntheticEvent): void;
  children: React.ReactNode;
}

const Modal: React.SFC<Props> = (props: Props) => {
  const { isShow, hasOverlay, title, onClose, children } = props;

  return (
    <div className={`Modal${isShow ? ' -show' : ''}`}>
      {hasOverlay ? <div className="Modal__overlay" role="button"  onClick={onClose} /> : null}
      <div className="Modal__inner">
        <h1 className="Modal__title">{title}</h1>
        <div className="Modal__contents">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
