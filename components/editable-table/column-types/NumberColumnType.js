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
      [method.name]: (values) => method(convertToNumberArray(values)),
    }), {});

  static formatAggregatedValue(name, value) {
    return name === 'count' ? value : formatFloat(value);
  }
}
