import ColumnType from "./ColumnType";
import tNumberCell from './t-number-cell';

export default class NumberColumnType extends ColumnType {
  static type = 'number';
  static cell = tNumberCell;
  static useAggregation = true;
}
