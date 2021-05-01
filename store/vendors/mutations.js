import _ from 'lodash';
import Vue from 'vue';

export default {
    setVendors(state, vendors) {
        Vue.set(state, 'list', vendors);
    },

    setVendorsMeta(state, meta) {
        Vue.set(state, 'meta', meta);
    },

    updateVendor(state, payload) {
        const vendorIndex = _.findIndex(state.list, {id: payload.id})
        Vue.set(state.list, vendorIndex, payload)
    },

    setProducts(state, products) {
        const index = _.findIndex(state.list, { id: products[0].vendor_id });
        Vue.set(state.list[index],'products', products);
    },

    setActive(state, vendorId) {
        state.active = vendorId;
    }
}
