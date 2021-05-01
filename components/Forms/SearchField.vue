<template>
  <div>
    <input class="b-none rounded-full input--slim" type="text" name="s" v-model="input" @keyup.enter="search" :placeholder="placeholder" />
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        required: true,
      }
    },

    data() {
      return {
        input: null
      }
    },

    methods: {
      search() {
        this.$emit('search', this.input);
      }
    }
  }
</script>
