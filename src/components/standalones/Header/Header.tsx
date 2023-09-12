import React, { useCallback, useEffect, useState, useId, useMemo, useRef } from 'react';

import { FOCUSABLE_ELEMENTS } from '/src/config';
import { ProgressBar } from '/src/components/atoms/ProgressBar/ProgressBar';

export type Props = {
  loadedApp: boolean;
  progress: boolean;
  rate: number;
  onClickSetupCallback: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Header: React.FC<Props> = ({ loadedApp, progress, rate, onClickSetupCallback }) => {
  const headerRef = useRef<HTMLElement>(null);

  const [animationEnded, setAnimationEnded] = useState<boolean>(false);

  const loaded = useMemo(() => {
    return loadedApp && rate >= 100;
  }, [loadedApp, rate]);

  const onAnimationEndCallback = useCallback(() => {
    setAnimationEnded(true);
  }, []);

  useEffect(() => {
    const root = document.getElementById('app');

    if (root === null) {
      return;
    }

    const hiddenElement = (element: Element) => {
      return Array.from(document.querySelectorAll('[aria-hidden="true"]')).some((node: Element) => node.contains(element));
    };

    if (loaded) {
      Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => {
          return headerRef.current !== null && !headerRef.current.contains(node) && !hiddenElement(node) && node.getAttribute('tabindex') === '-1';
        })
        .forEach((element: Element) => {
          if (element.getAttribute('role') === 'switch') {
            element.setAttribute('tabindex', '0');
          } else if (element.getAttribute('type') === 'checkbox' || element.getAttribute('type') === 'file') {
            element.setAttribute('tabindex', '-1');
          } else {
            element.removeAttribute('tabindex');
          }
        });
    } else if (animationEnded) {
      Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter((node: Element) => {
          return headerRef.current !== null && !headerRef.current.contains(node) && !hiddenElement(node) && node.getAttribute('tabindex') !== '-1';
        })
        .forEach((element: Element) => {
          element.setAttribute('tabindex', '-1');
        });
    }
  }, [animationEnded, loaded]);

  const id = useId();
  const labelId = useMemo(() => `header-label-${id}`, [id]);
  const describeId = useMemo(() => `header-describe-${id}`, [id]);

  return (
    <header
      ref={headerRef}
      role='dialog'
      hidden={loaded}
      aria-modal={!loaded}
      aria-labelledby={labelId}
      aria-describedby={describeId}
      className={`Header${progress ? ' -progress' : ' -fadeIn'}`}
      onAnimationEnd={onAnimationEndCallback}
    >
      <div hidden={progress}>
        <div className='Header__forkMeOnGitHub'>
          <a href='https://github.com/Korilakkuma/XSound.app' target='_blank' rel='noopener noreferrer'>
            Fork me on GitHub
          </a>
        </div>
        <div>
          <h1 id={labelId} className='Header__logo'>
            <img src='/assets/images/logo-v09.png' alt='XSound.app' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
            <img src='/assets/images/logo-v09.png' alt='' width='200' height='100' />
          </h1>
          <div id={describeId} className='Header__intro'>
            <span className='Header__moveLeft'>XSound.app is Web Music Application by XSound (Web Audio API Library).</span>
            <span className='Header__moveRight'>Synthesizer, Effects, Visualization, Multi-Track Recording, Visual Audio Sprite ...</span>
            <span className='Header__moveLeft'>Moreover, enable to use external devices such as Audio Interfaces, MIDI.</span>
          </div>
          <nav className='Header__startButton'>
            <button type='button' onClick={onClickSetupCallback}>
              Start Application
            </button>
          </nav>
        </div>
      </div>
      {progress ? <ProgressBar label={`Now Loading ... (${rate} %)`} rate={rate} /> : null}
    </header>
  );
};
