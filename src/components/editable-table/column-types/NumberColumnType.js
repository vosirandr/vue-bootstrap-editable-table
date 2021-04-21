import ColumnType from "./ColumnType";
import tNumberCell from './t-number-cell';
import {formatFloat, isUndefinedOrNullOrEmpty, unFormatFloat, validateType} from "../../../helpers";
import {count, max, mean, median, min, sum} from "../../../helpers/aggregations";
import {faCalculator} from '@fortawesome/free-solid-svg-icons';

export default class NumberColumnType extends ColumnType {
    static type = 'number';
    static cell = tNumberCell;
    static icon = faCalculator;

    static aggregations = [sum, min, max, mean, median, count]
        .reduce((agg, method) => ({
            ...agg,
            [method.name]: (values) => {
                const validData = values.filter(value => !isUndefinedOrNullOrEmpty(value));
                return method(validData);
            },
        }), {});

    static formatAggregatedValue(name, value) {
        return name === 'count' ? value : formatFloat(value);
    }

    static convertStringToValue(str) {
        const number = Number(str.replace(',', '.'));
        return Number.isNaN(number) ? undefined : number;
    }

    static validate(value) {
        return validateType(this.type, unFormatFloat(value));
    }
}
