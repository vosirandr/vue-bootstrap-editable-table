import ColumnType from "./ColumnType";
import tJsonCell from './t-json-cell';

export default class JsonColumnType extends ColumnType {
  static type = 'json';
  static cell = tJsonCell;
}
