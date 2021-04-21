import 'babel-polyfill';

import './plugins/vue-plugins';
import './plugins/filters';

import Page from './pages/index';
import storeFactory from './store';
import Vue from 'vue';
new Vue({
    render: h => h(Page),
    store: storeFactory()
}).$mount('#app');
