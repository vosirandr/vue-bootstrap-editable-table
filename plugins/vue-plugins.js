import Vue from 'vue';
import { IconsPlugin } from 'bootstrap-vue';
import VueJsonEditor from 'vue-json-editor';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.use(IconsPlugin);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-json-editor', VueJsonEditor);
