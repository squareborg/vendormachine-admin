export default $axios => ({

  me() {
    return $axios.get(`/me`);
  },
  
  password: {
    email(payload) {
      return $axios.$post(`/password/email`, payload)
    },

    reset(payload) {
      return $axios.$post(`/password/reset`, payload)
    },
  },

  register(payload) {
    return $axios.$post(`/register`, payload)
  },

  verify: {
    post (payload) {
      return $axios.$post(`/verify`, payload)
    },

    resend (payload) {
      return $axios.$post(`/verify/resend`, payload)
    },
  }
})
