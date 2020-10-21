import ColumnType from "./ColumnType";
import tPercentCell from './t-percent-cell';

export default class PercentColumnType extends ColumnType {
  static type = 'percent';
  static cell = tPercentCell;
  static useAggregation = true;
}
