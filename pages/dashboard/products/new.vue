<template>
  <div>
    New Product
    <form @submit.prevent="submit">
        <nuxt-link to="../products" class="ml-auto btn btn--outline"><i class="fas fa-plus" />back</nuxt-link> 
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="product.title" />
        <input type="submit" value="Save">
    </form>
  </div>
</template>

<script>
  export default {

    created() {
      this.$store.dispatch('vendors/productsIndex');
    },

    data() {
      return {
        busy: false,
        product: {
            title: null,
        }
      }
    },

    methods: {
        submit() {
            console.log('submitting', this.product);
            this.$store.dispatch('vendors/storeProduct', this.product);
        }
    },
  }
</script>