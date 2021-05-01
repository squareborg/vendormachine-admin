<template>
  <div class="page">
    <h1>Vendors</h1>
    <div>
      <div class="flex">  
        <input @input="search()" v-model="searchTerm" class="input__search w-1/3" placeholder="Search">
        <button class="ml-auto btn btn--primary" @click="newVendor"><i class="fa fa-plus"></i> New</button>
      </div>
      <AddVendorModal />
        <Pagination v-if="pagination.total_pages > 1" class="w-full mt-6 mx-auto" :page="pagination.current_page" :per-page="pagination.per_page" :records="pagination.total" @paginate="setPage"></Pagination>
      <section class="flex flex-wrap p-4 " v-if="!$fetchState.pending && !busyResults">
        <div :key="vendor.id" v-for="vendor in vendors" class="mt-2 w-1/2 p-1">
          <nuxt-link class="" :to="`/admin/vendors/${vendor.id}/edit`">
            <div class="card no-underline">
              <div class="card__header">
                <span class="card__status border-green-400"></span>
                <h2 class="font-bold text-lg text-grey-600">{{ vendor.name }}</h2>
              </div>
              <div class="card__body">
                {{vendor}}
              </div>
            </div>
          </nuxt-link>
        </div>
      </section>
      <section v-else>
        Loading
      </section>
    </div>
  </div>
</template>

<script>
  import AddVendorModal from '@/components/Vendors/AddVendorAccountModal';
  import { mapActions, mapState } from 'vuex';
  import Pagination from 'vue-pagination-2';

  export default {
    components: {
      AddVendorModal, Pagination
    },

    data(){
      return {
        searchTerm: null,
        busyResults: false
      }
    },

    methods: {
      ...mapActions({
        vendorsList: 'vendors/index',
      }),
      newVendor() {
        return this.$modal.show('add-vendor');
      },
      setPage(page) {
        if (this.busyResults) {return false}
        this.busyResults = true
        return this.vendorsList({ page, s: this.searchTerm })
        .finally(() => {
          this.busyResults = false
        })
      },
      search() {
        if (this.busyResults) {return false}
        return this.vendorsList({ page: 1, s: this.searchTerm })
        .finally(() => {
          this.busyResults = false
        })
      }
    },

    fetch() {
      this.vendorsList();
    },

    computed: {
      ...mapState({
        vendors: 'vendors/list',
      }),
      vendors() {
        return this.$store.state.vendors.list;
      },
      pagination() {
        return this.$store.state.vendors.meta.pagination ? this.$store.state.vendors.meta.pagination : {}
      }
    },
  }
</script>