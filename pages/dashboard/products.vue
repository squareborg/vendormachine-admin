<template>
  <div>
    <h1>Products</h1>
    <nuxt-child/>
  </div>
</template>

<script>
  export default {

    asyncData({store}) {
      store.dispatch('vendors/index');
    },

    data() {
      return {
        busy: false,
      }
    }
  }
</script>