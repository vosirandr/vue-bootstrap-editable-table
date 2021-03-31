import ColumnType from "./ColumnType";
import tPercentCell from './t-percent-cell';
import { formatPercents, isUndefinedOrNullOrEmpty, unFormatFloat, validateType } from "~/helpers";
import { count, max, mean, median, min, sum } from "~/helpers/aggregations";

export default class PercentColumnType extends ColumnType {
  static type = 'percent';
  static cell = tPercentCell;
  static aggregations = [ sum, min, max, mean, median, count ]
    .reduce((agg, method) => ({
      ...agg,
      [method.name]: (values) => {
        const validData = values.filter(value => !isUndefinedOrNullOrEmpty(value));
        return method(validData);
      },
    }), {});

  static formatAggregatedValue(name, value) {
    return name === 'count' ? value : formatPercents(value);
  }
  static isAggregatedValueValid(name, value) {
    return !(name === 'sum' && value > 1);
  }
  static convertStringToValue(str) {
    const number = Number(str.replace(',', '.'));
    return Number.isNaN(number) ? undefined : number;
  }
  static validate(value) {
    return validateType('number', unFormatFloat(value));
  }
}
