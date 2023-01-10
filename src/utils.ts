import type { ConvertedTime } from 'xsound';

function padZero(n: number) {
  return n.toString().padStart(2, '0');
}

export function formatAudioTime(convertedTime: ConvertedTime): string {
  const { minutes, seconds } = convertedTime;

  return `${padZero(minutes)} : ${padZero(seconds)}`;
}

export function createFilename(prefix: string, ext: string): string {
  const date = new Date();

  const y = date.getFullYear();
  const m = padZero(date.getMonth() + 1);
  const d = padZero(date.getDate());
  const h = padZero(date.getHours());
  const i = padZero(date.getMinutes());
  const s = padZero(date.getSeconds());

  return `${prefix}${y}${m}${d}${h}${i}${s}.${ext}`;
}
