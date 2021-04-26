import COLUMN_TYPES from './column-types';
import moment from 'moment';
import {isCorrectUrl} from '../helpers/index';

export default class FieldStringParser {
    static convertToValue(type, stringValue) {
        switch (type) {
            case COLUMN_TYPES.DATE:
                return this._fromDateString(stringValue);
            case COLUMN_TYPES.DOUBLE:
            case COLUMN_TYPES.PERCENT:
                return this._fromNumberString(stringValue);
            case COLUMN_TYPES.URL:
                return this._fromUrlString(stringValue);
            case COLUMN_TYPES.JSON:
                return this._fromJsonValue(stringValue);
            default:
                return stringValue;
        }
    }

    static _fromDateString(stringValue) {
        const date = moment(stringValue);
        return date.isValid() ? stringValue : undefined;
    }

    static _fromNumberString(stringValue) {
        const number = Number(stringValue.replace(',', '.'));
        return Number.isNaN(number) ? undefined : number;
    }

    static _fromUrlString(stringValue) {
        return isCorrectUrl(stringValue) ? stringValue : undefined;
    }

    static _fromJsonValue(stringValue) {
        try {
            return JSON.parse(stringValue);
        } catch (e) {
            return undefined;
        }
    }
}
