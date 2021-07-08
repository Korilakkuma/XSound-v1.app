import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ProgressBar } from '../../atoms/ProgressBar';
import { FOCUSABLE_ELEMENTS } from '../../../config';

export interface Props {
  progress: boolean;
  rate: number;
}

export const Header: React.FC<Props> = (props: Props) => {
  const { progress, rate } = props;

  const headerRef = useRef<HTMLElement>(null);

  const [running, setRunning] = useState<boolean>(false);
  const [animationEnd, setAnimationEnd] = useState<boolean>(false);

  const onClickCallback = useCallback(() => {
    setRunning(true);
  }, []);

  const onAnimationEndCallback = useCallback((event: React.AnimationEvent<HTMLElement>) => {
    if (event.nativeEvent.animationName === 'fade-out-header-animation') {
      setAnimationEnd(true);
    }
  }, []);

  useEffect(() => {
    const root = document.getElementById('app');

    if (root === null) {
      return;
    }

    const hiddenElement = (element: Element) => {
      return Array.from(document.querySelectorAll('[aria-hidden="true"]')).some((node: Element) => node.contains(element));
    };

    if (!progress && !animationEnd) {
      const elements = Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => (headerRef.current !== null) && !headerRef.current.contains(node) && !hiddenElement(node) && node.getAttribute('tabindex') !== '-1');

      elements.forEach((element: Element) => element.setAttribute('tabindex', '-1'));
    } else if (animationEnd) {
      const elements = Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => (headerRef.current !== null) && !headerRef.current.contains(node) && !hiddenElement(node) && node.getAttribute('tabindex') === '-1');

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
  }, [progress, animationEnd]);

  return (
    <header
      ref={headerRef}
      role="dialog"
      hidden={animationEnd}
      aria-modal={!animationEnd}
      aria-labelledby="header-label"
      aria-describedby="header-describe"
      className={`Header${progress ? ' -progress' : ' -fadeIn'}${running ? ' -fadeOut' : ''}`}
      onAnimationEnd={onAnimationEndCallback}
    >
      <div hidden={progress}>
        <div className="Header__forkMeOnGitHub">
          <a href="https://github.com/Korilakkuma/XSound.app" target="_blank" rel="noopener noreferrer">
            Fork me on GitHub
          </a>
        </div>
        <div>
          <h1 id="header-label" className="Header__logo">
            <img src="/assets/images/logo-v09.png" alt="XSound.app" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
          </h1>
          <div id="header-describe" className="Header__intro">
            <span className="Header__moveLeft">This application is created by <strong>Web Audio API</strong>. You can create sound or listen to audio or record sound or session.</span>
            <span className="Header__moveRight">The sound that can be created corresponds to 88 keyboards of Piano, and you can play the 2 sounds at the same time.</span>
            <span className="Header__moveLeft">Moreover, you can make effects to sound. Other, you can watch sound waves on time and frequency domain.</span>
          </div>
          <nav className="Header__startButton"><button type="button" className="" onClick={onClickCallback}>Start Application</button></nav>
        </div>
      </div>
      {progress ? <ProgressBar id="progress-bar-load-assets" label={`Now Loading ... (${rate} %)`} rate={rate} /> : null}
    </header>
  );
};
