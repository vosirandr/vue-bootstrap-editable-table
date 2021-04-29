import {generateId} from '../helpers';
import cloneDeep from 'lodash/cloneDeep';

export default class Row {
    id = null;
    values = {};

    constructor(attributes = {}) {
        this.id = attributes.id || generateId();
        this.values = cloneDeep(attributes.values || {});
    }
}
