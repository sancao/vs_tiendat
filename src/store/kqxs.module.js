import { chonsoService } from '../services';

export const chonsos = {
    namespaced: true,
    state: {
        chonsoAllAndPaging: {}
    },
    actions: {
        getChonsoAllAndPaging({ commit }) {
            commit('getChonsoAllAndPaging_Request');
            chonsoService.getChonsoAllAndPaging()
            .then(
                so => commit('getChonsoAllAndPaging_Success', so),
                error => commit('getChonsoAllAndPaging_Failure', error)
            );
        }
    },
    mutations: {
        getChonsoAllAndPaging_Request(state) {
            state.allAndPaging = { loading: true };
        },
        getChonsoAllAndPaging_Success(state, so) {
            state.allAndPaging = { items: so };
        },
        getChonsoAllAndPaging_Failure(state, error) {
            state.allAndPaging = { error };
        }
    }
}