import moment from "moment";
import ColumnType from "./ColumnType";
import tDateCell from './t-date-cell';

export default class DateColumnType extends ColumnType {
  static type = 'date';
  static cell = tDateCell;
  static icon = 'calendar-day';

  static convertStringToValue(str) {
    const date = moment(str);
    return date.isValid() ? str : undefined;
  }
}
