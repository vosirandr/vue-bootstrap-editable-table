import {isObject} from "~/helpers";
import ColumnType from "./ColumnType";
import tJsonCell from './t-json-cell';

export default class JsonColumnType extends ColumnType {
  static type = 'json';
  static cell = tJsonCell;

  static convertStringToValue(str) {
    try {
      return JSON.parse(str)
    } catch (e) {
      return undefined;
    }
  }
  static validate(value) {
    return isObject(value);
  }
}
