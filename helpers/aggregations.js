import { sort } from './index';

export const sum = values => values.reduce((sum, value) => sum + value, 0);

export const min = values => Math.min(...values);

export const max = values => Math.max(...values);

export const mean = values => {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
};

export const median = values => {
  const numsLen = values.length;
  const sortedValues = values.sort(sort);

  if (numsLen % 2 === 0) {
    return mean(sortedValues[numsLen / 2 - 1], sortedValues[numsLen / 2]);
  } else {
    return sortedValues[(numsLen - 1) / 2];
  }
};

export const count = values => values.length;

export default { sum, min, max, mean, median, count };
