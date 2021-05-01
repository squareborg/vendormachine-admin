import _ from 'lodash';
import Vue from 'vue';

export default {
    setUserVendor(state, vendor) {
        Vue.set(state, 'account', vendor);
    },

    setProducts(state, vendors) {
        Vue.set(state.products, 'list', vendors);
    },

    setProductsMeta(state, meta) {
        Vue.set(state.products, 'meta', meta);
    },

    addProduct(state, product) {
        const productId = _.findIndex(state.products.list, { id: product.id })
        if (productId > -1) {
            Vue.set(state.products.list, productId, product)
        } else {
            state.products.list.push(product);
        }
    },
}
