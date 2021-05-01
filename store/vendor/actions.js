export default {

  async init({ dispatch }) {
    await dispatch('get');
  },

  get({ commit }, payload) {    
    return this.$api.auth.me()
      .then(response => {               
        if (response.data.vendors.data.length) {
          commit('setUserVendor', response.data.vendors.data[0])
        }
      })
  },

  store({ commit }, payload) {
    console.log('storing');
    return this.$api.vendors.store(payload)
      .then(response => {      
        commit('setUserVendor', response)
      })
    },

  async storeProduct({commit, state}, payload) {
    return await this.$api.vendors.products.store(state.account.id, payload)
      .then(response => {
        commit('addProduct', response);
        return response;
      })
  },

  async getProduct({commit, state}, productId) {
    return await this.$api.vendors.products.show(productId)
      .then(response => {
        commit('addProduct', response);
        return response;
      })
  },

  async updateProduct({ commit, state }, payload) {
    return await this.$api.vendors.products.update(payload)
      .then(response => {
        commit('addProduct', response)
        return response;
      })
  },
  
  listProducts({ commit }, query) {
    return this.$api.products.index(query)
      .then(response => {
        commit('setProducts', response.data);
        commit('setProductsMeta', response.meta);
        return response
      })
  }
  
}
