import ColumnType from "./ColumnType";
import tNumberCell from './t-number-cell';
import { count, max, mean, median, min, sum } from "../../../helpers/aggregations";

export default class NumberColumnType extends ColumnType {
  static type = 'number';
  static cell = tNumberCell;
  static aggregations = { sum, min, max, mean, median, count };
}
