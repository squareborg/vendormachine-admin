export default {
    list(state) {
        return state.list;
    },

    activeVendor(state) {
        return _.find(state.list, { id: state.active });
    }

    // activeProducts(state){
    //     const index = _.findIndex(state.list, { id: products[0].vendor_id });
    // }
}
