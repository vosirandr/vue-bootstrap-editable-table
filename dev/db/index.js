import {generateId} from "../../src/helpers";
import Column from '../../src/dto/Column';
import TYPES from '../../src/services/column-types';
import Row from '../../src/dto/Row';
import set from 'lodash/set';

const testFields = [
    new Column({title: 'Name', type: TYPES.TEXT, width: 120, unique: true}),
    new Column({title: 'Text', type: TYPES.TEXT, width: 200}),
    new Column({title: 'Image', type: TYPES.URL, width: 80}),
    new Column({title: 'Number', type: TYPES.DOUBLE, aggregate: 'sum', width: 80}),
];

const testRows = [
    new Row({
        values: {
            [testFields[0].id]: 'Name 1',
            [testFields[1].id]: 'Raw description text dfaskfjkadfj;fj fajdf;ajdf;ajaadjf;a',
            [testFields[2].id]: '/logo.png',
            [testFields[3].id]: 4222545.15,
        }
    }),
    new Row({
        values: {
            [testFields[0].id]: 'Name 2',
            [testFields[1].id]: 'Raw description text 2',
            [testFields[2].id]: '',
            [testFields[3].id]: 21,
        }
    }),
];

/* To emulate server delay */
const SERVER_DELAY = 0;
const resolver = function (payload) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(payload);
        }, SERVER_DELAY);
    });
};

function database(tableName) {
    const tName = tableName;
    let datas = null;

    function initStorage(table) {
        let testDataSet;

        if (table === 'fields-table') {
            testDataSet = [...testFields];
        } else if (table === 'datas-table') {
            testDataSet = [...testRows];
        }

        localStorage.setItem(table, JSON.stringify(testDataSet));

        return testDataSet;
    }

    function read() {
        datas = localStorage.getItem(tName);

        if (datas === null) {
            datas = initStorage(tName);
        } else {
            datas = JSON.parse(datas);
        }
    }

    function write() {
        localStorage.setItem(tName, JSON.stringify(datas));
    }

    /* very simple data filter */
    function filter(query) {
        if (Object.keys(query).length) {
            return datas.filter(el => {
                let comparison = false;
                for (const key in query) {
                    if (el.hasOwnProperty(key) && el[key] === query[key]) {
                        comparison = true;
                    }
                }

                return comparison;
            });
        } else {
            return datas;
        }
    }

    function find(query, findIndex) {
        if (Object.keys(query).length) {
            if (query.hasOwnProperty('index')) {
                return findIndex ? query.index : datas[query.index];
            }

            if (findIndex) {
                return datas.findIndex(comparator);
            } else {
                return datas.find(comparator);
            }
        } else {
            return null;
        }

        function comparator(el) {
            let comparison = false;
            for (const key in query) {
                if (el.hasOwnProperty(key) && el[key] === query[key]) {
                    comparison = true;
                }
            }

            return comparison;
        }
    }

    return {
        get(query) {
            read();
            return filter(query);
        },
        put(query, payload) {
            read();

            const record = find(query);
            if (record) {
                for (const key in payload) {
                    if (key !== 'index') {
                        set(record, key, payload[key]);
                    }
                }

                if (payload.hasOwnProperty('index')) {
                    const recordIndex = find(query, true);
                    datas.splice(recordIndex, 1);
                    datas.splice(payload.index, 0, record);
                }

                write();
            }

            return [];
        },
        post(query, payload) {
            read();

            datas.push(payload);

            write();

            return [];
        },
        delete(query) {
            read();

            const recordIndex = find(query, true);
            if (recordIndex > -1) {
                datas.splice(recordIndex, 1);
                write();
            }

            return [];
        },
        bulkUpdate(query, payload) {
            read();

            const recordSet = filter(query);

            recordSet.forEach(element => {
                for (const key in payload) {
                    element[key] = payload[key];
                }
            });

            write();

            return datas;
        },
        multiUpdate(query, {records}) {
            read();

            records.forEach(record => {
                if (record.id) {
                    const item = datas.find(el => el.id === record.id);
                    Object.entries(record).forEach(([key, value]) => {
                        set(item, key, value);
                    });
                } else {
                    datas.push({...record, id: generateId()});
                }
            });

            write();
        },
        deleteColumn(query) {
            read();

            datas.forEach(element => {
                delete element.values[query];
            });

            write();

            return [];
        },
    };
}

const responser = function (method, request) {
    const table = database(request.table);

    if (table) {
        const data = table[method](request.query, request.payload);
        return resolver({data, status: 'Ok'});
    } else {
        return resolver({data: [], status: 'Table not found'});
    }
};

export const db = {
    get(request) {
        return responser('get', request);
    },
    put(request) {
        return responser('put', request);
    },
    post(request) {
        return responser('post', request);
    },
    delete(request) {
        return responser('delete', request);
    },
    bulkUpdate(request) {
        return responser('bulkUpdate', request);
    },
    multiUpdate(request) {
        return responser('multiUpdate', request);
    },
    deleteColumn(request) {
        return responser('deleteColumn', request);
    }
};
