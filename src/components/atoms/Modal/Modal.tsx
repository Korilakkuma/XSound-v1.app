import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

export interface Props {
  id: string;
  isShow: boolean;
  hasOverlay: boolean;
  title: string;
  asAlert: boolean;
  children: React.ReactNode;
  onClose?(event: React.MouseEvent<HTMLButtonElement | HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void;
}

interface OverlayProps {
  className: string;
  onClose?(event: React.MouseEvent<HTMLButtonElement | HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void;
}

const FOCUSABLE_ELEMENTS = 'a, button, input:not([type="checkbox"]):not([type="file"]), select, textarea, svg, [tabindex], [contentEditable]';

const Overlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  const { className, onClose } = props;

  const onKeyDownCallback = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClose) {
      return;
    }

    if ((event.nativeEvent.key === 'Enter') || (event.nativeEvent.keyCode === 13)) {
      onClose(event);
    }
  }, [onClose]);

  if (onClose) {
    return <div role="button" tabIndex={0} className={className} onClick={onClose} onKeyDown={onKeyDownCallback} />;
  }

  return <div role="presentation" className={className} />;
};

const ModalBody: React.FC<Props> = (props: Props) => {
  const { id, isShow, hasOverlay, title, asAlert, children, onClose } = props;

  const labelId    = `label-${id}`;
  const describeId = `describe-${id}`;

  useEffect(() => {
    const root = document.getElementById('app');

    if (root === null) {
      return;
    }

    const hiddenElement = (element: Element) => {
      return Array.from(document.querySelectorAll('[aria-hidden="true"]')).some((node: Element) => node.contains(element));
    };

    if (isShow) {
      const elements = Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => !hiddenElement(node) && node.getAttribute('tabindex') !== '-1');

      elements.forEach((element: Element) => element.setAttribute('tabindex', '-1'));
    } else {
      const elements = Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => !hiddenElement(node) && node.getAttribute('tabindex') === '-1');

      elements.forEach((element: Element) => {
        if (element.getAttribute('role') === 'switch') {
          element.setAttribute('tabindex', '0');
        } else if ((element.getAttribute('type') === 'checkbox') || (element.getAttribute('type') === 'file')) {
          element.setAttribute('tabindex', '-1');
        } else {
          element.removeAttribute('tabindex');
        }
      });
    }
  }, [isShow]);

  return (
    <div
      role="dialog"
      tabIndex={-1}
      aria-modal={isShow}
      aria-labelledby={labelId}
      aria-describedby={describeId}
      className={`Modal${isShow ? ' -show' : ''}`}
    >
      {hasOverlay ?  <Overlay className="Modal__overlay" onClose={onClose} /> : null}
      <div className="Modal__inner">
        {onClose ? <button type="button" aria-label="Close modal" className="Modal__closer" onClick={onClose}>X</button> : null}
        <h2 id={labelId} className="Modal__title">{title}</h2>
        <div role={asAlert ? 'alert' : undefined} id={describeId} className="Modal__contents">{children}</div>
      </div>
    </div>
  );
};

export const Modal: React.FC<Props> = (props: Props) => {
  const { children, ...bodyProps } = props;

  return ReactDOM.createPortal(<ModalBody {...bodyProps}>{children}</ModalBody>, document.body);
};
