import { WordListConverter } from './WordListConverter.mjs';

test('returns empty result for empty string', () => {
  const converter = new WordListConverter();

  const result = converter.convert('');

  expect(result).toHaveLength(0);
});

test('skips unknown letters', () => {
  const converter = new WordListConverter();

  const result = converter.convert('#2_');

  expect(result).toEqual(['a', 'b', 'c']);
});

test('converts 23 to: ad, ae, af, bd, be, bf, cd, ce, cf', () => {
  const converter = new WordListConverter();

  const result = converter.convert('23');

  expect(result).toEqual([
    'ad',
    'ae',
    'af',
    'bd',
    'be',
    'bf',
    'cd',
    'ce',
    'cf',
  ]);
});
