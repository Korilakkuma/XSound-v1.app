import React, { useState, useEffect, useMemo, useCallback, useRef, useId } from 'react';
import { ProgressBar } from '../../atoms/ProgressBar';
import { FOCUSABLE_ELEMENTS } from '../../../config';

export type Props = {
  progress: boolean,
  rate: number
};

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
      Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => {
          return (headerRef.current !== null) && !headerRef.current.contains(node) &&
            !hiddenElement(node) &&
            (node.getAttribute('tabindex') !== '-1');
        })
        .forEach((element: Element) => {
          element.setAttribute('tabindex', '-1');
        });
    } else if (animationEnd) {
      Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => {
          return (headerRef.current !== null) && !headerRef.current.contains(node) &&
            !hiddenElement(node) &&
            (node.getAttribute('tabindex') === '-1');
        })
        .forEach((element: Element) => {
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

  const id         = useId();
  const labelId    = useMemo(() => `header-label-${id}`, [id]);
  const describeId = useMemo(() => `header-describe-${id}`, [id]);

  return (
    <header
      ref={headerRef}
      role="dialog"
      hidden={animationEnd}
      aria-modal={!animationEnd}
      aria-labelledby={labelId}
      aria-describedby={describeId}
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
          <h1 id={labelId} className="Header__logo">
            <img src="/assets/images/logo-v09.png" alt="XSound.app" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
            <img src="/assets/images/logo-v09.png" alt="" width="200" height="100" />
          </h1>
          <div id={describeId} className="Header__intro">
            <span className="Header__moveLeft">XSound.app is Web Music Application by XSound (Web Audio API Library).</span>
            <span className="Header__moveRight">Synthesizer, Effects, Visualization, Multi-Track Recording, Visual Audio Sprite ...</span>
            <span className="Header__moveLeft">Moreover, enable to use external devices such as Audio Interfaces, MIDI.</span>
          </div>
          <nav className="Header__startButton"><button type="button" onClick={onClickCallback}>Start Application</button></nav>
        </div>
      </div>
      {progress ? <ProgressBar label={`Now Loading ... (${rate} %)`} rate={rate} /> : null}
    </header>
  );
};
