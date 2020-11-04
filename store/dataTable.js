import { db } from '~/db';
import { getValueToType } from '~/helpers';

export const state = () => ({
  items: [],
});

export const mutations = {
  add(state, data) {
    state.items.push(data);
  },
  delete(state, query) {
    const itemIndex = state.items.findIndex(el => el.name === query.name);
    if (itemIndex > -1) {
      state.items.splice(itemIndex, 1);
    }
  },
  update(state, payload) {
    const item = state.items.find(el => el.name === payload.rowName);
    if (item) {
      item[payload.fieldName] = payload.value;
    }
  },
  load(state, data) {
    state.items = [];

    for (let i = 0; i < data.length; i++) {
      state.items.push(data[i]);
    }
  },
  updateField(state, payload) {
    let items = state.items;
    if (Object.keys(payload.query).length) {
      items = state.item.filter(el => {
        let comparsion = false;
        for (const key in payload.query) {
          if (el.hasOwnProperty(key) && el[key] === payload.query[key]) {
            comparsion = true;
          }
        }

        return comparsion;
      });
    }

    items.forEach(el => {
      for (const key in payload.data) {
        this._vm.$set(el, key, payload.data[key]);
      }
    });
  },
  deleteField(state, payload) {
    state.items.forEach(item => {
      delete item[payload];
    });
  },
};

export const getters = {
  items(state) {
    return state.items;
  },
};

export const actions = {
  async create({ state, commit, rootGetters }) {
    const fields = rootGetters['fieldTable/items'];
    const lastIndex = parseInt(state.items[state.items.length - 1].name.slice(4));
    let payload = { name: `Name ${lastIndex + 1}` };

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].name === 'name') continue;
      payload[fields[i].name] = getValueToType(fields[i].type);
    }

    const response = await db.post({
      table: 'datas-table',
      query: {},
      payload
    });

    if (response.status === 'Ok') {
      commit('add', payload);
    }

    return response.status;
  },
  async read({ commit, rootGetters }) {
    const response = await db.get({ table: 'datas-table', query: {} });
    const aggregationFields = rootGetters['fieldTable/aggregationFields'];

    commit('load', response.data);

    return response.status;
  },
  async update({ commit, rootGetters }, payload) {
    const data = {};
    data[payload.fieldName] = payload.value;

    const response = await db.put({
      table: 'datas-table',
      query: { name: payload.rowName },
      payload: data
    });

    if (response.status === 'Ok') {
      commit('update', payload);
    }

    return response.status;
  },
  async delete({ commit, rootGetters }, payload) {
    const response = await db.delete({ table: 'datas-table', query: payload });

    if (response.status === 'Ok') {
      commit('delete', payload);
    }

    return response.status;
  },
  async updateField({ commit }, payload) {
    const response = await db.bulkUpdate({
      table: 'datas-table',
      query: payload.query,
      payload: payload.data
    });

    if (response.status === 'Ok') {
      commit('updateField', payload);
    }

    return response.status;
  },
  async deleteField({ commit }, payload) {
    const response = await db.deleteColumn({
      table: 'datas-table',
      query: payload.query.name
    });

    if (response.status === 'Ok') {
      commit('deleteField', payload.query.name);
    }
  }
};
