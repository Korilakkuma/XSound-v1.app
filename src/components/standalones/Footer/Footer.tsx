import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const Footer: React.FC<Props> = () => {
  return (
    <footer className="Footer">
      <p>Copyright (c) 2012 <a href="https://korilakkuma.github.io/LIFE-with-FAVORITES/" target="_blank" rel="noopener noreferrer">Tomohiro IKEDA</a></p>
      <p><a href="http://maoudamashii.jokersounds.com/" target="_blank" rel="noopener noreferrer" lang="ja">音楽素材/魔王魂</a></p>
    </footer>
  );
};
