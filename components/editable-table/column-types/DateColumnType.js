import ColumnType from "./ColumnType";
import tDateCell from './t-date-cell';

export default class DateColumnType extends ColumnType {
  static type = 'date';
  static cell = tDateCell;
}
