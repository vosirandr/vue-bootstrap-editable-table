import tTypedCell from './t-text-cell';

export default class ColumnType {
  static type = '';
  static cell = tTypedCell;
  static aggregations = [];

  static getAggregationMethod(name) {
    return this.aggregations.find(method => method.name === name);
  }
  static getAggregationNames(name) {
    return this.aggregations.map(method => method.name);
  }
  static aggregate(name, values) {
    const method = this.getAggregationMethod(name);
    if (!method) return null;
    return method(values);
  }
}
