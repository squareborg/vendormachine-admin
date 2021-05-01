export default {

  async boot({ dispatch, state }) {
    await dispatch('index')
    await dispatch('setActive', state.list[0].id)
  },

  index({ commit }, payload) {
    return this.$api.vendors.index(payload)
      .then(response => {
        commit('setVendors', response.data);
        commit('setVendorsMeta', response.meta);
        return response
      })
  },

  get({ commit }, id) {
    return this.$api.vendors.show(id)
  },


  async productsIndex({ commit, state }, payload) {
    console.log(state);

    return await this.$api.vendors.products.index(state.active)
      .then(response => {
        commit('setProducts', response.data);
        return response;
      })
  },

  async storeProduct({ commit, state }, payload) {
    return await this.$api.vendors.products.store(state.active, payload)
      .then(response => {
        return response;
      })
  },

  async updateProduct({ commit, state }, payload) {
    return await this.$api.vendors.products.update(state.active, payload)
      .then(response => {
        commit('addProduct', response)
        return response;
      })
  },

  async store({ commit }, payload) {
    return await this.$api.vendors.store(payload)
      .then(response => {
        return response;
      })
  },

  async setActive({ commit }, payload) {
    commit('setActive', payload)
  },


  async update({commit}, payload) {
    return await this.$api.vendors.update(payload)
      .then(response => {
        commit('updateVendor', response)
        this.$toast.success('Vendor updated');
        return response;
      })
  },

  async delete({commit}, payload) {
    return await this.$api.vendors.delete(payload)
      .then(response => {
        this.$toast.success('Vendor deleted');
        return response;
      })
  },
}
