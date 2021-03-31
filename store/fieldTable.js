import { db } from '~/db';
import { isUndefinedOrNullOrEmpty, generateId, getValueToType } from '~/helpers';
import { getField, getFieldIndex } from "../helpers/fields";

export const state = () => ({
  items: [],
});

export const mutations = {
  add(state, data) {
    state.items.push(data);
  },
  load(state, data) {
    state.items = [];

    for (let i = 0; i < data.length; i++) {
      state.items.push(data[i]);
    }
  },
  update(state, payload) {
    const item = state.items.find(el => el.name === payload.rowName);
    if (item) {
      item[payload.fieldName] = payload.value;
    }
  },
  delete(state, query) {
    const itemIndex = state.items.findIndex(el => el.name === query.name);
    if (itemIndex > -1) {
      state.items.splice(itemIndex, 1);
    }
  },
  resize(state, { name, width }) {
    const field = state.items.find(el => el.name === name);
    if (!field) return;
    field.width = width;
  },
  move(state, { name, index }) {
    const field = getField(state.items, name);
    const oldIndex = getFieldIndex(state.items, name);
    if (oldIndex === -1) return;

    state.items.splice(oldIndex, 1);
    state.items.splice(index, 0, field);
  },
  rename(state, { name, caption }) {
    const field = getField(state.items, name);
    if (!field) return;
    field.caption = caption;
  },
};

export const getters = {
  items(state) {
    return state.items;
  },
  aggregationFields(state) {
    return state.items
      .filter(el => !isUndefinedOrNullOrEmpty(el.aggregate))
      .map(el => ({ field: el.name, aggregate: el.aggregate }));
  },
};

export const actions = {
  async create({ dispatch, commit }, payload) {
    const name = generateId();
    const data = { ...payload, name };

    const response = await db.post({
      table: 'fields-table',
      query: {},
      payload: data
    });

    if (response.status === 'Ok') {
      const dataUpdate = {};
      dataUpdate[name] = getValueToType(payload.type);

      let aggregation = null;
      if (payload.aggregate) {
        aggregation = {
          field: name,
          aggregate: payload.aggregate
        };
      }

      commit('add', data);
    }

    return response.status;
  },
  async read({ commit }) {
    const response = await db.get({ table: 'fields-table', query: {} });
    commit('load', response.data);

    return response.status;
  },
  async update({ commit, getters }, payload) {
    const data = {};
    data[payload.fieldName] = payload.value;

    const response = await db.put({
      table: 'fields-table',
      query: { name: payload.rowName },
      payload: data
    });

    if (response.status === 'Ok') {
      commit('update', payload);
    }

    return response.status;
  },
  async delete({ dispatch, commit }, payload) {
    const response = await db.delete({
      table: 'fields-table',
      query: payload
    })

    if (response.status === 'Ok') {
      await dispatch('dataTable/deleteField', { query: payload }, { root: true });

      commit('delete', payload);
    }

    return response.status;
  },
  async resize({ dispatch, commit }, { name, width }) {
    const response = await db.put({
      table: 'fields-table',
      query: { name },
      payload: { width },
    });

    if (response.status === 'Ok') {
      commit('resize', { name, width });
    }
  },
  async move({ dispatch, commit }, { name, index }) {
    const response = await db.put({
      table: 'fields-table',
      query: { name },
      payload: { index },
    });

    if (response.status === 'Ok') {
      commit('move', {name, index});
    }
  },
  async rename({ dispatch, commit }, { name, caption }) {
    const response = await db.put({
      table: 'fields-table',
      query: { name },
      payload: { caption },
    });

    if (response.status === 'Ok') {
      commit('rename', {name, caption});
    }
  },
};
