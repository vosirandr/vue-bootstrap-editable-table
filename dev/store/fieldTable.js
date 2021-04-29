import {db} from '../db';
import {isUndefinedOrNullOrEmpty, generateId, getValueToType} from '../../src/helpers';
import {getField, getFieldIndex} from "../../src/helpers/fields";
import Column from '../../src/dto/Column';

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
        const item = state.items.find(el => el.id === payload.id);
        if (item) {
            item[payload.fieldName] = payload.value;
        }
    },
    delete(state, query) {
        const itemIndex = state.items.findIndex(el => el.id === query.id);
        if (itemIndex > -1) {
            state.items.splice(itemIndex, 1);
        }
    },
    resize(state, {id, width}) {
        const field = state.items.find(el => el.id === id);
        if (!field) return;
        field.width = width;
    },
    move(state, {id, index}) {
        const field = getField(state.items, id);
        const oldIndex = getFieldIndex(state.items, id);
        if (oldIndex === -1) return;

        state.items.splice(oldIndex, 1);
        state.items.splice(index, 0, field);
    },
    rename(state, {id, title}) {
        const field = getField(state.items, id);
        if (!field) return;
        field.caption = title;
    },
};

export const getters = {
    items(state) {
        return state.items;
    },
    aggregationFields(state) {
        return state.items
            .filter(el => !isUndefinedOrNullOrEmpty(el.aggregate))
            .map(el => ({field: el.name, aggregate: el.aggregate}));
    },
};

export const actions = {
    async create({dispatch, commit}, payload) {
        const data = new Column(payload);
        const response = await db.post({
            table: 'fields-table',
            query: {},
            payload: data
        });

        if (response.status === 'Ok') {
            commit('add', data);
        }

        return response.status;
    },
    async read({commit}) {
        const response = await db.get({table: 'fields-table', query: {}});
        commit('load', response.data);

        return response.status;
    },
    async update({commit, getters}, {id, fieldName, value}) {
        const data = {};
        data[fieldName] = value;

        const response = await db.put({
            table: 'fields-table',
            query: {id},
            payload: data
        });

        if (response.status === 'Ok') {
            commit('update', {id, fieldName, value});
        }

        return response.status;
    },
    async delete({dispatch, commit}, payload) {
        const response = await db.delete({
            table: 'fields-table',
            query: payload
        });

        if (response.status === 'Ok') {
            await dispatch('dataTable/deleteField', {query: payload}, {root: true});

            commit('delete', payload);
        }

        return response.status;
    },
    async resize({dispatch, commit}, {id, width}) {
        const response = await db.put({
            table: 'fields-table',
            query: {id},
            payload: {width},
        });

        if (response.status === 'Ok') {
            commit('resize', {id, width});
        }
    },
    async move({dispatch, commit}, {id, index}) {
        const response = await db.put({
            table: 'fields-table',
            query: {id},
            payload: {index},
        });

        if (response.status === 'Ok') {
            commit('move', {id, index});
        }
    },
    async rename({dispatch, commit}, {id, title}) {
        const response = await db.put({
            table: 'fields-table',
            query: {id},
            payload: {title},
        });

        if (response.status === 'Ok') {
            commit('rename', {id, title});
        }
    },
};
