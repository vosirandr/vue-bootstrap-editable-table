import ColumnType from "./ColumnType";
import tTextCell from './t-text-cell';
import {faAlignLeft} from '@fortawesome/free-solid-svg-icons';

export default class TextColumnType extends ColumnType {
  static type = 'text';
  static cell = tTextCell;
  static icon = faAlignLeft;
}
