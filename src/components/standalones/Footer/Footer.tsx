import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const Footer: React.FC<Props> = () => {
  return (
    <footer className="Footer">
      <small>Copyright (c) 2012 <strong>Tomohiro IKEDA</strong> &gt;&gt; <a href="https://korilakkuma.github.io/LIFE-with-FAVORITES/" target="_blank" rel="noopener noreferrer">Website</a></small>
      <small><a href="http://maoudamashii.jokersounds.com/" target="_blank" rel="noopener noreferrer" lang="ja">音楽素材/魔王魂</a></small>
    </footer>
  );
};
