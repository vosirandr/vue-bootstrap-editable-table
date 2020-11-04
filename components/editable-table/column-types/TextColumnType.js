import ColumnType from "./ColumnType";
import tTextCell from './t-text-cell';

export default class TextColumnType extends ColumnType {
  static type = 'text';
  static cell = tTextCell;
}
