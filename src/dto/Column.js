import {generateId} from '../helpers';
import TYPES from '../services/column-types';
import ColumnService from '../services/ColumnService';

export default class Column {
    id;
    title;
    type;
    aggregate;
    width;
    unique;

    constructor(attributes = {}) {
        const availableTypes = Object.values(TYPES);
        if (typeof attributes.type === 'undefined' || !availableTypes.includes(attributes.type)) {
            throw new Error('Column attribute "type" must be one of list: ' + availableTypes.join(', '));
        }

        this.type = attributes.type;
        this.id = attributes.id || generateId();
        this.title = attributes.title || '';
        this.aggregate = attributes.aggregate || (ColumnService.hasAggregations(this.type) ? 'sum' : null);
        this.width = attributes.width || 100;
        this.unique = attributes.unique || false;
    }
}
