import * as React from 'react';

interface Props {
  isShow: boolean;
  hasOverlay: boolean;
  title: string;
  children: React.ReactNode;
  onClose?(event: React.SyntheticEvent): void;
}

const Modal: React.FC<Props> = (props: Props) => {
  const { isShow, hasOverlay, title, children, onClose } = props;

  return (
    <div className={`Modal${isShow ? ' -show' : ''}`}>
      {hasOverlay ? <div className="Modal__overlay" role={onClose ? 'button' : undefined} onClick={onClose} /> : null}
      <div className="Modal__inner">
        {onClose ? <button className="Modal__closer" type="button" aria-label="Close modal" onClick={onClose}>X</button> : null}
        <h1 className="Modal__title">{title}</h1>
        <div className="Modal__contents">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
