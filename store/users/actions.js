export default {
  async index({ commit }, payload) {
    return await this.$api.users.index(payload)
      .then(response => {
        commit('setUsers', response.data);
        return response;
      });
  },

  async store({ commit, dispatch }, payload) {
    return await this.$api.users.store(payload)
      .then(response => {
        this.$toast.success('User added');
        return response;
      })
  },

  async show({ commit, dispatch }, payload) {
    return await this.$api.users.show(payload)
  },

  async update({ commit, dispatch }, payload) {
    return await this.$api.users.update(payload.id, payload.user)
      .then(response => {
        this.$toast.success('User updated');
        return response;
      })
  },

  async delete({ commit, dispatch }, payload) {
    return await this.$api.users.delete(payload)
      .then(response => {
        this.$toast.success('User deleted');
        return response;
      })
  },

  async suspend({ commit, dispatch }, payload) {        
    return await this.$api.users.suspend(payload.id)
      .then(response => {
        this.$toast.success('User Suspended');
        return response;
      })
  },

  async unsuspend({ commit, dispatch }, payload) {        
    return await this.$api.users.unsuspend(payload.id)
      .then(response => {
        this.$toast.success('User Unsuspended');
        return response;
      })
  },
}
