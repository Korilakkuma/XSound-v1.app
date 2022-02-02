import { X } from 'xsound';

export function formatAudioTime(convertedTime: ReturnType<typeof X.convertTime>): string {
  const { minutes, seconds } = convertedTime;

  return `${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(-2)}`;
}

export function createFilename(prefix: string, ext: string): string {
  const format = (n: number) => {
    return (`0${n}`).slice(-2);
  };

  const date = new Date();

  const y = date.getFullYear();
  const m = format(date.getMonth() + 1);
  const d = format(date.getDate());
  const h = format(date.getHours());
  const i = format(date.getMinutes());
  const s = format(date.getSeconds());

  return `${prefix}${y}${m}${d}${h}${i}${s}.${ext}`;
}
