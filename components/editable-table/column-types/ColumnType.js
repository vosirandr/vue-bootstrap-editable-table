import tTypedCell from './t-text-cell';

export default class ColumnType {
  static type = '';
  static cell = tTypedCell;
  static aggregations = {};

  static hasAggregations () {
    return Object.keys(this.aggregations).length > 0;
  }
  static getAggregationMethod(name) {
    return this.aggregations[name];
  }
  static getAggregationNames() {
    return Object.keys(this.aggregations);
  }
  static aggregate(name, values) {
    const method = this.getAggregationMethod(name);
    if (!method) return null;
    return method(values);
  }
}
