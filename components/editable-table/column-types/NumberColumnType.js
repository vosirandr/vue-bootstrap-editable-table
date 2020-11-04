import ColumnType from "./ColumnType";
import tNumberCell from './t-number-cell';
import { formatFloat, convertToNumberArray } from "../../../helpers";
import { count, max, mean, median, min, sum } from "../../../helpers/aggregations";

export default class NumberColumnType extends ColumnType {
  static type = 'number';
  static cell = tNumberCell;
  static aggregations = [ sum, min, max, mean, median, count ]
    .reduce((agg, method) => ({
      ...agg,
      [method.name]: (values) => {
        const validData = method.name === 'count' ? values : convertToNumberArray(values)
        return method(validData);
      },
    }), {});

  static formatAggregatedValue(name, value) {
    return name === 'count' ? value : formatFloat(value);
  }
  static convertStringToValue(str) {
    const number = Number(str.replace(',', '.'));
    return Number.isNaN(number) ? undefined : number;
  }
}
