import TYPES from './column-types';
import tCellDate from '../components/column-types/t-cell-date';
import tCellImage from '../components/column-types/t-cell-image';
import tCellJson from '../components/column-types/t-cell-json';
import tCellNumber from '../components/column-types/t-cell-number';
import tCellPercent from '../components/column-types/t-cell-percent';
import tCellText from '../components/column-types/t-cell-text';

import {
    faCalendarDay,
    faImage,
    faCode,
    faCalculator,
    faPercent,
    faAlignLeft,
} from '@fortawesome/free-solid-svg-icons';
import AggregationsNumberService from './AggregationsNumberService';
import AggregationsPercentService from './AggregationsPercentService';

export default class ColumnService {
    static component(type) {
        switch (type) {
            case TYPES.DATE:
                return tCellDate;
            case TYPES.URL:
                return tCellImage;
            case TYPES.JSON:
                return tCellJson;
            case TYPES.DOUBLE:
                return tCellNumber;
            case TYPES.PERCENT:
                return tCellPercent;
            case TYPES.TEXT:
                return tCellText;
        }
    }

    static icon(type) {
        switch (type) {
            case TYPES.DATE:
                return faCalendarDay;
            case TYPES.URL:
                return faImage;
            case TYPES.JSON:
                return faCode;
            case TYPES.DOUBLE:
                return faCalculator;
            case TYPES.PERCENT:
                return faPercent;
            case TYPES.TEXT:
                return faAlignLeft;
        }
    }

    static hasAggregations(type) {
        return [TYPES.DOUBLE, TYPES.PERCENT].includes(type);
    }

    /**
     * @param {Column} column
     * @param {Array} values
     */
    static aggregationsFactory(column, values) {
        switch (column.type) {
            case TYPES.DOUBLE:
                return new AggregationsNumberService(column, values);
            case TYPES.PERCENT:
                return new AggregationsPercentService(column, values);
            default:
                throw new Error(`Column type "${column.type}" not allowed aggregations`);
        }
    }
}
