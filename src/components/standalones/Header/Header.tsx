import * as React from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  progress: boolean;
  rate: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {
  running: boolean;
  animationEnd: boolean;
}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      running: false,
      animationEnd: false
    };

    this.onClick = this.onClick.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }

  render(): React.ReactNode {
    return (
      <header
        className={`Header${this.props.progress ? ' -progress' : ' -fadeIn'}${this.state.running ? ' -fadeOut' : ''}`}
        hidden={this.state.animationEnd}
        onAnimationEnd={this.onAnimationEnd}
      >
        <div hidden={this.props.progress}>
          <div>
            <a href="https://github.com/Korilakkuma/XSound.app" target="_blank" rel="noopener noreferrer">
              <img
                style={{
                  position: 'absolute',
                  top     : '0',
                  right   : '0',
                  zIndex  : '10',
                  border  : '0'
                }}
                src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
                alt="Fork me on GitHub"
              />
            </a>
          </div>
          <div>
            <h1 className="Header__logo">
              <img src="/assets/images/logo-v09.png" alt="XSound.app" width="200" height="100" />
              <img src="/assets/images/logo-v09.png" alt="XSound.app" width="200" height="100" />
              <img src="/assets/images/logo-v09.png" alt="XSound.app" width="200" height="100" />
              <img src="/assets/images/logo-v09.png" alt="XSound.app" width="200" height="100" />
              <img src="/assets/images/logo-v09.png" alt="XSound.app" width="200" height="100" />
              <img src="/assets/images/logo-v09.png" alt="XSound.app" width="200" height="100" />
            </h1>
            <div className="Header__intro">
              <span className="Header__moveLeft">This application is created by <strong>Web Audio API</strong>. You can create sound or listen to audio or record sound or session.</span>
              <span className="Header__moveRight">The sound that can be created corresponds to 88 keyboards of Piano, and you can play the 2 sounds at the same time.</span>
              <span className="Header__moveLeft">Moreover, you can make effects to sound. Other, you can watch sound waves on time and frequency domain.</span>
            </div>
            <nav className="Header__startButton"><button type="button" aria-label="Start Application" onClick={this.onClick}></button></nav>
          </div>
        </div>
        <div className="Header__loading" hidden={!this.props.progress}>
          <p className="Header__progressText">Now Loading ... </p>
          <div className="Header__progressWrapper">
            <div className="Header__progressMask" />
            <div className="Header__progressBar" style={{ width: `${this.props.rate}%` }} />
          </div>
        </div>
      </header>
    );
  }

  private onClick(): void {
    this.setState({ running: true });
  }

  private onAnimationEnd(event: React.SyntheticEvent): void {
    if (event.animationName === 'fade-out-header-animation') {
      this.setState({ animationEnd: true });
    }
  }
}

export default connect()(Header);
