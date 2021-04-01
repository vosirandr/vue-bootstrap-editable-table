import ColumnType from "./ColumnType";
import tImageCell from './t-image-cell';
import { isCorrectUrl, validateType } from "~/helpers";

export default class ImageColumnType extends ColumnType {
  static type = 'image';
  static cell = tImageCell;
  static icon = 'image';

  static convertStringToValue(str) {
    return isCorrectUrl(str) ? str : undefined;
  }
  static validate(value) {
    return !value || validateType('url', value);
  }
}
