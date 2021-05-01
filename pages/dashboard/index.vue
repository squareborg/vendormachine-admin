<template>
  <div>
      <button v-if="! $store.state.vendors.list.length" @click="$modal.show('add-vendor')">Create Seller Account</button>
      <i class="nav__icon fas fa-store mr-1"></i>
        <select v-if="$store.state.vendors.list.length" v-model="selectedVendor">
          <option :value="vendor.id" :key="vendor.id" v-for="vendor in vendors">
            {{vendor.name}}
          </option>
        </select>
    <h1>Dashboard</h1>
    <div v-for="vendor in vendors" :key="vendor.id">
      {{ vendor }}
    </div>
  </div>
</template>

<script>

  import { mapGetters }  from 'vuex';
  export default {
    asyncData({ store }) {
      return store.dispatch('vendors/index')
        .then(response => {
          return {
            vendors: response.data
          }
        });
    },

    computed: {
      ...mapGetters({ activeVendor: 'vendors/activeVendor'}),
      vendors() {
        return this.$store.state.vendors.list
      },
      
      selectedVendor: {
        get() {
          if (this.activeVendor) {
            return this.activeVendor.id
          }
        },
        set(newValue) {
          return this.$store.dispatch('vendors/setActive', newValue)
        }
      }
    },

    created() {           
      if (this.activeVendor) {

        this.selectedVendor = this.activeVendor.id;
      }
    },
  }
</script>