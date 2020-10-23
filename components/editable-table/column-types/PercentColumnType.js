import ColumnType from "./ColumnType";
import tPercentCell from './t-percent-cell';
import { convertToNumberArray } from "../../../helpers";
import { count, max, mean, median, min, sum } from "../../../helpers/aggregations";

export default class PercentColumnType extends ColumnType {
  static type = 'percent';
  static cell = tPercentCell;
  static aggregations = [ sum, min, max, mean, median, count ]
    .reduce((agg, method) => ({
      ...agg,
      [method.name]: (values) => method(convertToNumberArray(values)),
    }));
}
