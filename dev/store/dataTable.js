import {db} from '../db';
import Vue from 'vue';
import {Row} from '../../src/dto/index';

export const state = () => ({
    items: [],
});

export const mutations = {
    add(state, data) {
        state.items.push(data);
    },
    delete(state, query) {
        const itemIndex = state.items.findIndex(el => el.id === query.id);
        if (itemIndex > -1) {
            state.items.splice(itemIndex, 1);
        }
    },
    update(state, payload) {
        const item = state.items.find(row => row.id === payload.rowId);
        if (item) {
            Vue.set(item.values, payload.fieldId, payload.value);
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
                let comparison = false;
                for (const key in payload.query) {
                    if (el.hasOwnProperty(key) && el[key] === payload.query[key]) {
                        comparison = true;
                    }
                }

                return comparison;
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
            delete item.values[payload];
        });
    },
    move(state, {from, to}) {
        const field = state.items[from];
        state.items.splice(from, 1);
        state.items.splice(to, 0, field);
    },
    bulkUpdate(state, records) {
        records.forEach(record => {
            let item;
            if (record.id) {
                item = state.items.find(el => el.id === record.id);
            }
            if (!item) {
                item = new Row({id: record.id});
                state.items.push(item);
            }
            Object.entries(record).forEach(([key, value]) => {
                if (key !== 'id') {
                    const colId = key.split('.')[1];
                    Vue.set(item.values, colId, value);
                }
            });
        });
    }
};

export const getters = {
    items(state) {
        return state.items;
    },
};

export const actions = {
    async create({commit, getters, rootGetters}) {
        const fields = rootGetters['fieldTable/items'];
        let payload = new Row({
            values: {
                [fields[0].id]: 'Row ' + (getters['items'].length + 1)
            }
        });

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
    async read({commit, rootGetters}) {
        const response = await db.get({table: 'datas-table', query: {}});
        const aggregationFields = rootGetters['fieldTable/aggregationFields'];

        commit('load', response.data);

        return response.status;
    },
    async update({commit, rootGetters}, {fieldId, rowId, value}) {
        const data = {};
        data[`values.${fieldId}`] = value;

        const response = await db.put({
            table: 'datas-table',
            query: {id: rowId},
            payload: data
        });

        if (response.status === 'Ok') {
            commit('update', {fieldId, rowId, value});
        }

        return response.status;
    },
    async delete({commit, rootGetters}, payload) {
        const response = await db.delete({table: 'datas-table', query: payload});

        if (response.status === 'Ok') {
            commit('delete', payload);
        }

        return response.status;
    },
    async deleteField({commit}, payload) {
        const response = await db.deleteColumn({
            table: 'datas-table',
            query: payload.query.id
        });

        if (response.status === 'Ok') {
            commit('deleteField', payload.query.id);
        }
    },
    async move({dispatch, commit}, {from, to}) {
        const response = await db.put({
            table: 'datas-table',
            query: {index: from},
            payload: {index: to},
        });

        if (response.status === 'Ok') {
            commit('move', {from, to});
        }
    },
    async bulkUpdate({dispatch, commit}, records) {
        const response = await db.multiUpdate({
            table: 'datas-table',
            payload: {records},
        });

        if (response.status === 'Ok') {
            commit('bulkUpdate', records);
        }
    },
};
