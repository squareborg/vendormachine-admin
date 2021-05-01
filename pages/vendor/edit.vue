<template>
  <div class="page">
      <div class="flex">
        <button @click="save" class="ml-auto btn btn--primary">Save</button>
        </div>
    <div class="card p-12mt-2 lg:w-4/5">
    <div class="card__header">
      Shop details
    </div>
      <div class="card__body">
        <div class="lg:w-1/2">
          <input type="text" v-model="vendor.name">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex"

export default {
  fetch() {
    this.getUserVendor()
  },

  created() {
    this.vendor = this.$store.state.vendor.account
  },

  computed: {
      ...mapGetters({
        hasVendorAccount: 'vendor/hasVendorAccount'
      }),

      ...mapState({
        vendorState: 'vendor/account'
      }),

    },

  methods: {
    ...mapActions({
      getUserVendor: "vendor/get",
      updateVendor: 'vendors/update'
    }),

    save() {
      if (this.busy) { return false }
      this.busy = true
      this.updateVendor(this.vendor)
      .finally(() => {
        this.busy = false
      })
    }
  },
}
</script>