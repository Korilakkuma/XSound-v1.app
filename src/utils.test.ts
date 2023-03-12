import { createFilename, formatAudioTime } from './utils';

describe(`utils/${formatAudioTime.name}`, () => {
  test('1 digits', () => {
    const actual   = formatAudioTime({ minutes: 1, seconds: 1, milliseconds: 0 });
    const expected = '01 : 01';

    expect(actual).toBe(expected);
  });

  test('2 digits', () => {
    const actual   = formatAudioTime({ minutes: 29, seconds: 29, milliseconds: 0 });
    const expected = '29 : 29';

    expect(actual).toBe(expected);
  });
});

describe(`utils/${createFilename.name}`, () => {
  test('1 digits', () => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValueOnce(1970);
    jest.spyOn(Date.prototype, 'getMonth').mockReturnValueOnce(0);
    jest.spyOn(Date.prototype, 'getDate').mockReturnValueOnce(1);
    jest.spyOn(Date.prototype, 'getHours').mockReturnValueOnce(1);
    jest.spyOn(Date.prototype, 'getMinutes').mockReturnValueOnce(1);
    jest.spyOn(Date.prototype, 'getSeconds').mockReturnValueOnce(1);

    const actual   = createFilename('prefix-', 'wav');
    const expected = 'prefix-19700101010101.wav';

    expect(actual).toBe(expected);
  });

  test('2 digits', () => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValueOnce(1970);
    jest.spyOn(Date.prototype, 'getMonth').mockReturnValueOnce(11);
    jest.spyOn(Date.prototype, 'getDate').mockReturnValueOnce(31);
    jest.spyOn(Date.prototype, 'getHours').mockReturnValueOnce(23);
    jest.spyOn(Date.prototype, 'getMinutes').mockReturnValueOnce(59);
    jest.spyOn(Date.prototype, 'getSeconds').mockReturnValueOnce(59);

    const actual   = createFilename('prefix-', 'wav');
    const expected = 'prefix-19701231235959.wav';

    expect(actual).toBe(expected);
  });
});
