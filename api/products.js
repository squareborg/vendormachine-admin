const qs = require('qs');

export default $axios => ({
    index (query) {
        return $axios.$get(`/products?${qs.stringify(query)}`)
    },
})
