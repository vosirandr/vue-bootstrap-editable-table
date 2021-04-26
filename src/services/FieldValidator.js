import COLUMN_TYPES from './column-types';
import {isObject, unFormatFloat, validateType} from '../helpers/index';

export default class FieldValidator {
    column;

    /**
     * @param {Column} column
     */
    constructor(column) {
        this.column = column;
    }

    validate(value) {
        switch (this.column.type) {
            case COLUMN_TYPES.DATE:
                return this._validateDate(value);
            case COLUMN_TYPES.URL:
                return this._validateUrl(value);
            case COLUMN_TYPES.DOUBLE:
            case COLUMN_TYPES.PERCENT:
                return this._validateNumber(value);
            case COLUMN_TYPES.JSON:
                return this._validateJson(value);
            default:
                return this._validateText(value);
        }
    }

    _validateDate(value) {
        return !value || validateType('date', value);
    }

    _validateUrl(value) {
        return !value || validateType('url', value);
    }

    _validateNumber(value) {
        return validateType('number', unFormatFloat(value));
    }

    _validateJson(value) {
        return isObject(value);
    }

    _validateText(value) {
        return validateType('text', value);
    }
}
