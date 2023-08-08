import type { CustomizedParameters } from '/src/types';
import type { ConvertedTime } from 'xsound';

import { SESSION_STORAGE_KEY } from '/src/config';

function padZero(n: number): string {
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

export function getStorage(): CustomizedParameters {
  const params: CustomizedParameters = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');

  return params;
}

export function setStorage(params: CustomizedParameters): void {
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(params));
}

export function removeStorage(): void {
  window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
