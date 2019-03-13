import Vue from 'vue';

import { store } from './store';
import { router } from './helpers';
import App from './app/index';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import Toasted from 'vue-toasted';
Vue.use(Toasted)
import pdfObject from 'pdfobject'
Vue.use(pdfObject);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});