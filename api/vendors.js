const qs = require('qs');

export default $axios => ({
    index(query) {
        let queryString = qs.stringify(query);
        return $axios.$get(`/vendors?${queryString}`)
    },

    store(payload) {
        return $axios.$post('/vendors', payload);
    },

    update(payload) {
        return $axios.$put(`/vendors/${payload.id}`, payload);
    },

    products: {
        index (id, query) {
            let queryString = qs.stringify(query);
            return $axios.$get(`/vendors/${id}/products?${queryString}`);
        },

        show(id) {
            return $axios.$get(`/products/${id}`);
        },

        store(id, payload) {
            return $axios.$post(`/products`, payload);
        },

        update(payload) {
            return $axios.$put(`/products/${payload.id}`, payload);
        },
    },

    show(id) {
        return $axios.$get(`/vendors/${id}`);
    },


})
