import { nhapsoService } from '../services';

export const nhapsos = {
    namespaced: true,
    state: {
        nhapsoAllAndPaging: {}
    },
    actions: {
        getNhapsoAllAndPaging({ commit }) {
            commit('getNhapsoAllAndPaging_Request');
            nhapsoService.getNhapsoAllAndPaging()
            .then(
                so => commit('getNhapsoAllAndPaging_Success', so),
                error => commit('getNhapsoAllAndPaging_Failure', error)
            );
        }
    },
    mutations: {
        getNhapsoAllAndPaging_Request(state) {
            state.nhapsoAllAndPaging = { loading: true };
        },
        getNhapsoAllAndPaging_Success(state, so) {
            state.nhapsoAllAndPaging = { items: so };
        },
        getNhapsoAllAndPaging_Failure(state, error) {
            state.nhapsoAllAndPaging = { error };
        }
    }
}