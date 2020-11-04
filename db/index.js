const testFields = [{
  name: 'name',
  caption: 'Name',
  type: 'text',
  width: 120,
}, {
  name: 'text',
  caption: 'Text',
  type: 'text',
  width: 200,
}, {
  name: 'image',
  caption: 'Image',
  type: 'image',
  width: 80,
}, {
  name: 'number',
  caption: 'Number',
  type: 'number',
  width: 80,
  aggregate: 'sum',
}];

const testDatas = [{
  name: 'Name 1',
  text: 'Raw description text dfaskfjkadfj;fj fajdf;ajdf;ajaadjf;a',
  image: '/logo.png',
  number: 4222545.15,
}, {
  name: 'Name 2',
  text: 'Raw description text 2',
  image: '',
  number: 21
}];

/* To emulate server delay */
const SERVER_DELAY = 0;
const resolver = function(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(payload) }, SERVER_DELAY);
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
      testDataSet = [...testDatas];
    }

    if (process.browser) {
      localStorage.setItem(table, JSON.stringify(testDataSet));
    }

    return testDataSet;
  };

  function read() {
    if (process.browser){
      datas = localStorage.getItem(tName);
    }

    if (datas === null) {
      datas = initStorage(tName);
    } else {
      datas = JSON.parse(datas);
    }
  };

  function write() {
    if (process.browser){
      localStorage.setItem(tName, JSON.stringify(datas));
    }
  }

  /* very simple data filter */
  function filter(query) {
    if (Object.keys(query).length) {
      return datas.filter(el => {
        let comparsion = false;
        for (const key in query) {
          if (el.hasOwnProperty(key) && el[key] === query[key]) {
            comparsion = true;
          }
        }

        return comparsion;
      });
    } else {
      return datas;
    }
  };

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
      let comparsion = false;
      for (const key in query) {
        if (el.hasOwnProperty(key) && el[key] === query[key]) {
          comparsion = true;
        }
      }

      return comparsion;
    }
  };

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
          if (record.hasOwnProperty(key) && key !== 'index') {
            record[key] = payload[key];
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
    multiUpdate(query, { records }) {
      read();

      records.forEach(record => {
        const item = datas.find(el => el.name === record.name);
        Object.entries(record).forEach(([key, value]) => item[key] = value);
      });

      write();
    },
    deleteColumn(query) {
      read();

      datas.forEach(element => {
        delete element[query];
      });

      write();

      return [];
    },
  }
};

const responser = function(method, request) {
  const table = new database(request.table);

  if (table) {
    const data = table[method](request.query, request.payload);
    return resolver({ data, status: 'Ok' });
  } else {
    return resolver({ data: [], status: 'Table not found' });
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
