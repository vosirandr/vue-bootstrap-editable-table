import AggregationsService from './AggregationsService';
import {formatPercents} from '../helpers/index';

export default class AggregationsPercentService extends AggregationsService {
    formatAggregatedValue(name, value) {
        return name === 'count' ? value : formatPercents(value);
    }

    isAggregatedValueValid(name, value) {
        return !(name === 'sum' && value > 1);
    }
}
