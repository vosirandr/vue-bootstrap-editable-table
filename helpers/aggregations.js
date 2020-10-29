import { sort, isUndefinedOrNullOrEmpty } from './index';

export const sum = numbers => numbers.reduce((sum, value) => sum + value, 0);

export const min = numbers => Math.min(...numbers);

export const max = numbers => Math.max(...numbers);

export const mean = numbers => {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
};

export const median = numbers => {
  const numsLen = numbers.length;
  const sortedNumbers = numbers.sort(sort);

  if (numsLen % 2 === 0) {
    return mean(sortedNumbers[numsLen / 2 - 1], sortedNumbers[numsLen / 2]);
  } else {
    return sortedNumbers[(numsLen - 1) / 2];
  }
};

export const count = values => values.filter(value => !isUndefinedOrNullOrEmpty(value)).length;

export default { sum, min, max, mean, median, count };
