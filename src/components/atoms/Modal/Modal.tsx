import * as React from 'react';

interface Props {
  isShow: boolean;
  hasOverlay: boolean;
  title: string;
  onClose(event: React.SyntheticEvent): void | null;
  children: React.ReactNode;
}

const Modal: React.SFC<Props> = (props: Props) => {
  const { isShow, hasOverlay, title, onClose, children } = props;

  return (
    <div className={`Modal${isShow ? ' -show' : ''}`}>
      {hasOverlay ? <div className="Modal__overlay" role={onClose !== null ? 'button' : null} onClick={onClose} /> : null}
      <div className="Modal__inner">
        {onClose !== null ? <button className="Modal__closer" type="button" aria-label="Close modal" onClick={onClose}>X</button> : null}
        <h1 className="Modal__title">{title}</h1>
        <div className="Modal__contents">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
