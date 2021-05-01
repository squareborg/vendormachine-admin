<template>
    <div>
        <div class="text-sm card p-2 mb-1" v-for="product in products" :key="product.id">
            <span class="font-bold">{{ product.title }} {{product.price}}</span>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    props: ['vendor'],

    data() {
        return {

        }
    },
    
    computed: {
        
        ...mapGetters({
        activeVendor: 'vendors/activeVendor'
        }),

        products() {
            return this.activeVendor.products;
        }
    },

    created(){
        console.log(this.vendor);
    }
}
</script>