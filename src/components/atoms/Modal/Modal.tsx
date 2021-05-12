import React from 'react';
import ReactDOM from 'react-dom';

export interface Props {
  isShow: boolean;
  hasOverlay: boolean;
  title: string;
  children: React.ReactNode;
  onClose?(event: React.SyntheticEvent): void;
}

interface OverlayProps {
  className: string;
  onClose?(event: React.SyntheticEvent): void;
}

const Overlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  const { className, onClose } = props;

  if (onClose) {
    return <div role="button" className={className} onClick={onClose} />;
  }

  return <div role="presentation" className={className} />;
};

const ModalBody: React.FC<Props> = (props: Props) => {
  const { isShow, hasOverlay, title, children, onClose } = props;

  return (
    <div className={`Modal${isShow ? ' -show' : ''}`}>
      {hasOverlay ?  <Overlay className="Modal__overlay" onClose={onClose} /> : null}
      <div className="Modal__inner">
        {onClose ? <button type="button" aria-label="Close modal" className="Modal__closer" onClick={onClose}>X</button> : null}
        <h1 className="Modal__title">{title}</h1>
        <div className="Modal__contents">{children}</div>
      </div>
    </div>
  );
};

export const Modal: React.FC<Props> = (props: Props) => {
  const { children, ...bodyProps } = props;

  return ReactDOM.createPortal(<ModalBody {...bodyProps}>{children}</ModalBody>, document.body);
};
