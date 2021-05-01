<template>
  <div>
    <div class="flex">
      <nuxt-link to="products/new" class="ml-auto btn btn--outline"><i class="fas fa-plus" /> New Product</nuxt-link> 
    </div>
    <div v-if="activeVendor" >
      <ProductList :vendor="activeVendor.id" />
    </div>
    <div v-else>
      <span v-if="busy">
        loading...
      </span>
      <span v-else>
        No products
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductList from '@/components/Vendors/Products/ProductList';
  export default {

    components: {
      ProductList
    },

    computed: {
      ...mapGetters({
        activeVendor: 'vendors/activeVendor'
      })
    },
    
    created() {
      this.$store.dispatch('vendors/productsIndex')
        // .then(()=>{
        //   this.products = this.$store.
        // })
    },

    data() {
      return {
        busy: false,
      }
    }
  }
</script>