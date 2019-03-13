import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
import { chonsos } from './chonsos.module';
import { giaosos } from './giaosos.module';
import { nhapsos } from './nhapsos.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users,
        chonsos,
        giaosos,
        nhapsos
    }
});