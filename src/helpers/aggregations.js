import { sort } from './index';

export const sum = numbers => numbers.reduce((sum, value) => sum + value, 0);

export const min = numbers => (numbers.length ? Math.min(...numbers) : undefined);

export const max = numbers => (numbers.length ? Math.max(...numbers) : undefined);

export const mean = numbers => {
  if (numbers.length === 0) return undefined;
  return sum(numbers) / numbers.length;
};

export const median = numbers => {
  const numsLen = numbers.length;
  if (numsLen === 0) return undefined;
  const sortedNumbers = numbers.sort(sort);

  if (numsLen % 2 === 0) {
    return mean([sortedNumbers[numsLen / 2 - 1], sortedNumbers[numsLen / 2]]);
  } else {
    return sortedNumbers[(numsLen - 1) / 2];
  }
};

export const count = values => values.length;
