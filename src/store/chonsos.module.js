import { chonsoService } from '../services';
import createPersistedState from 'vuex-persistedstate';

export const chonsos = {
    namespaced: true,
    plugins: [createPersistedState()],
    state: {
        chonsoAllAndPaging: {},
        ds_dai:[],
        invePdf:[],
        deleteSo:Boolean
    },
    actions: {
        async getChonsoAllAndPaging({ commit},current_page,text_search) {
            return await chonsoService.getChonsoAllAndPaging(current_page,text_search)
        },
        getDanhSachDai({ commit}){
            commit('dsDai_Request');
            chonsoService.getDanhSachDai()
            .then(
                dai => commit('dsDai_Success', dai),
                error => commit('dsDai_Failure', error)
            );
        },
        async invePdf(id){
            return await chonsoService.invePdf(id)
        },
        async addOrUpdate({commit},so){
            return await chonsoService.addOrUpdate(so)
        },
        deleteSo({commit},id){
            commit('addOrUpdate_Request');
            chonsoService.deleteSo(id)
            .then(
                so => commit('addOrUpdate_Success', so),
                error => commit('addOrUpdate_Failure', error)
            );
        }
    },
    mutations: {
        // lấy danh sách đài
        dsDai_Request(state) {
            state.ds_dai = { loading: true };
        },
        dsDai_Success(state, dai) {
            state.ds_dai = { items: dai };
        },
        dsDai_Failure(state, error) {
            state.ds_dai = { error };
        },
        // in vé
        invePdf_Request(state) {
            state.invePdf = { loading: true };
        },
        invePdf_Success(state, ve) {
            state.invePdf = { items: ve };
        },
        invePdf_Failure(state, error) {
            state.invePdf = { error };
        },

        // Xóa số
        deleteSo_Request(state) {
            state.deleteSo = { loading: true };
        },
        deleteSo_Success(state, so) {
            state.deleteSo = { items: so };
        },
        deleteSo_Failure(state, error) {
            state.deleteSo = { error };
        }
    }
}