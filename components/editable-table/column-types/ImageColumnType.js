import ColumnType from "./ColumnType";
import tImageCell from './t-image-cell';

export default class ImageColumnType extends ColumnType {
  static type = 'image';
  static cell = tImageCell;
}
