<template>
  <div class="page">
    <section>
      <form class="card mt-4 lg:w-4/5 xl:w-3/5" @submit.prevent="save">
        <section class="card__header">
          <h1 v-if="product && product.name">{{ product.name }}</h1>
        </section>
        <section v-if="freshProduct" class="flex justify-between">
          <main class="p-5">
            <label>Name</label>
            <input  v-model="product.name" placeholder="Product Name" type="input">
            <label>Description</label>
          <textarea v-model="product.description" class="input--bordered" placeholder="Description"></textarea>
          </main>
          <aside class="p-5 bg-grey-200 relative">
            <label>Price</label>
            <currency-input
              v-model="product.variants.data[0].price"
              currency="GBP"
              locale="en"
              :value-as-integer="true"
              :distraction-free="false"
            />
            <button class="btn btn--primary absolute right-0 bottom-0 mb-4 mr-4">Save</button>
          </aside>
        </section>
        <section class="p-5" v-else>Loading...</section>
      </form>
      <section v-if="product && freshProduct">
        <button @click="addVariant" class="btn"><i class="fa fa-plus ml-auto"></i> Add Variant</button>
        <div v-for="variant in product.variants.data.slice(1)">
          {{variant}}
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  data() {
    return {
      busy: false,
      product: null,
      freshProduct: false
    }
  },

  created() {
    const productId = this.$route.params.id
    this.product = _.find(this.$store.state.vendor.products.list, { id: productId })
    this.getProduct(productId).then(response => {
      this.product = { ...response } 
      const clonedVariants = []
      this.product.variants.data.forEach(variant => {
        clonedVariants.push({...variant})
      })
      this.product.variants = { data : {}}
      this.$set(this.product.variants, 'data', clonedVariants)
      // this.product.variants.data = clonedVariants;
      this.freshProduct = true
    })
  },

  computed: {
    ...mapState({
      products: "products/list",
    }),
  },

  methods: {
    ...mapActions({
      getProduct: "vendor/getProduct",
      updateProduct: 'vendor/updateProduct'
    }),

    addVariant(){
      this.product.variants.data.push({
        "name": this.product.name
      })
    },

    save() {
      if (this.busy) { return false }
      this.busy = true
      this.product.price = parseInt(this.product.price);
      this.updateProduct(this.product)
      .then(()=>{
        this.$toast.success('Updated');
      })
      .finally(() => {
        this.busy = false
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>