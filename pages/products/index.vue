<template>
  <div class="page xl:w-3/5">
    <h1>Products</h1>
    <div class="flex">  
        <input @input="search()" v-model="searchTerm" class="input__search w-1/3" placeholder="Search">
        <nuxt-link tag="button" to="/products/create" class="ml-auto btn btn--primary" ><i class="fa fa-plus"></i> New</nuxt-link> 
    </div>
    <section>
      <Pagination v-if="pagination.total_pages > 1" class="w-full mt-6 mx-auto" :page="pagination.current_page" :per-page="pagination.per_page" :records="pagination.total" @paginate="setPage"></Pagination>
      <div class="card p-4 mt-4">
        <div v-if="!$fetchState.pending && !busyResults">
          <div v-if="! products.length">
            Sorry no products to display<span v-if="searchTerm">, try changing your search term</span>
          </div>
          <table v-else class="table-auto">
            <thead class="p-4 text-left text-grey-300">
              <th class="p-4">Name</th>
              <th>Price</th>
            </thead>
            <tbody>
              <tr v-for="product in products">
                <td class="p-2 font-black"><nuxt-link :to="`/products/${product.id}/edit`">{{product.name}}</nuxt-link></td>
                <td>{{product.formatted_price}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          Loading...
        </div>
      </div> 
    </section>
  </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';
import Pagination from 'vue-pagination-2';


export default {
  components: {
    Pagination
  },

  data() {
    return {
      searchTerm: "",
      busyResults: false,
    }
  },

  fetch() {
    this.list();
  },

  computed: {
    ...mapState({
      products: 'vendor/products'
    }),

    products() {
      return this.$store.state.vendor.products.list;
    },

    pagination() {
      return this.$store.state.vendor.products.meta.pagination ? this.$store.state.vendor.products.meta.pagination : {}
    }
  },

  methods: {
    ...mapActions({
      list: 'vendor/listProducts'
    }),

    setPage(page) {
      if (this.busyResults) {return false}
      this.busyResults = true
      return this.list({ page, s: this.searchTerm })
      .finally(() => {
        this.busyResults = false
      })
    },

    search() {
      if (this.busyResults) {return false}
      return this.list({ page: 1, s: this.searchTerm })
      .finally(() => {
        this.busyResults = false
      })
    }
  },
}
</script>