import ColumnType from "./ColumnType";
import tPercentCell from './t-percent-cell';
import { count, max, mean, median, min, sum } from "../../../helpers/aggregations";

export default class PercentColumnType extends ColumnType {
  static type = 'percent';
  static cell = tPercentCell;
  static aggregations = [sum, min, max, mean, median, count];
}
