export default {
    list(state) {
        return state.list;
    },

    modal(state) {
        return state.modal;
    },

    isAuthenticated (state, getters, rootState) {
        return rootState.auth.loggedIn
    },

    user(state, getters, rootState) {
        return rootState.auth.user;
    }
}
