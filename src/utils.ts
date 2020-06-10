export function createFilename(prefix, ext) {
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

  return `${prefix}${y}${m}${d}${h}${i}${s}${ext}`;
}