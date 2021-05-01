<template>
  <div class="page">
    <h1 v-if="vendor && vendor.name">{{ vendor.name }}</h1>
    <section v-if="freshVendor">
      <div class="flex">
      <button @click="save" class="ml-auto btn btn--primary">Save</button>
      </div>
      <div class="card w-full lg:w-4/5 xl:w-1/2  mt-4">
        <div class="card__header">

        </div>
        <div class="card__body">
          <input type="text"
            v-model="vendor.name"
            placeholder="Name"
          >
        </div>
      </div>
    </section>
    <section v-else>Loading...</section>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex"

export default {
  data() {
    return {
      busy: false,
      vendor: null,
      freshVendor: false
    }
  },

  created() {
    const vendorId = this.$route.params.id
    // @todo stm figure out why this mapped state isnt working
    // this.vendor = _.find(this.vendors, { id: vendorId })
    this.vendor = _.find(this.$store.state.vendors.list, { id: vendorId })
    this.getVendor(vendorId).then(respose => {
      this.vendor = respose
      this.freshVendor = true
    })
  },

  computed: {
    ...mapState({
      vendors: "vendors/list",
    }),
  },

  methods: {
    ...mapActions({
      getVendor: "vendors/get",
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