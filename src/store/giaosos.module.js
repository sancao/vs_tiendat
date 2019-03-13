import { giaosoService } from '../services';

export const giaosos = {
    namespaced: true,
    state: {
        giaosoAllAndPaging: {}
    },
    actions: {
        getGiaosoAllAndPaging({ commit }) {
            commit('getGiaosoAllAndPaging_Request');
            giaosoService.getGiaosoAllAndPaging()
            .then(
                so => commit('getGiaosoAllAndPaging_Success', so),
                error => commit('getGiaosoAllAndPaging_Failure', error)
            );
        }
    },
    mutations: {
        getGiaosoAllAndPaging_Request(state) {
            state.giaosoAllAndPaging = { loading: true };
        },
        getGiaosoAllAndPaging_Success(state, so) {
            state.giaosoAllAndPaging = { items: so };
        },
        getGiaosoAllAndPaging_Failure(state, error) {
            state.giaosoAllAndPaging = { error };
        }
    }
}