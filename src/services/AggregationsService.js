import {count, max, mean, median, min, sum} from "../helpers/aggregations";
import {isUndefinedOrNullOrEmpty} from '../helpers/index';

export default class AggregationsService {
    column;
    values;

    /**
     *
     * @param {Column} column
     * @param {Array} values
     */
    constructor(column, values) {
        this.column = column;
        this.values = values;
    }

    availableAggregations() {
        return {count, max, mean, median, min, sum};
    }

    aggregate(name) {
        const method = this.availableAggregations()[name];
        if (method) {
            const validData = this.values.filter(value => !isUndefinedOrNullOrEmpty(value));
            return method(validData);
        }
        return null;
    }

    getAggregationNames() {
        return Object.keys(this.availableAggregations());
    }

    formatAggregatedValue(name, value) {
        return value;
    }

    isAggregatedValueValid(name, value) {
        return true;
    }
}
