import { numLetterPairs } from './constants.mjs';

export class WordListConverter {
  convert = (value) => {
    const numbers = value.toLowerCase().split('');
    this.words = [];
    this.doWordConversion(numbers);
    return this.words;
  };

  doWordConversion = (numbers, i = 0, word = '') => {
    if (i === numbers.length) {
      if (word) {
        this.words.push(word);
      }
      return;
    }
    const num = numbers[i];
    const letters = numLetterPairs[num] || [''];
    for (const l of letters) {
      this.doWordConversion(numbers, i + 1, word + l);
    }
  };
}
