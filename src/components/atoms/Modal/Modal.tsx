import React, { useCallback } from 'react';
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

  const onKeyDownCallback = useCallback((event: React.SyntheticEvent) => {
    if (!onClose) {
      return;
    }

    const nativeEvent = event.nativeEvent as KeyboardEvent;

    if ((nativeEvent.key === 'Enter') || (nativeEvent.keyCode === 13)) {
      onClose(event);
    }
  }, [onClose]);

  if (onClose) {
    return <div role="button" tabIndex={0} className={className} onClick={onClose} onKeyDown={onKeyDownCallback} />;
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
