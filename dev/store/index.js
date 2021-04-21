import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as dataTable from './dataTable';
import * as fieldTable from './fieldTable';

const state = () => ({
    nothing: null
});

export default () => new Vuex.Store({
    modules: {
        dataTable: {
            namespaced: true,
            ...dataTable
        },
        fieldTable: {
            namespaced: true,
            ...fieldTable
        }
    },
    strict: false,
    state
});
