export default {

  async boot({dispatch, state}) {
    await dispatch('index');    
  },

  async index({commit}, payload) {
    return await this.$api.products.index()
      .then(response => {
        commit('setProducts', response.data);
        return response;
      })
  },

  async productsIndex({commit, state}, payload) {
    return await this.$api.vendors.products.index(state.active)
      .then(response => {
        commit('setProducts', response.data);
        return response;
      })
  },

  async storeProduct({commit, state}, payload) {
    return await this.$api.vendors.products.store(state.active, payload)
      .then(response => {
        commit('addProduct', response.data);
        return response;
      })
  },

  async store({commit}, payload) {
    return await this.$api.vendors.store(payload)
      .then(response => {
        return response;
      })
  },

  async setActive({ commit }, payload) {
    commit('setActive', payload)
  },

}
