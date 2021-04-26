import AggregationsService from './AggregationsService';
import {formatFloat} from '../helpers/index';

export default class AggregationsNumberService extends AggregationsService {
    formatAggregatedValue(name, value) {
        return name === 'count' ? value : formatFloat(value);
    }
}
