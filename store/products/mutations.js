import _ from 'lodash';
import Vue from 'vue';

export default {
    setVendors(state, vendors) {
        Vue.set(state, 'list', vendors);
    },

    setProducts(state, products) {
        const index = _.findIndex(state.list, { id: products[0].vendor_id });
        Vue.set(state.list[index],'products', products);
    },

    addProduct(state, product) {
        state.list.push(product);
    },

    setActive(state, vendorId) {
        state.active = vendorId;
    }
}
